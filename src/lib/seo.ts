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
  "Ascent Math — paid 1-on-1 math tutoring with Adam Issac and Alan Mozhoor (Math + CS @ Georgia Tech). K-5 through college, SAT/ACT, and AP math. First session free for new clients. Free Grades 6-8 study paths on joinascentmath.com.";

export const SEO_SITE_URL = SITE_URL;

export function tutorPhotoUrl(filename: "adampic.jpg" | "alanpic.jpg"): string {
  return absoluteUrl(`/${filename}`);
}
