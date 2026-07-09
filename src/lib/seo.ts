import { absoluteUrl, SITE_URL } from "./site-url";

/** Homepage / default meta description — no old-domain references. */
export const SEO_HOME_DESCRIPTION =
  "1-on-1 online math tutoring with Adam Issac and Alan Mozhoor (Math + CS @ Georgia Tech). K-5 through college, SAT/ACT, and AP. First session free for new clients, plus free Grades 6-8 study paths. No account needed.";

export const SEO_SITE_URL = SITE_URL;

export function tutorPhotoUrl(filename: "adampic.jpg" | "alanpic.jpg"): string {
  return absoluteUrl(`/${filename}`);
}
