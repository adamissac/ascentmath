/**
 * Shared business identity for Adam's Alphabet (Adam & Alan).
 */

export const SITE_BRAND_NAME = "Adam's Alphabet";

export const TUTOR_NAMES = "Adam Issac & Alan Mozhoor";
export const TUTOR_NAMES_SHORT = "Adam & Alan";

export const ADAM_EMAIL = "adamissac08@gmail.com";
export const ALAN_EMAIL = "alanmozhoor@gmail.com";

export const TUTOR_EMAILS = [ADAM_EMAIL, ALAN_EMAIL] as const;

export const TUTOR_EMAILS_DISPLAY = TUTOR_EMAILS.join(" · ");

export const BUSINESS_BYLINE = `${TUTOR_NAMES_SHORT} · Math tutors · Atlanta area & online`;

export const REPLY_TIME_LINE = "We reply within 1–2 days.";

/** Business phone — shown in footer and credentials; used in JSON-LD. */
export const SITE_PHONE_DISPLAY = "404-901-4619";
export const SITE_PHONE_TEL = "+14049014619";

export const BOOKING_MAILTO_GREETING = "Hi Adam and Alan,";

export function buildBookingMailtoLink(body: string): string {
  const params = new URLSearchParams({
    cc: ALAN_EMAIL,
    subject: "Tutoring inquiry — Adam's Alphabet",
    body: `${BOOKING_MAILTO_GREETING}\n\n${body}`,
  });
  return `mailto:${ADAM_EMAIL}?${params.toString()}`;
}
