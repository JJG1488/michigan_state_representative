import type { Metadata } from 'next';
import SectionHeader from '@/components/shared/SectionHeader';
import IssueForm from '@/components/shared/IssueForm';
import CTABanner from '@/components/shared/CTABanner';

export const metadata: Metadata = {
  title: 'Your Priorities',
  description: 'Tell Candace Calloway what matters most to you and your neighborhood. She reads every message.',
};

export default function PrioritiesPage() {
  return (
    <>
      <section className="py-16 sm:py-20">
        <div className="max-w-2xl mx-auto px-4 sm:px-6">
          <SectionHeader
            title="These Are Our Priorities. What Are Yours?"
            subtitle="You know what matters to your neighborhood better than anyone. Tell us what you're dealing with — Candace reads every message."
          />
          <IssueForm subjectPrefix="Priorities" />
        </div>
      </section>
      <CTABanner />
    </>
  );
}
