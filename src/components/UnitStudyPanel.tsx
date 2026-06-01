"use client";

import { useEffect, useState, type ReactNode } from "react";
import UnitProgressPanel from "./UnitProgressPanel";
import type { ProgressItem } from "../hooks/useUnitProgress";

type NavLink = { href: string; label: string };

const PANEL_WIDTH = 280;
const DESKTOP_QUERY = "(min-width: 1024px)";

/**
 * Left study guide — pushes main content when open on desktop. On mobile it
 * becomes a slide-over drawer so unit content stays full-width.
 */
export default function UnitStudyPanel({
  unitId,
  unitTitle,
  progressItems,
  navLinks,
  children,
}: {
  unitId: string;
  unitTitle: string;
  progressItems: ProgressItem[];
  navLinks: NavLink[];
  children: ReactNode;
}) {
  const [isDesktop, setIsDesktop] = useState(false);
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia(DESKTOP_QUERY);
    const sync = () => {
      const desktop = mq.matches;
      setIsDesktop(desktop);
      setOpen(desktop);
    };
    sync();
    setMounted(true);
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    if (isDesktop || !open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [isDesktop, open]);

  function closePanel() {
    setOpen(false);
  }

  function openPanel() {
    setOpen(true);
  }

  function onNavClick() {
    if (!isDesktop) closePanel();
  }

  const panelContent = (
    <>
      <div className="flex items-center justify-between gap-3 px-4 py-4 border-b border-[var(--color-border)]">
        <div className="min-w-0">
          <p className="caption font-semibold tracking-wider uppercase text-[var(--color-brand-600)]">
            Study guide
          </p>
          <p className="small font-semibold text-[var(--color-ink)] mt-0.5 truncate">
            {unitTitle}
          </p>
        </div>
        <button
          type="button"
          onClick={closePanel}
          className="w-10 h-10 rounded-full grid place-items-center text-[var(--color-ink-muted)] hover:bg-[var(--color-surface-2)] hover:text-[var(--color-ink)] transition-colors flex-shrink-0"
          aria-label="Close study guide"
        >
          <ChevronLeft />
        </button>
      </div>

      <div className="p-4 grid gap-5">
        <UnitProgressPanel unitId={unitId} unitTitle={unitTitle} items={progressItems} />

        {navLinks.length > 0 && (
          <nav aria-label="Jump to section">
            <p className="caption font-semibold tracking-wider uppercase text-[var(--color-ink-soft)] mb-2">
              On this page
            </p>
            <ul className="grid gap-0.5">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={onNavClick}
                    className="block px-3 py-2.5 rounded-md text-sm text-[var(--color-ink-muted)] hover:text-[var(--color-brand-700)] hover:bg-[var(--color-surface-2)] transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        )}
      </div>
    </>
  );

  return (
    <>
      {/* Mobile backdrop */}
      {mounted && !isDesktop && open && (
        <button
          type="button"
          aria-label="Close study guide"
          className="fixed inset-0 z-40 bg-black/40 lg:hidden"
          onClick={closePanel}
        />
      )}

      <div
        className={isDesktop ? "lg:px-5 xl:px-8" : undefined}
      >
      <div
        className={[
          "w-full items-start",
          isDesktop
            ? [
                "grid transition-[grid-template-columns] duration-300 ease-[cubic-bezier(0.22,0.9,0.3,1)] motion-reduce:transition-none",
                open ? "lg:gap-10 xl:gap-12" : "",
              ].join(" ")
            : "block",
        ].join(" ")}
        style={
          isDesktop
            ? {
                gridTemplateColumns: open
                  ? `${PANEL_WIDTH}px minmax(0, 1fr)`
                  : "0px minmax(0, 1fr)",
              }
            : undefined
        }
      >
        {/* Desktop — sticky sidebar that pushes content */}
        <aside
          aria-label="Study guide"
          aria-hidden={!open}
          className={[
            "hidden lg:block sticky top-[4.25rem] z-10 min-w-0 self-start",
            "max-h-[calc(100dvh-4.25rem)] overflow-y-auto overscroll-contain",
            "bg-[var(--color-surface)] rounded-r-xl",
            "border border-[var(--color-border)] shadow-[var(--shadow-card)]",
            "transition-opacity duration-200",
            open ? "opacity-100" : "opacity-0 pointer-events-none",
          ].join(" ")}
          style={{ width: PANEL_WIDTH }}
        >
          {panelContent}
        </aside>

        {/* Mobile — fixed slide-over drawer */}
        <aside
          aria-label="Study guide"
          aria-hidden={!open}
          className={[
            "lg:hidden fixed top-[4.25rem] left-0 z-50 h-[calc(100dvh-4.25rem)] overflow-y-auto overscroll-contain",
            "bg-[var(--color-surface)] border-r border-[var(--color-border)] shadow-[var(--shadow-popover)]",
            "transition-transform duration-300 ease-[cubic-bezier(0.22,0.9,0.3,1)] motion-reduce:transition-none",
            open ? "translate-x-0" : "-translate-x-full pointer-events-none",
          ].join(" ")}
          style={{ width: PANEL_WIDTH, maxWidth: "min(280px, 85vw)" }}
        >
          {panelContent}
        </aside>

        <div className={["min-w-0", isDesktop && open ? "lg:pt-1" : ""].join(" ")}>
          {!open && (
            <div className="sticky top-[4.25rem] z-20 mb-2 px-4 sm:px-0 lg:px-0">
              <button
                type="button"
                onClick={openPanel}
                className={[
                  "inline-flex items-center gap-2 min-h-[44px]",
                  "px-3 py-2 rounded-r-lg rounded-l-none",
                  "bg-[var(--color-brand-600)] text-white font-semibold text-sm",
                  "shadow-[var(--shadow-popover)] hover:bg-[var(--color-brand-700)] transition-colors",
                ].join(" ")}
                aria-label="Open study guide"
                aria-expanded={false}
              >
                <GuideIcon />
                <span className="hidden sm:inline">Study guide</span>
              </button>
            </div>
          )}

          {children}
        </div>
      </div>
      </div>
    </>
  );
}

function GuideIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
    </svg>
  );
}

function ChevronLeft() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <polyline points="15 18 9 12 15 6" />
    </svg>
  );
}
