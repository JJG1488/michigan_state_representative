'use client';

import { useState } from 'react';
import Link from 'next/link';
import { theme } from '@/theme.config';
import PulseButton from '@/components/animation/PulseButton';
import DonationImpact from '@/components/interactive/DonationImpact';
import SectionReveal from '@/components/animation/SectionReveal';

export default function DonateSection() {
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);

  return (
    <section className="py-16 sm:py-20 bg-white">
      <SectionReveal>
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-text mb-3">
            Power the Movement
          </h2>
          <p className="text-text-muted text-lg mb-8">
            Every dollar stays local — investing in the communities of NW Detroit, Oak Park, and Royal Oak Township.
          </p>

          <div className="grid grid-cols-3 sm:grid-cols-6 gap-3 mb-6">
            {theme.donation.suggestedAmounts.map((amount) => (
              <PulseButton
                key={amount}
                onClick={() => setSelectedAmount(amount)}
                isActive={selectedAmount === amount}
                activeColor={theme.colors.secondary}
              >
                ${amount}
              </PulseButton>
            ))}
          </div>

          <DonationImpact selectedAmount={selectedAmount} className="mb-8" />

          <Link
            href="/donate"
            className="inline-flex items-center px-10 py-4 text-lg font-bold text-white bg-secondary rounded-lg hover:bg-cta-green transition-all duration-200 shadow-lg"
          >
            Contribute Now
          </Link>

          <p className="mt-4 text-xs text-text-muted">
            {theme.compliance.disclaimerText}. Individual limit: $1,000 per election cycle.
          </p>
        </div>
      </SectionReveal>
    </section>
  );
}
