import { SITE_ANNOUNCEMENT, SITE_ANNOUNCEMENT_STORAGE_KEY } from "../data/site-announcement";

type DismissRecord = {
  id: string;
  dismissedAt: number;
};

function readDismissRecord(): DismissRecord | null {
  try {
    const raw = localStorage.getItem(SITE_ANNOUNCEMENT_STORAGE_KEY);
    if (!raw) return null;

    try {
      const parsed = JSON.parse(raw) as DismissRecord;
      if (parsed?.id && typeof parsed.dismissedAt === "number") return parsed;
    } catch {
      /* legacy: plain announcement id string */
      if (raw === SITE_ANNOUNCEMENT.id) {
        return { id: raw, dismissedAt: Date.now() };
      }
    }
  } catch {
    /* private browsing / blocked storage */
  }
  return null;
}

export function isAnnouncementDismissed(): boolean {
  const record = readDismissRecord();
  if (!record || record.id !== SITE_ANNOUNCEMENT.id) return false;

  const msHidden = SITE_ANNOUNCEMENT.dismissDays * 24 * 60 * 60 * 1000;
  return Date.now() - record.dismissedAt < msHidden;
}

export function saveAnnouncementDismissed(): void {
  const record: DismissRecord = {
    id: SITE_ANNOUNCEMENT.id,
    dismissedAt: Date.now(),
  };
  localStorage.setItem(SITE_ANNOUNCEMENT_STORAGE_KEY, JSON.stringify(record));
}
