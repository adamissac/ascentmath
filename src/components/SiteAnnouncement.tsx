import HashLink from "./HashLink";
import { SITE_ANNOUNCEMENT } from "../data/site-announcement";
import { BOOK_SESSION_HREF } from "../lib/site-paths";

export default function SiteAnnouncement() {
  if (!SITE_ANNOUNCEMENT.enabled) return null;

  return (
    <div className="site-announcement" role="status" aria-live="polite">
      <p className="site-announcement__text">
        <span>{SITE_ANNOUNCEMENT.message}</span>{" "}
        <HashLink href={BOOK_SESSION_HREF} className="site-announcement__link">
          Book a session →
        </HashLink>
      </p>
    </div>
  );
}
