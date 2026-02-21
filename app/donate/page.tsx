import type { Metadata } from 'next';
import { theme } from '@/theme.config';
import SectionHeader from '@/components/shared/SectionHeader';
import DonateClient from './DonateClient';

export const metadata: Metadata = {
  title: 'Donate',
  description: 'Support Candace Calloway\'s campaign for Michigan State Representative. Every dollar powers the movement for affordability, education, and infrastructure.',
};

export default function DonatePage() {
  return (
    <section className="py-16 sm:py-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          title="Invest in Our Community's Future"
          subtitle="Your contribution powers a grassroots campaign fighting for every family in NW Detroit, Oak Park, and Royal Oak Township."
        />
        <DonateClient />

        {/* Compliance Notice */}
        <div className="mt-12 p-6 rounded-xl bg-surface border border-border">
          <h3 className="font-bold text-text mb-3">Contribution Rules</h3>
          <ul className="space-y-2 text-sm text-text-muted">
            <li>• Individual contribution limit: <strong>$1,000 per election cycle</strong></li>
            <li>• Michigan law prohibits contributions from corporations and labor organizations</li>
            <li>• Employer and occupation required for contributions over $100</li>
            <li>• Anonymous contributions are prohibited</li>
            <li>• Cash contributions over $20 are prohibited</li>
          </ul>
          <div className="mt-4 pt-4 border-t border-border">
            <p className="text-xs text-text-muted">
              {theme.compliance.disclaimerText} &bull; {theme.compliance.committeeAddress} &bull; Treasurer: {theme.compliance.treasurerName}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
