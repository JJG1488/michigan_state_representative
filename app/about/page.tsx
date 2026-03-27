import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { theme } from '@/theme.config';
import SectionHeader from '@/components/shared/SectionHeader';
import CTABanner from '@/components/shared/CTABanner';

export const metadata: Metadata = {
  title: 'About Candace Calloway',
  description: 'Learn about Candace Calloway — AmeriCorps alumnus, construction professional, and founder of The Black Pack. Running for Michigan State House Representative in District 5.',
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
                src="/aboutpage.JPG"
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
              Candace Calloway, a Detroit Democrat, is a first-time candidate who works in construction for the <strong>City of Detroit</strong>. She is an alumnus of the AmeriCorps program, <strong>City Year</strong>, serving in classrooms alongside teachers before working as an Academic Interventionist with <strong>Detroit Public Schools Community District</strong>. Candace has extensive experience tackling aging infrastructure issues, working with <strong>The Nature Conservancy</strong> to identify nature-based solutions for urban stormwater and flooding challenges.
            </p>

            <p className="text-lg leading-relaxed mb-6">
              She founded <strong>The Black Pack</strong> in 2024, an organization to increase the rates of Black people employed in outdoor recreation and environmental conservation jobs. She is also a part of the <strong>Detroit Association of Women&apos;s Clubs, Incorporated</strong>, a women-focused nonprofit dedicated to preserving Detroit women&apos;s history. Calloway has also been a part of <strong>Alpha Kappa Alpha Sorority, Incorporated</strong> since 2013.
            </p>

            <p className="text-lg leading-relaxed mb-6">
              She graduated from <strong>Andover High School</strong> in Bloomfield Hills and received her Bachelor&apos;s Degree in Applied Health Sciences from <strong>Bowling Green State University</strong> in Ohio.
            </p>

            <p className="text-lg leading-relaxed mb-6">
              Her campaign is built on three pillars: making life <strong>affordable</strong> for working families, improving <strong>educational outcomes</strong> for our children, and investing in <strong>safe infrastructure</strong> that strengthens our communities. She believes we deserve leadership that evolves with our needs.
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
