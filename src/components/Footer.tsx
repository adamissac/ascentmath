"use client";

import Link from "next/link";
import { SITE_POSITIONING } from "../data/site-copy";
import {
  ADAM_EMAIL,
  ALAN_EMAIL,
  ADAM_PHONE_DISPLAY,
  ADAM_PHONE_TEL,
  ALAN_PHONE_DISPLAY,
  ALAN_PHONE_TEL,
  TUTOR_NAMES_SHORT,
} from "../data/site-team";

const YEAR = new Date().getFullYear();

export default function Footer() {
  return (
    <footer className="mt-10 border-t border-[var(--color-border)] bg-[var(--color-bg)] safe-bottom">
      <div className="mx-auto max-w-7xl page-x py-8 sm:py-9">
        <div className="flex flex-col gap-8 sm:flex-row sm:items-start sm:justify-between sm:gap-10">
          <div className="min-w-0 max-w-sm">
            <Link href="/" className="group no-underline" aria-label="Adam's Alphabet - home">
              <span className="block font-display text-lg font-bold tracking-tight text-[var(--color-ink-cool)] transition-colors group-hover:text-[var(--color-brand-600)]">
                Adam&apos;s Alphabet
              </span>
              <span className="mt-0.5 block text-sm font-semibold text-[var(--color-brand-600)]">
                {TUTOR_NAMES_SHORT}
              </span>
            </Link>
            <p className="mt-3 text-sm leading-relaxed text-[var(--color-ink-muted)]">
              {SITE_POSITIONING}
            </p>
          </div>

          <div className="shrink-0">
            <p className="caption font-semibold uppercase tracking-[0.12em] text-[var(--color-brand-600)]">
              Connect
            </p>
            <ul className="mt-3 space-y-2.5">
              <ContactItem href={`tel:${ADAM_PHONE_TEL}`} label={`Adam · ${ADAM_PHONE_DISPLAY}`} />
              <ContactItem href={`tel:${ALAN_PHONE_TEL}`} label={`Alan · ${ALAN_PHONE_DISPLAY}`} />
              <ContactItem href={`mailto:${ADAM_EMAIL}`} label="Email Adam" sub={ADAM_EMAIL} />
              <ContactItem href={`mailto:${ALAN_EMAIL}`} label="Email Alan" sub={ALAN_EMAIL} />
            </ul>
          </div>
        </div>

        <p className="mt-8 text-[0.8125rem] text-[var(--color-ink-soft)]">
          © {YEAR} Adam&apos;s Alphabet · {TUTOR_NAMES_SHORT} · Made in Georgia
        </p>
      </div>
    </footer>
  );
}

function ContactItem({ href, label, sub }: { href: string; label: string; sub?: string }) {
  return (
    <li>
      <a
        href={href}
        className="block rounded-md no-underline transition-colors hover:text-[var(--color-brand-600)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-brand-500)]"
      >
        <span className="block text-sm font-medium text-[var(--color-ink)]">{label}</span>
        {sub && (
          <span className="mt-0.5 block truncate text-[0.75rem] text-[var(--color-ink-muted)]">{sub}</span>
        )}
      </a>
    </li>
  );
}
