/**
 * Shared business identity for Ascent Math (Adam & Alan).
 */

import { SITE_BRAND_NAME, SITE_BRAND_WORDS } from "../lib/site-brand";

export { SITE_BRAND_NAME, SITE_BRAND_WORDS };

export const TUTOR_NAMES = "Adam Issac & Alan Mozhoor";
export const TUTOR_NAMES_SHORT = "Adam & Alan";

export const ADAM_EMAIL = "adamissac08@gmail.com";
export const ALAN_EMAIL = "alanmozhoor@gmail.com";

export const TUTOR_EMAILS = [ADAM_EMAIL, ALAN_EMAIL] as const;

export const TUTOR_EMAILS_DISPLAY = TUTOR_EMAILS.join(" · ");

export const REPLY_TIME_LINE = "We reply within 1–2 days.";

/** Business phones — shown in footer, credentials, and JSON-LD. */
export const ADAM_PHONE_DISPLAY = "404-901-4619";
export const ADAM_PHONE_TEL = "+14049014619";
export const ALAN_PHONE_DISPLAY = "404-276-3184";
export const ALAN_PHONE_TEL = "+14042763184";

/** @deprecated Use ADAM_PHONE_DISPLAY */
export const SITE_PHONE_DISPLAY = ADAM_PHONE_DISPLAY;
/** @deprecated Use ADAM_PHONE_TEL */
export const SITE_PHONE_TEL = ADAM_PHONE_TEL;

export const BOOKING_MAILTO_GREETING = "Hi Adam and Alan,";

export function buildBookingMailtoLink(body: string): string {
  const params = new URLSearchParams({
    cc: ALAN_EMAIL,
    subject: `Tutoring inquiry: ${SITE_BRAND_NAME}`,
    body: `${BOOKING_MAILTO_GREETING}\n\n${body}`,
  });
  return `mailto:${ADAM_EMAIL}?${params.toString()}`;
}
