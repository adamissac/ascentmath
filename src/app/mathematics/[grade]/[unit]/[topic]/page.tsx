import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";

import LessonShell from "../../../../../components/LessonShell";
import TopicLessonContent from "../../../../../components/TopicLessonContent";
import TopicCompleteToggle from "../../../../../components/TopicCompleteToggle";
import StudyPathCta from "../../../../../components/StudyPathCta";
import JsonLdScript from "../../../../../components/JsonLdScript";

import { GRADES, getTopic } from "../../../../../data/units";
import { MATHEMATICS_HREF } from "../../../../../lib/site-paths";
import { buildPageMetadata } from "../../../../../lib/metadata";
import { buildBreadcrumbJsonLd, buildLearningResourceJsonLd } from "../../../../../lib/json-ld";

type Params = { grade: string; unit: string; topic: string };

export function generateStaticParams() {
  return GRADES.flatMap((g) =>
    g.units.flatMap((u) => u.topics.map((t) => ({ grade: g.slug, unit: u.slug, topic: t.slug })))
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { grade, unit, topic } = await params;
  const found = getTopic(grade, unit, topic);
  if (!found) return { title: "Topic not found" };
  const gradeNum = found.grade.title.replace(/^Grade\s+/i, "");
  return buildPageMetadata({
    title: `${found.topic.title} — Grade ${gradeNum} Math Lesson, Video & Practice`,
    description:
      found.topic.summary.length > 155
        ? `${found.topic.summary.slice(0, 152).trim()}…`
        : `${found.topic.summary} Free lesson, four videos, practice, and quiz — no account needed.`,
    path: `/mathematics/${grade}/${unit}/${topic}`,
  });
}

export default async function TopicPage({ params }: { params: Promise<Params> }) {
  const { grade, unit, topic } = await params;
  const found = getTopic(grade, unit, topic);
  if (!found) notFound();

  const { grade: g, unit: u, topic: t, index, next } = found;
  const unitHref = `/mathematics/${g.slug}/${u.slug}`;
  const gradeHref = `/mathematics/${g.slug}`;
  const progressItems = u.topics.map((tp) => ({ id: tp.id, label: tp.title }));
  const topicPath = `/mathematics/${g.slug}/${u.slug}/${t.slug}`;
  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "Mathematics", href: MATHEMATICS_HREF },
    { label: g.title, href: gradeHref },
    { label: `Unit ${u.number}`, href: unitHref },
    { label: t.title },
  ];

  return (
    <>
      <JsonLdScript
        data={[
          buildBreadcrumbJsonLd(breadcrumbs),
          buildLearningResourceJsonLd({
            name: t.title,
            description: t.summary,
            path: topicPath,
            educationalLevel: g.title,
            timeRequiredMinutes: t.estimatedMinutes,
          }),
        ]}
      />
      <LessonShell
      grade={g}
      unit={u}
      topic={t}
      breadcrumbs={breadcrumbs}
      lessonMeta={`Unit ${u.number} · Topic ${index + 1}`}
      title={t.title}
      description={t.summary}
      estimatedMinutes={t.estimatedMinutes}
      nextHref={next ? `${unitHref}/${next.slug}` : undefined}
      nextLabel={next ? `Next: ${next.title}` : undefined}
      backHref={gradeHref}
      backLabel="All units"
      headerActions={
        <>
          <TopicCompleteToggle unitId={u.id} topicId={t.id} items={progressItems} />
          <Link href={unitHref} className="btn btn-ghost btn-sm">
            Unit overview
          </Link>
        </>
      }
    >
      <TopicLessonContent topic={t} />
    </LessonShell>
    <StudyPathCta />
    </>
  );
}
