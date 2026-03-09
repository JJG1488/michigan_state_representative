import type { Metadata } from 'next';
import { theme } from '@/theme.config';
import SectionHeader from '@/components/shared/SectionHeader';
import IssueForm from '@/components/shared/IssueForm';

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Get in touch with Candace Calloway\'s campaign for Michigan State Representative.',
};

export default function ContactPage() {
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

        <h3 className="text-xl font-bold text-text mb-4">Or Send Us a Message</h3>
        <IssueForm subjectPrefix="Contact" />
      </div>
    </section>
  );
}
