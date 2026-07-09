import type { Metadata } from "next";
import { TUTOR_NAMES_SHORT } from "../data/site-team";
import { SITE_BRAND_NAME, SITE_BRAND_TAGLINE, SITE_ICON_VERSION } from "./site-brand";
import { SEO_HOME_DESCRIPTION } from "./seo";
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
  icons: {
    icon: [
      { url: `/favicon-32.png?v=${SITE_ICON_VERSION}`, type: "image/png", sizes: "32x32" },
      { url: `/favicon.ico?v=${SITE_ICON_VERSION}`, sizes: "any" },
      { url: `/icon.png?v=${SITE_ICON_VERSION}`, type: "image/png", sizes: "512x512" },
    ],
    apple: [{ url: `/apple-icon.png?v=${SITE_ICON_VERSION}`, sizes: "180x180", type: "image/png" }],
    shortcut: `/favicon.ico?v=${SITE_ICON_VERSION}`,
  },
  manifest: "/site.webmanifest",
  title: {
    default: HOME_TITLE,
    template: `%s · ${SITE_BRAND_NAME}`,
  },
  description: SEO_HOME_DESCRIPTION,
  authors: [{ name: "Adam Issac" }, { name: "Alan Mozhoor" }],
  creator: SITE_BRAND_NAME,
  publisher: SITE_BRAND_NAME,
  alternates: { canonical: absoluteUrl("/") },
  openGraph: {
    title: `${SITE_BRAND_NAME} - ${SITE_BRAND_TAGLINE} · ${TUTOR_NAMES_SHORT}`,
    description: SEO_HOME_DESCRIPTION,
    url: absoluteUrl("/"),
    siteName: SITE_BRAND_NAME,
    type: "website",
    locale: "en_US",
    images: [{ url: DEFAULT_OG_IMAGE, width: 1200, height: 630, alt: `${SITE_BRAND_NAME} logo` }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_BRAND_NAME} - ${SITE_BRAND_TAGLINE} · ${TUTOR_NAMES_SHORT}`,
    description: SEO_HOME_DESCRIPTION,
    images: [DEFAULT_OG_IMAGE],
  },
};
