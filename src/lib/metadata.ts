import type { Metadata } from "next";
import { SITE_POSITIONING } from "../data/site-copy";
import { TUTOR_NAMES_SHORT } from "../data/site-team";
import { SITE_BRAND_NAME, SITE_BRAND_TAGLINE } from "./site-brand";
import { absoluteUrl, SITE_URL } from "./site-url";

const DEFAULT_OG_IMAGE = absoluteUrl("/og-image.png");

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
      ? `${SITE_BRAND_NAME} - ${SITE_BRAND_TAGLINE} · ${TUTOR_NAMES_SHORT}`
      : `${title} · ${SITE_BRAND_NAME}`;

  return {
    title,
    description,
    alternates: { canonical: url },
    robots: index ? { index: true, follow: true } : { index: false, follow: false },
    openGraph: {
      title: ogTitle,
      description,
      url,
      siteName: SITE_BRAND_NAME,
      type: "website",
      locale: "en_US",
      images: [{ url: DEFAULT_OG_IMAGE, width: 1200, height: 630, alt: `${SITE_BRAND_NAME} logo` }],
    },
    twitter: {
      card: "summary_large_image",
      title: ogTitle,
      description,
      images: [DEFAULT_OG_IMAGE],
    },
  };
}

const HOME_TITLE = `${SITE_BRAND_NAME} - ${SITE_BRAND_TAGLINE}`;

/** Root layout defaults — homepage positioning copy. */
export const ROOT_METADATA: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: HOME_TITLE,
    template: `%s · ${SITE_BRAND_NAME}`,
  },
  description: SITE_POSITIONING,
  keywords: [
    "Ascent Math",
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
    title: `${SITE_BRAND_NAME} - ${SITE_BRAND_TAGLINE} · ${TUTOR_NAMES_SHORT}`,
    description: SITE_POSITIONING,
    url: absoluteUrl("/"),
    siteName: SITE_BRAND_NAME,
    type: "website",
    locale: "en_US",
    images: [{ url: DEFAULT_OG_IMAGE, width: 1200, height: 630, alt: `${SITE_BRAND_NAME} logo` }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_BRAND_NAME} - ${SITE_BRAND_TAGLINE} · ${TUTOR_NAMES_SHORT}`,
    description: SITE_POSITIONING,
    images: [DEFAULT_OG_IMAGE],
  },
};
