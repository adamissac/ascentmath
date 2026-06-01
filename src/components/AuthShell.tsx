"use client";

import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import MathBackdrop from "./MathBackdrop";

/**
 * Shared chrome for /login, /signup, /forgot-password.
 * White form panel + deep-blue brand panel — equal split on desktop.
 */
export default function AuthShell({
  eyebrow,
  title,
  subtitle,
  footer,
  children,
  panelTitle = "Free Grades 6–8 math, your way.",
  panelSubtitle = "Sign in to track progress across devices, pick up where you left off, and book free 1-on-1 sessions when you get stuck.",
}: {
  eyebrow: string;
  title: string;
  subtitle: string;
  footer?: ReactNode;
  children: ReactNode;
  panelTitle?: string;
  panelSubtitle?: string;
}) {
  return (
    <div className="min-h-[calc(100dvh-4.25rem-3px)] grid lg:grid-cols-2">
      {/* Mobile — compact blue band so small screens aren't all plain white */}
      <div className="lg:hidden relative overflow-hidden bg-[var(--color-brand-700)] text-white px-5 py-8">
        <MathBackdrop variant="brand" density="light" contentSafe watermark={false} />
        <div className="relative z-[1] max-w-lg mx-auto text-center">
          <p className="caption font-semibold tracking-[0.14em] uppercase text-[var(--color-accent-300)]">
            Adam&apos;s Alphabet
          </p>
          <p className="font-display font-bold text-xl mt-2 leading-snug">{panelTitle}</p>
        </div>
      </div>

      {/* LEFT — white form panel */}
      <div className="relative flex items-center justify-center px-5 sm:px-10 py-10 lg:py-16 overflow-hidden bg-white border-b lg:border-b-0 lg:border-r border-[var(--color-border)]">
        <MathBackdrop variant="paper" density="light" contentSafe />

        <div className="relative z-[1] w-full max-w-[440px]">
          <Link
            href="/"
            className="inline-flex items-center gap-2.5 mb-8 group"
            aria-label="Adam's Alphabet — home"
          >
            <span className="relative w-9 h-9 rounded-lg overflow-hidden ring-1 ring-[var(--color-border)] shadow-sm">
              <Image src="/newLogo.png" alt="" fill sizes="36px" className="object-cover" />
            </span>
            <span className="font-display font-bold text-[1.05rem] text-[var(--color-ink)] group-hover:text-[var(--color-brand-600)] transition-colors">
              Adam&apos;s Alphabet
            </span>
          </Link>

          <p className="eyebrow">{eyebrow}</p>
          <h1 className="font-display font-bold text-3xl sm:text-[2rem] leading-[1.15] tracking-[-0.02em] mt-2">
            {title}
          </h1>
          <p className="mt-3 text-[var(--color-ink-muted)] leading-relaxed">{subtitle}</p>

          <div className="mt-8">{children}</div>

          {footer && (
            <div className="mt-8 pt-6 border-t border-[var(--color-border)] text-sm text-[var(--color-ink-muted)]">
              {footer}
            </div>
          )}
        </div>
      </div>

      {/* RIGHT — deep-blue brand panel (desktop) */}
      <aside className="hidden lg:flex relative items-center justify-center px-10 xl:px-14 py-16 overflow-hidden bg-[var(--color-brand-700)] text-white">
        <MathBackdrop variant="brand" density="light" contentSafe />

        <svg
          aria-hidden
          viewBox="0 0 300 200"
          width="280"
          height="186"
          className="absolute top-0 right-0 pointer-events-none z-[1]"
        >
          <path
            d="M 20 180 C 80 130, 160 80, 285 28"
            stroke="#F47B16"
            strokeOpacity="0.75"
            strokeWidth="3"
            strokeLinecap="round"
            fill="none"
          />
          <g transform="translate(285 28)" fill="#F47B16">
            <polygon points="0,-8 2.4,-2.6 8,-2 3.7,1.6 4.9,7.2 0,4.2 -4.9,7.2 -3.7,1.6 -8,-2 -2.4,-2.6" />
          </g>
        </svg>

        <div className="relative z-[2] max-w-md">
          <p className="caption font-semibold tracking-[0.14em] uppercase text-[var(--color-accent-300)]">
            Adam&apos;s Alphabet
          </p>
          <h2 className="font-display font-bold text-3xl sm:text-4xl mt-3 leading-[1.15] tracking-[-0.02em]">
            {panelTitle}
          </h2>
          <p className="mt-5 text-white/80 leading-relaxed">{panelSubtitle}</p>

          <ul className="mt-10 grid gap-4">
            <Bullet>Save where you stop in every unit</Bullet>
            <Bullet>Book free 1-on-1 sessions with Adam</Bullet>
            <Bullet>Never see an ad, ever</Bullet>
          </ul>

          <p className="mt-12 caption text-white/55">
            Built by a student tutor in Atlanta, GA · Open to learners everywhere.
          </p>
        </div>
      </aside>
    </div>
  );
}

function Bullet({ children }: { children: ReactNode }) {
  return (
    <li className="flex items-start gap-3 text-white/90">
      <span
        aria-hidden
        className="mt-0.5 w-5 h-5 rounded-full bg-[var(--color-accent-500)] text-white grid place-items-center text-[11px] font-bold flex-shrink-0"
      >
        ✓
      </span>
      <span className="leading-relaxed">{children}</span>
    </li>
  );
}
