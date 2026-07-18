import {
  ADAM_EMAIL,
  ALAN_EMAIL,
  ADAM_PHONE_TEL,
  ALAN_PHONE_TEL,
  TUTOR_NAMES,
} from "../data/site-team";
import { absoluteUrl } from "../lib/site-url";
import { tutorPhotoUrl } from "../lib/seo";

const ORG_ID = `${absoluteUrl("/")}#organization`;

const GEORGIA_TECH = {
  "@type": "CollegeOrUniversity",
  name: "Georgia Institute of Technology",
} as const;

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

/** Homepage-only structured data (site-wide Org/WebSite live in SiteJsonLd). */
export default function HomeJsonLd() {
  const tutoringService = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Math tutoring",
    serviceType: "Math tutoring",
    provider: { "@id": ORG_ID },
    description:
      "Paid 1-on-1 online math tutoring over Zoom across four tiers: Elementary (K-5), Middle school (6-8), High school + SAT/ACT (9-12), and College / dual enrollment. Free consultation call for new clients. Free Grades 6-8 study paths also available with no account.",
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(tutoringService) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(tutors) }}
      />
    </>
  );
}
