import Container from "./Container";
import ContactForm from "./ContactForm";
import Reveal from "./Reveal";
import { FIRST_SESSION_FREE } from "../data/pricing";
import {
  buildBookingMailtoLink,
  REPLY_TIME_LINE,
  TUTOR_EMAILS_DISPLAY,
  TUTOR_NAMES_SHORT,
} from "../data/site-team";

const DETAILS = [
  { term: "First session", value: "Free for new clients" },
  { term: "Reply time", value: "Within 1–2 days" },
  { term: "Format", value: "Zoom or in-person · Atlanta area" },
  { term: "Inbox", value: TUTOR_EMAILS_DISPLAY },
] as const;

export default function HomeBookingSection() {
  return (
    <section
      id="book-session"
      className="scroll-mt-[5.5rem] border-t border-[var(--color-border)] bg-[var(--color-bg)]"
    >
      <Container size="lg" className="py-12 sm:py-16 lg:py-20">
        <div className="grid items-start gap-10 lg:grid-cols-12 lg:gap-12 xl:gap-14">
          <Reveal variant="fade" className="lg:col-span-4 xl:col-span-4">
            <p className="eyebrow">Booking</p>
            <h2 className="font-display mt-2 text-3xl font-bold tracking-[-0.02em] text-[var(--color-ink)] sm:text-4xl">
              Book a session
            </h2>
            <p className="lede mt-4 max-w-sm">
              Share a few details about the student or your school. {TUTOR_NAMES_SHORT}{" "}
              {REPLY_TIME_LINE.toLowerCase()} to schedule tutoring, a demo, or a partnership
              conversation.
            </p>

            <dl className="mt-8 grid gap-5 border-t border-[var(--color-border)] pt-8">
              {DETAILS.map(({ term, value }) => (
                <div key={term}>
                  <dt className="caption font-semibold uppercase tracking-wider text-[var(--color-ink-soft)]">
                    {term}
                  </dt>
                  <dd className="small mt-1 font-medium text-[var(--color-ink)]">{value}</dd>
                </div>
              ))}
            </dl>

            <p className="small mt-8 text-[var(--color-ink-muted)]">
              {FIRST_SESSION_FREE}{" "}
              <span className="text-[var(--color-ink-soft)]">·</span>{" "}
              <a
                href={buildBookingMailtoLink("I'd like to book a tutoring session.\n\n")}
                className="link font-medium text-[var(--color-ink)]"
              >
                Email us instead
              </a>
            </p>
          </Reveal>

          <Reveal variant="rise" delay={40} className="min-w-0 lg:col-span-8 xl:col-span-8">
            <div className="card card-flat overflow-hidden">
              <div className="border-b border-[var(--color-border)] px-6 py-4 sm:px-8">
                <h3 className="font-display text-lg font-bold text-[var(--color-ink)]">
                  Session request
                </h3>
                <p className="caption mt-1 text-[var(--color-ink-muted)]">
                  Fields marked <span className="text-[var(--color-danger)]">*</span> are required.
                </p>
              </div>
              <div className="px-6 py-6 sm:px-8 sm:py-8">
                <ContactForm />
              </div>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
