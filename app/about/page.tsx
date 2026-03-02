import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { theme } from '@/theme.config';
import SectionHeader from '@/components/shared/SectionHeader';
import CTABanner from '@/components/shared/CTABanner';

export const metadata: Metadata = {
  title: 'About Candace Calloway',
  description: 'Learn about Candace Calloway — her background in construction, education, and urban environmental conservation, and why she is running for Michigan State House Representative.',
};

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-primary to-secondary py-20 sm:py-28 text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-white/60 text-sm font-medium tracking-widest uppercase mb-3">
                About the Candidate
              </p>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-6">
                {theme.candidate.name}
              </h1>
              <p className="text-xl text-white/80 leading-relaxed">
                {theme.candidate.elevatorPitch}
              </p>
            </div>
            <div className="relative aspect-[3/4] rounded-2xl overflow-hidden">
              <Image
                src="/cc.JPG"
                alt={`${theme.candidate.name} headshot`}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-contain"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Bio */}
      <section className="py-16 sm:py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader title="Why I'm Running" />

          <div className="prose prose-lg max-w-none text-text">
            <p className="text-xl leading-relaxed mb-6">
              Born and raised in Detroit, I have spent my career at the intersection of construction, education, and urban environmental conservation. I founded <strong>The Black Pack</strong> — an outdoor organization focused on increasing Black employment in outdoor recreation and environmental conservation.
            </p>

            <p className="text-lg leading-relaxed mb-6">
              I understand the challenges our communities face because I live them. From the rising cost of auto insurance to the state of our schools, these aren&apos;t abstract policy debates — they&apos;re kitchen table conversations I have with my neighbors in NW Detroit, Oak Park, and Royal Oak Township every day.
            </p>

            <p className="text-lg leading-relaxed mb-6">
              My campaign is built on three pillars: making life <strong>affordable</strong> for working families, improving <strong>educational outcomes</strong> for our children, and investing in <strong>safe infrastructure</strong> that strengthens our communities. I believe we deserve leadership that evolves with our needs.
            </p>
          </div>

          {/* Qualifications */}
          {/* <div className="mt-12 grid sm:grid-cols-2 gap-6">
            <div className="p-6 bg-surface rounded-xl">
              <h3 className="font-bold text-text mb-2">Education</h3>
              <p className="text-text-muted text-sm">{theme.candidate.highSchool}</p>
              <p className="text-text-muted text-sm">{theme.candidate.college}</p>
            </div>
            <div className="p-6 bg-surface rounded-xl">
              <h3 className="font-bold text-text mb-2">Professional Background</h3>
              <p className="text-text-muted text-sm">{theme.candidate.professionalBackground}</p>
            </div>
            <div className="p-6 bg-surface rounded-xl sm:col-span-2">
              <h3 className="font-bold text-text mb-2">Community Involvement</h3>
              <ul className="space-y-1">
                {theme.candidate.communityInvolvement.map((item) => (
                  <li key={item} className="text-text-muted text-sm flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-secondary" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div> */}
        </div>
      </section>

      <CTABanner />
    </>
  );
}
