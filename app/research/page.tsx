import type { Metadata } from 'next';
import SectionHeader from '@/components/shared/SectionHeader';
import CTABanner from '@/components/shared/CTABanner';
import { theme } from '@/theme.config';

export const metadata: Metadata = {
  title: 'Research & Resources',
  description: 'Research and resources backing Candace Calloway\'s policy positions on affordability, education, and infrastructure.',
};

export default function ResearchPage() {
  return (
    <>
      <section className="py-16 sm:py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            title="Research & Resources"
            subtitle="The data and sources behind our policy positions."
          />

          <div className="space-y-8">
            {theme.issues.pillars.map((pillar) => (
              <div key={pillar.slug} className="p-6 rounded-xl border border-border">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: pillar.color }} />
                  <h3 className="text-xl font-bold text-text">{pillar.title}</h3>
                </div>
                <p className="text-text-muted text-sm mb-4">{pillar.positionSummary}</p>
                <div className="flex flex-wrap gap-2">
                  {pillar.topics.map((topic) => (
                    <span key={topic} className="px-3 py-1 text-xs font-medium rounded-full bg-surface text-text-muted">
                      {topic}
                    </span>
                  ))}
                </div>
                <p className="text-sm text-text-muted mt-4 italic">
                  Research sources will be added as materials are received from the campaign.
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <CTABanner />
    </>
  );
}
