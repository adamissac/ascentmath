import { NextResponse } from "next/server";
import { Resend } from "resend";
import { z } from "zod";
import {
  bookingSetupHint,
  getBookingFromEmail,
  getBookingRecipient,
  isResendConfigured,
} from "../../../lib/booking-config";
import { renderBookingEmail } from "../../../lib/bookingEmail";
import { describeBookingSelection } from "../../../data/pricing";

/* ----------------------------------------------------------------
   Runtime
   ---------------------------------------------------------------- */

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/* ----------------------------------------------------------------
   Configuration
   ---------------------------------------------------------------- */

const RECIPIENT = getBookingRecipient();
const FROM = getBookingFromEmail();

/* ----------------------------------------------------------------
   Validation schema - matches the form on /book
   ---------------------------------------------------------------- */

const schema = z.object({
  name: z.string().trim().min(2, "Please enter your full name.").max(120),
  email: z.string().trim().toLowerCase().email("Please enter a valid email address.").max(200),
  phone: z.string().trim().max(40).optional().or(z.literal("")),
  tier: z.enum(["tier1", "tier2", "tier3"]),
  mode: z.enum(["zoom", "in_person"]),
  grade: z.string().trim().max(60).optional().or(z.literal("")),
  topic: z.string().trim().max(160).optional().or(z.literal("")),
  preferredDate: z.string().trim().max(40).optional().or(z.literal("")),
  preferredTime: z.string().trim().max(40).optional().or(z.literal("")),
  notes: z.string().trim().max(2000).optional().or(z.literal("")),
  // Spam honeypot - must be empty.
  website: z.string().max(0).optional().or(z.literal("")),
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
   POST /api/book
   ---------------------------------------------------------------- */

export async function POST(req: Request) {
  if (!isResendConfigured()) {
    console.error("[/api/book] RESEND_API_KEY is missing or still a placeholder.");
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
    phone: parsed.data.phone || undefined,
    tier: parsed.data.tier,
    pricingSummary: describeBookingSelection(parsed.data.tier),
    mode: parsed.data.mode,
    grade: parsed.data.grade || undefined,
    topic: parsed.data.topic || undefined,
    preferredDate: parsed.data.preferredDate || undefined,
    preferredTime: parsed.data.preferredTime || undefined,
    notes: parsed.data.notes || undefined,
  };

  const { subject, text, html } = renderBookingEmail(payload);

  // Send
  const resend = new Resend(apiKey);
  try {
    const { data, error } = await resend.emails.send({
      from: FROM,
      to: [RECIPIENT],
      replyTo: payload.email,
      subject,
      html,
      text,
      headers: {
        "X-Entity-Ref-ID": `booking-${Date.now()}`,
      },
      tags: [{ name: "category", value: "booking-request" }],
    });

    if (error) {
      console.error("[/api/book] Resend error:", error);
      const message =
        error.name === "validation_error"
          ? "Email could not be sent. Make sure adamissac08@gmail.com is verified in Resend (Settings → Verified Emails)."
          : "Email service rejected the message. Please try again shortly.";
      return NextResponse.json({ ok: false, error: message, code: "resend_error" }, { status: 502 });
    }

    return NextResponse.json({ ok: true, id: data?.id ?? null });
  } catch (err) {
    console.error("[/api/book] Unexpected error:", err);
    return NextResponse.json(
      { ok: false, error: "Something went wrong on our end. Please try again." },
      { status: 500 }
    );
  }
}

/* Health check - lets the /book page know if submissions will work */
export async function GET() {
  const configured = isResendConfigured();
  return NextResponse.json({
    ok: true,
    configured,
    recipient: configured ? RECIPIENT : undefined,
    hint: configured ? undefined : bookingSetupHint(),
  });
}
