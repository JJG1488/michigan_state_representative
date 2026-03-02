import type { Metadata } from 'next';
import { theme } from '@/theme.config';
import PillarPage from '@/components/pillars/PillarPage';

export const metadata: Metadata = {
  title: 'Educational Outcomes',
  description: 'Candace Calloway\'s plan to invest in our children\'s future — from K-12 readiness to workforce development.',
};

export default function EducationPage() {
  const pillar = theme.issues.pillars[1];
  return <PillarPage pillar={pillar} heroImage="/education.png" />;
}
