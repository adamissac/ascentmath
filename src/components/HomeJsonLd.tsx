import { SITE_POSITIONING } from "../data/site-copy";
import {
  ADAM_EMAIL,
  ALAN_EMAIL,
  ADAM_PHONE_TEL,
  ALAN_PHONE_TEL,
  TUTOR_NAMES,
} from "../data/site-team";
import { SITE_BRAND_NAME } from "../lib/site-brand";
import { absoluteUrl } from "../lib/site-url";

const GEORGIA_TECH = {
  "@type": "CollegeOrUniversity",
  name: "Georgia Institute of Technology",
} as const;

export default function HomeJsonLd() {
  const organization = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    name: SITE_BRAND_NAME,
    url: absoluteUrl("/"),
    description: SITE_POSITIONING,
    telephone: [ADAM_PHONE_TEL, ALAN_PHONE_TEL],
    email: [ADAM_EMAIL, ALAN_EMAIL],
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: ADAM_PHONE_TEL,
        contactType: "customer service",
        email: ADAM_EMAIL,
      },
      {
        "@type": "ContactPoint",
        telephone: ALAN_PHONE_TEL,
        contactType: "customer service",
        email: ALAN_EMAIL,
      },
    ],
    areaServed: {
      "@type": "City",
      name: "Atlanta",
      containedInPlace: { "@type": "State", name: "Georgia" },
    },
    founder: [
      {
        "@type": "Person",
        name: "Adam Issac",
        email: ADAM_EMAIL,
        affiliation: GEORGIA_TECH,
        jobTitle: "Math tutor & co-founder",
      },
      {
        "@type": "Person",
        name: "Alan Mozhoor",
        email: ALAN_EMAIL,
        affiliation: GEORGIA_TECH,
        jobTitle: "Math tutor & co-founder",
      },
    ],
  };

  const localBusiness = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: SITE_BRAND_NAME,
    url: absoluteUrl("/"),
    telephone: [ADAM_PHONE_TEL, ALAN_PHONE_TEL],
    description: SITE_POSITIONING,
    areaServed: "Atlanta, GA and online",
    priceRange: "$$",
  };

  const tutors = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: TUTOR_NAMES,
    itemListElement: [
      {
        "@type": "Person",
        name: "Adam Issac",
        jobTitle: "Math tutor & co-founder",
        email: ADAM_EMAIL,
        affiliation: GEORGIA_TECH,
      },
      {
        "@type": "Person",
        name: "Alan Mozhoor",
        jobTitle: "Math tutor & co-founder",
        email: ALAN_EMAIL,
        affiliation: GEORGIA_TECH,
      },
    ],
  };

  const contact = {
    "@context": "https://schema.org",
    "@type": "ContactPoint",
    telephone: [ADAM_PHONE_TEL, ALAN_PHONE_TEL],
    contactType: "customer service",
    email: [ADAM_EMAIL, ALAN_EMAIL],
    areaServed: "US",
    availableLanguage: "English",
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organization) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusiness) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(tutors) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contact) }}
      />
    </>
  );
}
