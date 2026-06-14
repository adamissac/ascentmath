import type { Metadata } from "next";
import { SITE_POSITIONING } from "../data/site-copy";
import { TUTOR_NAMES_SHORT } from "../data/site-team";
import { absoluteUrl, SITE_URL } from "./site-url";

const DEFAULT_OG_IMAGE = absoluteUrl("/newLogo.png");

type PageMetadataInput = {
  title: string;
  description: string;
  /** Path starting with `/` — used for canonical and Open Graph URL. */
  path?: string;
  /** Set false to omit from sitemap-oriented pages like redirects. */
  index?: boolean;
};

/**
 * Per-page metadata with unique Open Graph, Twitter, and canonical URLs.
 * Root layout supplies site-wide defaults; call this from each route.
 */
export function buildPageMetadata({
  title,
  description,
  path = "/",
  index = true,
}: PageMetadataInput): Metadata {
  const url = absoluteUrl(path);
  const ogTitle =
    path === "/"
      ? `Adam's Alphabet - Math Tutors · ${TUTOR_NAMES_SHORT}`
      : `${title} · Adam's Alphabet`;

  return {
    title,
    description,
    alternates: { canonical: url },
    robots: index ? { index: true, follow: true } : { index: false, follow: false },
    openGraph: {
      title: ogTitle,
      description,
      url,
      siteName: "Adam's Alphabet",
      type: "website",
      locale: "en_US",
      images: [{ url: DEFAULT_OG_IMAGE, width: 256, height: 256, alt: "Adam's Alphabet logo" }],
    },
    twitter: {
      card: "summary_large_image",
      title: ogTitle,
      description,
      images: [DEFAULT_OG_IMAGE],
    },
  };
}

const HOME_TITLE = "Adam's Alphabet - Math Tutors (K-5 through College)";

/** Root layout defaults — homepage positioning copy. */
export const ROOT_METADATA: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: HOME_TITLE,
    template: "%s · Adam's Alphabet",
  },
  description: SITE_POSITIONING,
  keywords: [
    "math tutor",
    "math tutoring",
    "Adam and Alan math tutor",
    "SAT math tutor",
    "AP pre-calculus tutor",
    "AP calculus tutor",
    "linear algebra tutor",
    "multivariable calculus tutor",
    "Atlanta math tutor",
  ],
  alternates: { canonical: absoluteUrl("/") },
  openGraph: {
    title: `Adam's Alphabet - Math Tutors · ${TUTOR_NAMES_SHORT}`,
    description: SITE_POSITIONING,
    url: absoluteUrl("/"),
    siteName: "Adam's Alphabet",
    type: "website",
    locale: "en_US",
    images: [{ url: DEFAULT_OG_IMAGE, width: 256, height: 256, alt: "Adam's Alphabet logo" }],
  },
  twitter: {
    card: "summary_large_image",
    title: `Adam's Alphabet - Math Tutors · ${TUTOR_NAMES_SHORT}`,
    description: SITE_POSITIONING,
    images: [DEFAULT_OG_IMAGE],
  },
};
