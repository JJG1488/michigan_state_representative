import type { Metadata } from 'next';
import { theme } from '@/theme.config';
import SectionHeader from '@/components/shared/SectionHeader';

export const metadata: Metadata = {
  title: 'Volunteer',
  description: 'Volunteer for Candace Calloway\'s campaign — door knocking, phone banking, event setup, and more.',
};

export default function VolunteerPage() {
  const formUrl = theme.forms.volunteer;

  return (
    <section className="py-16 sm:py-20">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          title="Volunteer"
          subtitle="Your time is the most powerful resource we have. Join our team and help us reach every voter in the district."
        />

        {formUrl ? (
          <a
            href={formUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-8 py-4 text-lg font-bold text-white bg-primary rounded-lg hover:bg-cta-hover transition-colors"
          >
            Sign Up to Volunteer
          </a>
        ) : (
          <p className="text-text-muted">
            Interested in volunteering? Email us at{' '}
            <a href={`mailto:${theme.contact.email}`} className="text-primary hover:underline">
              {theme.contact.email}
            </a>.
          </p>
        )}
      </div>
    </section>
  );
}
