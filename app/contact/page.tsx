import type { Metadata } from 'next';
import { theme } from '@/theme.config';
import SectionHeader from '@/components/shared/SectionHeader';

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Get in touch with Candace Calloway\'s campaign for Michigan State Representative.',
};

export default function ContactPage() {
  const formUrl = theme.forms.contact;

  return (
    <section className="py-16 sm:py-20">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          title="Contact Us"
          subtitle="Have a question, press inquiry, or partnership opportunity? We'd love to hear from you."
        />

        <div className="space-y-4 mb-8">
          <div className="p-5 rounded-xl bg-surface inline-block">
            <h3 className="font-semibold text-text mb-1">Email</h3>
            <a href={`mailto:${theme.contact.email}`} className="text-primary hover:underline text-sm">
              {theme.contact.email}
            </a>
          </div>
          <div className="p-5 rounded-xl bg-surface inline-block block">
            <h3 className="font-semibold text-text mb-1">Phone</h3>
            <a href={`tel:${theme.contact.phone}`} className="text-primary hover:underline text-sm">
              {theme.contact.phone}
            </a>
          </div>
        </div>

        {formUrl ? (
          <a
            href={formUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-8 py-4 text-lg font-bold text-white bg-primary rounded-lg hover:bg-cta-hover transition-colors"
          >
            Contact Us
          </a>
        ) : (
          <p className="text-text-muted text-sm">
            You can reach us anytime at{' '}
            <a href={`mailto:${theme.contact.email}`} className="text-primary hover:underline">
              {theme.contact.email}
            </a>.
          </p>
        )}
      </div>
    </section>
  );
}
