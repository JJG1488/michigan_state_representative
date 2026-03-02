import Image from 'next/image';
import Link from 'next/link';
import type { Pillar } from '@/theme.config';
import CTABanner from '@/components/shared/CTABanner';
import PillarHeroClient from './PillarHeroClient';

const ICONS: Record<string, string> = {
  wallet: '💰',
  'book-open': '📚',
  building: '🏗️',
};

interface PillarPageProps {
  pillar: Pillar;
  heroImage?: string;
}

export default function PillarPage({ pillar, heroImage }: PillarPageProps) {
  return (
    <>
      {/* Hero */}
      <section
        className={`py-20 sm:py-28 text-white${heroImage ? ' relative overflow-hidden' : ''}`}
        style={{ backgroundColor: pillar.color }}
      >
        {heroImage && (
          <>
            <Image
              src={heroImage}
              alt=""
              fill
              className="object-cover"
              priority
            />
            <div
              className="absolute inset-0"
              style={{ backgroundColor: pillar.color, opacity: 0.75 }}
            />
          </>
        )}
        <div className={`max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center${heroImage ? ' relative z-10' : ''}`}>
          <span className="text-4xl mb-4 block" aria-hidden="true">{ICONS[pillar.icon] || '📋'}</span>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-4">
            {pillar.tagline}
          </h1>
          <PillarHeroClient pillar={pillar} />
        </div>
      </section>

      {/* The Problem */}
      <section className="py-16 sm:py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-text mb-6">The Problem</h2>
          <p className="text-lg text-text-muted leading-relaxed mb-8">
            {pillar.emotionalAngle}
          </p>

          <div className="grid sm:grid-cols-2 gap-4">
            {pillar.topics.map((topic) => (
              <div key={topic} className="flex items-center gap-3 p-4 rounded-lg bg-surface">
                <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: pillar.color }} />
                <span className="text-text text-sm font-medium">{topic}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* The Plan */}
      <section className="py-16 sm:py-20 bg-surface">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-text mb-6">The Plan</h2>
          <p className="text-lg text-text-muted leading-relaxed mb-8">
            {pillar.positionSummary}
          </p>

          <div className="space-y-4">
            {pillar.solutions.map((solution, index) => (
              <div key={index} className="flex items-start gap-4 p-4 bg-white rounded-lg border border-border">
                <span
                  className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold"
                  style={{ backgroundColor: pillar.color }}
                >
                  {index + 1}
                </span>
                <p className="text-text pt-1">{solution}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* The Impact */}
      <section className="py-16 sm:py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-text mb-6">The Impact</h2>
          <p className="text-lg text-text-muted leading-relaxed mb-8">
            This plan directly benefits families across all three communities — NW Detroit, Oak Park, and Royal Oak Township. Every family deserves to thrive, not just survive.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/get-involved"
              className="px-8 py-3 font-semibold text-white rounded-lg transition-colors"
              style={{ backgroundColor: pillar.color }}
            >
              Join the Fight
            </Link>
            <Link
              href="/issues"
              className="px-8 py-3 font-semibold border-2 rounded-lg text-text hover:bg-surface transition-colors"
            >
              View All Issues
            </Link>
          </div>
        </div>
      </section>

      <CTABanner />
    </>
  );
}
