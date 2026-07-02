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
    <div className="site-announcement" role="status" aria-live="polite">
      <div className="site-announcement__inner">
        <p className="site-announcement__text">
          <span>{SITE_ANNOUNCEMENT.message}</span>
          <HashLink href={BOOK_SESSION_HREF} className="site-announcement__link">
            Book a session →
          </HashLink>
        </p>
        <button
          type="button"
          onClick={dismiss}
          className="site-announcement__close"
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
