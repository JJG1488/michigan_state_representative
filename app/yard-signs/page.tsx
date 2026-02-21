import type { Metadata } from 'next';
import SectionHeader from '@/components/shared/SectionHeader';
import YardSignFormClient from './YardSignFormClient';

export const metadata: Metadata = {
  title: 'Yard Signs',
  description: 'Request a yard sign to show your support for Candace Calloway.',
};

export default function YardSignsPage() {
  return (
    <section className="py-16 sm:py-20">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          title="Request a Yard Sign"
          subtitle="Show your neighbors you stand with Candace. We'll coordinate delivery or pickup."
        />
        <YardSignFormClient />
      </div>
    </section>
  );
}
