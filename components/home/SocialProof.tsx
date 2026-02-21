'use client';

import SectionReveal from '@/components/animation/SectionReveal';
import ScrollStatCounter from '@/components/interactive/ScrollStatCounter';

export default function SocialProof() {
  return (
    <section className="py-8 sm:py-12 bg-surface border-y border-border">
      <SectionReveal>
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-2">
            <ScrollStatCounter
              targetValue={247}
              pillarColor="#060951"
              className="inline-block"
            />
            <span className="text-lg sm:text-xl text-text-muted ml-2">
              neighbors have joined the movement
            </span>
          </div>
        </div>
      </SectionReveal>
    </section>
  );
}
