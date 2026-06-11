/**
 * Booking / Resend configuration helpers.
 * Shared by the API route and health checks.
 */

const PLACEHOLDER_KEYS = new Set([
  "",
  "re_yourApiKeyHere",
  "re_your_real_key_here",
  "re_xxxxxxxx",
]);

export function getBookingRecipient(): string {
  return process.env.BOOKING_RECIPIENT_EMAIL?.trim() || "adamissac08@gmail.com";
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
    "(run npm run book:setup), verify adamissac08@gmail.com in Resend, " +
    "then restart the dev server."
  );
}
