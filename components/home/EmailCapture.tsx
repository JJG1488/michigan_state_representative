import SectionReveal from '@/components/animation/SectionReveal';
import { theme } from '@/theme.config';

export default function EmailCapture() {
  const formUrl = theme.forms.subscribe;

  return (
    <section className="py-16 sm:py-20 bg-primary">
      <SectionReveal>
        <div className="max-w-2xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3">
            Stay in the Fight
          </h2>
          <p className="text-white/70 text-lg mb-8">
            Get updates on the campaign and ways to make a difference in your community.
          </p>

          {formUrl ? (
            <a
              href={formUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-6 py-3 bg-secondary text-white font-semibold rounded-lg hover:bg-cta-green transition-colors"
            >
              Join
            </a>
          ) : (
            <a
              href={`mailto:${theme.contact.email}?subject=I want to stay updated`}
              className="inline-block px-6 py-3 bg-secondary text-white font-semibold rounded-lg hover:bg-cta-green transition-colors"
            >
              Email Us to Join
            </a>
          )}
        </div>
      </SectionReveal>
    </section>
  );
}
