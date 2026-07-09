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
  hasPart,
}: {
  name: string;
  description: string;
  path: string;
  isAccessibleForFree?: boolean;
  educationalLevel?: string;
  hasPart?: { name: string; path: string }[];
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
    ...(educationalLevel ? { educationalLevel } : {}),
    ...(hasPart && hasPart.length > 0
      ? {
          hasPart: hasPart.map((p) => ({
            "@type": "Course",
            name: p.name,
            url: absoluteUrl(p.path),
            isAccessibleForFree,
          })),
        }
      : {}),
    inLanguage: "en-US",
  };
}

export function buildLearningResourceJsonLd({
  name,
  description,
  path,
  educationalLevel,
  timeRequiredMinutes,
  isAccessibleForFree = true,
  learningResourceType,
}: {
  name: string;
  description: string;
  path: string;
  educationalLevel: string;
  timeRequiredMinutes?: number;
  isAccessibleForFree?: boolean;
  learningResourceType?: string | string[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "LearningResource",
    name,
    description,
    url: absoluteUrl(path),
    provider: {
      "@type": "EducationalOrganization",
      name: SITE_BRAND_NAME,
      url: absoluteUrl("/"),
    },
    isAccessibleForFree,
    educationalLevel,
    ...(learningResourceType ? { learningResourceType } : {}),
    ...(typeof timeRequiredMinutes === "number" && timeRequiredMinutes > 0
      ? { timeRequired: `PT${timeRequiredMinutes}M` }
      : {}),
    inLanguage: "en-US",
  };
}
