/** Fixed site header height — keep in sync with Navbar (`h-[4.25rem]` + top border). */
export const SCROLL_NAV_OFFSET_PX = 72;

export const SCROLL_ANCHOR_CLASS = "scroll-mt-[5.5rem]";

const FLASH_CLASS = "scroll-target-flash";

/** Extra scroll past the anchor top — e.g. land on the form, not the section edge. */
const HASH_SCROLL_EXTRA_PX: Record<string, number> = {
  "book-session": 40,
};

function getScrollMarginTop(el: HTMLElement): number {
  const raw = window.getComputedStyle(el).scrollMarginTop;
  const n = parseFloat(raw);
  return Number.isFinite(n) ? n : 0;
}

/** Scroll to an element id and sync the URL hash (used by HashLink + HashScrollHandler). */
export function scrollToHashId(id: string, behavior: ScrollBehavior = "smooth") {
  const el = document.getElementById(id);
  if (!el) return false;

  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const scrollBehavior: ScrollBehavior = reduced ? "auto" : behavior;

  const marginTop = getScrollMarginTop(el);
  const headerOffset = Math.max(SCROLL_NAV_OFFSET_PX, marginTop);
  const extra = HASH_SCROLL_EXTRA_PX[id] ?? 0;
  const top =
    window.scrollY + el.getBoundingClientRect().top - headerOffset - extra;

  window.scrollTo({ top: Math.max(0, top), behavior: scrollBehavior });

  const path = window.location.pathname || "/";
  window.history.replaceState(null, "", `${path}#${encodeURIComponent(id)}`);
  window.dispatchEvent(new Event("scroll"));
  window.dispatchEvent(new HashChangeEvent("hashchange"));

  if (!reduced) {
    el.classList.remove(FLASH_CLASS);
    void el.offsetWidth;
    el.classList.add(FLASH_CLASS);
    window.setTimeout(() => el.classList.remove(FLASH_CLASS), 1200);
  }

  return true;
}

/** True on browser refresh (not client-side navigations). */
export function isPageReload(): boolean {
  if (typeof window === "undefined") return false;
  const entry = performance.getEntriesByType("navigation")[0] as
    | PerformanceNavigationTiming
    | undefined;
  return entry?.type === "reload";
}

/** Navigation type is fixed for the whole tab session — only run reload logic once per document. */
let homeReloadResetDone = false;

/**
 * True once after a full refresh on `/`, so we can open at the hero without
 * re-firing on every hash link click (reload type stays "reload" forever).
 */
export function shouldResetHomeOnReload(): boolean {
  if (homeReloadResetDone || !isPageReload()) return false;
  homeReloadResetDone = true;
  return true;
}

/** Scroll to the top of the page (respects reduced motion). */
export function scrollToPageTop() {
  if (typeof window === "undefined") return;
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  window.history.replaceState(null, "", window.location.pathname || "/");
  window.scrollTo({ top: 0, behavior: reduced ? "auto" : "smooth" });
}

export const PENDING_HASH_KEY = "aa_pending_hash";

export function stashPendingHash(id: string) {
  try {
    sessionStorage.setItem(PENDING_HASH_KEY, id);
  } catch {
    /* private mode */
  }
}

export function takePendingHash(): string | null {
  try {
    const id = sessionStorage.getItem(PENDING_HASH_KEY);
    if (id) sessionStorage.removeItem(PENDING_HASH_KEY);
    return id;
  } catch {
    return null;
  }
}

/** Retry until the target exists, then smooth-scroll once (no instant snap). */
export function smoothScrollToHashWhenReady(
  id: string,
  maxWaitMs = 1400,
): () => void {
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduced) {
    scrollToHashId(id, "auto");
    return () => {};
  }

  const start = performance.now();
  let done = false;
  let raf = 0;

  const attempt = () => {
    if (done) return;
    if (scrollToHashId(id, "smooth")) {
      done = true;
      return;
    }
    if (performance.now() - start < maxWaitMs) {
      raf = requestAnimationFrame(attempt);
    }
  };

  raf = requestAnimationFrame(attempt);
  const t = window.setTimeout(attempt, 120);

  return () => {
    done = true;
    cancelAnimationFrame(raf);
    window.clearTimeout(t);
  };
}
