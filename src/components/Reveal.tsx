"use client";

import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ElementType,
  type ReactNode,
} from "react";

type RevealVariant = "up" | "up-lg" | "fade" | "left" | "right" | "scale" | "blur" | "pop";

function isInViewport(el: HTMLElement, marginRatio = 0.12) {
  const rect = el.getBoundingClientRect();
  const vh = window.innerHeight || document.documentElement.clientHeight;
  const margin = vh * marginRatio;
  return rect.top < vh - margin && rect.bottom > margin;
}

export default function Reveal({
  children,
  as: Tag = "div",
  className = "",
  delay = 0,
  variant = "up",
  stagger = false,
  threshold = 0.12,
  rootMargin = "0px 0px -10% 0px",
  style,
}: {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  delay?: number;
  variant?: RevealVariant;
  stagger?: boolean;
  threshold?: number;
  rootMargin?: string;
  style?: CSSProperties;
}) {
  const ref = useRef<HTMLElement | null>(null);
  const [played, setPlayed] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || played) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      setPlayed(true);
      return;
    }

    let done = false;
    const play = () => {
      if (done) return;
      done = true;
      setPlayed(true);
    };

    const tryPlay = () => {
      if (isInViewport(el)) play();
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) play();
      },
      { threshold, rootMargin },
    );

    observer.observe(el);

    const onScroll = () => tryPlay();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    window.addEventListener("hashchange", tryPlay);

    const t1 = window.setTimeout(tryPlay, 80);
    const t2 = window.setTimeout(tryPlay, 320);

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      window.removeEventListener("hashchange", tryPlay);
      window.clearTimeout(t1);
      window.clearTimeout(t2);
    };
  }, [played, threshold, rootMargin]);

  const awaitClass = `reveal-await-${variant}`;

  const classes = [
    className,
    !played ? awaitClass : "",
    stagger ? "reveal-stagger" : "",
    played && !stagger ? `reveal-animate-${variant}` : "",
    played && stagger ? `reveal-stagger-animate-${variant}` : "",
  ]
    .filter(Boolean)
    .join(" ");

  const mergedStyle: CSSProperties = {
    ...style,
    ...(delay > 0 && !stagger && played
      ? ({ animationDelay: `${delay}ms` } as CSSProperties)
      : {}),
  };

  return (
    <Tag ref={ref as never} className={classes} style={mergedStyle}>
      {children}
    </Tag>
  );
}
