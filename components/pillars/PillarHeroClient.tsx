'use client';

import ScrollStatCounter from '@/components/interactive/ScrollStatCounter';
import type { Pillar } from '@/theme.config';

interface PillarHeroClientProps {
  pillar: Pillar;
}

export default function PillarHeroClient({ pillar }: PillarHeroClientProps) {
  const statValue = parseInt(pillar.heroStat.value.replace(/[^0-9]/g, ''), 10);
  const isStatNumeric = !isNaN(statValue);

  // Detect suffix from the value string (e.g. "48%" → "%", "44th" → "th")
  const suffixMatch = pillar.heroStat.value.match(/[a-z%]+$/i);
  const suffix = suffixMatch ? suffixMatch[0] : '';
  const hasOrdinalSuffix = /^(st|nd|rd|th)$/.test(suffix);

  if (!isStatNumeric) {
    return (
      <div className="mt-8">
        <p className="text-2xl sm:text-3xl font-bold">
          {pillar.heroStat.value}
        </p>
        <p className="text-white/70 text-lg mt-2">{pillar.heroStat.label}</p>
      </div>
    );
  }

  return (
    <div className="mt-8">
      <ScrollStatCounter
        targetValue={statValue}
        suffix={suffix}
        direction={hasOrdinalSuffix ? 'down' : 'up'}
        pillarColor="white"
        label={pillar.heroStat.label}
        link={pillar.heroStat.link}
        className="[&_*]:text-white [&_p]:text-white/70"
      />
    </div>
  );
}
