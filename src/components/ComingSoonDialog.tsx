"use client";

import Link from "next/link";
import { useEffect, useId, useRef } from "react";

type Props = {
  open: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
};

/**
 * Accessible modal for temporary "coming soon" messaging on auth pages.
 */
export default function ComingSoonDialog({
  open,
  onClose,
  title = "Accounts are coming soon",
  description = "We're still setting up sign-in. You can use every math unit, video, worksheet, and quiz right now — no account needed.",
}: Props) {
  const titleId = useId();
  const descId = useId();
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[100] grid place-items-center p-4 sm:p-6"
      role="presentation"
    >
      <button
        type="button"
        aria-label="Close dialog"
        className="absolute inset-0 bg-[var(--color-ink)]/50 backdrop-blur-[2px]"
        onClick={onClose}
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={descId}
        className="relative z-[1] w-full max-w-md card p-6 sm:p-8 shadow-[var(--shadow-popover)] animate-fade-up text-[var(--color-ink)]"
      >
        <p className="eyebrow">Coming soon</p>
        <h2 id={titleId} className="font-display font-bold text-2xl mt-2 leading-snug tracking-[-0.02em]">
          {title}
        </h2>
        <p id={descId} className="small text-[var(--color-ink-muted)] mt-3 leading-relaxed">
          {description}
        </p>

        <div className="mt-7 grid gap-2.5">
          <Link href="/mathematics" className="btn btn-primary w-full justify-center">
            Browse the math library
          </Link>
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            className="btn btn-outline w-full"
          >
            Got it
          </button>
        </div>
      </div>
    </div>
  );
}
