import { NextResponse } from "next/server";
import {
  bookingSetupHint,
  getBookingFromEmail,
  getBookingRecipients,
  isResendConfigured,
} from "../../../lib/booking-config";
import { contactFormSchema, validateMinSubmitTime } from "../../../lib/contact-schema";
import { renderContactEmail } from "../../../lib/contactEmail";
import { clientIp } from "../../../lib/client-ip";
import {
  rateLimitApi,
  rateLimitBurst,
  rateLimitContact,
  rateLimitTutoring,
} from "../../../lib/rate-limit";
import { logSecurityEvent } from "../../../lib/request-log";
import { verifyTurnstileToken } from "../../../lib/turnstile";
import { Resend } from "resend";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const RESEND_TIMEOUT_MS = 15_000;

function jsonError(
  body: Record<string, unknown>,
  status: number,
  retryAfter?: number
) {
  const headers: Record<string, string> = {};
  if (retryAfter) headers["Retry-After"] = String(retryAfter);
  return NextResponse.json(body, { status, headers });
}

async function applyRateLimits(ip: string, sessionType: string) {
  const burst = await rateLimitBurst(ip);
  if (!burst.ok) return burst;

  const contact = await rateLimitContact(ip);
  if (!contact.ok) return contact;

  if (sessionType === "tutoring") {
    const tutoring = await rateLimitTutoring(ip);
    if (!tutoring.ok) return tutoring;
  }

  return { ok: true as const };
}

export async function POST(req: Request) {
  if (!isResendConfigured()) {
    console.error("[/api/contact] RESEND_API_KEY is missing or still a placeholder.");
    return jsonError(
      {
        ok: false,
        error: bookingSetupHint(),
        code: "booking_not_configured",
      },
      503
    );
  }

  const ip = clientIp(req);

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return jsonError({ ok: false, error: "Invalid JSON payload." }, 400);
  }

  const parsed = contactFormSchema.safeParse(body);
  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const key = issue.path.join(".") || "form";
      if (!fieldErrors[key]) fieldErrors[key] = issue.message;
    }
    return jsonError(
      { ok: false, error: "Please fix the highlighted fields.", fieldErrors },
      422
    );
  }

  const rl = await applyRateLimits(ip, parsed.data.sessionType);
  if (!rl.ok) {
    logSecurityEvent("rate_limit", { path: "/api/contact", limiter: rl.limiter, ip });
    return jsonError(
      { ok: false, error: "Too many requests. Please wait a moment and try again." },
      429,
      rl.retryAfter
    );
  }

  const apiRl = await rateLimitApi(ip);
  if (!apiRl.ok) {
    logSecurityEvent("rate_limit", { path: "/api/contact", limiter: apiRl.limiter, ip });
    return jsonError(
      { ok: false, error: "Too many requests. Please wait a moment and try again." },
      429,
      apiRl.retryAfter
    );
  }

  if (parsed.data.website) {
    return NextResponse.json({ ok: true });
  }

  const minTimeError = validateMinSubmitTime(parsed.data.formLoadedAt);
  if (minTimeError) {
    logSecurityEvent("submit_too_fast", { ip });
    return jsonError({ ok: false, error: minTimeError }, 422);
  }

  const turnstile = await verifyTurnstileToken(parsed.data.turnstileToken, ip);
  if (!turnstile.ok) {
    return jsonError({ ok: false, error: turnstile.error, fieldErrors: { turnstile: turnstile.error } }, 422);
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
  const apiKey = process.env.RESEND_API_KEY!.trim();
  const resend = new Resend(apiKey);

  try {
    const to = getBookingRecipients();

    const sendPromise = resend.emails.send({
      from: getBookingFromEmail(),
      to: [...to],
      replyTo: payload.email,
      subject,
      html,
      text,
      headers: {
        "X-Entity-Ref-ID": `contact-${Date.now()}`,
      },
      tags: [{ name: "category", value: "booking-request" }],
    });

    const timeout = new Promise<never>((_, reject) => {
      setTimeout(() => reject(new Error("Resend timeout")), RESEND_TIMEOUT_MS);
    });

    const { data, error } = await Promise.race([sendPromise, timeout]);

    if (error) {
      console.error("[/api/contact] Resend error:", error);
      const message =
        error.name === "validation_error"
          ? "Email could not be sent. Make sure both tutor inboxes are verified in Resend (Settings → Verified Emails)."
          : "Email service rejected the message. Please try again shortly.";
      return jsonError({ ok: false, error: message, code: "resend_error" }, 502);
    }

    return NextResponse.json({ ok: true, id: data?.id ?? null });
  } catch (err) {
    console.error("[/api/contact] Unexpected error:", err);
    return jsonError(
      { ok: false, error: "Something went wrong on our end. Please try again." },
      500
    );
  }
}

export async function GET() {
  return NextResponse.json({
    ok: true,
    configured: isResendConfigured(),
  });
}

export async function PUT() {
  return jsonError({ ok: false, error: "Method not allowed." }, 405);
}

export async function PATCH() {
  return jsonError({ ok: false, error: "Method not allowed." }, 405);
}

export async function DELETE() {
  return jsonError({ ok: false, error: "Method not allowed." }, 405);
}
