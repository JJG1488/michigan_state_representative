import type { Metadata } from 'next';
import { districtRegions } from '@/lib/districtData';
import SectionHeader from '@/components/shared/SectionHeader';
import CTABanner from '@/components/shared/CTABanner';
import DistrictClient from './DistrictClient';

export const metadata: Metadata = {
  title: 'Our District',
  description: 'Learn about the communities that make up our district — Northwest Detroit, Oak Park, and Royal Oak Township.',
};

export default function DistrictPage() {
  return (
    <>
      <section className="py-16 sm:py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            title="Our District"
            subtitle="Three communities, one representative. Every neighborhood deserves to be seen, heard, and invested in."
          />
          <DistrictClient regions={districtRegions} />
        </div>
      </section>
      <CTABanner />
    </>
  );
}
