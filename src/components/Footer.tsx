"use client";

import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import HashLink from "./HashLink";
import { SITE_POSITIONING } from "../data/site-copy";
import { FIRST_SESSION_FREE } from "../data/pricing";
import {
  ADAM_EMAIL,
  ALAN_EMAIL,
  SITE_PHONE_DISPLAY,
  SITE_PHONE_TEL,
  TUTOR_NAMES_SHORT,
} from "../data/site-team";
import { BOOK_SESSION_HREF, STUDY_PATHS_HREF } from "../lib/site-paths";

const YEAR = new Date().getFullYear();

export default function Footer() {
  return (
    <footer className="relative mt-16 overflow-hidden border-t border-[var(--color-border)] bg-[var(--color-bg)] safe-bottom">
      {/* Soft background wash */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_10%_0%,rgba(42,75,203,0.07),transparent_55%),radial-gradient(ellipse_60%_50%_at_95%_100%,rgba(244,123,22,0.06),transparent_50%)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, rgba(42,75,203,0.08) 1px, transparent 0)",
          backgroundSize: "28px 28px",
        }}
      />

      <div className="relative mx-auto max-w-7xl page-x pt-12 pb-8 sm:pt-14 sm:pb-10">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
          {/* Brand block */}
          <div className="lg:col-span-5">
            <Link
              href="/"
              className="group inline-flex items-center gap-3 no-underline"
              aria-label="Adam's Alphabet - home"
            >
              <span className="grid h-11 w-11 place-items-center overflow-hidden rounded-xl border border-[var(--color-border)] bg-white shadow-[var(--shadow-card)] transition-shadow group-hover:shadow-[var(--shadow-card-hover)]">
                <Image
                  src="/newLogo.png"
                  alt=""
                  width={44}
                  height={44}
                  sizes="44px"
                  className="h-full w-full object-cover"
                />
              </span>
              <span>
                <span className="block font-display text-xl font-bold tracking-tight text-[var(--color-ink-cool)] group-hover:text-[var(--color-brand-600)] transition-colors">
                  Adam&apos;s Alphabet
                </span>
                <span className="block text-sm font-semibold text-[var(--color-brand-600)]">
                  {TUTOR_NAMES_SHORT}
                </span>
              </span>
            </Link>

            <p className="mt-5 max-w-md text-[0.9375rem] leading-relaxed text-[var(--color-ink-muted)]">
              {SITE_POSITIONING}
            </p>

            <div className="mt-5 flex flex-wrap gap-2">
              <span className="inline-flex items-center rounded-full border border-[var(--color-accent-100)] bg-[var(--color-accent-50)] px-3 py-1 text-[0.6875rem] font-bold uppercase tracking-wide text-[var(--color-accent-700)]">
                First session free
              </span>
              <span className="inline-flex items-center rounded-full border border-[var(--color-brand-100)] bg-[var(--color-brand-50)] px-3 py-1 text-[0.6875rem] font-semibold text-[var(--color-brand-700)]">
                Made in Georgia
              </span>
            </div>

            <HashLink
              href={BOOK_SESSION_HREF}
              className="mt-6 inline-flex min-h-[44px] items-center justify-center gap-2 rounded-full bg-[var(--color-brand-600)] px-5 py-2.5 text-sm font-semibold text-white shadow-[0_8px_24px_-10px_rgba(42,75,203,0.55)] transition-[transform,background-color,box-shadow] hover:-translate-y-0.5 hover:bg-[var(--color-brand-700)] hover:shadow-[0_12px_28px_-10px_rgba(42,75,203,0.5)] no-underline"
            >
              Book a session
              <span aria-hidden>→</span>
            </HashLink>
          </div>

          {/* Link columns */}
          <div className="lg:col-span-7 grid gap-8 sm:grid-cols-3">
            <FooterColumn title="Tutoring">
              <FooterLink href={BOOK_SESSION_HREF} hash>
                Book a session
              </FooterLink>
              <FooterLink href="/#what-i-teach" hash>
                Tutoring tiers
              </FooterLink>
            </FooterColumn>

            <FooterColumn title="Study paths">
              <FooterLink href={STUDY_PATHS_HREF} hash>
                Grades 6–8 paths
                <span className="ml-1.5 rounded-full bg-[var(--color-accent-50)] px-1.5 py-0.5 text-[0.625rem] font-bold uppercase text-[var(--color-accent-700)]">
                  Free
                </span>
              </FooterLink>
              <FooterLink href="/mathematics/find-your-start">Find your start</FooterLink>
              <FooterLink href="/mathematics/curriculum-frameworks">GADOE frameworks</FooterLink>
            </FooterColumn>

            <FooterColumn title="Connect">
              <ContactItem
                href={`tel:${SITE_PHONE_TEL}`}
                label={SITE_PHONE_DISPLAY}
                icon={<PhoneIcon />}
              />
              <ContactItem
                href={`mailto:${ADAM_EMAIL}`}
                label="Email Adam"
                sub={ADAM_EMAIL}
                icon={<MailIcon />}
              />
              <ContactItem
                href={`mailto:${ALAN_EMAIL}`}
                label="Email Alan"
                sub={ALAN_EMAIL}
                icon={<MailIcon />}
              />
            </FooterColumn>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 border-t border-[var(--color-border)] pt-6 sm:flex sm:items-center sm:justify-between sm:gap-4">
          <p className="text-[0.8125rem] text-[var(--color-ink-soft)]">
            © {YEAR} Adam&apos;s Alphabet · {TUTOR_NAMES_SHORT}
          </p>
          <p className="mt-2 text-[0.8125rem] text-[var(--color-ink-soft)] sm:mt-0 sm:text-right">
            Paid tutoring · Free study paths · {FIRST_SESSION_FREE.split(".")[0]}
          </p>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="rounded-xl border border-[var(--color-border)]/80 bg-white/60 p-5 shadow-sm backdrop-blur-[2px]">
      <h3 className="font-display text-sm font-bold tracking-tight text-[var(--color-ink-cool)]">
        {title}
      </h3>
      <div className="mt-1 h-0.5 w-8 rounded-full bg-[var(--color-brand-400)]" aria-hidden />
      <ul className="mt-4 space-y-2.5">{children}</ul>
    </div>
  );
}

