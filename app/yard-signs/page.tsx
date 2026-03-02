import type { Metadata } from 'next';
import { theme } from '@/theme.config';
import SectionHeader from '@/components/shared/SectionHeader';

export const metadata: Metadata = {
  title: 'Yard Signs',
  description: 'Request a yard sign to show your support for Candace Calloway.',
};

export default function YardSignsPage() {
  const formUrl = theme.forms.yardSign;

  return (
    <section className="py-16 sm:py-20">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          title="Request a Yard Sign"
          subtitle="Show your neighbors you stand with Candace. We'll coordinate delivery or pickup."
        />

        {formUrl ? (
          <a
            href={formUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-8 py-4 text-lg font-bold text-white bg-primary rounded-lg hover:bg-cta-hover transition-colors"
          >
            Request a Yard Sign
          </a>
        ) : (
          <p className="text-text-muted">
            Want a yard sign? Email us at{' '}
            <a href={`mailto:${theme.contact.email}`} className="text-primary hover:underline">
              {theme.contact.email}
            </a>.
          </p>
        )}
      </div>
    </section>
  );
}
