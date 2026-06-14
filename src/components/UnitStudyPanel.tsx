"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import UnitProgressPanel from "./UnitProgressPanel";
import type { ProgressItem } from "../hooks/useUnitProgress";

type NavLink = { href: string; label: string };

const PANEL_WIDTH = 280;
const PANEL_LABEL = "Unit menu";
const DESKTOP_QUERY = "(min-width: 1024px)";

/**
 * Left unit menu - open by default on desktop; users can close it. On mobile
 * it stays closed until opened as a slide-over drawer. On desktop, opening
 * the menu uses a two-column layout so lesson content shifts right.
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
  const userClosedRef = useRef(false);

  useEffect(() => {
    const mq = window.matchMedia(DESKTOP_QUERY);
    const sync = () => {
      const desktop = mq.matches;
      setIsDesktop(desktop);
      if (desktop) {
        if (!userClosedRef.current) setOpen(true);
      } else {
        setOpen(false);
      }
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
    userClosedRef.current = true;
    setOpen(false);
  }

  function openPanel() {
    userClosedRef.current = false;
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
            {PANEL_LABEL}
          </p>
          <p className="small font-semibold text-[var(--color-ink)] mt-0.5 truncate">
            {unitTitle}
          </p>
        </div>
        <button
          type="button"
          onClick={closePanel}
          className="w-10 h-10 rounded-full grid place-items-center text-[var(--color-ink-muted)] hover:bg-[var(--color-surface-2)] hover:text-[var(--color-ink)] transition-colors flex-shrink-0"
          aria-label={`Close ${PANEL_LABEL.toLowerCase()}`}
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

  const desktopOpen = mounted && isDesktop && open;

  const asideClass = [
    isDesktop
      ? "hidden lg:block sticky top-[4.25rem] z-20 self-start shrink-0 overflow-y-auto"
      : "lg:hidden fixed top-[4.25rem] left-3 z-50 h-[calc(100dvh-4.25rem-0.75rem)] overflow-y-auto overscroll-contain transition-transform duration-300 ease-[cubic-bezier(0.22,0.9,0.3,1)] motion-reduce:transition-none",
    "max-h-[calc(100dvh-4.25rem)] overscroll-contain",
    "bg-[var(--color-surface)] rounded-r-xl border border-[var(--color-border)]",
    isDesktop
      ? "shadow-[var(--shadow-card)]"
      : "shadow-[var(--shadow-popover)]",
    isDesktop && !open ? "lg:hidden" : "",
    !isDesktop && (open ? "translate-x-0" : "-translate-x-[calc(100%+0.75rem)] pointer-events-none"),
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className="unit-study-panel">
      {/* Mobile backdrop */}
      {mounted && !isDesktop && open && (
        <button
          type="button"
          aria-label={`Close ${PANEL_LABEL.toLowerCase()}`}
          className="fixed inset-0 z-40 bg-black/40 lg:hidden"
          onClick={closePanel}
        />
      )}

      <div className={isDesktop ? "lg:px-6 xl:px-10" : undefined}>
        <div
          className={[
            "w-full",
            desktopOpen
              ? "lg:grid lg:grid-cols-[280px_minmax(0,1fr)] lg:gap-x-6 lg:items-start"
              : "",
          ].join(" ")}
        >
          <aside
            aria-label={PANEL_LABEL}
            aria-hidden={!open}
            className={asideClass}
            style={
              isDesktop
                ? { width: PANEL_WIDTH }
                : { width: PANEL_WIDTH, maxWidth: "min(280px, calc(100vw - 1.5rem))" }
            }
          >
            {panelContent}
          </aside>

          <div className="unit-study-main min-w-0 w-full">
            {mounted && !open && (
              <div className="sticky top-[4.25rem] z-20 mb-3 page-x sm:px-0 lg:px-0">
                <button
                  type="button"
                  onClick={openPanel}
                  className={[
                    "inline-flex items-center gap-2 min-h-[44px]",
                    "px-3.5 py-2 rounded-lg",
                    "bg-[var(--color-brand-600)] text-white font-semibold text-sm",
                    "shadow-[var(--shadow-popover)] hover:bg-[var(--color-brand-700)] transition-colors",
                  ].join(" ")}
                  aria-label={`Open ${PANEL_LABEL.toLowerCase()}`}
                  aria-expanded={false}
                >
                  <GuideIcon />
                  <span>{PANEL_LABEL}</span>
                </button>
              </div>
            )}

            {children}
          </div>
        </div>
      </div>
    </div>
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
