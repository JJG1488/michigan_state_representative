import Link from 'next/link';
import { theme } from '@/theme.config';
import HeroSection from '@/components/home/Hero';
import PillarSection from '@/components/home/PillarSection';
import EmailCapture from '@/components/home/EmailCapture';
import EndorsementsStrip from '@/components/home/EndorsementsStrip';
import CTABanner from '@/components/shared/CTABanner';
import DonateSection from '@/components/home/DonateSection';
import WhatsYourIssue from '@/components/home/WhatsYourIssue';
import SocialProof from '@/components/home/SocialProof';

export default function Home() {
  const { pillars } = theme.issues;

  return (
    <main>
      <HeroSection />
      {/* <SocialProof /> */}

      <DonateSection />

      {/* Pillar Sections */}
      {pillars.map((pillar, index) => (
        <PillarSection
          key={pillar.slug}
          pillar={pillar}
          index={index}
        />
      ))}

      <WhatsYourIssue />
      <EmailCapture />
      <EndorsementsStrip />

      {/* Voter Information CTA */}
      <section className="py-12 sm:py-16 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-text mb-3">
            Are You Ready to Vote?
          </h2>
          <p className="text-text-muted mb-6">
            Check your registration, find your polling place, and learn about key dates.
          </p>
          <Link
            href="/voter-info"
            className="inline-flex items-center px-8 py-4 text-lg font-bold text-white bg-primary rounded-lg hover:bg-cta-hover transition-colors shadow-lg"
          >
            Voter Information
          </Link>
        </div>
      </section>

      <CTABanner />
    </main>
  );
}
