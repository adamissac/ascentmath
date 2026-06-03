import type { Metadata } from "next";
import Link from "next/link";
import Container from "../../components/Container";
import Section from "../../components/Section";
import Breadcrumbs from "../../components/Breadcrumbs";
import ColorBand from "../../components/ColorBand";
import Reveal from "../../components/Reveal";

export const metadata: Metadata = {
  title: "About",
  description:
    "Adam Issac is a math tutor and creator of Adam's Alphabet: paid 1-on-1 tutoring in three tiers (K-6, middle school, high school & college) with rates confirmed on call or email, plus free Grades 6-8 study paths.",
};

export default function AboutPage() {
  return (
    <>
      <div className="border-b border-[var(--color-border)] bg-[#FBFAF7]">
        <Container size="lg" className="py-5 sm:py-6">
          <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "About" }]} />
        </Container>
      </div>

      <ColorBand variant="brand" size="sm" containerSize="md" reveal={false}>
        <Reveal variant="up-lg">
          <p className="caption font-semibold tracking-wider uppercase text-[var(--color-accent-300)]">
            The mission
          </p>
          <p className="font-display mt-4 text-2xl font-medium leading-[1.3] tracking-[-0.01em] text-white sm:text-3xl lg:text-4xl">
            Help students get unstuck with{" "}
            <span className="text-[var(--color-accent-300)]">paid 1-on-1 tutoring</span> first, and
            free self-paced Grades 6-8 paths when they want to practice on their own.
          </p>
        </Reveal>
      </ColorBand>

      <Section tone="muted" size="sm" containerSize="xl" decorated="muted" decoratedDensity="medium">
        <div className="grid items-start gap-8 lg:grid-cols-12 lg:gap-14">
          <Reveal variant="left" className="lg:col-span-3 lg:pr-6 xl:pr-8">
            <p className="eyebrow">How it grew</p>
            <h2 className="h2 mt-3">From a nickname to a curriculum.</h2>
            <p className="small mt-4 leading-relaxed text-[var(--color-ink-muted)]">
              A short timeline of how Adam&apos;s Alphabet became what it is today.
            </p>
          </Reveal>
          <div className="lg:col-span-9">
            <Reveal stagger variant="up">
              <ol className="timeline" role="list">
                <Milestone
                  tag="Sophomore year"
                  title="The first nickname"
                  body={'Friends start calling me "math tutor" after I help out before exams. The phrase becomes the seed for what I\'d build next.'}
                />
                <Milestone
                  tag="Summer between"
                  title="Two students. One kitchen table."
                  body="I start tutoring two family-friend kids - 6th and 8th grade - at a kitchen table. Watching their confidence grow week over week is the moment this stops being a favor and starts being a project."
                />
                <Milestone
                  tag="Junior year"
                  title="The site goes live"
                  body="Adam's Alphabet launches with the first three units of Grade 6 math - written for the students who can't afford private tutoring."
                />
                <Milestone
                  tag="Now"
                  title="Three grades of free self-paced paths"
                  body="All of Grades 6, 7, and 8 published, 20 units with hand-picked videos, worksheets, and quizzes for students working on their own. Tutoring has grown to 30+ students across 10+ counties, with the site supporting learners online too."
                />
                <Milestone
                  tag="Next"
                  title="Recording, refining, expanding"
                  body="I'm recording original walkthroughs, writing new worksheets, and deepening practice across all three grades - based on what real students keep asking about."
                  last
                />
              </ol>
            </Reveal>
          </div>
        </div>
      </Section>

    </>
  );
}

function Milestone({
  tag,
  title,
  body,
  last,
}: {
  tag: string;
  title: string;
  body: string;
  last?: boolean;
}) {
  return (
    <li className={`timeline__item ${last ? "pb-0" : ""}`}>
      <p className="caption font-semibold tracking-wider uppercase text-[var(--color-brand-600)]">{tag}</p>
      <h3 className="h3 mt-2">{title}</h3>
      <p className="small text-[var(--color-ink-muted)] mt-2 max-w-2xl leading-relaxed">{body}</p>
    </li>
  );
}
