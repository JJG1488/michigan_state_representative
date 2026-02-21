import Link from 'next/link';
import { theme } from '@/theme.config';
import HeroSection from '@/components/home/Hero';
import PillarSection from '@/components/home/PillarSection';
import EmailCapture from '@/components/home/EmailCapture';
import EndorsementsStrip from '@/components/home/EndorsementsStrip';
import CTABanner from '@/components/shared/CTABanner';
import DonateSection from '@/components/home/DonateSection';
import SocialProof from '@/components/home/SocialProof';

export default function Home() {
  const { pillars } = theme.issues;

  return (
    <>
      <HeroSection />
      <SocialProof />

      {/* Pillar Sections */}
      {pillars.map((pillar, index) => (
        <PillarSection
          key={pillar.slug}
          pillar={pillar}
          index={index}
        />
      ))}

      <EmailCapture />
      <EndorsementsStrip />
      <DonateSection />
      <CTABanner />
    </>
  );
}
