import type { Metadata } from 'next';
import { theme } from '@/theme.config';
import PillarPage from '@/components/pillars/PillarPage';

export const metadata: Metadata = {
  title: 'Safe Infrastructure Investment',
  description: 'Candace Calloway\'s plan for equitable infrastructure investment — roads, public transit, small businesses, and affordable housing.',
};

export default function InfrastructurePage() {
  const pillar = theme.issues.pillars[2];
  return <PillarPage pillar={pillar} heroImage="/infrastructure.jpeg" />;
}
