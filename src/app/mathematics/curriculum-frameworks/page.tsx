import type { Metadata } from "next";

import Section from "../../../components/Section";

import Breadcrumbs from "../../../components/Breadcrumbs";

import Container from "../../../components/Container";

import SectionHeader from "../../../components/SectionHeader";

import ResourceLinkCard from "../../../components/ResourceLinkCard";

import Reveal from "../../../components/Reveal";

import StudyPathCta from "../../../components/StudyPathCta";

import { DocSymbol } from "../../../components/UnitSymbol";

import { GRADES } from "../../../data/units";

import { STUDY_PATHS_HREF } from "../../../lib/site-paths";

import { buildPageMetadata } from "../../../lib/metadata";



export const metadata: Metadata = buildPageMetadata({

  title: "GADOE Curriculum Frameworks",

  description:

    "Official Georgia Department of Education curriculum frameworks for Grade 6, 7, and 8 Mathematics units.",

  path: "/mathematics/curriculum-frameworks",

});



const CARD =

  "rounded-2xl border border-[rgba(26,26,46,0.08)] bg-white/85 p-6 shadow-[0_2px_12px_rgba(26,26,46,0.04)] backdrop-blur-sm sm:p-8";



export default function FrameworksPage() {

  const gradesWithFrameworks = GRADES.map((g) => ({

    grade: g,

    frameworks: g.units.filter((u) => !!u.frameworkUrl),

  })).filter((entry) => entry.frameworks.length > 0);



  return (

    <>

      <section className="border-b border-[var(--color-border)] bg-[var(--color-bg)]">

        <Container size="lg" className="pt-8 pb-10 sm:pt-10 sm:pb-12">

          <Breadcrumbs

            items={[

              { label: "Home", href: "/" },

              { label: "Mathematics", href: STUDY_PATHS_HREF },

              { label: "Curriculum frameworks" },

            ]}

          />

          <Reveal className="mt-6 sm:mt-8" variant="up">

            <div className={`${CARD} max-w-3xl`}>

              <p className="caption font-semibold uppercase tracking-[0.14em] text-[var(--color-brand-600)]">

                Reference

              </p>

              <h1 className="h-display mt-3 text-[var(--color-ink-cool)]">GADOE curriculum frameworks</h1>

              <p className="mt-4 text-[clamp(1rem,0.4vw+0.9rem,1.125rem)] leading-[1.7] text-[var(--color-ink-cool-muted)]">

                Official Georgia Department of Education unit frameworks. Use them to see what

                teachers are aiming for in each unit. Useful for planning, tutors, and students who

                want the full picture.

              </p>

            </div>

          </Reveal>

        </Container>

      </section>



      <Section tone="default" size="md" containerSize="lg" reveal={false}>

        {gradesWithFrameworks.length > 0 ? (

          <div className="grid gap-12">

            {gradesWithFrameworks.map(({ grade, frameworks }) => (

              <div key={grade.slug}>

                <SectionHeader eyebrow={grade.title} title="Open any framework" />

                <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">

                  {frameworks.map((u) => (

                    <ResourceLinkCard

                      key={u.id}

                      href={u.frameworkUrl as string}

                      title={`Unit ${u.number}: ${u.title}`}

                      description="GADOE official curriculum framework PDF"

                      source="GADOE"

                      icon={<DocSymbol className="h-10 w-10" />}

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



      <Section tone="default" size="md" containerSize="md" reveal={false}>

        <div className="grid gap-8 md:grid-cols-2">

          <div>

            <SectionHeader eyebrow="What are these?" title="Curriculum frameworks, explained" />

            <p className="mt-4 leading-relaxed text-[var(--color-ink)]">

              Frameworks are the official documents Georgia teachers use to plan instruction. They

              explain what students should learn in each unit, what assessments look like, and how

              the unit ties into the bigger standards.

            </p>

          </div>

          <div>

            <h2 className="h3">How to use them</h2>

            <ul className="small mt-4 grid gap-2.5">

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



      <StudyPathCta />

    </>

  );

}


