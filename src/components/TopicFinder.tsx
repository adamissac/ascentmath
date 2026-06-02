"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { searchTopics } from "../data/topic-search";

type Props = {
  variant?: "default" | "prominent";
  suggestions?: string[];
};

export default function TopicFinder({ variant = "default", suggestions = [] }: Props) {
  const [query, setQuery] = useState("");
  const prominent = variant === "prominent";

  const results = useMemo(() => searchTopics(query), [query]);

  if (prominent) {
    return (
      <div className="rounded-xl bg-white shadow-[0_8px_32px_rgba(15,17,21,0.12)] p-4 sm:p-5">
        <label htmlFor="topic-finder" className="block">
          <span className="font-display font-bold text-lg text-[var(--color-ink)]">
            Search by keyword
          </span>
          <span className="block small text-[var(--color-ink-muted)] mt-1">
            Type anything your class is working on — we&apos;ll find the matching lesson.
          </span>
        </label>

        <SearchField
          id="topic-finder"
          value={query}
          onChange={setQuery}
          placeholder="Try GCF, slope, fractions, exponents…"
          size="lg"
          className="mt-4"
        />

        {suggestions.length > 0 && !query.trim() && (
          <div className="mt-3 flex flex-wrap gap-2">
            <span className="caption text-[var(--color-ink-soft)] font-semibold py-1">Popular:</span>
            {suggestions.map((term) => (
              <button
                key={term}
                type="button"
                onClick={() => setQuery(term)}
                className="px-3 py-1.5 rounded-full text-sm font-semibold bg-[var(--color-brand-50)] text-[var(--color-brand-700)] border border-[var(--color-brand-100)] hover:bg-[var(--color-brand-100)] transition-colors"
              >
                {term}
              </button>
            ))}
          </div>
        )}

        {query.trim() && (
          <ResultsList results={results} query={query} className="mt-4" />
        )}
      </div>
    );
  }

  return (
    <div className="card p-5 sm:p-6 bg-[var(--color-surface)] border-2 border-[var(--color-brand-100)] shadow-[var(--shadow-card)]">
      <label htmlFor="topic-finder-default" className="block">
        <span className="eyebrow">Find a topic</span>
        <span className="block font-display font-semibold text-xl mt-2 text-[var(--color-ink)]">
          Search the library
        </span>
        <span className="block small text-[var(--color-ink-muted)] mt-1 leading-relaxed">
          Try &ldquo;GCF&rdquo;, &ldquo;slope&rdquo;, &ldquo;fractions&rdquo;, or whatever your class is working on.
        </span>
      </label>
      <SearchField
        id="topic-finder-default"
        value={query}
        onChange={setQuery}
        placeholder="e.g. how to find GCF, ratios, exponents…"
        className="mt-4"
      />
      {query.trim() && <ResultsList results={results} query={query} className="mt-4" />}
    </div>
  );
}

function ResultsList({
  results,
  query,
  className,
}: {
  results: ReturnType<typeof searchTopics>;
  query: string;
  className?: string;
}) {
  return (
    <div className={className} role="region" aria-live="polite">
      {results.length === 0 ? (
        <p className="small text-[var(--color-ink-muted)] rounded-lg bg-[var(--color-surface-2)] p-3">
          No matches for &ldquo;{query}&rdquo;. Try a shorter word or{" "}
          <Link href="/mathematics/find-your-start" className="link font-semibold">
            Find your start
          </Link>
          .
        </p>
      ) : (
        <ul className="grid gap-2 max-h-[min(280px,45vh)] overflow-y-auto overscroll-contain">
          {results.map((hit) => (
            <li key={hit.href}>
              <Link
                href={hit.href}
                className="block rounded-lg border border-[var(--color-border)] px-4 py-3 no-underline hover:border-[var(--color-brand-300)] hover:bg-[var(--color-brand-50)] transition-colors"
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
  );
}

function SearchField({
  id,
  value,
  onChange,
  placeholder,
  size = "md",
  className = "",
}: {
  id: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  size?: "md" | "lg";
  className?: string;
}) {
  const rootClass = [
    "topic-search-field",
    size === "lg" ? "topic-search-field--lg" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={rootClass}>
      <span className="topic-search-field__icon" aria-hidden>
        <SearchIcon />
      </span>
      <input
        id={id}
        type="text"
        role="searchbox"
        inputMode="search"
        enterKeyHint="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        autoComplete="off"
        spellCheck={false}
        className="topic-search-field__input"
      />
    </div>
  );
}

function SearchIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  );
}
