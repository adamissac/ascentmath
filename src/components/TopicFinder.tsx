"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { searchTopics } from "../data/topic-search";

export default function TopicFinder() {
  const [query, setQuery] = useState("");

  const results = useMemo(() => searchTopics(query), [query]);

  return (
    <div className="card p-5 sm:p-6 bg-[var(--color-surface)]">
      <label htmlFor="topic-finder" className="block">
        <span className="eyebrow">Find a topic</span>
        <span className="block font-display font-semibold text-lg mt-2 text-[var(--color-ink)]">
          Search by keyword
        </span>
        <span className="block small text-[var(--color-ink-muted)] mt-1 leading-relaxed">
          Try &ldquo;GCF&rdquo;, &ldquo;slope&rdquo;, &ldquo;fractions&rdquo;, or whatever your class is working on.
        </span>
      </label>
      <div className="relative mt-4">
        <input
          id="topic-finder"
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="e.g. how to find GCF, ratios, exponents…"
          className="input pr-10"
          autoComplete="off"
        />
        <span
          aria-hidden
          className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--color-ink-soft)] pointer-events-none"
        >
          <SearchIcon />
        </span>
      </div>

      {query.trim() && (
        <div className="mt-4" role="region" aria-live="polite">
          {results.length === 0 ? (
            <p className="small text-[var(--color-ink-muted)]">
              No matches yet. Try a shorter word, pick a grade below, or use{" "}
              <Link href="/mathematics/find-your-start" className="link font-semibold">
                Find your start
              </Link>
              .
            </p>
          ) : (
            <ul className="grid gap-2 max-h-[min(320px,50vh)] overflow-y-auto overscroll-contain">
              {results.map((hit) => (
                <li key={hit.href}>
                  <Link
                    href={hit.href}
                    className="block rounded-lg border border-[var(--color-border)] px-4 py-3 no-underline hover:border-[var(--color-brand-200)] hover:bg-[var(--color-brand-50)] transition-colors"
                  >
                    <span className="block font-semibold text-[var(--color-ink)]">{hit.title}</span>
                    <span className="block caption text-[var(--color-ink-muted)] mt-0.5">
                      {hit.gradeTitle} · {hit.unitTitle}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}

function SearchIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  );
}
