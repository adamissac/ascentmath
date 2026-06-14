"use client";

import Link from "next/link";
import HashLink from "./HashLink";
import { SITE_POSITIONING } from "../data/site-copy";
import {
  ADAM_EMAIL,
  ALAN_EMAIL,
  TUTOR_NAMES_SHORT,
} from "../data/site-team";
import { BOOK_SESSION_HREF, STUDY_PATHS_HREF } from "../lib/site-paths";

const YEAR = new Date().getFullYear();

export default function Footer() {
  return (
    <footer className="border-t border-[var(--color-border)] bg-white mt-12 safe-bottom">
      <div className="mx-auto max-w-7xl page-x py-14">
        <div className="grid lg:grid-cols-12 gap-10">
          {/* Left: identity */}
          <div className="lg:col-span-5">
            <Link href="/" className="font-display font-bold text-xl tracking-tight text-[var(--color-ink)]">
              Adam&apos;s Alphabet
            </Link>
            <p className="mt-1 caption font-semibold text-[var(--color-brand-600)]">
              {TUTOR_NAMES_SHORT}
            </p>
            <p className="mt-3 small text-[var(--color-ink-muted)] max-w-md leading-relaxed">
              {SITE_POSITIONING}
            </p>
            <p className="caption text-[var(--color-ink-soft)] mt-4">
              Made in Georgia. Open to learners everywhere.
            </p>
          </div>

          {/* Spacer column on lg */}
          <div className="hidden lg:block lg:col-span-1" />

          {/* Right: link columns */}
          <div className="lg:col-span-6 grid grid-cols-2 sm:grid-cols-3 gap-8">
            <div>
              <h3 className="caption font-semibold text-[var(--color-ink)] uppercase tracking-wider">Tutoring</h3>
              <ul className="mt-3 space-y-2 small">
                <li><HashLink href={BOOK_SESSION_HREF} className="link">Book a session</HashLink></li>
                <li><HashLink href="/#what-i-teach" className="link">Tutoring tiers</HashLink></li>
              </ul>
            </div>
            <div>
              <h3 className="caption font-semibold text-[var(--color-ink)] uppercase tracking-wider">Study paths</h3>
              <ul className="mt-3 space-y-2 small">
                <li><HashLink href={STUDY_PATHS_HREF} className="link">Grades 6-8 paths (free)</HashLink></li>
                <li><Link href="/mathematics/find-your-start" className="link">Find your start</Link></li>
                <li><Link href="/mathematics/curriculum-frameworks" className="link">GADOE frameworks</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="caption font-semibold text-[var(--color-ink)] uppercase tracking-wider">Connect</h3>
              <ul className="mt-3 space-y-2 small">
                <li>
                  <HashLink href={BOOK_SESSION_HREF} className="link">Contact us</HashLink>
                </li>
                <li>
                  <a href={`mailto:${ADAM_EMAIL}`} className="link">Email Adam</a>
                </li>
                <li>
                  <a href={`mailto:${ALAN_EMAIL}`} className="link">Email Alan</a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <hr className="divider my-10" />

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <p className="caption text-[var(--color-ink-soft)]">
            © {YEAR} Adam&apos;s Alphabet · {TUTOR_NAMES_SHORT} · Paid tutoring · Free study paths
          </p>
          <p className="caption text-[var(--color-ink-soft)]">
            Designed for extra help - not limited to students in Georgia.
          </p>
        </div>
      </div>
    </footer>
  );
}
