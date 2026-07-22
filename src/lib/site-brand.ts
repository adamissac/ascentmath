/** Canonical site brand — single source of truth for UI, metadata, and emails. */
export const SITE_BRAND_WORDS = ["Ascent", "Math"] as const;
export const SITE_BRAND_NAME = SITE_BRAND_WORDS.join(" ");
export const SITE_BRAND_TAGLINE = "Math Tutors (K-5 through College)";
/** Transparent navbar/auth logo (generated from public/logo-source2.png). */
export const SITE_LOGO_PATH = "/ascent-logo.png";
/** Bump when favicon/logo assets change to bust browser cache. */
export const SITE_ICON_VERSION = "6";
