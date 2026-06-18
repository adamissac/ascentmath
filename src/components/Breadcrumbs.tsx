"use client";

import Link from "next/link";
import HashLink from "./HashLink";

export type Crumb = { label: string; href?: string };

export default function Breadcrumbs({
  items,
  tone = "default",
}: {
  items: Crumb[];
  tone?: "default" | "onDark";
}) {
  const onDark = tone === "onDark";

  return (
    <nav aria-label="Breadcrumb" className="max-w-full text-sm">
      <ol
        className={[
          "flex flex-wrap items-center gap-x-1.5 gap-y-1",
          onDark ? "text-white/55" : "text-[var(--color-ink-muted)]",
        ].join(" ")}
      >
        {items.map((item, idx) => {
          const last = idx === items.length - 1;
          const linkClass = onDark
            ? "transition-colors hover:text-white"
            : "transition-colors hover:text-[var(--color-brand-600)]";

          return (
            <li key={`${item.label}-${idx}`} className="flex items-center gap-1.5">
              {item.href && !last ? (
                item.href.includes("#") ? (
                  <HashLink href={item.href} className={linkClass}>
                    {item.label}
                  </HashLink>
                ) : (
                  <Link href={item.href} className={linkClass}>
                    {item.label}
                  </Link>
                )
              ) : (
                <span
                  className={[
                    "break-words",
                    last
                      ? onDark
                        ? "font-medium text-white"
                        : "font-medium text-[var(--color-ink)]"
                      : "",
                  ].join(" ")}
                  aria-current={last ? "page" : undefined}
                >
                  {item.label}
                </span>
              )}
              {!last && (
                <span aria-hidden className={onDark ? "text-white/35" : "text-[var(--color-ink-soft)]"}>
                  /
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

