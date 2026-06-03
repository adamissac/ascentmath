import ColorBand from "../components/ColorBand";
import CredentialsSection from "../components/CredentialsSection";
import HomeBookingSection from "../components/HomeBookingSection";
import HomeStudyPathsSection from "../components/HomeStudyPathsSection";
import Reveal from "../components/Reveal";
import HeroSection from "../components/HeroSection";
import {
  PricingCtaRow,
  PricingTierExplainer,
  SubjectLevelCards,
} from "../components/PricingOverview";
import { GRADES } from "../data/units";

const ALL_UNITS = GRADES.flatMap((g) => g.units);

export default function Home() {
  const totalUnits = ALL_UNITS.length;

  return (
    <>
      <HeroSection totalUnits={totalUnits} />

      <CredentialsSection />

      <ColorBand
        id="what-i-teach"
        variant="brand"
        size="md"
        containerSize="xl"
        className="scroll-mt-[5.5rem]"
        reveal={false}
        faintSymbols
      >
        <Reveal variant="blur" className="mx-auto max-w-3xl text-center">
          <p className="caption font-semibold tracking-[0.16em] uppercase text-[var(--color-accent-300)]">
            What I teach
          </p>
          <h2 className="font-display mt-3 text-2xl font-bold leading-[1.12] tracking-[-0.02em] text-white sm:text-4xl">
            Three tiers by grade band.
          </h2>
          <p className="mt-4 text-base leading-relaxed text-white/75 sm:text-lg">
            Tier 1 is K-6, Tier 2 is middle school, and Tier 3 is high school, AP, and college math.
          </p>
        </Reveal>

        <div className="mt-10 lg:mt-12">
          <SubjectLevelCards variant="brand" />
        </div>

        <Reveal variant="fade" delay={50} className="mt-10 lg:mt-12">
          <PricingTierExplainer variant="brand" />
        </Reveal>

        <Reveal variant="pop" delay={90} className="mt-8">
          <PricingCtaRow variant="brand" />
        </Reveal>
      </ColorBand>

      <HomeStudyPathsSection />

      <HomeBookingSection />
    </>
  );
}
