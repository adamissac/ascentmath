"use client";

import Link from "next/link";
import { useMemo } from "react";
import HashLink from "./HashLink";
import Container from "./Container";
import { BOOK_SESSION_HREF } from "../lib/site-paths";
import Reveal from "./Reveal";
import TopicFinder from "./TopicFinder";
import { GRADES, countUnitVideos } from "../data/units";

const SUGGESTIONS = ["GCF", "fractions", "slope", "ratios", "exponents", "equations"];

const BLUE = "#2A4BCB";
const INK = "#1a1a2e";
const BODY = "#4a4a6a";
const MUTED = "#6b6b80";
const BORDER = "rgba(26, 26, 46, 0.12)";

export default function MathematicsHubSection() {
  const stats = useMemo(() => {
    let units = 0;
    let topics = 0;
    let videos = 0;
    for (const g of GRADES) {
      units += g.units.length;
      for (const u of g.units) {
        topics += u.topics.length;
        videos += countUnitVideos(u);
      }
    }
    return { units, topics, videos };
  }, []);

  return (
    <section className="bg-[var(--color-bg)]">
      <Container size="lg" className="py-10 sm:py-12 lg:py-14">
        <Reveal variant="up">
          <header className="max-w-3xl">
            <p
              className="text-[0.6875rem] font-semibold uppercase tracking-[0.18em]"
              style={{ color: BLUE }}
            >
              Free · Grades 6-8 · self-paced · no account
            </p>
            <h1
              className="font-display mt-3 font-bold tracking-[-0.03em]"
              style={{ color: INK, fontSize: "clamp(2rem, 5vw, 2.75rem)", lineHeight: 1.1 }}
            >
              Study paths
            </h1>
            <p className="mt-4 max-w-2xl text-[1.0625rem]" style={{ color: BODY, lineHeight: 1.8 }}>
              Pick a grade and work through units at your own speed. Every topic uses the same four
              steps: read, watch, practice, then a quick check.
            </p>
            <p className="mt-5 text-sm font-medium" style={{ color: MUTED }}>
              <span className="tabular-nums font-semibold" style={{ color: INK }}>
                {GRADES.length}
              </span>{" "}
              grades ·{" "}
              <span className="tabular-nums font-semibold" style={{ color: INK }}>
                {stats.units}
              </span>{" "}
              units ·{" "}
              <span className="tabular-nums font-semibold" style={{ color: INK }}>
                {stats.topics}
              </span>{" "}
              topics ·{" "}
              <span className="tabular-nums font-semibold" style={{ color: INK }}>
                {stats.videos}
              </span>{" "}
              videos
            </p>
          </header>
        </Reveal>

        <Reveal variant="up" delay={40} className="mt-10 max-w-3xl">
          <div
            className="border bg-white px-5 py-6 sm:px-6 sm:py-7"
            style={{ borderColor: BORDER, borderRadius: "4px" }}
          >
            <p
              className="text-[0.6875rem] font-semibold uppercase tracking-[0.18em]"
              style={{ color: BLUE }}
            >
              Find a topic
            </p>
            <p className="mt-2 text-sm" style={{ color: BODY, lineHeight: 1.65 }}>
              Search by keyword if you know what your class is covering.
            </p>
            <div className="mt-4">
              <TopicFinder suggestions={SUGGESTIONS} variant="compact" />
            </div>
            <nav
              aria-label="Study path tools"
              className="mt-5 flex flex-wrap gap-x-4 gap-y-2 border-t pt-5 text-sm font-semibold"
              style={{ borderColor: BORDER }}
            >
              <Link href="/mathematics/find-your-start" className="hover:underline" style={{ color: BLUE }}>
                Find your start →
              </Link>
              <Link
                href="/mathematics/curriculum-frameworks"
                className="font-medium hover:underline"
                style={{ color: MUTED }}
              >
                GADOE frameworks
              </Link>
            </nav>
          </div>
        </Reveal>

        <div className="mt-12 lg:mt-14">
          <Reveal variant="up" delay={60}>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p
                  className="text-[0.6875rem] font-semibold uppercase tracking-[0.18em]"
                  style={{ color: BLUE }}
                >
                  Pick a grade
                </p>
                <h2 className="font-display mt-2 text-xl font-bold tracking-[-0.02em] sm:text-2xl" style={{ color: INK }}>
                  Open a full path
                </h2>
              </div>
              <p className="text-sm" style={{ color: MUTED }}>
                Georgia standards · same layout in every grade
              </p>
            </div>
          </Reveal>

          <ul className="mt-6 grid list-none gap-4 lg:grid-cols-3">
            {GRADES.map((grade, index) => {
              const unitCount = grade.units.length;
              const topicCount = grade.units.reduce((n, u) => n + u.topics.length, 0);
              const videoCount = grade.units.reduce((n, u) => n + countUnitVideos(u), 0);

              return (
                <li key={grade.slug}>
                  <Reveal variant="up" delay={80 + index * 50}>
                    <Link
                      href={`/mathematics/${grade.slug}`}
                      className="group flex h-full flex-col border bg-white p-5 no-underline transition-colors duration-150 hover:bg-[#F7F7F5] sm:p-6"
                      style={{ borderColor: BORDER, borderRadius: "4px" }}
                    >
                      <div className="flex items-center gap-3">
                        <span
                          className="flex size-12 shrink-0 items-center justify-center rounded-md border font-display text-xl font-bold tabular-nums"
                          style={{
                            borderColor: BORDER,
                            backgroundColor: "#FBFAF7",
                            color: BLUE,
                          }}
                        >
                          {grade.level}
                        </span>
                        <div className="min-w-0">
                          <p className="font-display text-lg font-bold tracking-[-0.02em] group-hover:underline" style={{ color: INK }}>
                            {grade.title}
                          </p>
                          <p className="mt-0.5 text-xs font-medium" style={{ color: MUTED }}>
                            {unitCount} units · {topicCount} topics
                          </p>
                        </div>
                      </div>
                      <p className="mt-4 flex-1 text-sm leading-relaxed" style={{ color: BODY, lineHeight: 1.7 }}>
                        {grade.short}
                      </p>
                      <p className="mt-3 text-xs" style={{ color: MUTED }}>
                        {videoCount} videos
                      </p>
                      <span
                        className="mt-4 inline-flex items-center gap-1 text-sm font-semibold"
                        style={{ color: BLUE }}
                      >
                        Open grade
                        <span aria-hidden className="transition-transform duration-150 group-hover:translate-x-0.5">
                          →
                        </span>
                      </span>
                    </Link>
                  </Reveal>
                </li>
              );
            })}
          </ul>
        </div>

        <Reveal variant="fade" delay={100} className="mt-10 border-t pt-8" style={{ borderColor: BORDER }}>
          <p className="text-sm leading-relaxed" style={{ color: BODY, lineHeight: 1.75 }}>
            Need live help outside these grades?{" "}
            <HashLink href={BOOK_SESSION_HREF} className="font-semibold hover:underline" style={{ color: BLUE }}>
              Book a tutoring session
            </HashLink>{" "}
            for K-6, middle school, or high school, AP, and college math.
          </p>
        </Reveal>
      </Container>
    </section>
  );
}
