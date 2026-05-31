import Link from "next/link";
import Section from "../components/Section";
import Container from "../components/Container";
import Button from "../components/Button";
import Card from "../components/Card";
import Badge from "../components/Badge";
import MathBackdrop from "../components/MathBackdrop";
import ColorBand from "../components/ColorBand";
import Reveal from "../components/Reveal";
import { UnitSymbol } from "../components/UnitSymbol";
import { GRADES, countUnitVideos } from "../data/units";

const ALL_UNITS = GRADES.flatMap((g) => g.units);

export default function Home() {
  const totalVideos = ALL_UNITS.reduce((s, u) => s + countUnitVideos(u), 0);
  const totalUnits = ALL_UNITS.length;

  return (
    <>
      {/* ================================================================
          HERO
          - Strict 12-col grid (lg: 7 / 5 split)
          - Vertical rhythm on an 8-px scale: 16 / 24 / 32 / 40 / 56 / 80
          - Subtle dot-grid + radial accent replace the floating α
          - Product-preview card on the right makes the offer tangible
          ================================================================ */}
      <section className="hero-surface relative overflow-hidden">
        <MathBackdrop variant="paper" density="dense" fadeEdges />

        <Container size="xl" className="relative pt-16 pb-20 sm:pt-24 sm:pb-28 lg:pt-28 lg:pb-32">
          <div className="grid grid-cols-12 gap-8 lg:gap-16 items-center">
            <Reveal className="col-span-12 lg:col-span-7" variant="up">
              <Badge tone="brand" className="mb-6">
                <span className="marker">Free · Grades 6–8 math · Built by a student</span>
              </Badge>

              <h1 className="h-display max-w-[18ch]">
                A friendlier way to <span className="hl">learn middle-school math.</span>
              </h1>

              <p className="lede mt-6 max-w-[52ch]">
                Hand-picked video walkthroughs, clear walkthroughs, and quick
                self-checks for Grades 6, 7, and 8 — designed for students who learn
                best when math stops feeling like a wall.
              </p>

              <div className="mt-8 btn-stack-mobile">
                <Button href="/mathematics" size="lg" rightIcon={<ArrowRight />}>
                  Start learning — it&apos;s free
                </Button>
                <Button href="/book" variant="outline" size="lg" rightIcon={<ArrowRight />}>
                  Book a free 1:1
                </Button>
              </div>

              <div className="trust-row mt-5">
                <span className="trust-row__item"><Check /> No sign-up</span>
                <span className="trust-row__item"><Check /> No ads, ever</span>
                <span className="trust-row__item"><Check /> Aligned to GADOE</span>
              </div>

              <div className="stat-strip mt-10 max-w-2xl">
                <Stat num={totalUnits} label="Units, aligned to GADOE" />
                <Stat num={`${totalVideos}+`} label="Video walkthroughs" />
                <Stat num="30+" label="Students tutored 1-on-1" />
                <Stat num="$0" label="Cost — now and forever" />
              </div>
            </Reveal>

            <Reveal className="col-span-12 lg:col-span-5" variant="up" delay={120}>
              <UnitPreview />
            </Reveal>
          </div>
        </Container>
      </section>

      {/* ================================================================
          CURRICULUM — editorial numbered list on brand blue
          ================================================================ */}
      <ColorBand variant="brand" size="sm" containerSize="xl" reveal={false}>
        <Reveal>
        <div className="grid grid-cols-12 gap-6 items-end mb-8 sm:mb-10">
          <div className="col-span-12 sm:col-span-9">
            <p className="eyebrow text-[var(--color-accent-300)]">The curriculum</p>
            <h2 className="h2 mt-3 max-w-2xl text-white">
              Three grades. Pick yours and start where you&apos;re stuck.
            </h2>
          </div>
          <div className="col-span-12 sm:col-span-3 sm:text-right">
            <Link
              href="/mathematics"
              className="link small inline-flex items-center gap-1 font-semibold text-white hover:text-[var(--color-accent-300)]"
            >
              See full library <ArrowRight />
            </Link>
          </div>
        </div>
        </Reveal>

        <Reveal as="ol" stagger className="list-none p-0 m-0">
          {GRADES.map((g, i) => {
            const unitCount = g.units.length;
            const topicCount = g.units.reduce((n, u) => n + u.topics.length, 0);
            const videoCount = g.units.reduce((n, u) => n + countUnitVideos(u), 0);
            return (
              <li key={g.slug}>
                <Link
                  href={`/mathematics/${g.slug}`}
                  className="list-row list-row--brand group no-underline"
                  aria-label={`Open ${g.title} Mathematics`}
                >
                  <span className="list-row__index">{String(i + 1).padStart(2, "0")}</span>
                  <span className="min-w-0">
                    <span className="flex items-center gap-3">
                      <UnitSymbol symbol={g.icon} size="sm" brand className="flex-shrink-0" />
                      <span className="font-display font-semibold text-base sm:text-lg text-white group-hover:text-[var(--color-accent-300)] transition-colors">
                        {g.title} Mathematics
                      </span>
                    </span>
                    <span className="block small text-white/75 mt-1 line-clamp-2 sm:line-clamp-1">
                      {g.short}
                    </span>
                    <span className="mt-2 hidden sm:flex items-center gap-3 caption text-white/55 flex-wrap">
                      {unitCount > 0 ? (
                        <>
                          <span>{unitCount} units</span>
                          <span aria-hidden>·</span>
                          <span>{topicCount} topics</span>
                          <span aria-hidden>·</span>
                          <span>{videoCount} videos</span>
                        </>
                      ) : (
                        <span>Coming soon</span>
                      )}
                    </span>
                  </span>
                  <span aria-hidden className="list-row__arrow">
                    <ArrowRight />
                  </span>
                </Link>
              </li>
            );
          })}
        </Reveal>
      </ColorBand>

      {/* ================================================================
          HOW IT WORKS — 4 numbered step cards
          12-col layout: brief on left (col-span-4), step cards on right (col-span-8)
          ================================================================ */}
      <Section tone="muted" size="sm" containerSize="xl" decorated="muted" decoratedDensity="medium" reveal={false}>
        <div className="grid grid-cols-12 gap-10 lg:gap-16 items-start">
          <Reveal className="col-span-12 lg:col-span-4" variant="left">
            <p className="eyebrow">How it works</p>
            <h2 className="h1 mt-3">
              One simple shape, every unit.
            </h2>
            <p className="lede mt-6 max-w-md">
              Open any unit and you&apos;ll see the same four sections, in the same
              order. Skim, skip, or follow it through — it&apos;s built to fit how you
              study.
            </p>
            <div className="mt-8">
              <Button href="/mathematics" variant="outline" rightIcon={<ArrowRight />}>
                Open the library
              </Button>
            </div>
          </Reveal>

          <div className="col-span-12 lg:col-span-8">
            <Reveal stagger threshold={0.08} className="grid sm:grid-cols-2 gap-4 sm:gap-6">
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
                body="A progress bar saves what you've finished — locally, no account needed. Pick up where you left off, on any device."
              />
            </Reveal>
          </div>
        </div>
      </Section>

      {/* SOCIAL PROOF */}
      <Section tone="muted" size="md" containerSize="md" reveal={false}>
        <div className="grid grid-cols-12 gap-8">
          <div className="col-span-12 md:col-span-2 hidden md:block">
            <span aria-hidden className="block text-7xl font-display font-bold leading-none text-[var(--color-brand-200)]">“</span>
          </div>
          <div className="col-span-12 md:col-span-10">
            <blockquote className="font-display text-2xl sm:text-3xl font-medium leading-[1.4] tracking-[-0.01em] text-[var(--color-ink)] max-w-3xl">
              Adam really helped me understand fractions. I feel so much more
              confident now — and I actually like math class.
            </blockquote>
            <footer className="mt-6 flex items-center gap-3">
              <span className="w-10 h-10 rounded-full bg-[var(--color-brand-100)] text-[var(--color-brand-700)] grid place-items-center font-semibold">A</span>
              <span>
                <span className="block small font-semibold text-[var(--color-ink)]">Alana Jose</span>
                <span className="caption text-[var(--color-ink-muted)]">Grade 6 student · Forsyth County</span>
              </span>
            </footer>

            <Reveal stagger className="mt-12 grid sm:grid-cols-3 gap-6">
              <MiniQuote text="The practice Adam gave me made a huge difference on my tests." name="Alan Jose" role="Student" />
              <MiniQuote text="Adam is patient and explains things clearly without rushing." name="Akshar Kothari" role="Student" />
              <MiniQuote text="Finally a free resource that doesn't try to sell me something." name="Parent" role="Forsyth County" />
            </Reveal>
          </div>
        </div>
      </Section>

      {/* CLOSING CTA — single dark band */}
      <ColorBand variant="dark" size="lg">
        <div className="grid grid-cols-12 gap-8 items-center">
          <div className="col-span-12 md:col-span-7">
            <p className="caption font-semibold tracking-[0.16em] uppercase text-[var(--color-brand-300)]">
              Stuck on something?
            </p>
            <h2 className="font-display font-bold mt-3 text-3xl sm:text-4xl leading-[1.15] tracking-[-0.02em] max-w-2xl text-white">
              Book a free 1-on-1 with Adam — online or in&#8209;person.
            </h2>
            <p className="mt-4 text-[#C8C9CC] max-w-xl">
              Bring the problem you&apos;re working on. He&apos;ll walk through it
              with you — no charge, no sales pitch, no follow-up emails.
            </p>
            <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm text-[#9AA0A8]">
              <span className="inline-flex items-center gap-2"><Check tone="light" /> 45 minutes</span>
              <span className="inline-flex items-center gap-2"><Check tone="light" /> Zoom or in-person</span>
              <span className="inline-flex items-center gap-2"><Check tone="light" /> Always free</span>
            </div>
          </div>
          <div className="col-span-12 md:col-span-5 btn-stack-mobile md:justify-end">
            <Button href="/book" size="lg" rightIcon={<ArrowRight />}>
              Book a session
            </Button>
            <Link
              href="/mathematics"
              className="btn btn-lg text-white border border-white/30 hover:bg-white/10"
            >
              Or browse units
            </Link>
          </div>
        </div>
      </ColorBand>
    </>
  );
}

/* ============================================================
   Local components — kept inline because they only ship on this
   page and are tightly coupled to its content & layout.
   ============================================================ */

function Stat({ num, label }: { num: string | number; label: string }) {
  return (
    <div>
      <span className="stat-strip__num">{num}</span>
      <span className="stat-strip__label">{label}</span>
    </div>
  );
}

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

function UnitPreview() {
  return (
    <div className="relative">
      {/* watermark α behind the card — replaces the floating decoration */}
      <span
        aria-hidden
        className="brand-watermark hidden lg:block"
        style={{ fontSize: "20rem", right: "-3rem", top: "-4rem", zIndex: 0 }}
      >
        α
      </span>

      <div className="glow-soft hidden lg:block" />

      <Card className="relative z-10 p-5 sm:p-6 shadow-[0_30px_80px_-20px_rgba(15,17,21,0.18)]">
        <div className="flex items-center justify-between">
          <Badge tone="brand">Unit 1 · Grade 6</Badge>
          <span className="caption text-[var(--color-ink-soft)] tabular-nums">~55 min</span>
        </div>

        {/* Video preview */}
        <div className="mt-5 relative aspect-video rounded-lg overflow-hidden bg-[var(--color-brand-100)]">
          <div aria-hidden className="absolute inset-0 dot-grid opacity-25" />
          <div className="absolute inset-0 grid place-items-center">
            <span className="w-14 h-14 rounded-full bg-white shadow-xl grid place-items-center">
              <PlayIcon />
            </span>
          </div>
          <div className="absolute left-3 bottom-3 right-3 flex items-center gap-2">
            <span className="text-[11px] font-semibold uppercase tracking-wider bg-black/70 text-white px-2 py-1 rounded">
              Math Antics
            </span>
            <span className="text-[11px] text-white/85 tabular-nums">06:12</span>
          </div>
        </div>

        <h3 className="font-display font-bold text-lg sm:text-xl mt-5 leading-[1.25] text-[var(--color-ink)]">
          Number System &amp; Operations
        </h3>

        <ul className="mt-4 grid gap-2.5">
          <ObjLine done>Find factors, multiples, GCF &amp; LCM</ObjLine>
          <ObjLine done>Multiply &amp; divide fractions</ObjLine>
          <ObjLine>Operate fluently with decimals</ObjLine>
        </ul>

        <hr className="divider my-5" />

        <div className="flex items-end justify-between">
          <div>
            <p className="caption font-semibold uppercase tracking-wider text-[var(--color-brand-600)]">
              Your progress
            </p>
            <p className="font-display font-bold text-base mt-1 tabular-nums text-[var(--color-ink)]">
              2 of 5 lessons
            </p>
          </div>
          <span className="caption text-[var(--color-ink-muted)] tabular-nums">40%</span>
        </div>
        <div className="mt-3 h-1.5 rounded-full bg-[var(--color-surface-2)] overflow-hidden">
          <div className="h-full w-2/5 bg-[var(--color-brand-500)] rounded-full" />
        </div>
      </Card>

      {/* Floating quiz chip */}
      <div className="float-chip hidden sm:flex"
           style={{ right: "-0.75rem", bottom: "-1rem" }}>
        <span className="w-9 h-9 rounded-full bg-[var(--color-accent-100)] text-[var(--color-accent-700)] grid place-items-center font-bold text-sm tabular-nums">
          4/5
        </span>
        <span className="text-xs leading-tight">
          <span className="block font-semibold text-[var(--color-ink)]">Quiz passed</span>
          <span className="block text-[var(--color-ink-muted)]">Fractions check</span>
        </span>
      </div>
    </div>
  );
}

function ObjLine({ done, children }: { done?: boolean; children: React.ReactNode }) {
  return (
    <li className="flex items-start gap-2.5 text-sm leading-[1.5]">
      {done ? (
        <span aria-hidden className="mt-0.5 w-4 h-4 rounded-full bg-[var(--color-brand-500)] text-white grid place-items-center text-[10px] font-bold flex-shrink-0">
          ✓
        </span>
      ) : (
        <span aria-hidden className="mt-0.5 w-4 h-4 rounded-full border-2 border-[var(--color-border-strong)] flex-shrink-0" />
      )}
      <span className={done ? "text-[var(--color-ink)]" : "text-[var(--color-ink-muted)]"}>
        {children}
      </span>
    </li>
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

function PlayIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="var(--color-brand-700)" aria-hidden>
      <path d="M8 5.5v13l11-6.5z" />
    </svg>
  );
}
