import SectionReveal from '@/components/animation/SectionReveal';
import IssueForm from '@/components/shared/IssueForm';

export default function WhatsYourIssue() {
  return (
    <section className="py-16 sm:py-20 bg-surface">
      <SectionReveal>
        <div className="max-w-2xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-8">
            <h2 className="text-3xl sm:text-4xl font-bold text-text mb-3">
              These Are Our Priorities. What Are Yours?
            </h2>
            <p className="text-text-muted text-lg">
              You know what matters to your neighborhood better than anyone. Tell us what you&apos;re dealing with — Candace reads every message.
            </p>
          </div>
          <IssueForm subjectPrefix="What's Your Issue" />
        </div>
      </SectionReveal>
    </section>
  );
}
