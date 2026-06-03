"use client";

import Image from "next/image";
import { useState } from "react";

type Props = {
  videoId: string;
  title: string;
  description?: string;
  source?: string;
  className?: string;
  /** Compact layout for topic pages (smaller player + tighter meta). */
  size?: "default" | "compact";
};

const SIZE = {
  default: {
    card: "",
    play: "w-14 h-14",
    playIcon: 22,
    body: "p-5 gap-2",
    title: "text-lg",
    thumbSizes: "(max-width: 768px) 100vw, 640px",
  },
  compact: {
    card: "shadow-[var(--shadow-card)]",
    play: "w-11 h-11",
    playIcon: 18,
    body: "p-3.5 sm:p-4 gap-1.5",
    title: "text-base sm:text-[1.0625rem]",
    thumbSizes: "(max-width: 768px) 100vw, 420px",
  },
} as const;

export default function VideoEmbed({
  videoId,
  title,
  description,
  source,
  className = "",
  size = "default",
}: Props) {
  const [active, setActive] = useState(false);
  const thumb = `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`;
  const embed = `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`;
  const watchUrl = `https://youtu.be/${videoId}`;
  const s = SIZE[size];
  const isCompact = size === "compact";

  return (
    <article
      className={[
        "card card-interactive overflow-hidden flex flex-col",
        isCompact ? "border-[var(--color-border)] bg-[var(--color-surface)]" : "",
        s.card,
        className,
      ].join(" ")}
    >
      <div className="relative aspect-video bg-[var(--color-surface-2)]">
        {active ? (
          <iframe
            className="absolute inset-0 w-full h-full"
            src={embed}
            title={title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
            loading="lazy"
          />
        ) : (
          <button
            type="button"
            onClick={() => setActive(true)}
            className="group absolute inset-0 w-full h-full focus:outline-none"
            aria-label={`Play video: ${title}`}
          >
            <Image
              src={thumb}
              alt=""
              fill
              sizes={s.thumbSizes}
              className="object-cover"
              unoptimized
            />
            <span className="absolute inset-0 bg-black/25 transition-opacity group-hover:bg-black/35" />
            <span className="absolute inset-0 grid place-items-center">
              <span
                className={[
                  "grid place-items-center rounded-full bg-white/95 text-[var(--color-brand-700)] shadow-lg ring-1 ring-black/5 transition-transform group-hover:scale-105",
                  s.play,
                ].join(" ")}
              >
                <svg width={s.playIcon} height={s.playIcon} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                  <path d="M8 5v14l11-7z" />
                </svg>
              </span>
            </span>
          </button>
        )}
      </div>
      <div className={`flex flex-col flex-1 ${s.body}`}>
        {source && (
          <span className="caption font-semibold tracking-wider uppercase text-[var(--color-brand-600)]">
            {source}
          </span>
        )}
        <h3 className={`font-display font-semibold text-[var(--color-ink)] leading-snug ${s.title}`}>
          {title}
        </h3>
        {description ? (
          <p
            className={[
              "text-[var(--color-ink-soft)] leading-relaxed flex-1",
              isCompact ? "text-sm line-clamp-2" : "small",
            ].join(" ")}
          >
            {description}
          </p>
        ) : null}
        <a
          href={watchUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="link small mt-0.5 inline-flex items-center gap-1"
        >
          Watch on YouTube
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <path d="M7 17L17 7" />
            <path d="M7 7h10v10" />
          </svg>
        </a>
      </div>
    </article>
  );
}
