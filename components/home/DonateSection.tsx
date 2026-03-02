import { theme } from '@/theme.config';
import SectionReveal from '@/components/animation/SectionReveal';

export default function DonateSection() {
  return (
    <section className="py-16 sm:py-20 bg-white">
      <SectionReveal>
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-text mb-3">
            Power the Movement
          </h2>
          <p className="text-text-muted text-lg mb-8">
            Every dollar stays local — investing in the communities of NW Detroit, Oak Park, and Royal Oak Township.
          </p>

          <a
            href={theme.donation.actBlueUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-10 py-4 text-lg font-bold text-white bg-secondary rounded-lg hover:bg-cta-green transition-all duration-200 shadow-lg"
          >
            Contribute Now
          </a>

          <p className="mt-4 text-xs text-text-muted">
            {theme.compliance.disclaimerText}. Individual limit: $1,000 per election cycle.
          </p>
        </div>
      </SectionReveal>
    </section>
  );
}
