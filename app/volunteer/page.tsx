import type { Metadata } from 'next';
import SectionHeader from '@/components/shared/SectionHeader';
import VolunteerFormClient from './VolunteerFormClient';

export const metadata: Metadata = {
  title: 'Volunteer',
  description: 'Volunteer for Candace Calloway\'s campaign — door knocking, phone banking, event setup, and more.',
};

export default function VolunteerPage() {
  return (
    <section className="py-16 sm:py-20">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          title="Volunteer"
          subtitle="Your time is the most powerful resource we have. Join our team and help us reach every voter in the district."
        />
        <VolunteerFormClient />
      </div>
    </section>
  );
}
