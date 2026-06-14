import { NextResponse } from "next/server";
import { Resend } from "resend";
import { z } from "zod";
import {
  bookingSetupHint,
  getBookingFromEmail,
  getBookingRecipient,
  getBookingRecipients,
  isResendConfigured,
} from "../../../lib/booking-config";
import { renderContactEmail } from "../../../lib/contactEmail";

/* ----------------------------------------------------------------
   Runtime
   ---------------------------------------------------------------- */

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/* ----------------------------------------------------------------
   Validation schema - matches the booking form on the homepage
   ---------------------------------------------------------------- */

const schema = z.object({
  name: z.string().trim().min(2, "Please enter your full name.").max(120),
  email: z.string().trim().toLowerCase().email("Please enter a valid email address.").max(200),
  school: z.string().trim().max(160).optional().or(z.literal("")),
  grade: z.string().trim().max(60).optional().or(z.literal("")),
  sessionType: z.enum(["tutoring", "demo", "partnership", "general"]),
  message: z
    .string()
    .trim()
    .min(10, "Please tell me a bit more (at least 10 characters).")
    .max(2000),
  // Spam honeypot - any non-empty value triggers a fake success below.
  website: z.string().optional(),
});

/* ----------------------------------------------------------------
   Naive per-IP rate limiter (in-memory, suitable for a single
   dev/serverless instance). For multi-region production traffic,
   swap for an edge KV-backed limiter (Upstash etc.).
   ---------------------------------------------------------------- */

const buckets = new Map<string, { count: number; resetAt: number }>();
const WINDOW_MS = 60_000;
const MAX_REQ = 5;

function rateLimit(ip: string) {
  const now = Date.now();
  const b = buckets.get(ip);
  if (!b || b.resetAt < now) {
    buckets.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return { ok: true, remaining: MAX_REQ - 1 };
  }
  if (b.count >= MAX_REQ) {
    return { ok: false, retryAfter: Math.ceil((b.resetAt - now) / 1000) };
  }
  b.count += 1;
  return { ok: true, remaining: MAX_REQ - b.count };
}

function clientIp(req: Request) {
  const xff = req.headers.get("x-forwarded-for");
  if (xff) return xff.split(",")[0].trim();
  return req.headers.get("x-real-ip") || "unknown";
}

/* ----------------------------------------------------------------
   POST /api/contact
   ---------------------------------------------------------------- */

export async function POST(req: Request) {
  if (!isResendConfigured()) {
    console.error("[/api/contact] RESEND_API_KEY is missing or still a placeholder.");
    return NextResponse.json(
      {
        ok: false,
        error: bookingSetupHint(),
        code: "booking_not_configured",
      },
      { status: 503 }
    );
  }

  const apiKey = process.env.RESEND_API_KEY!.trim();

  // Rate limit
  const ip = clientIp(req);
  const rl = rateLimit(ip);
  if (!rl.ok) {
    return NextResponse.json(
      { ok: false, error: "Too many requests. Please wait a moment and try again." },
      { status: 429, headers: { "Retry-After": String(rl.retryAfter ?? 60) } }
    );
  }

  // Parse body
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON payload." }, { status: 400 });
  }

  // Validate
  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const key = issue.path.join(".") || "form";
      if (!fieldErrors[key]) fieldErrors[key] = issue.message;
    }
    return NextResponse.json(
      { ok: false, error: "Please fix the highlighted fields.", fieldErrors },
      { status: 422 }
    );
  }

  // Honeypot tripped → pretend success so bots don't probe further
  if (parsed.data.website) {
    return NextResponse.json({ ok: true });
  }

  const payload = {
    name: parsed.data.name,
    email: parsed.data.email,
    school: parsed.data.school || undefined,
    grade: parsed.data.grade || undefined,
    sessionType: parsed.data.sessionType,
    message: parsed.data.message,
  };

  const { subject, text, html } = renderContactEmail(payload);

  // Send
  const resend = new Resend(apiKey);
  try {
    const recipients = getBookingRecipients();
    const { data, error } = await resend.emails.send({
      from: getBookingFromEmail(),
      to: recipients,
      replyTo: payload.email,
      subject,
      html,
      text,
      headers: {
        "X-Entity-Ref-ID": `contact-${Date.now()}`,
      },
      tags: [{ name: "category", value: "booking-request" }],
    });

    if (error) {
      console.error("[/api/contact] Resend error:", error);
      const message =
        error.name === "validation_error"
          ? "Email could not be sent. Make sure both tutor inboxes are verified in Resend (Settings → Verified Emails)."
          : "Email service rejected the message. Please try again shortly.";
      return NextResponse.json({ ok: false, error: message, code: "resend_error" }, { status: 502 });
    }

    return NextResponse.json({ ok: true, id: data?.id ?? null });
  } catch (err) {
    console.error("[/api/contact] Unexpected error:", err);
    return NextResponse.json(
      { ok: false, error: "Something went wrong on our end. Please try again." },
      { status: 500 }
    );
  }
}

/* Health check - lets the booking form know if submissions will work.
   The recipient address is included even when unconfigured so the form
   can show it as copyable text (it's already public in the footer). */
export async function GET() {
  const configured = isResendConfigured();
  const recipients = getBookingRecipients();
  return NextResponse.json({
    ok: true,
    configured,
    recipients,
    recipient: getBookingRecipient(),
    hint: configured ? undefined : bookingSetupHint(),
  });
}
