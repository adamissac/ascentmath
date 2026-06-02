import Link from "next/link";
import Section from "../components/Section";
import Button from "../components/Button";
import ColorBand from "../components/ColorBand";
import Reveal from "../components/Reveal";
import HeroSection from "../components/HeroSection";
import { GRADES, countUnitVideos } from "../data/units";

const ALL_UNITS = GRADES.flatMap((g) => g.units);

export default function Home() {
  const totalVideos = ALL_UNITS.reduce((s, u) => s + countUnitVideos(u), 0);
  const totalUnits = ALL_UNITS.length;

  return (
    <>
      <HeroSection totalUnits={totalUnits} totalVideos={totalVideos} />

      {/* ================================================================
          HOW IT WORKS - 4 numbered step cards
          12-col layout: brief on left (col-span-4), step cards on right (col-span-8)
          ================================================================ */}
      <Section tone="muted" size="sm" containerSize="xl" decorated="muted" decoratedDensity="medium" reveal={false}>
        <div className="grid grid-cols-12 gap-10 lg:gap-14 xl:gap-20 items-start">
          <Reveal className="col-span-12 lg:col-span-4 lg:pr-4 xl:pr-8 reveal-slow" variant="left">
            <p className="eyebrow">How it works</p>
            <h2 className="h1 mt-3">
              One simple shape, every unit.
            </h2>
            <p className="lede mt-6 max-w-md">
              Open any unit and you&apos;ll see the same four sections, in the same
              order. Skim, skip, or follow it through - it&apos;s built to fit how you
              study.
            </p>
            <div className="mt-8">
              <Button href="/mathematics" variant="outline" rightIcon={<ArrowRight />}>
                Open the library
              </Button>
            </div>
          </Reveal>

          <div className="col-span-12 lg:col-span-8">
            <Reveal
              stagger
              variant="scale"
              threshold={0.05}
              className="grid sm:grid-cols-2 gap-4 sm:gap-6"
            >
              <Step
                n="01"
                title="Watch"
                body="Hand-picked videos from teachers who explain it well. Multiple takes on each concept so you can find the one that lands."
              />
              <Step
                n="02"
                title="Practice"
                body="Printable problem sets from Adam, plus curated links to external worksheet libraries when you want more reps."
              />
              <Step
                n="03"
                title="Check"
                body="A short self-check at the end of every unit, with explanations on every answer. Retake as many times as you want."
              />
              <Step
                n="04"
                title="Track"
                body="A progress bar saves what you've finished - locally, no account needed. Pick up where you left off, on any device."
              />
            </Reveal>
          </div>
        </div>
      </Section>

      {/* SOCIAL PROOF */}
      <Section tone="muted" size="md" containerSize="md" reveal={false}>
        <div className="grid grid-cols-12 gap-8">
          <Reveal variant="fade" className="col-span-12 md:col-span-2 hidden md:block">
            <span aria-hidden className="block text-7xl font-display font-bold leading-none text-[var(--color-brand-200)]">“</span>
          </Reveal>
          <div className="col-span-12 md:col-span-10">
            <Reveal variant="up-lg" className="reveal-slow">
              <blockquote className="font-display text-2xl sm:text-3xl font-medium leading-[1.4] tracking-[-0.01em] text-[var(--color-ink)] max-w-3xl">
                Adam really helped me understand fractions. I feel so much more
                confident now - and I actually like math class.
              </blockquote>
            </Reveal>
            <Reveal variant="right" delay={120} className="mt-6">
              <footer className="flex items-center gap-3">
                <span className="w-10 h-10 rounded-full bg-[var(--color-brand-100)] text-[var(--color-brand-700)] grid place-items-center font-semibold">A</span>
                <span>
                  <span className="block small font-semibold text-[var(--color-ink)]">Alana Jose</span>
                  <span className="caption text-[var(--color-ink-muted)]">Grade 6 student · Forsyth County</span>
                </span>
              </footer>
            </Reveal>

            <Reveal stagger variant="up" className="mt-12 grid sm:grid-cols-3 gap-6">
              <MiniQuote text="The practice Adam gave me made a huge difference on my tests." name="Alan Jose" role="Student" />
              <MiniQuote text="Adam is patient and explains things clearly without rushing." name="Akshar Kothari" role="Student" />
              <MiniQuote text="Finally a free resource that doesn't try to sell me something." name="Parent" role="Forsyth County" />
            </Reveal>
          </div>
        </div>
      </Section>

      {/* CLOSING CTA - single dark band */}
      <ColorBand variant="dark" size="lg" reveal={false}>
        <div className="grid grid-cols-12 gap-8 items-center">
          <Reveal variant="left" className="col-span-12 md:col-span-7 reveal-slow">
            <p className="caption font-semibold tracking-[0.16em] uppercase text-[var(--color-brand-300)]">
              Stuck on something?
            </p>
            <h2 className="font-display font-bold mt-3 text-3xl sm:text-4xl leading-[1.15] tracking-[-0.02em] max-w-2xl text-white">
              Book a free 1-on-1 with Adam - online or in&#8209;person.
            </h2>
            <p className="mt-4 text-[#C8C9CC] max-w-xl">
              Bring the problem you&apos;re working on. He&apos;ll walk through it
              with you - no charge, no sales pitch, no follow-up emails.
            </p>
            <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm text-[#9AA0A8]">
              <span className="inline-flex items-center gap-2"><Check tone="light" /> 45 minutes</span>
              <span className="inline-flex items-center gap-2"><Check tone="light" /> Zoom or in-person</span>
              <span className="inline-flex items-center gap-2"><Check tone="light" /> Always free</span>
            </div>
          </Reveal>
          <Reveal
            variant="right"
            delay={150}
            className="col-span-12 md:col-span-5 btn-stack-mobile md:justify-end"
          >
            <Button href="/book" size="lg" rightIcon={<ArrowRight />}>
              Book a session
            </Button>
            <Link
              href="/mathematics"
              className="btn btn-lg text-white border border-white/30 hover:bg-white/10"
            >
              Or browse units
            </Link>
          </Reveal>
        </div>
      </ColorBand>
    </>
  );
}

/* ============================================================
   Local components - kept inline because they only ship on this
   page and are tightly coupled to its content & layout.
   ============================================================ */

function Step({ n, title, body }: { n: string; title: string; body: string }) {
  return (
    <div className="step-card">
      <div className="flex items-center gap-3">
        <span className="step-card__num">{n}</span>
        <span className="font-display font-semibold text-lg text-[var(--color-ink)]">{title}</span>
      </div>
      <p className="mt-3 small text-[var(--color-ink-muted)] leading-[1.6]">{body}</p>
    </div>
  );
}

function MiniQuote({ text, name, role, dark }: { text: string; name: string; role: string; dark?: boolean }) {
  return (
    <div className={`border-l-2 pl-4 ${dark ? "border-white/25" : "border-[var(--color-border-strong)]"}`}>
      <p className={`small leading-[1.6] ${dark ? "text-white/90" : "text-[var(--color-ink)]"}`}>{text}</p>
      <p className={`caption mt-3 ${dark ? "text-white/60" : "text-[var(--color-ink-muted)]"}`}>
        <span className={`font-semibold ${dark ? "text-white" : "text-[var(--color-ink)]"}`}>{name}</span> · {role}
      </p>
    </div>
  );
}

/* ---- icons ---- */

function ArrowRight() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="13 6 19 12 13 18" />
    </svg>
  );
}

function Check({ tone = "brand" }: { tone?: "brand" | "light" }) {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke={tone === "light" ? "#7E97F0" : "currentColor"}
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

