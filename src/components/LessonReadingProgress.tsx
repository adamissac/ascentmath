"use client";

import { useEffect, useRef } from "react";

/**
 * Thin fixed progress bar under the navbar that fills as the learner
 * scrolls through a lesson page. Purely visual - no state, no layout shift.
 */
export default function LessonReadingProgress() {
  const barRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const update = () => {
      const doc = document.documentElement;
      const scrollable = doc.scrollHeight - window.innerHeight;
      const pct = scrollable > 0 ? Math.min(Math.max(window.scrollY / scrollable, 0), 1) : 0;
      if (barRef.current) barRef.current.style.transform = `scaleX(${pct})`;
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <div className="lesson-reading-progress" aria-hidden="true">
      <div ref={barRef} className="lesson-reading-progress__bar" />
    </div>
  );
}
