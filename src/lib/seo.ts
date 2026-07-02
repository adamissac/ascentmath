import { TUTOR_NAMES } from "../data/site-team";
import { SITE_BRAND_NAME } from "./site-brand";
import { absoluteUrl, SITE_URL } from "./site-url";

/** Terms people search when looking for tutoring — used in metadata (not hidden). */
export const SEO_KEYWORDS = [
  SITE_BRAND_NAME,
  "Ascent Math tutoring",
  "Adam Issac",
  "Alan Mozhoor",
  "Adam Issac math tutor",
  "Alan Mozhoor math tutor",
  TUTOR_NAMES,
  "adamsalphabet.com",
  "math tutor",
  "math tutoring",
  "Georgia Tech math tutor",
  "Atlanta math tutor",
  "online math tutor",
  "SAT math tutor",
  "ACT math tutor",
  "AP calculus tutor",
  "AP pre-calculus tutor",
  "linear algebra tutor",
  "multivariable calculus tutor",
  "K-5 math tutor",
  "middle school math tutor",
  "high school math tutor",
] as const;

/** Homepage / default meta description — includes brand + tutor full names for search snippets. */
export const SEO_HOME_DESCRIPTION =
  "Ascent Math — paid 1-on-1 math tutoring with Adam Issac and Alan Mozhoor (Math + CS @ Georgia Tech). K-5 through college, SAT/ACT, and AP math. First session free for new clients. Free Grades 6-8 study paths on adamsalphabet.com.";

export const SEO_SITE_URL = SITE_URL;

export function tutorPhotoUrl(filename: "adampic.jpg" | "alanpic.jpg"): string {
  return absoluteUrl(`/${filename}`);
}
