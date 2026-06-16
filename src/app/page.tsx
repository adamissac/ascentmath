import ColorBand from "../components/ColorBand";
import CredentialsSection from "../components/CredentialsSection";
import HomeBookingSection from "../components/HomeBookingSection";
import HomeJsonLd from "../components/HomeJsonLd";
import HomeStudyPathsSection from "../components/HomeStudyPathsSection";
import HeroSection from "../components/HeroSection";
import {
  PricingCtaRow,
  PricingTierExplainer,
  SubjectLevelCards,
} from "../components/PricingOverview";
import { FIRST_SESSION_FREE, TUTORING_TIERS_SUMMARY } from "../data/pricing";
import { GRADES } from "../data/units";

const ALL_UNITS = GRADES.flatMap((g) => g.units);

export default function Home() {
  const totalUnits = ALL_UNITS.length;

  return (
    <>
      <HomeJsonLd />
      <HeroSection totalUnits={totalUnits} />

      <CredentialsSection />

      <ColorBand
        id="what-i-teach"
        variant="brand"
        size="md"
        containerSize="2xl"
        className="scroll-mt-[5.5rem]"
        reveal={false}
        faintSymbols
      >
        <div className="mx-auto max-w-3xl text-center">
          <p className="caption font-semibold tracking-[0.16em] uppercase text-[var(--color-accent-300)]">
            What we teach
          </p>
          <h2 className="font-display mt-3 text-2xl font-bold leading-[1.12] tracking-[-0.02em] text-white sm:text-4xl">
            Four tiers by grade band.
          </h2>
          <p className="mt-4 text-base leading-relaxed text-white/75 sm:text-lg">
            {TUTORING_TIERS_SUMMARY}. Pick the tier that matches your class — rates are confirmed when
            you book.
          </p>
          <p className="mt-4 inline-flex rounded-full border border-white/25 bg-white/10 px-4 py-1.5 text-sm font-semibold text-[var(--color-accent-300)]">
            {FIRST_SESSION_FREE}
          </p>
        </div>

        <div className="mt-10 lg:mt-12">
          <SubjectLevelCards variant="brand" />
        </div>

        <div className="mt-10 lg:mt-12">
          <PricingTierExplainer variant="brand" />
        </div>

        <div className="mt-8">
          <PricingCtaRow variant="brand" />
        </div>
      </ColorBand>

      <HomeStudyPathsSection />

      <HomeBookingSection />
    </>
  );
}
