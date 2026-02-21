import type { Metadata } from 'next';
import { theme } from '@/theme.config';
import SectionHeader from '@/components/shared/SectionHeader';
import CTABanner from '@/components/shared/CTABanner';
import IssuesClient from './IssuesClient';

export const metadata: Metadata = {
  title: 'Where I Stand',
  description: 'Candace Calloway\'s positions on affordability, education, and safe infrastructure — the three pillars of her campaign for Michigan State Representative.',
};

export default function IssuesPage() {
  return (
    <>
      <section className="py-16 sm:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            title="Where I Stand"
            subtitle="Three priorities. One mission: building stronger communities for every family in our district."
          />
          <IssuesClient pillars={theme.issues.pillars} />
        </div>
      </section>
      <CTABanner />
    </>
  );
}
