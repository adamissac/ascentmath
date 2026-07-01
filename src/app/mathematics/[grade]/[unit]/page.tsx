import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";

import LessonShell from "../../../../components/LessonShell";
import UnitDetailsPanel from "../../../../components/UnitDetailsPanel";
import UnitProgressPanel from "../../../../components/UnitProgressPanel";
import Reveal from "../../../../components/Reveal";
import StudyPathCta from "../../../../components/StudyPathCta";
import JsonLdScript from "../../../../components/JsonLdScript";

import { GRADES, getGrade, getUnit, getUnitIndex } from "../../../../data/units";
import { MATHEMATICS_HREF } from "../../../../lib/site-paths";
import { buildPageMetadata } from "../../../../lib/metadata";
import { buildBreadcrumbJsonLd, buildCourseJsonLd } from "../../../../lib/json-ld";

type Params = { grade: string; unit: string };

export function generateStaticParams() {
  return GRADES.flatMap((g) => g.units.map((u) => ({ grade: g.slug, unit: u.slug })));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { grade, unit } = await params;
  const g = getGrade(grade);
  const u = getUnit(grade, unit);
  if (!g || !u) return { title: "Unit not found" };
  return buildPageMetadata({
    title: `${g.title} · Unit ${u.number}: ${u.title}`,
    description: u.description,
    path: `/mathematics/${grade}/${unit}`,
  });
}

export default async function UnitPage({ params }: { params: Promise<Params> }) {
  const { grade, unit } = await params;
  const g = getGrade(grade);
  const u = getUnit(grade, unit);
  if (!g || !u) notFound();

  const idx = getUnitIndex(grade, unit);
  const prev = idx > 0 ? g.units[idx - 1] : null;
  const next = idx < g.units.length - 1 ? g.units[idx + 1] : null;
  const firstTopic = u.topics[0];
  const gradeHref = `/mathematics/${g.slug}`;
  const progressItems = u.topics.map((t) => ({ id: t.id, label: t.title }));
  const unitPath = `/mathematics/${g.slug}/${u.slug}`;
  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "Mathematics", href: MATHEMATICS_HREF },
    { label: g.title, href: gradeHref },
    { label: `Unit ${u.number}` },
  ];

  return (
    <>
      <JsonLdScript
        data={[
          buildBreadcrumbJsonLd(breadcrumbs),
          buildCourseJsonLd({
            name: `${g.title} Unit ${u.number}: ${u.title}`,
            description: u.description,
            path: unitPath,
          }),
        ]}
      />
      <LessonShell
        grade={g}
        unit={u}
        breadcrumbs={breadcrumbs}
        lessonMeta={`Unit ${u.number} · Overview`}
        title={u.title}
        description={u.description}
        estimatedMinutes={u.estimatedMinutes}
        nextHref={
          firstTopic ? `/mathematics/${g.slug}/${u.slug}/${firstTopic.slug}` : undefined
        }
        nextLabel={firstTopic ? `Start: ${firstTopic.title}` : undefined}
        backHref={gradeHref}
        backLabel="All units"
      >
        <Reveal>
          <UnitProgressPanel
            unitId={u.id}
            unitTitle={`Unit ${u.number}: ${u.title}`}
            items={progressItems}
          />
        </Reveal>

        <Reveal className="mt-6">
          <UnitDetailsPanel unit={u} />
        </Reveal>

        <Reveal className="mt-8 grid gap-3 border-t border-[var(--color-border)] pt-8 sm:grid-cols-2">
          {prev ? (
            <Link
              href={`/mathematics/${g.slug}/${prev.slug}`}
              className="lesson-nav-card"
            >
              <span className="block text-xs font-semibold uppercase tracking-wider text-[var(--color-ink-muted)]">
                Previous unit
              </span>
              <span className="mt-1 block font-semibold text-[var(--color-ink)]">← {prev.title}</span>
            </Link>
          ) : (
            <Link href={gradeHref} className="lesson-nav-card">
              ← {g.title} units
            </Link>
          )}
          {next ? (
            <Link
              href={`/mathematics/${g.slug}/${next.slug}`}
              className="lesson-nav-card sm:text-right"
            >
              <span className="block text-xs font-semibold uppercase tracking-wider text-[var(--color-ink-muted)]">
                Next unit
              </span>
              <span className="mt-1 block font-semibold text-[var(--color-ink)]">{next.title} →</span>
            </Link>
          ) : (
            <Link href={gradeHref} className="lesson-nav-card sm:text-right">
              Finished {g.title} →
            </Link>
          )}
        </Reveal>
      </LessonShell>

      <StudyPathCta />
    </>
  );
}
