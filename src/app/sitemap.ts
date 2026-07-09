import type { MetadataRoute } from "next";
import { GRADES } from "../data/units";
import { absoluteUrl } from "../lib/site-url";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: absoluteUrl("/"), changeFrequency: "weekly", priority: 1 },
    {
      url: absoluteUrl("/mathematics"),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: absoluteUrl("/mathematics/find-your-start"),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: absoluteUrl("/mathematics/curriculum-frameworks"),
      changeFrequency: "monthly",
      priority: 0.4,
    },
    { url: absoluteUrl("/privacy"), changeFrequency: "yearly", priority: 0.2 },
    { url: absoluteUrl("/terms"), changeFrequency: "yearly", priority: 0.2 },
  ];

  const gradeRoutes: MetadataRoute.Sitemap = GRADES.flatMap((g) => {
    const gradeEntry: MetadataRoute.Sitemap[number] = {
      url: absoluteUrl(`/mathematics/${g.slug}`),
      changeFrequency: "monthly",
      priority: 0.9,
    };

    const unitRoutes = g.units.flatMap((u) => {
      const unitEntry: MetadataRoute.Sitemap[number] = {
        url: absoluteUrl(`/mathematics/${g.slug}/${u.slug}`),
        changeFrequency: "monthly",
        priority: 0.8,
      };

      const topicRoutes = u.topics.map((t) => ({
        url: absoluteUrl(`/mathematics/${g.slug}/${u.slug}/${t.slug}`),
        changeFrequency: "monthly" as const,
        priority: 0.7,
      }));

      return [unitEntry, ...topicRoutes];
    });

    return [gradeEntry, ...unitRoutes];
  });

  return [...staticRoutes, ...gradeRoutes];
}
