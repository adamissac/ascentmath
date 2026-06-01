import Link from "next/link";

const YEAR = new Date().getFullYear();

export default function Footer() {
  return (
    <footer className="border-t border-[var(--color-border)] bg-white mt-12 safe-bottom">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14 safe-x">
        <div className="grid lg:grid-cols-12 gap-10">
          {/* Left: identity */}
          <div className="lg:col-span-5">
            <Link href="/" className="font-display font-bold text-xl tracking-tight text-[var(--color-ink)]">
              Adam&apos;s Alphabet
            </Link>
            <p className="mt-3 small text-[var(--color-ink-muted)] max-w-md leading-relaxed">
              A free Grades 6–8 math library — clear lessons, hand-picked video walkthroughs,
              printable worksheets, and quizzes. Built by a student tutor for students who
              learn differently.
            </p>
            <p className="caption text-[var(--color-ink-soft)] mt-4">
              Made in Georgia. Open to learners everywhere.
            </p>
          </div>

          {/* Spacer column on lg */}
          <div className="hidden lg:block lg:col-span-1" />

          {/* Right: link columns */}
          <div className="lg:col-span-6 grid sm:grid-cols-3 gap-8">
            <div>
              <h3 className="caption font-semibold text-[var(--color-ink)] uppercase tracking-wider">Learn</h3>
              <ul className="mt-3 space-y-2 small">
                <li><Link href="/mathematics" className="link">Mathematics</Link></li>
                <li><Link href="/mathematics/find-your-start" className="link">Find your start</Link></li>
                <li><Link href="/mathematics/curriculum-frameworks" className="link">GADOE frameworks</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="caption font-semibold text-[var(--color-ink)] uppercase tracking-wider">Site</h3>
              <ul className="mt-3 space-y-2 small">
                <li><Link href="/about" className="link">About Adam</Link></li>
                <li><Link href="/parents" className="link">For parents &amp; teachers</Link></li>
                <li><Link href="/book" className="link">Book a class</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="caption font-semibold text-[var(--color-ink)] uppercase tracking-wider">Connect</h3>
              <ul className="mt-3 space-y-2 small">
                <li>
                  <a href="mailto:adamissac08@gmail.com" className="link">Email Adam</a>
                </li>
                <li>
                  <a href="https://www.youtube.com" target="_blank" rel="noopener noreferrer" className="link">
                    YouTube
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <hr className="divider my-10" />

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <p className="caption text-[var(--color-ink-soft)]">
            © {YEAR} Adam&apos;s Alphabet · Free educational resources
          </p>
          <p className="caption text-[var(--color-ink-soft)]">
            Designed for extra help — not limited to students in Georgia.
          </p>
        </div>
      </div>
    </footer>
  );
}
