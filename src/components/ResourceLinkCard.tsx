"use client";

import type { ReactNode } from "react";

type Props = {
  href: string;
  title: string;
  description?: string;
  source?: string;
  icon?: ReactNode;
};

export default function ResourceLinkCard({ href, title, description, source, icon }: Props) {
  const isExternal = /^https?:\/\//.test(href);
  return (
    <a
      href={href}
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noopener noreferrer" : undefined}
      className="card card-interactive group p-5 flex flex-col gap-2 no-underline"
    >
      <div className="flex items-center gap-3">
        {icon && (
          <span className="w-10 h-10 grid place-items-center rounded-md bg-[var(--color-brand-50)] text-[var(--color-brand-600)]">
            {icon}
          </span>
        )}
        {source && (
          <span className="caption font-semibold tracking-wider uppercase text-[var(--color-brand-600)]">
            {source}
          </span>
        )}
      </div>
      <h3 className="font-display font-semibold text-lg text-[var(--color-ink)] group-hover:text-[var(--color-brand-700)] transition-colors break-words">
        {title}
      </h3>
      {description && <p className="small text-[var(--color-ink-muted)]">{description}</p>}
      <span className="link small mt-1 inline-flex items-center gap-1">
        Open resource
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <path d="M7 17L17 7" /><path d="M7 7h10v10" />
        </svg>
      </span>
    </a>
  );
}
