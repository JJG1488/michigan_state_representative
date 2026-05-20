import type { Metadata } from 'next';
import { theme } from '@/theme.config';
import SectionHeader from '@/components/shared/SectionHeader';
import CTABanner from '@/components/shared/CTABanner';
import EndorsementTicker from '@/components/interactive/EndorsementTicker';
import EndorsementsGrid from '@/components/endorsements/EndorsementsGrid';

export const metadata: Metadata = {
  title: 'Endorsements',
  description: 'See who is endorsing Candace Calloway for Michigan State House Representative.',
};

export default function EndorsementsPage() {
  const endorsements: { name: string; title: string; isNew: boolean }[] = theme.endorsements.confirmed.map((e) => ({
    name: e.name,
    title: e.title,
    isNew: true,
  }));

  if (theme.endorsements.includeLucy) {
    endorsements.push({
      name: 'Lucy',
      title: `Campaign ${theme.candidate.dog.breed}`,
      isNew: false,
    });
  }

  return (
    <>
      <section className="py-16 sm:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            title="Endorsements"
            subtitle="Leaders and community members who believe in the movement."
          />

          {/* Ticker Banner */}
          <div className="bg-primary rounded-xl mb-12 text-white">
            <EndorsementTicker endorsements={endorsements} />
          </div>

          {/* Full List */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-text-muted uppercase tracking-wider">
              Elected Officials &amp; Community Leaders
            </h3>
            <EndorsementsGrid endorsements={theme.endorsements.confirmed} />

            {/* Lucy */}
            {theme.endorsements.includeLucy && (
              <div className="mt-8">
                <h3 className="text-lg font-semibold text-text-muted uppercase tracking-wider mb-4">
                  Special Endorsement
                </h3>
                <div className="p-6 rounded-xl border-2 border-secondary bg-green-50">
                  <div className="flex items-center gap-4">
                    {/* <span className="text-4xl">🐕</span> */}
                    <div>
                      <p className="font-bold text-text text-lg">Lucy</p>
                      <p className="text-text-muted">Campaign {theme.candidate.dog.breed}</p>
                      {/* <p className="text-sm text-text-muted mt-1 italic">
                        &ldquo;Even Lucy approves!&rdquo;
                      </p> */}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          <p className="text-center text-text-muted text-sm mt-12">
            More endorsements coming soon. Check back for updates.
          </p>
        </div>
      </section>
      <CTABanner />
    </>
  );
}
