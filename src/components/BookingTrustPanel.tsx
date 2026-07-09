import Image from "next/image";
import {
  ADAM_PHONE_DISPLAY,
  ADAM_PHONE_TEL,
  ALAN_PHONE_DISPLAY,
  ALAN_PHONE_TEL,
  TUTOR_EMAILS_DISPLAY,
} from "../data/site-team";

const STEPS = [
  {
    title: "We read your message",
    text: "Adam or Alan personally reviews every request - no call center, no chatbot.",
  },
  {
    title: "We call or email you back",
    text: "Usually within 1-2 days, to confirm the subject, tier, and a time that fits your schedule.",
  },
  {
    title: "You meet for a free first session",
    text: "Over Zoom. Nothing to pay up front.",
  },
] as const;

export default function BookingTrustPanel() {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center gap-4">
        <div className="flex -space-x-3">
          <TutorAvatar src="/adampic.jpg" alt="Adam Issac" objectPosition="50% 22%" />
          <TutorAvatar src="/alanpic.jpg" alt="Alan Mozhoor" objectPosition="50% 20%" />
        </div>
        <div className="min-w-0">
          <p className="font-display text-base font-bold text-[var(--color-ink-cool)]">Adam &amp; Alan</p>
          <p className="small text-[var(--color-ink-muted)]">Georgia Tech-educated math tutors</p>
        </div>
      </div>

      <div>
        <p className="caption font-semibold uppercase tracking-[0.14em] text-[var(--color-brand-600)]">
          What happens after you submit
        </p>
        <ol className="mt-4 grid gap-3">
          {STEPS.map((step, i) => (
            <li key={step.title} className="step-card flex gap-4">
              <span className="step-card__num shrink-0" aria-hidden>
                {i + 1}
              </span>
              <div className="min-w-0">
                <p className="font-display text-[0.9375rem] font-bold text-[var(--color-ink-cool)]">
                  {step.title}
                </p>
                <p className="mt-1 small leading-relaxed text-[var(--color-ink-muted)]">{step.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>

      <div className="border-t border-[var(--color-border)] pt-6">
        <p className="small font-semibold text-[var(--color-ink)]">Prefer to talk first?</p>
        <div className="mt-2.5 flex flex-col gap-1.5">
          <a
            href={`tel:${ADAM_PHONE_TEL}`}
            className="w-fit text-[0.9375rem] font-semibold text-[var(--color-brand-600)] no-underline hover:underline"
          >
            Adam &middot; {ADAM_PHONE_DISPLAY}
          </a>
          <a
            href={`tel:${ALAN_PHONE_TEL}`}
            className="w-fit text-[0.9375rem] font-semibold text-[var(--color-brand-600)] no-underline hover:underline"
          >
            Alan &middot; {ALAN_PHONE_DISPLAY}
          </a>
        </div>
        <p className="caption mt-2.5 text-[var(--color-ink-soft)]">{TUTOR_EMAILS_DISPLAY}</p>
      </div>
    </div>
  );
}

function TutorAvatar({
  src,
  alt,
  objectPosition,
}: {
  src: string;
  alt: string;
  objectPosition: string;
}) {
  return (
    <span className="relative block h-12 w-12 shrink-0 overflow-hidden rounded-full ring-2 ring-[var(--color-bg)] shadow-[var(--shadow-card)]">
      <Image
        src={src}
        alt={alt}
        fill
        sizes="48px"
        className="object-cover"
        style={{ objectPosition }}
      />
    </span>
  );
}
