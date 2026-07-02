"use client";

import { useEffect, useState } from "react";
import HashLink from "./HashLink";
import { SITE_ANNOUNCEMENT } from "../data/site-announcement";
import {
  isAnnouncementDismissed,
  saveAnnouncementDismissed,
} from "../lib/site-announcement-dismiss";
import { BOOK_SESSION_HREF } from "../lib/site-paths";

export default function SiteAnnouncement() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!SITE_ANNOUNCEMENT.enabled) return;
    if (isAnnouncementDismissed()) return;
    setVisible(true);
  }, []);

  function dismiss() {
    try {
      saveAnnouncementDismissed();
    } catch {
      /* still hide for this visit */
    }
    setVisible(false);
  }

  if (!SITE_ANNOUNCEMENT.enabled || !visible) return null;

  return (
    <div
      className="border-b border-[var(--color-brand-800)] bg-[var(--color-brand-700)] text-white"
      role="status"
      aria-live="polite"
    >
      <div className="relative mx-auto flex w-full max-w-7xl items-center justify-center px-4 py-5 sm:px-6 sm:py-6 lg:px-8 safe-x">
        <p className="m-0 flex w-full max-w-3xl flex-wrap items-center justify-center gap-x-3 gap-y-2 text-center text-base font-medium leading-relaxed sm:text-lg">
          <span>{SITE_ANNOUNCEMENT.message}</span>
          <HashLink
            href={BOOK_SESSION_HREF}
            className="site-announcement__link font-semibold text-white whitespace-nowrap"
          >
            Book a session →
          </HashLink>
        </p>
        <button
          type="button"
          onClick={dismiss}
          className="absolute top-1/2 right-4 grid h-9 w-9 -translate-y-1/2 place-items-center rounded-full text-white/85 transition-colors hover:bg-white/10 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent-300)] sm:right-6 lg:right-8"
          aria-label="Dismiss announcement"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
            <path
              d="M6 6L18 18M18 6L6 18"
              stroke="currentColor"
              strokeWidth="2.25"
              strokeLinecap="round"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
