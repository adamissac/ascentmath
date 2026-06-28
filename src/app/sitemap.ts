import type { MetadataRoute } from "next";
import { GRADES } from "../data/units";
import { absoluteUrl } from "../lib/site-url";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: absoluteUrl("/"), lastModified: now, changeFrequency: "weekly", priority: 1 },
    {
      url: absoluteUrl("/mathematics/find-your-start"),
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: absoluteUrl("/mathematics/curriculum-frameworks"),
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    { url: absoluteUrl("/privacy"), lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: absoluteUrl("/terms"), lastModified: now, changeFrequency: "yearly", priority: 0.3 },
  ];

  const gradeRoutes: MetadataRoute.Sitemap = GRADES.flatMap((g) => {
    const gradeEntry: MetadataRoute.Sitemap[number] = {
      url: absoluteUrl(`/mathematics/${g.slug}`),
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.85,
    };

    const unitRoutes = g.units.flatMap((u) => {
      const unitEntry: MetadataRoute.Sitemap[number] = {
        url: absoluteUrl(`/mathematics/${g.slug}/${u.slug}`),
        lastModified: now,
        changeFrequency: "monthly",
        priority: 0.75,
      };

      const topicRoutes = u.topics.map((t) => ({
        url: absoluteUrl(`/mathematics/${g.slug}/${u.slug}/${t.slug}`),
        lastModified: now,
        changeFrequency: "monthly" as const,
        priority: 0.7,
      }));

      return [unitEntry, ...topicRoutes];
    });

    return [gradeEntry, ...unitRoutes];
  });

  return [...staticRoutes, ...gradeRoutes];
}
