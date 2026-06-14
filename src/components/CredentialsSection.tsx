"use client";

import Image from "next/image";
import Link from "next/link";
import Container from "./Container";
import Reveal from "./Reveal";
import BookSessionLink from "./BookSessionLink";
import {
  ALAN_CREDENTIALS,
  ALAN_INTRO,
  MATH_CREDENTIALS,
  TUTOR_INTRO,
  type MathCredential,
  type TutorIntro,
} from "../data/credentials";
import { TUTOR_EMAILS_DISPLAY } from "../data/site-team";

const BLUE = "var(--color-brand-500)";
const INK = "var(--color-ink-cool)";
const BODY = "var(--color-ink-cool-muted)";
const MUTED = "var(--color-ink-cool-soft)";
const BTN_RADIUS = "6px";

const btnBase =
  "inline-flex min-h-[44px] items-center justify-center gap-2 px-5 text-sm font-semibold tracking-[0.01em] transition-colors duration-150 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-brand-500)]";

export default function CredentialsSection() {
  return (
    <section
      className="hero-surface relative overflow-hidden border-b border-[var(--color-border)] bg-[var(--color-bg)]"
      aria-labelledby="credentials"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 dot-grid-soft opacity-50"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[var(--color-brand-50)]/30 via-transparent to-transparent"
      />

      <Container size="lg" className="relative z-[1] py-10 sm:py-12 lg:py-14">
        <div className="grid gap-12 lg:gap-14">
          <TutorProfileRow
            intro={TUTOR_INTRO}
            credentials={MATH_CREDENTIALS}
            photoSrc="/adampic.jpg"
            photoAlt="Adam Issac, math tutor"
            photoPosition="50% 22%"
          />

          <div className="border-t border-[rgba(26,26,46,0.1)]" aria-hidden />

          <TutorProfileRow
            intro={ALAN_INTRO}
            credentials={ALAN_CREDENTIALS}
            initials="AM"
          />
        </div>

        <Reveal variant="fade" delay={80} as="footer"
          className="mt-10 flex flex-col gap-1 border-t border-[rgba(26,26,46,0.1)] pt-6 text-center text-[0.8125rem] sm:flex-row sm:flex-wrap sm:items-center sm:justify-center sm:gap-x-3 lg:justify-start lg:text-left"
          style={{ color: MUTED }}
        >
          <span className="select-all font-semibold" style={{ color: BLUE }}>
            {TUTOR_EMAILS_DISPLAY}
          </span>
          <span className="hidden sm:inline text-[var(--color-ink-soft)]" aria-hidden>
            ·
          </span>
          <span>Zoom or in-person in the Atlanta area</span>
        </Reveal>
      </Container>
    </section>
  );
}

function TutorProfileRow({
  intro,
  credentials,
  photoSrc,
  photoAlt,
  photoPosition,
  initials,
}: {
  intro: TutorIntro;
  credentials: readonly MathCredential[];
  photoSrc?: string;
  photoAlt?: string;
  photoPosition?: string;
  initials?: string;
}) {
  return (
    <Reveal variant="rise">
      <div className="grid items-start gap-8 sm:gap-10 lg:grid-cols-[auto_minmax(0,1fr)] lg:gap-x-12 xl:gap-x-14">
        <div className="flex justify-center lg:justify-start">
          <TutorPhotoCircle
            photoSrc={photoSrc}
            photoAlt={photoAlt}
            photoPosition={photoPosition}
            initials={initials}
          />
        </div>

        <div className="flex min-w-0 flex-col text-center lg:text-left">
          <h2
            id={intro.name === "Adam" ? "credentials" : undefined}
            tabIndex={intro.name === "Adam" ? -1 : undefined}
            className="font-display font-bold tracking-[-0.03em] focus:outline-none"
            style={{
              color: INK,
              fontSize: "clamp(1.75rem, 4vw, 2.25rem)",
              lineHeight: 1.12,
            }}
          >
            <span className="block">{intro.title}</span>
            <span className="block">{intro.titleMuted}</span>
          </h2>
          <p className="mt-4 text-sm font-medium tracking-[0.02em]" style={{ color: BLUE }}>
            {intro.meta}
          </p>
          <p
            className="mx-auto mt-5 max-w-[40rem] text-[1.0625rem] lg:mx-0"
            style={{ color: BODY, lineHeight: 1.8 }}
          >
            {intro.bio}
          </p>

          <ul
            className="mx-auto mt-5 max-w-[40rem] list-none space-y-1 text-left lg:mx-0"
            aria-label={`${intro.name} credentials`}
          >
            {credentials.map((item) => (
              <li
                key={item.label}
                className="text-[0.9375rem] leading-snug"
                style={{ color: INK }}
              >
                <span className="text-[var(--color-ink-soft)]" aria-hidden>
                  ·
                </span>{" "}
                <span className="font-semibold tabular-nums" style={{ color: BLUE }}>
                  {item.value}
                </span>{" "}
                <span className="font-medium">{item.label}</span>
                <span style={{ color: MUTED }}> · {item.detail}</span>
              </li>
            ))}
          </ul>

          <div className="mt-7 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:justify-center lg:justify-start">
            <BookSessionLink
              className={`${btnBase} hover:bg-[var(--color-brand-600)]`}
              style={{
                borderRadius: BTN_RADIUS,
                backgroundColor: BLUE,
                color: "#fff",
                border: `1px solid ${BLUE}`,
              }}
            >
              Book a session
              <Arrow />
            </BookSessionLink>
            {intro.storyHref && (
              <Link
                href={intro.storyHref}
                className={`${btnBase} border border-[rgba(26,26,46,0.12)] bg-white hover:border-[rgba(26,26,46,0.22)] hover:bg-[#F7F7F5]`}
                style={{ borderRadius: BTN_RADIUS, color: INK }}
              >
                My story
                <Arrow />
              </Link>
            )}
          </div>
        </div>
      </div>
    </Reveal>
  );
}

function TutorPhotoCircle({
  photoSrc,
  photoAlt,
  photoPosition,
  initials,
}: {
  photoSrc?: string;
  photoAlt?: string;
  photoPosition?: string;
  initials?: string;
}) {
  return (
    <div
      className="tutor-photo-frame relative shrink-0 overflow-hidden rounded-full"
      style={{
        boxShadow: "0 0 0 3px var(--color-brand-500), 0 6px 24px rgba(42, 75, 203, 0.2)",
      }}
    >
      {photoSrc ? (
        <Image
          src={photoSrc}
          alt={photoAlt ?? "Tutor photo"}
          fill
          sizes="(max-width: 1023px) 176px, 192px"
          className="object-cover"
          style={{ objectPosition: photoPosition ?? "50% 50%" }}
          priority={photoSrc === "/adampic.jpg"}
        />
      ) : (
        <div
          className="flex h-full w-full items-center justify-center bg-[var(--color-brand-50)] font-display text-2xl font-bold text-[var(--color-brand-600)]"
          aria-hidden
        >
          {initials}
        </div>
      )}
    </div>
  );
}

function Arrow() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="13 6 19 12 13 18" />
    </svg>
  );
}
