'use client';

import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import type { Pillar } from '@/theme.config';
import SectionReveal from '@/components/animation/SectionReveal';
import ScrollStatCounter from '@/components/interactive/ScrollStatCounter';

interface PillarSectionProps {
  pillar: Pillar;
  index: number;
}

const SECTION_HEADLINES = [
  'The Squeeze is Real',
  'Our Children Deserve Better',
  'More Than Roads',
];

const SECTION_QUOTES = [
  'Whether you\'re just getting started, raising a family, or enjoying retirement — costs are out of control. That changes now.',
  'Every child in Michigan deserves a world-class education — whether their path leads to a university or a union hall.',
  'It\'s not just the roads — it\'s where they take us.',
];

export default function PillarSection({ pillar, index }: PillarSectionProps) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  // Parse the stat value for the counter
  const statValue = parseInt(pillar.heroStat.value.replace(/[^0-9]/g, ''), 10);
  const isStatNumeric = !isNaN(statValue);
  const isPercentage = pillar.heroStat.value.includes('%');
  const isOrdinal = pillar.heroStat.value.includes('th') || pillar.heroStat.value.includes('st') || pillar.heroStat.value.includes('nd');

  return (
    <motion.section
      ref={ref}
      style={{ opacity }}
      className="relative min-h-screen flex items-center py-20 sm:py-24"
    >
      {/* Background color */}
      <div className="absolute inset-0" style={{ backgroundColor: pillar.color }} />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-white">
        <SectionReveal>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-white/60 text-sm font-medium tracking-widest uppercase mb-3">
                Priority {pillar.priority}
              </p>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-6">
                {SECTION_HEADLINES[index]}
              </h2>

              <p className="text-white/80 text-lg leading-relaxed mb-6">
                {pillar.positionSummary.slice(0, 200)}...
              </p>

              <blockquote className="border-l-4 border-white/30 pl-4 italic text-white/70 mb-8">
                &ldquo;{SECTION_QUOTES[index]}&rdquo;
              </blockquote>

              <Link
                href={`/${pillar.slug}`}
                className="inline-flex items-center gap-2 px-6 py-3 bg-white/20 backdrop-blur-sm rounded-lg font-semibold hover:bg-white/30 transition-all"
              >
                Read the Full Plan
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </Link>
            </div>

            <div className="text-center">
              {isStatNumeric ? (
                <ScrollStatCounter
                  targetValue={statValue}
                  suffix={isPercentage ? '%' : isOrdinal ? (pillar.priority === 2 ? 'th' : '') : ''}
                  direction={pillar.priority === 2 ? 'down' : 'up'}
                  pillarColor="white"
                  label={pillar.heroStat.label}
                  className="text-white [&_*]:text-white [&_p]:text-white/70"
                />
              ) : (
                <div>
                  <p className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3">
                    {pillar.heroStat.value}
                  </p>
                  <p className="text-white/70 text-lg">{pillar.heroStat.label}</p>
                </div>
              )}
            </div>
          </div>
        </SectionReveal>
      </div>
    </motion.section>
  );
}
