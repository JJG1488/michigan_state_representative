import { theme } from '@/theme.config';
import EndorsementTicker from '@/components/interactive/EndorsementTicker';

export default function EndorsementsStrip() {
  const endorsements: { name: string; title: string; isNew: boolean }[] = theme.endorsements.confirmed.map((e) => ({
    name: e.name,
    title: e.title,
    isNew: true,
  }));

  // Add Lucy if configured
  if (theme.endorsements.includeLucy) {
    endorsements.push({
      name: 'Lucy',
      title: 'Campaign German Shepherd',
      isNew: false,
    });
  }

  return (
    <section className="py-12 sm:py-16 bg-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-center text-sm font-semibold uppercase tracking-widest text-text-muted mb-6">
          Endorsed By
        </h2>
        <EndorsementTicker endorsements={endorsements} />
        <div className="text-center mt-6">
          <a href="/endorsements" className="text-sm font-medium text-primary hover:underline">
            View all endorsements &rarr;
          </a>
        </div>
      </div>
    </section>
  );
}
