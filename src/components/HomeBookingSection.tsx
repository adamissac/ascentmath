import Container from "./Container";
import ContactForm from "./ContactForm";
import Reveal from "./Reveal";

export default function HomeBookingSection() {
  return (
    <section
      id="book-session"
      className="scroll-mt-[5.5rem] border-t border-[var(--color-border)] bg-[var(--color-surface-2)]"
    >
      <Container size="md" className="py-12 sm:py-16 lg:py-20">
        <Reveal variant="rise" className="mx-auto max-w-2xl min-w-0">
          <div className="card relative overflow-hidden">
            <span
              aria-hidden
              className="absolute left-0 top-0 h-full w-1 bg-[var(--color-brand-500)]"
            />
            <div className="border-b border-[var(--color-border)] bg-[var(--color-brand-50)] px-6 py-5 pl-7 sm:px-8">
              <h2 className="font-display text-2xl font-bold tracking-[-0.02em] text-[var(--color-brand-700)] sm:text-3xl">
                Book a session
              </h2>
            </div>
            <div className="bg-white px-6 py-6 pl-7 sm:px-8 sm:py-8">
              <ContactForm />
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
