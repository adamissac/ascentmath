/** Sitewide banner — toggle or edit copy here. Bump `id` when the message changes. */
export const SITE_ANNOUNCEMENT = {
  enabled: true,
  id: "summer-2026",
  message: "Now taking new students for summer math prep, get ahead for next school year.",
  /** Hide again for this many days after someone taps X (common promo-bar default). */
  dismissDays: 7,
} as const;

export const SITE_ANNOUNCEMENT_STORAGE_KEY = "ascent-announcement-dismissed";
