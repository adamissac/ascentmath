import {
  ADAM_EMAIL,
  ALAN_EMAIL,
  ADAM_PHONE_TEL,
  ALAN_PHONE_TEL,
} from "../data/site-team";
import { SITE_BRAND_NAME } from "../lib/site-brand";
import { absoluteUrl } from "../lib/site-url";
import { SEO_HOME_DESCRIPTION } from "../lib/seo";

const SITE_ID = `${absoluteUrl("/")}#website`;
const ORG_ID = `${absoluteUrl("/")}#organization`;

/** Site-wide Organization + WebSite JSON-LD (invisible). */
export default function SiteJsonLd() {
  const organization = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    "@id": ORG_ID,
    name: SITE_BRAND_NAME,
    alternateName: ["Ascent Math tutoring", "joinascentmath.com"],
    url: absoluteUrl("/"),
    logo: absoluteUrl("/ascent-logo.png"),
    description: SEO_HOME_DESCRIPTION,
    founder: [
      { "@type": "Person", name: "Adam Issac", "@id": `${absoluteUrl("/")}#adam-issac` },
      { "@type": "Person", name: "Alan Mozhoor", "@id": `${absoluteUrl("/")}#alan-mozhoor` },
    ],
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "customer service",
        telephone: ADAM_PHONE_TEL,
        email: ADAM_EMAIL,
      },
      {
        "@type": "ContactPoint",
        contactType: "customer service",
        telephone: ALAN_PHONE_TEL,
        email: ALAN_EMAIL,
      },
    ],
    areaServed: [
      { "@type": "State", name: "Georgia" },
      { "@type": "Country", name: "United States" },
    ],
  };

  const website = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": SITE_ID,
    name: SITE_BRAND_NAME,
    alternateName: ["joinascentmath.com"],
    url: absoluteUrl("/"),
    publisher: { "@id": ORG_ID },
    inLanguage: "en-US",
  };

  const graph = {
    "@context": "https://schema.org",
    "@graph": [organization, website],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }}
    />
  );
}
