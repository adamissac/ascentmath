"use client";

import { Suspense, useEffect } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  shouldResetHomeOnReload,
  smoothScrollToHashWhenReady,
  takePendingHash,
} from "../lib/scroll-to-hash";

function HashScrollHandlerInner() {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (typeof window !== "undefined" && "scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }
  }, []);

  useEffect(() => {
    // Full refresh only (once) — open at the hero, not the last #section.
    if (pathname === "/" && shouldResetHomeOnReload()) {
      takePendingHash();
      const hadDeepLink =
        window.location.hash.length > 1 || searchParams.has("section");
      if (hadDeepLink) {
        router.replace("/", { scroll: false });
      }
      window.scrollTo({ top: 0, behavior: "auto" });
      return;
    }

    const section = searchParams.get("section");
    if (section && pathname === "/") {
      const cleanup = smoothScrollToHashWhenReady(section);
      router.replace(`/#${section}`, { scroll: false });
      return cleanup;
    }

    const pending = takePendingHash();
    if (pending) {
      return smoothScrollToHashWhenReady(pending);
    }

    const hash = window.location.hash;
    if (!hash || hash.length < 2) return;

    const id = decodeURIComponent(hash.slice(1));
    return smoothScrollToHashWhenReady(id);
  }, [pathname, searchParams, router]);

  return null;
}

/** Smooth-scroll to #id after client navigation (App Router often skips hash scroll). */
export default function HashScrollHandler() {
  return (
    <Suspense fallback={null}>
      <HashScrollHandlerInner />
    </Suspense>
  );
}
