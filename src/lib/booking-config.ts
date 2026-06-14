/**
 * Booking / Resend configuration helpers.
 * Shared by the API route and health checks.
 */

import { ADAM_EMAIL, ALAN_EMAIL, TUTOR_EMAILS } from "../data/site-team";

const PLACEHOLDER_KEYS = new Set([
  "",
  "re_yourApiKeyHere",
  "re_your_real_key_here",
  "re_xxxxxxxx",
]);

/** All booking inboxes — comma-separated env or both tutor emails. */
export function getBookingRecipients(): string[] {
  const raw = process.env.BOOKING_RECIPIENT_EMAIL?.trim();
  if (raw) {
    return raw
      .split(",")
      .map((e) => e.trim())
      .filter(Boolean);
  }
  return [...TUTOR_EMAILS];
}

/** @deprecated Use getBookingRecipients(). Returns the primary inbox. */
export function getBookingRecipient(): string {
  return getBookingRecipients()[0] ?? ADAM_EMAIL;
}

export function getBookingFromEmail(): string {
  return (
    process.env.BOOKING_FROM_EMAIL?.trim() ||
    "Adam's Alphabet <onboarding@resend.dev>"
  );
}

export function isResendConfigured(): boolean {
  const key = process.env.RESEND_API_KEY?.trim();
  if (!key || PLACEHOLDER_KEYS.has(key)) return false;
  return key.startsWith("re_") && key.length > 12;
}

export function bookingSetupHint(): string {
  return (
    "Contact email is not configured. Add RESEND_API_KEY to .env.local " +
    `(run npm run book:setup), verify ${ADAM_EMAIL} and ${ALAN_EMAIL} in Resend, ` +
    "then restart the dev server."
  );
}
