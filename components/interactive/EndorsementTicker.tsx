'use client';

import { useMemo } from 'react';
import { usePrefersReducedMotion } from '@/lib/animations';
import Badge from '@/components/ui/Badge';

interface Endorsement {
  name: string;
  title: string;
  quote?: string;
  isNew?: boolean;
  addedDate?: string;
}

interface EndorsementTickerProps {
  endorsements: Endorsement[];
  speed?: number;
  className?: string;
}

export default function EndorsementTicker({
  endorsements,
  speed = 40,
  className = '',
}: EndorsementTickerProps) {
  const prefersReduced = usePrefersReducedMotion();

  const processedEndorsements = useMemo(() => {
    const now = new Date();
    return endorsements.map((e) => ({
      ...e,
      isNew: e.isNew ?? (e.addedDate ? (now.getTime() - new Date(e.addedDate).getTime()) < 7 * 24 * 60 * 60 * 1000 : false),
    }));
  }, [endorsements]);

  // Static layout for few endorsements or reduced motion
  if (processedEndorsements.length < 5 || prefersReduced) {
    return (
      <div className={`py-6 overflow-hidden ${className}`}>
        <div className="flex flex-wrap items-center justify-center gap-4 px-4">
          {processedEndorsements.map((endorsement, i) => (
            <EndorsementItem key={i} endorsement={endorsement} />
          ))}
        </div>
      </div>
    );
  }

  // Calculate duration based on content width and speed
  const itemWidth = 250; // approximate px per item
  const totalWidth = processedEndorsements.length * itemWidth;
  const duration = totalWidth / speed;

  return (
    <div className={`py-6 overflow-hidden ${className}`}>
      <div
        className="flex animate-ticker whitespace-nowrap"
        style={{ '--ticker-duration': `${duration}s` } as React.CSSProperties}
      >
        {/* Duplicate content for seamless loop */}
        {[...processedEndorsements, ...processedEndorsements].map((endorsement, i) => (
          <EndorsementItem key={i} endorsement={endorsement} />
        ))}
      </div>
    </div>
  );
}

function EndorsementItem({ endorsement }: { endorsement: Endorsement & { isNew: boolean } }) {
  return (
    <div className="inline-flex items-center gap-2 px-4 py-2 mx-2 bg-white/10 rounded-full hover:scale-105 transition-transform duration-200 group relative cursor-default">
      <span className="font-semibold text-sm whitespace-nowrap">{endorsement.name}</span>
      <span className="text-xs opacity-70 whitespace-nowrap">{endorsement.title}</span>
      {endorsement.isNew && <Badge variant="new">NEW</Badge>}
      {endorsement.quote && (
        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 bg-white text-text text-xs rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none max-w-xs whitespace-normal z-10">
          &ldquo;{endorsement.quote}&rdquo;
        </div>
      )}
    </div>
  );
}
