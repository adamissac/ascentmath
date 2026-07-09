import { SITE_BRAND_NAME } from "./site-brand";
import { absoluteUrl } from "./site-url";

export type BreadcrumbItem = {
  label: string;
  href?: string;
};

/** Schema.org BreadcrumbList for curriculum and inner pages. */
export function buildBreadcrumbJsonLd(items: BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.label,
      ...(item.href ? { item: absoluteUrl(item.href) } : {}),
    })),
  };
}

export function buildCourseJsonLd({
  name,
  description,
  path,
  isAccessibleForFree = true,
  educationalLevel,
}: {
  name: string;
  description: string;
  path: string;
  isAccessibleForFree?: boolean;
  educationalLevel?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Course",
    name,
    description,
    url: absoluteUrl(path),
    provider: {
      "@type": "EducationalOrganization",
      name: SITE_BRAND_NAME,
      url: absoluteUrl("/"),
    },
    isAccessibleForFree,
    educationalLevel: educationalLevel ?? name,
    inLanguage: "en-US",
    hasCourseInstance: {
      "@type": "CourseInstance",
      courseMode: "online",
      courseWorkload: "PT1H",
    },
  };
}

export function buildLearningResourceJsonLd({
  name,
  description,
  path,
  educationalLevel,
  timeRequiredMinutes,
}: {
  name: string;
  description: string;
  path: string;
  educationalLevel: string;
  timeRequiredMinutes?: number;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "LearningResource",
    name,
    description,
    url: absoluteUrl(path),
    isAccessibleForFree: true,
    educationalLevel,
    learningResourceType: ["lesson", "practice", "quiz"],
    inLanguage: "en-US",
    provider: {
      "@type": "EducationalOrganization",
      name: SITE_BRAND_NAME,
      url: absoluteUrl("/"),
    },
    ...(timeRequiredMinutes
      ? { timeRequired: `PT${Math.max(1, Math.round(timeRequiredMinutes))}M` }
      : {}),
  };
}
