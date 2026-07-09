import {
  ADAM_EMAIL,
  ALAN_EMAIL,
  ADAM_PHONE_TEL,
  ALAN_PHONE_TEL,
} from "../data/site-team";
import { SITE_BRAND_NAME } from "../lib/site-brand";
import { absoluteUrl } from "../lib/site-url";
import { SEO_HOME_DESCRIPTION, tutorPhotoUrl } from "../lib/seo";

const GEORGIA_TECH = {
  "@type": "CollegeOrUniversity",
  name: "Georgia Institute of Technology",
} as const;

const ORG_ID = `${absoluteUrl("/")}#organization`;

function tutorPerson({
  name,
  email,
  phone,
  image,
}: {
  name: string;
  email: string;
  phone: string;
  image: string;
}) {
  return {
    "@type": "Person",
    "@id": `${absoluteUrl("/")}#${name.toLowerCase().replace(/\s+/g, "-")}`,
    name,
    email,
    telephone: phone,
    image,
    url: absoluteUrl("/"),
    affiliation: GEORGIA_TECH,
    worksFor: { "@id": ORG_ID },
    jobTitle: "Math tutor & co-founder",
    knowsAbout: [
      "Mathematics tutoring",
      "SAT Math",
      "ACT Math",
      "AP Calculus",
      "AP Statistics",
      "Linear algebra",
      "Multivariable calculus",
    ],
  };
}

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
