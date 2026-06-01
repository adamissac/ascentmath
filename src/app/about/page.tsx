import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Container from "../../components/Container";
import Section from "../../components/Section";
import Card from "../../components/Card";
import Button from "../../components/Button";
import Badge from "../../components/Badge";
import MathBackdrop from "../../components/MathBackdrop";
import ColorBand from "../../components/ColorBand";
import Reveal from "../../components/Reveal";

export const metadata: Metadata = {
  title: "About",
  description:
    "Adam Issac is a senior at Denmark High School and the creator of Adam's Alphabet — a free Grades 6–8 math resource built for students who learn differently.",
};

export default function AboutPage() {
  return (
    <>
      {/* ===============================================================
          HERO — magazine layout: big headline + stats + "what I'm up to"
          on the left; compact identity card (small portrait + structured
          meta) on the right.
          =============================================================== */}
      <section className="hero-surface relative overflow-hidden">
        <MathBackdrop variant="paper" density="dense" fadeEdges />
        <Container size="xl" className="relative pt-14 sm:pt-20 pb-14 sm:pb-20">
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-14 items-start">
            <Reveal className="lg:col-span-8" variant="up">
              <Badge tone="brand" className="mb-6"><span className="marker">About</span></Badge>

              <h1 className="font-display font-bold leading-[1.1] tracking-[-0.02em] text-[2.5rem] sm:text-[3.25rem] lg:text-[3.75rem] text-[var(--color-ink)]">
                I&apos;m Adam.
                <br />
                <span className="text-[var(--color-ink-muted)]">I built this for kids like me.</span>
              </h1>

              <p className="lede mt-5 max-w-2xl">
                A high-school senior turning the help my friends asked for
                into something every student can use — without paying for it.
              </p>

              {/* Stat strip — punchier than the old proof row */}
              <dl className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-x-6 gap-y-5 max-w-2xl">
                <Stat num="Sr." label="at Denmark High School" />
                <Stat num="2+" label="years tutoring" />
                <Stat num="30+" label="students helped 1-on-1" />
                <Stat num="20" label="units across Grades 6–8" />
              </dl>

              {/* Currently — small list of in-flight work, tag style */}
              <div className="mt-8">
                <p className="caption font-semibold tracking-[0.14em] uppercase text-[var(--color-ink-soft)]">
                  Right now
                </p>
                <ul className="mt-3 flex flex-wrap gap-2">
                  <ActivityChip dot="brand">Recording Unit 4 walk-throughs</ActivityChip>
                  <ActivityChip dot="accent">Tightening Grades 7 &amp; 8</ActivityChip>
                  <ActivityChip dot="brand">Studying for AP exams</ActivityChip>
                  <ActivityChip dot="accent">Free 1-on-1 sessions, weekends</ActivityChip>
                </ul>
              </div>

              {/* Quick contact strip */}
              <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm">
                <a
                  href="mailto:adamissac08@gmail.com"
                  className="inline-flex items-center gap-2 text-[var(--color-ink)] hover:text-[var(--color-brand-700)] transition-colors font-medium"
                >
                  <MailIcon />
                  adamissac08@gmail.com
                </a>
                <Link
                  href="/book"
                  className="inline-flex items-center gap-2 text-[var(--color-ink)] hover:text-[var(--color-brand-700)] transition-colors font-medium"
                >
                  <CalIcon />
                  Book a free session
                </Link>
                <span className="inline-flex items-center gap-2 text-[var(--color-ink-muted)]">
                  <PinIcon />
                  Atlanta, GA · open everywhere
                </span>
              </div>
            </Reveal>

            <Reveal className="lg:col-span-4 lg:pl-6 xl:pl-8" variant="up" delay={120}>
              <IdentityCard />
            </Reveal>
          </div>
        </Container>
      </section>

      {/* ===============================================================
          MISSION (single statement, not 4 principle cards)
          =============================================================== */}
      <ColorBand variant="brand" size="sm" containerSize="md">
        <p className="caption font-semibold tracking-wider uppercase text-[var(--color-accent-300)]">The mission</p>
        <p className="font-display font-medium text-2xl sm:text-3xl lg:text-4xl leading-[1.3] tracking-[-0.01em] mt-4 text-white">
          Make every important middle-school math idea{" "}
          <span className="text-[var(--color-accent-300)]">easy to find,</span> easy to follow, and free
          to use — especially for students who can&apos;t afford private tutoring.
        </p>
      </ColorBand>

      {/* ===============================================================
          STORY — long-form, broken by a pull quote
          =============================================================== */}
      <Section tone="default" size="sm" containerSize="xl" decorated="paper" decoratedDensity="medium">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-14 items-start">
          <aside className="lg:col-span-2 lg:pr-8 xl:pr-10">
            <p className="eyebrow">My story</p>
            <p className="small text-[var(--color-ink-muted)] mt-3 leading-relaxed">
              Why this site exists, in my own words — written over a few weekends in the
              library at school.
            </p>
          </aside>

          <div className="lg:col-span-10">
            <p className="lede">
              I&apos;m a senior at Denmark High School. The longer I&apos;ve been here, the more I&apos;ve
              noticed the same thing: a lot of us struggle to follow lectures, the material
              gets dense fast, and the feeling of being lost is hard to admit out loud.
            </p>

            <p className="body mt-5 leading-relaxed text-[var(--color-ink)]">
              Math was the one subject that always made sense to me — partly because of how
              it&apos;s built, and partly because the people who explained it well made all the
              difference. Friends started calling me their &ldquo;math tutor.&rdquo; That nickname
              stuck.
            </p>

            <figure className="my-10">
              <blockquote className="pullquote pl-8">
                I started tutoring two of my family&apos;s friends&apos; kids — sixth and eighth
                grade. Watching how relieved they felt when something clicked is what
                hooked me.
              </blockquote>
            </figure>

            <p className="body leading-relaxed text-[var(--color-ink)]">
              Their grades went up. Their confidence went up faster. That&apos;s when the
              project went bigger than a few weekend sessions.
            </p>

            <p className="body mt-5 leading-relaxed text-[var(--color-ink)]">
              When I dug into the research, I learned that students who are below grade
              level are often also in families that can&apos;t afford private tutoring. That&apos;s
              the gap Adam&apos;s Alphabet is built for — a free, friendly resource that meets
              students where they actually are.
            </p>

            <p className="body mt-5 leading-relaxed text-[var(--color-ink)]">
              The site is still growing. I&apos;m adding worksheets, recording videos, and
              tightening the curriculum every month. If something here helps even one
              student feel less lost, the whole thing is worth it.
            </p>
          </div>
        </div>
      </Section>

      {/* ===============================================================
          TIMELINE
          =============================================================== */}
      <Section tone="muted" size="sm" containerSize="xl" decorated="muted" decoratedDensity="medium">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-14 items-start">
          <div className="lg:col-span-3 lg:pr-6 xl:pr-8">
            <p className="eyebrow">How it grew</p>
            <h2 className="h2 mt-3">From a nickname to a curriculum.</h2>
            <p className="small text-[var(--color-ink-muted)] mt-4 leading-relaxed">
              A short timeline of how Adam&apos;s Alphabet became what it is today.
            </p>
          </div>
          <div className="lg:col-span-9">
            <ol className="timeline" role="list">
              <Milestone
                tag="Sophomore year"
                title="The first nickname"
                body="Friends start calling me “math tutor” after I help out before exams. The phrase becomes the seed for what I’d build next."
              />
              <Milestone
                tag="Summer between"
                title="Two students. One kitchen table."
                body="I start tutoring two family-friend kids — 6th and 8th grade — at a kitchen table. Watching their confidence grow week over week is the moment this stops being a favor and starts being a project."
              />
              <Milestone
                tag="Junior year"
                title="The site goes live"
                body="Adam’s Alphabet launches with the first three units of Grade 6 math — written for the students who can’t afford private tutoring."
              />
              <Milestone
                tag="Now"
                title="Three grades, free for everyone"
                body="All of Grades 6, 7, and 8 published — 20 units with hand-picked videos, printable worksheets, and self-check quizzes. Reach has grown to 30+ tutored students across 10+ counties and 150+ schools online."
              />
              <Milestone
                tag="Next"
                title="Recording, refining, expanding"
                body="I’m recording original walk-throughs, writing new worksheets, and deepening practice across all three grades — based on what real students keep asking about."
                last
              />
            </ol>
          </div>
        </div>
      </Section>

      {/* ===============================================================
          VALUES (compact strip, NOT 4 symmetric cards)
          =============================================================== */}
      <Section tone="muted" size="sm" containerSize="xl" decorated="paper" decoratedDensity="medium">
        <div className="grid md:grid-cols-12 gap-10 items-start">
          <div className="md:col-span-5">
            <p className="eyebrow">What I care about</p>
            <h2 className="h2 mt-3">A few rules I won&apos;t break.</h2>
            <p className="small text-[var(--color-ink-muted)] mt-4 max-w-sm">
              The longer I do this, the clearer these get. They&apos;re the reason
              Adam&apos;s Alphabet stays the way it is.
            </p>
          </div>
          <ul className="md:col-span-7 divide-y divide-[var(--color-border)]">
            {VALUES.map((v) => (
              <li key={v.title} className="py-5 flex items-start gap-4">
                <span aria-hidden className="caption font-bold tracking-wider text-[var(--color-brand-600)] w-10 flex-shrink-0">
                  {v.tag}
                </span>
                <span>
                  <span className="block font-display font-semibold text-lg text-[var(--color-ink)]">{v.title}</span>
                  <span className="block small text-[var(--color-ink-muted)] mt-1 leading-relaxed">{v.body}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      {/* ===============================================================
          CONTACT
          =============================================================== */}
      <ColorBand variant="dark" containerSize="xl">
          <div className="grid md:grid-cols-12 gap-8 items-start">
            <div className="md:col-span-7">
              <p className="caption font-semibold tracking-wider uppercase text-[var(--color-brand-300)]">
                Get in touch
              </p>
              <h2 className="font-display font-bold mt-3 text-3xl sm:text-4xl leading-[1.2]">
                Have a question, suggestion, or just want to say hi?
              </h2>
              <p className="mt-4 text-[#C8C9CC] max-w-xl">
                I read every message. The best ways to reach me are below.
              </p>
              <div className="mt-6 btn-stack-mobile sm:flex-row">
                <Button href="/book" rightIcon={<Arrow />}>Book a free session</Button>
                <a
                  href="mailto:adamissac08@gmail.com"
                  className="btn text-white border border-white/30 hover:bg-white/10"
                >
                  Email Adam
                </a>
              </div>
            </div>
            <div className="md:col-span-5 grid gap-3">
              <ContactRow
                label="Email"
                value="adamissac08@gmail.com"
                href="mailto:adamissac08@gmail.com"
              />
              <ContactRow
                label="YouTube"
                value="Adam's Alphabet channel"
                href="https://www.youtube.com"
              />
              <ContactRow
                label="Sessions"
                value="Zoom or in-person (Atlanta area)"
              />
            </div>
          </div>
      </ColorBand>

      <div className="text-center pt-12 pb-16">
        <Link href="/" className="link small">← Back home</Link>
      </div>
    </>
  );
}

/* ---- hero helpers ---- */

function IdentityCard() {
  return (
    <Card className="p-7 sm:p-8 relative w-full max-w-[380px] lg:max-w-[360px] lg:ml-auto">
      {/* Soft accent halo behind the avatar */}
      <div
        aria-hidden
        className="absolute left-1/2 -translate-x-1/2 top-2 w-44 h-44 rounded-full bg-[var(--color-brand-100)] opacity-50 blur-2xl pointer-events-none"
      />

      <div className="relative flex flex-col items-center">
        <div className="relative w-[140px] h-[140px] rounded-full overflow-hidden ring-4 ring-white shadow-[0_6px_20px_rgba(15,17,21,0.12)]">
          <Image
            src="/adampic.jpg"
            alt="Adam Issac"
            fill
            sizes="140px"
            className="object-cover"
            style={{ objectPosition: "center 18%" }}
            priority
          />
        </div>

        <span className="mt-4 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[var(--color-brand-50)] text-xs font-semibold tracking-wide text-[var(--color-brand-700)] border border-[var(--color-brand-100)]">
          <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-success)] animate-pulse" />
          Taking new students
        </span>

        <p className="font-display font-bold text-xl text-[var(--color-ink)] leading-tight mt-4 text-center">
          Adam Issac
        </p>
        <p className="caption text-[var(--color-ink-soft)] mt-1 text-center">
          Founder · Tutor · Senior
        </p>
      </div>

      <hr className="divider my-5" />

      <ul className="grid gap-3 text-sm">
        <FactRow icon={<SchoolIcon />} label="School">
          Denmark High · Forsyth Co.
        </FactRow>
        <FactRow icon={<CapIcon />} label="Class of">
          2026
        </FactRow>
        <FactRow icon={<BookIcon />} label="Teaching">
          Grades 6–8 math
        </FactRow>
        <FactRow icon={<ZoomIcon />} label="Meets">
          Zoom + in-person (ATL)
        </FactRow>
      </ul>

      <Link
        href="/book"
        className="mt-6 btn btn-primary w-full justify-center"
      >
        Book a free session <span aria-hidden>→</span>
      </Link>
    </Card>
  );
}

function Stat({ num, label }: { num: string; label: string }) {
  return (
    <div>
      <dt className="font-display font-bold text-2xl sm:text-[1.75rem] leading-none tracking-[-0.02em] text-[var(--color-ink)]">
        {num}
      </dt>
      <dd className="mt-1.5 text-xs text-[var(--color-ink-muted)] leading-snug">
        {label}
      </dd>
    </div>
  );
}

function ActivityChip({
  dot,
  children,
}: {
  dot: "brand" | "accent";
  children: React.ReactNode;
}) {
  const dotColor =
    dot === "brand" ? "var(--color-brand-500)" : "var(--color-accent-500)";
  return (
    <li className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[var(--color-surface)] border border-[var(--color-border)] text-[13px] font-medium text-[var(--color-ink)]">
      <span
        aria-hidden
        className="w-1.5 h-1.5 rounded-full flex-shrink-0"
        style={{ background: dotColor }}
      />
      {children}
    </li>
  );
}

function FactRow({
  icon,
  label,
  children,
}: {
  icon: React.ReactNode;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <li className="flex items-center gap-3.5">
      <span className="w-8 h-8 rounded-md bg-[var(--color-surface-2)] grid place-items-center text-[var(--color-ink-soft)] flex-shrink-0">
        {icon}
      </span>
      <span className="min-w-0 flex-1">
        <span className="block caption uppercase tracking-wider text-[var(--color-ink-soft)] text-[11px]">
          {label}
        </span>
        <span className="block text-[15px] font-medium text-[var(--color-ink)] truncate">
          {children}
        </span>
      </span>
    </li>
  );
}

/* ---- icons ---- */

function MailIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <polyline points="3 7 12 13 21 7" />
    </svg>
  );
}
function CalIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <rect x="3" y="4" width="18" height="18" rx="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  );
}
function PinIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}
function SchoolIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
      <path d="M6 12v5c3 2 9 2 12 0v-5" />
    </svg>
  );
}
function CapIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M12 2 1 9l11 7 9-5.7V17" />
      <path d="M5 13.2v4c0 1.5 3 3 7 3s7-1.5 7-3v-4" />
    </svg>
  );
}
function BookIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
    </svg>
  );
}
function ZoomIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <polygon points="23 7 16 12 23 17 23 7" />
      <rect x="1" y="5" width="15" height="14" rx="2" />
    </svg>
  );
}

