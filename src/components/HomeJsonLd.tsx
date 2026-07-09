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
import { SEO_HOME_DESCRIPTION, tutorPhotoUrl } from "../lib/seo";

const GEORGIA_TECH = {
  "@type": "CollegeOrUniversity",
  name: "Georgia Institute of Technology",
} as const;

const SITE_ID = `${absoluteUrl("/")}#website`;
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
  const organization = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    "@id": ORG_ID,
    name: SITE_BRAND_NAME,
    alternateName: ["Ascent Math tutoring", "joinascentmath.com"],
    url: absoluteUrl("/"),
    logo: absoluteUrl("/ascent-logo.png"),
    description: SEO_HOME_DESCRIPTION,
    telephone: [ADAM_PHONE_TEL, ALAN_PHONE_TEL],
    email: [ADAM_EMAIL, ALAN_EMAIL],
    founder: [
      tutorPerson({
        name: "Adam Issac",
        email: ADAM_EMAIL,
        phone: ADAM_PHONE_TEL,
        image: tutorPhotoUrl("adampic.jpg"),
      }),
      tutorPerson({
        name: "Alan Mozhoor",
        email: ALAN_EMAIL,
        phone: ALAN_PHONE_TEL,
        image: tutorPhotoUrl("alanpic.jpg"),
      }),
    ],
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
    description: SITE_POSITIONING,
    publisher: { "@id": ORG_ID },
    inLanguage: "en-US",
  };

  const tutoringService = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Math tutoring",
    serviceType: "Math tutoring",
    provider: { "@id": ORG_ID },
    description:
      "Paid 1-on-1 online math tutoring over Zoom across four tiers: Elementary (K-5), Middle school (6-8), High school + SAT/ACT (9-12), and College / dual enrollment. First session free for new clients. Free Grades 6-8 study paths also available with no account.",
    areaServed: [
      { "@type": "State", name: "Georgia" },
      { "@type": "Country", name: "United States" },
    ],
    audience: {
      "@type": "EducationalAudience",
      educationalRole: "student",
    },
    availableChannel: {
      "@type": "ServiceChannel",
      serviceUrl: absoluteUrl("/#book-session"),
      serviceType: "online",
    },
  };

  const tutors = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: TUTOR_NAMES,
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        item: tutorPerson({
          name: "Adam Issac",
          email: ADAM_EMAIL,
          phone: ADAM_PHONE_TEL,
          image: tutorPhotoUrl("adampic.jpg"),
        }),
      },
      {
        "@type": "ListItem",
        position: 2,
        item: tutorPerson({
          name: "Alan Mozhoor",
          email: ALAN_EMAIL,
          phone: ALAN_PHONE_TEL,
          image: tutorPhotoUrl("alanpic.jpg"),
        }),
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(website) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organization) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(tutoringService) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(tutors) }}
      />
    </>
  );
}