function FooterLink({
  href,
  hash,
  children,
}: {
  href: string;
  hash?: boolean;
  children: ReactNode;
}) {
  const className =
    "inline-flex items-center text-[0.9375rem] font-medium text-[var(--color-brand-600)] no-underline transition-colors hover:text-[var(--color-brand-700)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-brand-500)]";

  return (
    <li>
      {hash ? (
        <HashLink href={href} className={className}>
          {children}
        </HashLink>
      ) : (
        <Link href={href} className={className}>
          {children}
        </Link>
      )}
    </li>
  );
}

function ContactItem({
  href,
  label,
  sub,
  icon,
}: {
  href: string;
  label: string;
  sub?: string;
  icon: ReactNode;
}) {
  return (
    <li>
      <a
        href={href}
        className="group flex items-start gap-3 rounded-lg px-2 py-2 -mx-2 transition-colors hover:bg-[var(--color-brand-50)] no-underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-brand-500)]"
      >
        <span className="mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-[var(--color-brand-50)] text-[var(--color-brand-600)] transition-colors group-hover:bg-[var(--color-brand-100)]">
          {icon}
        </span>
        <span className="min-w-0">
          <span className="block text-sm font-semibold text-[var(--color-ink)] group-hover:text-[var(--color-brand-700)]">
            {label}
          </span>
          {sub && (
            <span className="block truncate text-[0.75rem] text-[var(--color-ink-muted)]">{sub}</span>
          )}
        </span>
      </a>
    </li>
  );
}

function PhoneIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  );
}
