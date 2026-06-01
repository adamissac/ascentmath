import { GRADES } from "./units";

export type TopicSearchHit = {
  href: string;
  title: string;
  summary: string;
  gradeTitle: string;
  unitTitle: string;
  keywords: string;
};

/** Extra words students might search that do not appear in titles. */
const ALIASES: Record<string, string[]> = {
  gcf: ["factors", "multiples", "gcf", "lcm"],
  lcm: ["factors", "multiples", "gcf", "lcm"],
  gcd: ["factors", "gcf"],
  slope: ["linear", "functions", "graph"],
  fraction: ["fractions", "rational"],
  percent: ["proportional", "ratios", "percent"],
  equation: ["equations", "expressions", "linear"],
  area: ["geometry", "area", "volume", "surface"],
  volume: ["geometry", "volume", "surface"],
  pythagorean: ["pythagorean", "theorem", "geometry"],
  exponent: ["exponents", "properties"],
};

function topicKeywords(
  title: string,
  summary: string,
  unitTitle: string,
  unitShort: string,
  topicSlug: string,
  vocab?: { term: string }[]
): string {
  const parts = [
    title,
    summary,
    unitTitle,
    unitShort,
    topicSlug.replace(/-/g, " "),
    ...(vocab?.map((v) => v.term) ?? []),
  ];
  const base = parts.join(" ").toLowerCase();
  const extras: string[] = [];
  for (const [key, values] of Object.entries(ALIASES)) {
    if (base.includes(key) || title.toLowerCase().includes(key) || summary.toLowerCase().includes(key)) {
      extras.push(...values);
    }
  }
  return `${base} ${extras.join(" ")}`.trim();
}

let _index: TopicSearchHit[] | null = null;

export function getTopicSearchIndex(): TopicSearchHit[] {
  if (_index) return _index;
  _index = GRADES.flatMap((g) =>
    g.units.flatMap((u) =>
      u.topics.map((t) => ({
        href: `/mathematics/${g.slug}/${u.slug}/${t.slug}`,
        title: t.title,
        summary: t.summary,
        gradeTitle: g.title,
        unitTitle: `Unit ${u.number}: ${u.title}`,
        keywords: topicKeywords(t.title, t.summary, u.title, u.short, t.slug, u.vocabulary),
      }))
    )
  );
  return _index;
}

export function searchTopics(query: string, limit = 12): TopicSearchHit[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  const terms = q.split(/\s+/).filter(Boolean);
  const index = getTopicSearchIndex();

  const scored = index
    .map((hit) => {
      let score = 0;
      for (const term of terms) {
        if (hit.title.toLowerCase().includes(term)) score += 4;
        if (hit.keywords.includes(term)) score += 2;
        if (hit.summary.toLowerCase().includes(term)) score += 1;
      }
      return { hit, score };
    })
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score);

  return scored.slice(0, limit).map((x) => x.hit);
}
