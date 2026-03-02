import type { Metadata } from 'next';
import { theme } from '@/theme.config';
import PillarPage from '@/components/pillars/PillarPage';

export const metadata: Metadata = {
  title: 'Affordability',
  description: 'Candace Calloway\'s plan to make life affordable for every family — addressing childcare costs, auto insurance, property taxes, and more.',
};

export default function AffordabilityPage() {
  const pillar = theme.issues.pillars[0];
  return <PillarPage pillar={pillar} heroImage="/aboutpage.JPG" />;
}
