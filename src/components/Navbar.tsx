"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { useAuth } from "./AuthProvider";
import HashLink from "./HashLink";
import { BOOK_SESSION_HREF, STUDY_PATHS_HREF } from "../lib/site-paths";
import { scrollToPageTop } from "../lib/scroll-to-hash";
import { SITE_BRAND_NAME, SITE_BRAND_WORDS } from "../data/site-team";

const NAV_LINKS = [
  { href: "/#what-we-teach", label: "Tutoring", sectionId: "what-we-teach" },
  { href: STUDY_PATHS_HREF, label: "Study paths", sectionId: "study-paths" },
] as const;

const HOME_NAV_SECTIONS = ["what-we-teach", "study-paths"] as const;
type HomeNavSection = (typeof HOME_NAV_SECTIONS)[number];

function hashToHomeSection(hash: string): HomeNavSection | null {
  const id = hash.replace(/^#/, "");
  return HOME_NAV_SECTIONS.includes(id as HomeNavSection) ? (id as HomeNavSection) : null;
}

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [homeSection, setHomeSection] = useState<HomeNavSection | null>(null);
  const menuRef = useRef<HTMLDivElement | null>(null);

  const { user, profile, loading, signOut } = useAuth();

  useEffect(() => {
    setOpen(false);
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!menuOpen) return;
    const onDown = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) setMenuOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("mousedown", onDown);
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("keydown", onKey);
    };
  }, [menuOpen]);

  useEffect(() => {
    if (pathname !== "/") {
      setHomeSection(null);
      return;
    }

    const syncFromHash = () => {
      setHomeSection(hashToHomeSection(window.location.hash));
    };
    syncFromHash();
    window.addEventListener("hashchange", syncFromHash);

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]?.target.id) {
          const id = visible[0].target.id;
          if (HOME_NAV_SECTIONS.includes(id as HomeNavSection)) {
            setHomeSection(id as HomeNavSection);
          }
        }
      },
      { rootMargin: "-30% 0px -55% 0px", threshold: [0, 0.1, 0.25, 0.5, 0.75, 1] },
    );

    for (const id of HOME_NAV_SECTIONS) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }

    return () => {
      window.removeEventListener("hashchange", syncFromHash);
      observer.disconnect();
    };
  }, [pathname]);

  const isActive = (href: string, sectionId: HomeNavSection | null) => {
    if (sectionId === "study-paths") {
      if (pathname?.startsWith("/mathematics")) return true;
      return pathname === "/" && homeSection === "study-paths";
    }
    if (sectionId === "what-we-teach") {
      return pathname === "/" && homeSection === "what-we-teach";
    }
    if (href === "/") return pathname === "/";
    return pathname === href || (pathname?.startsWith(`${href}/`) ?? false);
  };

  const NavAnchor = ({ href, className, children, onNavigate }: {
    href: string;
    className: string;
    children: ReactNode;
    onNavigate?: () => void;
  }) => {
    const props = { href, className, onClick: onNavigate };
    return href.includes("#") ? (
      <HashLink {...props}>{children}</HashLink>
    ) : (
      <Link {...props}>{children}</Link>
    );
  };

  async function handleSignOut() {
    setMenuOpen(false);
    try {
      await signOut();
      router.replace("/");
    } catch {
      /* swallow */
    }
  }

  const displayName =
    profile?.displayName?.trim() ||
    user?.displayName?.trim() ||
    (user?.email ? user.email.split("@")[0] : "");
  const initial = (displayName[0] || user?.email?.[0] || "?").toUpperCase();

  function handleHomeClick(e: React.MouseEvent<HTMLAnchorElement>) {
    if (pathname !== "/") return;
    e.preventDefault();
    scrollToPageTop();
    setOpen(false);
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 w-full border-b border-[var(--color-brand-100)] border-t-[3px] border-t-[var(--color-brand-600)] bg-white shadow-sm">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 safe-x">
        <div className="flex h-[4.25rem] items-center justify-between gap-2 sm:gap-6">
          <Link
            href="/"
            onClick={handleHomeClick}
            className="group flex items-center gap-2.5 font-display font-bold text-[1.0625rem] text-[var(--color-brand-700)] hover:text-[var(--color-brand-600)] transition-all min-w-0"
            aria-label={`${SITE_BRAND_NAME} - home`}
          >
            <span className="nav-logo-wrap">
              <Image
                src="/newLogo.png"
                alt=""
                width={40}
                height={40}
                sizes="40px"
                className="h-full w-full object-cover"
                priority
              />
            </span>
            <span className="truncate hidden min-[400px]:inline">
              <span className="nav-brand-name">
                <span>{SITE_BRAND_WORDS[0]}</span>
                <span>{SITE_BRAND_WORDS[1]}</span>
              </span>
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-1 rounded-full bg-[var(--color-brand-50)]/50 p-1 ring-1 ring-[var(--color-brand-100)]/60" aria-label="Primary">
            {NAV_LINKS.map((l) => (
              <NavAnchor
                key={l.href}
                href={l.href}
                className={[
                  "relative px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]",
                  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-brand-500)]",
                  isActive(l.href, l.sectionId)
                    ? "text-[var(--color-brand-700)] bg-white shadow-sm ring-1 ring-[var(--color-brand-100)]"
                    : "text-[var(--color-ink)] hover:text-[var(--color-brand-700)] hover:bg-white/70",
                ].join(" ")}
              >
                {l.label}
              </NavAnchor>
            ))}
          </nav>

          {/* Right-side CTAs depend on auth state */}
          <div className="hidden md:flex items-center gap-2">
            {loading && user ? (
              <span className="w-9 h-9 rounded-full bg-[var(--color-surface-2)] animate-pulse" />
            ) : user ? (
              <div className="relative" ref={menuRef}>
                <button
                  type="button"
                  onClick={() => setMenuOpen((v) => !v)}
                  aria-expanded={menuOpen}
                  aria-haspopup="menu"
                  className="flex items-center gap-2 pl-1 pr-3 py-1 rounded-full hover:bg-[var(--color-surface-2)] transition-colors"
                >
                  <span className="w-8 h-8 rounded-full bg-[var(--color-brand-500)] text-white grid place-items-center text-sm font-bold">
                    {initial}
                  </span>
                  <span className="text-sm font-semibold text-[var(--color-ink)] max-w-[120px] truncate">
                    {displayName}
                  </span>
                  <Caret />
                </button>
                {menuOpen && (
                  <div
                    role="menu"
                    className="absolute right-0 top-full mt-2 min-w-[220px] bg-white border border-[var(--color-border)] rounded-lg shadow-[var(--shadow-popover)] py-1.5 animate-fade-up"
                  >
                    <div className="px-3 py-2 border-b border-[var(--color-border)] mb-1">
                      <p className="caption text-[var(--color-ink-soft)] uppercase tracking-wider">
                        Signed in as
                      </p>
                      <p className="text-sm font-semibold text-[var(--color-ink)] truncate">
                        {user.email}
                      </p>
                    </div>
                    <MenuLink href="/dashboard">My account</MenuLink>
                    <MenuLink href={BOOK_SESSION_HREF}>Book a session</MenuLink>
                    <MenuLink href={STUDY_PATHS_HREF}>Continue learning</MenuLink>
                    <div className="my-1 h-px bg-[var(--color-border)]" />
                    <button
                      type="button"
                      onClick={handleSignOut}
                      role="menuitem"
                      className="w-full text-left px-3 py-2 text-sm text-[var(--color-ink)] hover:bg-[var(--color-surface-2)] transition-colors"
                    >
                      Sign out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <HashLink
                href={BOOK_SESSION_HREF}
                className="btn btn-primary btn-sm shadow-[0_8px_20px_-8px_rgba(42,75,203,0.55)] hover:-translate-y-0.5 hover:shadow-[0_12px_24px_-10px_rgba(42,75,203,0.5)] transition-[transform,box-shadow]"
              >
                Book a session
                <span aria-hidden>→</span>
              </HashLink>
            )}
          </div>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="md:hidden inline-flex items-center justify-center rounded-md min-w-[44px] min-h-[44px] p-2 text-[var(--color-ink)] hover:bg-[var(--color-surface-2)] focus:outline-none"
            aria-controls="mobile-menu"
            aria-expanded={open}
            aria-label="Toggle menu"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              {open ? (
                <>
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </>
              ) : (
                <>
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <line x1="3" y1="12" x2="21" y2="12" />
                  <line x1="3" y1="18" x2="21" y2="18" />
                </>
              )}
            </svg>
          </button>
        </div>
      </div>

      {open && (
        <div
          id="mobile-menu"
          className="md:hidden border-t border-[var(--color-brand-100)] bg-white shadow-[0_16px_40px_-16px_rgba(26,26,46,0.15)] max-h-[calc(100dvh-4.25rem)] overflow-y-auto overscroll-contain animate-fade-up"
        >
          <nav className="page-x py-3 flex flex-col gap-1" aria-label="Mobile">
            {NAV_LINKS.map((l) => (
              <NavAnchor
                key={l.href}
                href={l.href}
                onNavigate={() => setOpen(false)}
                className={[
                  "px-3 py-3 rounded-md text-base font-medium min-h-[44px] flex items-center",
                  isActive(l.href, l.sectionId)
                    ? "text-[var(--color-brand-700)] bg-[var(--color-brand-50)]"
                    : "text-[var(--color-ink)] hover:bg-[var(--color-surface-2)]",
                ].join(" ")}
              >
                {l.label}
              </NavAnchor>
            ))}

            <div className="my-2 h-px bg-[var(--color-border)]" />

            {loading && user ? (
              <span className="px-3 py-2 text-sm text-[var(--color-ink-muted)]">…</span>
            ) : user ? (
              <>
                <div className="px-3 py-2">
                  <p className="caption text-[var(--color-ink-soft)] uppercase tracking-wider">
                    Signed in as
                  </p>
                  <p className="text-sm font-semibold text-[var(--color-ink)] truncate">
                    {user.email}
                  </p>
                </div>
                <Link
                  href="/dashboard"
                  className="px-3 py-2 rounded-md text-base font-medium text-[var(--color-ink)] hover:bg-[var(--color-surface-2)]"
                >
                  My account
                </Link>
                <button
                  type="button"
                  onClick={handleSignOut}
                  className="text-left px-3 py-2 rounded-md text-base font-medium text-[var(--color-ink)] hover:bg-[var(--color-surface-2)]"
                >
                  Sign out
                </button>
              </>
            ) : (
              <>
                <HashLink href={BOOK_SESSION_HREF} className="btn btn-primary mt-2">
                  Book a session →
                </HashLink>
                <Link
                  href="/signup"
                  className="px-3 py-2 rounded-md text-base font-medium text-[var(--color-ink)] hover:bg-[var(--color-surface-2)]"
                >
                  Create account
                </Link>
              </>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}

function MenuLink({ href, children }: { href: string; children: React.ReactNode }) {
  const className =
    "block px-3 py-2 text-sm text-[var(--color-ink)] hover:bg-[var(--color-surface-2)] transition-colors";
  if (href.includes("#")) {
    return (
      <HashLink href={href} role="menuitem" className={className}>
        {children}
      </HashLink>
    );
  }
  return (
    <Link href={href} role="menuitem" className={className}>
      {children}
    </Link>
  );
}

function Caret() {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      className="text-[var(--color-ink-soft)]"
    >
      <polyline points="6 9 12 15 18 9" />
    </svg>
  );
}