/* ---- legacy helpers ---- */

const VALUES: { tag: string; title: string; body: string }[] = [
  { tag: "01", title: "Always free", body: "No paid tier, no upsell, no ads. The mission is access, not revenue." },
  { tag: "02", title: "Honest about hard", body: "When a topic is genuinely confusing, I slow down — not skip past it." },
  { tag: "03", title: "Cited, not invented", body: "Every video and worksheet is from a real teacher or trusted source." },
  { tag: "04", title: "Built for parents too", body: "Plain language and clear structure so parents can help, even if it’s been a while." },
];

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

function ContactRow({ label, value, href }: { label: string; value: string; href?: string }) {
  const content = (
    <>
      <span className="caption tracking-wider uppercase text-[#9AA0A8] w-20 flex-shrink-0">{label}</span>
      <span className="text-white font-medium">{value}</span>
    </>
  );
  return href ? (
    <a
      href={href}
      target={href.startsWith("http") ? "_blank" : undefined}
      rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
      className="group flex items-baseline gap-4 py-3 border-b border-white/10 hover:border-white/30 transition-colors"
    >
      {content}
      <span aria-hidden className="ml-auto text-[#9AA0A8] group-hover:text-white transition-colors">→</span>
    </a>
  ) : (
    <div className="flex items-baseline gap-4 py-3 border-b border-white/10">{content}</div>
  );
}

function Arrow() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="13 6 19 12 13 18" />
    </svg>
  );
}
