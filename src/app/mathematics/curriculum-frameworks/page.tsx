import type { Metadata } from "next";
import Section from "../../../components/Section";
import Badge from "../../../components/Badge";
import Breadcrumbs from "../../../components/Breadcrumbs";
import SectionHeader from "../../../components/SectionHeader";
import ResourceLinkCard from "../../../components/ResourceLinkCard";
import { DocSymbol } from "../../../components/UnitSymbol";
import { GRADES } from "../../../data/units";
import { STUDY_PATHS_HREF } from "../../../lib/site-paths";

export const metadata: Metadata = {
  title: "GADOE Curriculum Frameworks",
  description:
    "Official Georgia Department of Education curriculum frameworks for Grade 6, 7, and 8 Mathematics units.",
};

export default function FrameworksPage() {
  const gradesWithFrameworks = GRADES.map((g) => ({
    grade: g,
    frameworks: g.units.filter((u) => !!u.frameworkUrl),
  })).filter((entry) => entry.frameworks.length > 0);

  return (
    <>
      <Section tone="hero" size="lg" containerSize="lg">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Mathematics", href: STUDY_PATHS_HREF },
            { label: "Curriculum frameworks" },
          ]}
        />
        <div className="mt-6 max-w-3xl">
          <Badge tone="brand" className="mb-4">Reference</Badge>
          <h1 className="h-display">GADOE curriculum frameworks</h1>
          <p className="lede mt-5">
            Official Georgia Department of Education unit frameworks. Use them to
            see what teachers are aiming for in each unit - useful for planning,
            tutors, and students who want the full picture.
          </p>
        </div>
      </Section>

      <Section tone="default" size="md" containerSize="lg">
        {gradesWithFrameworks.length > 0 ? (
          <div className="grid gap-12">
            {gradesWithFrameworks.map(({ grade, frameworks }) => (
              <div key={grade.slug}>
                <SectionHeader eyebrow={grade.title} title="Open any framework" />
                <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {frameworks.map((u) => (
                    <ResourceLinkCard
                      key={u.id}
                      href={u.frameworkUrl as string}
                      title={`Unit ${u.number}: ${u.title}`}
                      description="GADOE official curriculum framework PDF"
                      source="GADOE"
                      icon={<DocSymbol className="w-10 h-10" />}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-[var(--color-ink-muted)]">Frameworks will appear here as they are added.</p>
        )}
      </Section>

      <Section tone="muted" size="md" containerSize="md">
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <SectionHeader
              eyebrow="What are these?"
              title="Curriculum frameworks, explained"
            />
            <p className="mt-4 text-[var(--color-ink)] leading-relaxed">
              Frameworks are the official documents Georgia teachers use to plan
              instruction. They explain what students should learn in each unit,
              what assessments look like, and how the unit ties into the bigger
              standards.
            </p>
          </div>
          <div>
            <h2 className="h3">How to use them</h2>
            <ul className="mt-4 grid gap-2.5 small">
              {[
                "Skim the objectives before starting a unit.",
                "Use the vocabulary list to study key terms.",
                "Look at sample tasks to know what mastery looks like.",
                "Find topics you want to double-check with extra practice.",
              ].map((t) => (
                <li key={t} className="flex items-start gap-2">
                  <span aria-hidden className="text-[var(--color-brand-600)]">•</span>
                  <span className="text-[var(--color-ink)]">{t}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

    </>
  );
}
