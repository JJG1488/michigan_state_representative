'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { DistrictRegion } from '@/lib/districtData';

interface DistrictClientProps {
  regions: DistrictRegion[];
}

export default function DistrictClient({ regions }: DistrictClientProps) {
  const [activeRegion, setActiveRegion] = useState<string | null>(null);
  const active = regions.find((r) => r.id === activeRegion);

  const toggleRegion = (id: string) => {
    setActiveRegion(activeRegion === id ? null : id);
  };

  return (
    <div className="grid lg:grid-cols-2 gap-8 items-start">
      {/* SVG Map */}
      <div className="relative">
        <svg viewBox="0 0 400 350" className="w-full" role="img" aria-label="District map showing Northwest Detroit, Oak Park, and Royal Oak Township">
          {/* NW Detroit - largest, bottom left */}
          <g
            onClick={() => toggleRegion('nw-detroit')}
            onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggleRegion('nw-detroit'); } }}
            tabIndex={0}
            role="button"
            aria-label="Learn about Northwest Detroit"
            className="cursor-pointer focus:outline-none"
          >
            <path
              d="M 20 120 L 180 100 L 220 140 L 240 200 L 230 280 L 180 330 L 40 320 L 20 250 Z"
              fill={activeRegion === 'nw-detroit' ? regions[0].color : regions[0].mutedColor}
              stroke="white"
              strokeWidth="2"
              className="transition-all duration-300"
            />
            <text x="110" y="220" textAnchor="middle" className="text-xs fill-white font-semibold pointer-events-none" style={{ fontSize: '12px' }}>
              NW Detroit
            </text>
          </g>

          {/* Oak Park - medium, top right */}
          <g
            onClick={() => toggleRegion('oak-park')}
            onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggleRegion('oak-park'); } }}
            tabIndex={0}
            role="button"
            aria-label="Learn about Oak Park"
            className="cursor-pointer focus:outline-none"
          >
            <path
              d="M 190 30 L 340 20 L 370 60 L 380 140 L 330 170 L 230 150 L 190 100 Z"
              fill={activeRegion === 'oak-park' ? regions[1].color : regions[1].mutedColor}
              stroke="white"
              strokeWidth="2"
              className="transition-all duration-300"
            />
            <text x="280" y="100" textAnchor="middle" className="text-xs fill-white font-semibold pointer-events-none" style={{ fontSize: '12px' }}>
              Oak Park
            </text>
          </g>

          {/* Royal Oak Township - smallest, right middle */}
          <g
            onClick={() => toggleRegion('royal-oak-twp')}
            onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggleRegion('royal-oak-twp'); } }}
            tabIndex={0}
            role="button"
            aria-label="Learn about Royal Oak Township"
            className="cursor-pointer focus:outline-none"
          >
            <path
              d="M 250 160 L 340 180 L 370 220 L 350 270 L 280 280 L 250 230 Z"
              fill={activeRegion === 'royal-oak-twp' ? regions[2].color : regions[2].mutedColor}
              stroke="white"
              strokeWidth="2"
              className="transition-all duration-300"
            />
            <text x="310" y="230" textAnchor="middle" className="text-xs fill-white font-semibold pointer-events-none" style={{ fontSize: '11px' }}>
              Royal Oak Twp
            </text>
          </g>
        </svg>
      </div>

      {/* Info Panel */}
      <div className="min-h-[300px]" aria-live="polite">
        <AnimatePresence mode="wait">
          {active ? (
            <motion.div
              key={active.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="p-6 rounded-xl border-2"
              style={{ borderColor: active.color }}
            >
              <h3 className="text-2xl font-bold mb-2" style={{ color: active.color }}>
                {active.name}
              </h3>
              <p className="text-text-muted text-sm mb-4">{active.population}</p>
              <div className="mb-4">
                <span className="text-xs font-semibold uppercase tracking-wider text-text-muted">Key Issue</span>
                <p className="text-text font-medium mt-1">{active.keyIssue}</p>
              </div>
              <blockquote className="border-l-4 pl-4 italic text-text-muted" style={{ borderColor: active.color }}>
                &ldquo;{active.candidateQuote}&rdquo;
              </blockquote>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="p-6 rounded-xl bg-surface text-center"
            >
              <p className="text-text-muted">Click on a community to learn more about it</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Community Cards */}
      <div className="lg:col-span-2 grid sm:grid-cols-3 gap-6 mt-8">
        {regions.map((region) => (
          <div
            key={region.id}
            className="p-6 rounded-xl bg-white border border-border hover:shadow-md transition-shadow"
          >
            <div className="w-3 h-3 rounded-full mb-3" style={{ backgroundColor: region.color }} />
            <h3 className="font-bold text-text mb-1">{region.name}</h3>
            <p className="text-sm text-text-muted mb-2">{region.population}</p>
            <p className="text-sm text-text-muted italic">&ldquo;{region.candidateQuote}&rdquo;</p>
          </div>
        ))}
      </div>
    </div>
  );
}
