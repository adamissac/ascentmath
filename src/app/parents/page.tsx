import type { Metadata } from "next";
import Link from "next/link";
import Container from "../../components/Container";
import Section from "../../components/Section";
import Badge from "../../components/Badge";
import Breadcrumbs from "../../components/Breadcrumbs";
import Button from "../../components/Button";
import FloatingMathCanvas from "../../components/FloatingMathCanvas";
import ColorBand from "../../components/ColorBand";
import Reveal from "../../components/Reveal";

export const metadata: Metadata = {
  title: "For parents & teachers",
  description:
    "Plain-language guide for parents and teachers - how to use Adam's Alphabet to help a student with middle-school math.",
};

const STEPS = [
  {
    title: "Pick the right grade",
    body: "Start at Mathematics and choose Grade 6, 7, or 8. Each grade follows Georgia standards and the same layout, so navigation stays predictable.",
  },
  {
    title: "Use search or Find your start",
    body: "If you know the topic (e.g. “GCF” or “fractions”), search on the math library page. If you're not sure, the three-step Find your start wizard points to a unit and first lesson.",
  },
  {
    title: "Follow the four steps on each topic",
    body: "Every lesson is Read → Watch → Practice → Quick check. Students can do them in order or jump to the video if they're stuck on homework.",
  },
  {
    title: "Track progress locally",
    body: "Topic checkmarks save in the browser - no account required. For extra help, book a free 1-on-1 session with Adam.",
  },
];

export default function ParentsPage() {
  return (
    <>
      <section className="hero-surface relative overflow-hidden">
        <FloatingMathCanvas variant="grade" />
        <Container size="xl" className="relative pt-10 pb-14 sm:pb-16">
          <div className="flex justify-center">
            <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "For parents & teachers" }]} />
          </div>
          <Reveal className="mt-8 text-center max-w-3xl mx-auto" variant="up">
            <Badge tone="brand" className="mb-5">Parents &amp; teachers</Badge>
            <h1 className="h-display">Help your child without re-learning the whole book.</h1>
            <p className="lede mt-5 mx-auto max-w-[54ch]">
              Adam&apos;s Alphabet is built in plain language with a clear structure - so you can
              sit beside a student, find the right lesson in minutes, and know what to do next.
            </p>
          </Reveal>
        </Container>
      </section>

      <Section tone="muted" size="md" containerSize="lg" decorated="muted" decoratedDensity="medium" reveal={false}>
        <Reveal>
          <p className="eyebrow">How to use this site</p>
          <h2 className="h2 mt-2">Four steps that stay the same every time.</h2>
        </Reveal>
        <ol className="mt-8 grid gap-4 sm:grid-cols-2">
          {STEPS.map((s, i) => (
            <li key={s.title} className="card p-6">
              <span className="font-display font-bold text-[var(--color-brand-600)] tabular-nums">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="font-display font-semibold text-lg mt-3 text-[var(--color-ink)]">{s.title}</h3>
              <p className="small text-[var(--color-ink-muted)] mt-2 leading-relaxed">{s.body}</p>
            </li>
          ))}
        </ol>

        <div className="mt-8 flex flex-wrap gap-3">
          <Button href="/mathematics/find-your-start">Find your start</Button>
          <Button href="/mathematics" variant="outline">
            Browse the library
          </Button>
          <Button href="/mathematics/curriculum-frameworks" variant="ghost">
            GADOE frameworks
          </Button>
        </div>
      </Section>

      <Section tone="default" size="sm" containerSize="md" reveal={false}>
        <div className="card p-6 sm:p-8">
          <h2 className="h3">What each part of a lesson includes</h2>
          <dl className="mt-5 grid gap-4">
            <div>
              <dt className="font-semibold text-[var(--color-ink)]">Walkthrough</dt>
              <dd className="small text-[var(--color-ink-muted)] mt-1 leading-relaxed">
                Short explanation with a worked example - good for you to skim before helping.
              </dd>
            </div>
            <div>
              <dt className="font-semibold text-[var(--color-ink)]">Video</dt>
              <dd className="small text-[var(--color-ink-muted)] mt-1 leading-relaxed">
                Hand-picked from trusted teachers; often a second video if the first style doesn&apos;t click.
              </dd>
            </div>
            <div>
              <dt className="font-semibold text-[var(--color-ink)]">Practice &amp; quiz</dt>
              <dd className="small text-[var(--color-ink-muted)] mt-1 leading-relaxed">
                Printable worksheets and a short self-check with explanations - safe to retake.
              </dd>
            </div>
          </dl>
        </div>
      </Section>

      <ColorBand variant="dark" size="sm">
        <div className="grid md:grid-cols-12 gap-6 items-center">
          <div className="md:col-span-8">
            <h2 className="font-display font-bold text-2xl sm:text-3xl leading-[1.2]">
              Still stuck after the lesson?
            </h2>
            <p className="mt-2 text-white/75">
              Adam offers free 1-on-1 sessions - online or in-person in the Atlanta area.
            </p>
          </div>
          <div className="md:col-span-4 md:justify-self-end">
            <Link href="/book" className="btn btn-lg bg-white text-[var(--color-brand-700)] hover:bg-white/90">
              Book a session →
            </Link>
          </div>
        </div>
      </ColorBand>
    </>
  );
}
