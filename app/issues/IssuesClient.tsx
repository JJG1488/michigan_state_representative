'use client';

import { useState } from 'react';
import InfographicFlipCard from '@/components/interactive/InfographicFlipCard';

const ICONS: Record<string, string> = {
  wallet: '💰',
  'book-open': '📚',
  building: '🏗️',
};

interface Pillar {
  title: string;
  tagline: string;
  icon: string;
  color: string;
  slug: string;
  heroStat: { readonly value: string; readonly label: string };
  positionSummary: string;
  solutions: readonly string[];
}

interface IssuesClientProps {
  pillars: readonly Pillar[];
}

export default function IssuesClient({ pillars }: IssuesClientProps) {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  return (
    <div className="space-y-4">
      {pillars.map((pillar, index) => (
        <InfographicFlipCard
          key={pillar.slug}
          pillarIcon={ICONS[pillar.icon] || '📋'}
          pillarTitle={pillar.title}
          pillarColor={pillar.color}
          heroStat={pillar.heroStat}
          description={pillar.positionSummary}
          solutions={[...pillar.solutions]}
          learnMoreHref={`/${pillar.slug}`}
          isExpanded={expandedIndex === index}
          onToggle={() => setExpandedIndex(expandedIndex === index ? null : index)}
        />
      ))}
    </div>
  );
}
