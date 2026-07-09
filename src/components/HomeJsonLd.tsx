import { SITE_BRAND_NAME } from "../lib/site-brand";
import { absoluteUrl } from "../lib/site-url";
import { SEO_HOME_DESCRIPTION } from "../lib/seo";

const ORG_ID = `${absoluteUrl("/")}#organization`;

export default function HomeJsonLd() {
  const service = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${absoluteUrl("/")}#tutoring-service`,
    name: SITE_BRAND_NAME,
    url: absoluteUrl("/"),
    description: SEO_HOME_DESCRIPTION,
    serviceType: "Math tutoring",
    provider: { "@id": ORG_ID },
    areaServed: ["Georgia", "United States"],
    availableChannel: {
      "@type": "ServiceChannel",
      serviceUrl: absoluteUrl("/#book-session"),
      availableLanguage: ["en"],
    },
    audience: [
      { "@type": "EducationalAudience", educationalRole: "student" },
      { "@type": "EducationalAudience", educationalRole: "parent" },
    ],
    category: ["Online tutoring", "Math tutoring"],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(service) }}
      />
    </>
  );
}
