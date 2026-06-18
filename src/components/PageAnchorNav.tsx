"use client";

import { useEffect, useState } from "react";
import Container from "./Container";
import HashLink from "./HashLink";

export type PageAnchor = { id: string; label: string };

type Props = {
  links: PageAnchor[];
  containerSize?: "sm" | "md" | "lg" | "xl";
};

export default function PageAnchorNav({ links, containerSize = "xl" }: Props) {
  const [activeId, setActiveId] = useState<string | null>(links[0]?.id ?? null);

  useEffect(() => {
    if (links.length === 0) return;

    const ids = links.map((l) => l.id);
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el));

    if (elements.length === 0) return;

    const ratios = new Map<string, number>();

    const pickActive = () => {
      let bestId: string | null = null;
      let bestRatio = 0;
      for (const [id, ratio] of ratios) {
        if (ratio > bestRatio) {
          bestRatio = ratio;
          bestId = id;
        }
      }
      if (bestId) setActiveId(bestId);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const id = entry.target.id;
          if (entry.isIntersecting) {
            ratios.set(id, entry.intersectionRatio);
          } else {
            ratios.delete(id);
          }
        }
        pickActive();
      },
      { rootMargin: "-30% 0px -55% 0px", threshold: [0, 0.1, 0.25, 0.5, 0.75, 1] },
    );

    for (const el of elements) observer.observe(el);

    const onHashChange = () => {
      const hash = window.location.hash.replace(/^#/, "");
      if (hash && ids.includes(hash)) setActiveId(hash);
    };
    window.addEventListener("hashchange", onHashChange);
    onHashChange();

    return () => {
      observer.disconnect();
      window.removeEventListener("hashchange", onHashChange);
    };
  }, [links]);

  if (links.length === 0) return null;

  return (
    <nav
      aria-label="On this page"
      className="sticky top-[4.25rem] z-20 border-b border-[var(--color-border)] bg-[var(--color-surface)]/92 backdrop-blur-md"
    >
      <Container size={containerSize} className="py-2.5">
        <div className="-mx-1 flex gap-1.5 overflow-x-auto px-1 pb-0.5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {links.map((link) => {
            const isActive = activeId === link.id;
            return (
              <HashLink
                key={link.id}
                href={`#${link.id}`}
                className={[
                  "inline-flex shrink-0 items-center rounded-full px-3.5 py-1.5 text-sm font-semibold no-underline transition-[background-color,border-color,color,transform] duration-200",
                  isActive
                    ? "border border-[var(--color-brand-200)] bg-[var(--color-brand-50)] text-[var(--color-brand-700)]"
                    : "border border-transparent text-[var(--color-ink-muted)] hover:border-[var(--color-border)] hover:bg-[var(--color-surface-2)] hover:text-[var(--color-brand-700)]",
                ].join(" ")}
                aria-current={isActive ? "location" : undefined}
              >
                {link.label}
              </HashLink>
            );
          })}
        </div>
      </Container>
    </nav>
  );
}
