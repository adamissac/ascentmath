import { SITE_BRAND_NAME } from "./site-brand";
import { absoluteUrl, SITE_URL } from "./site-url";

/** Short list for metadata — avoid keyword stuffing. */
export const SEO_KEYWORDS = [
  SITE_BRAND_NAME,
  "math tutoring",
  "Adam Issac",
  "Alan Mozhoor",
  "Georgia Tech math tutor",
  "online math tutor",
] as const;

/** Homepage / default meta description — includes brand + tutor full names for search snippets. */
export const SEO_HOME_DESCRIPTION =
  "1-on-1 online math tutoring (K-5 through college) by two Georgia Tech Math+CS students. First session free for new clients. Plus free self-paced Grades 6–8 study paths — no account needed.";

export const SEO_SITE_URL = SITE_URL;

export function tutorPhotoUrl(filename: "adampic.jpg" | "alanpic.jpg"): string {
  return absoluteUrl(`/${filename}`);
}
