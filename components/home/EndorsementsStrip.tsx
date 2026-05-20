'use client';

import { useState } from 'react';
import { theme } from '@/theme.config';
import Image from 'next/image';
import Modal from '@/components/ui/Modal';

interface Endorsement {
  readonly name: string;
  readonly title: string;
  readonly photo: string;
}

export default function EndorsementsStrip() {
  const [selectedEndorsement, setSelectedEndorsement] = useState<Endorsement | null>(null);
  const [hoveredName, setHoveredName] = useState<string | null>(null);

  return (
    <section className="py-16 sm:py-20 bg-surface">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-center text-sm font-semibold uppercase tracking-widest text-text-muted mb-8">
          Endorsed By
        </h2>

        {/* Endorsement Cards Grid */}
        <div className="grid sm:grid-cols-2 gap-6">
          {theme.endorsements.confirmed.map((endorsement) => (
            <div
              key={endorsement.name}
              onClick={() => setSelectedEndorsement(endorsement as Endorsement)}
              onMouseEnter={() => setHoveredName(endorsement.name)}
              onMouseLeave={() => setHoveredName(null)}
              style={{
                boxShadow: hoveredName === endorsement.name ? '0 20px 25px -5px rgba(0, 0, 0, 0.1)' : '0 0 0 1px var(--color-border)',
                backgroundColor: hoveredName === endorsement.name ? 'rgba(6, 9, 81, 0.05)' : 'white',
                transition: 'all 0.3s ease'
              }}
              className="flex items-center gap-4 p-6 rounded-xl border border-border cursor-pointer"
            >
              {endorsement.photo && (
                <Image
                  src={endorsement.photo}
                  alt={endorsement.name}
                  width={70}
                  height={70}
                  quality={95}
                  style={{
                    transform: hoveredName === endorsement.name ? 'scale(1.1)' : 'scale(1)',
                    transition: 'transform 0.3s ease'
                  }}
                  className="rounded-full object-cover w-[70px] h-[70px] flex-shrink-0"
                />
              )}
              <div className="flex-1 min-w-0">
                <p style={{
                  color: hoveredName === endorsement.name ? '#060951' : '#1A1A1A',
                  transition: 'color 0.3s ease',
                  fontWeight: 'bold'
                }}>{endorsement.name}</p>
                <p className="text-sm text-text-muted">{endorsement.title}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Lucy */}
        {theme.endorsements.includeLucy && (
          <div className="flex items-center gap-4 p-5 rounded-xl border border-border bg-white hover:shadow-md transition-shadow mt-4">
            <div className="flex items-center gap-4">
              <div>
                <p className="font-bold text-text text-lg">Lucy</p>
                <p className="text-sm text-text-muted">Campaign {theme.candidate.dog.breed}</p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Modal */}
      {selectedEndorsement && (
        <Modal isOpen={!!selectedEndorsement} onClose={() => setSelectedEndorsement(null)}>
          <div style={{
            backgroundColor: 'white',
            padding: '32px',
            borderRadius: '12px',
            border: '1px solid var(--color-border)'
          }} className="flex flex-col sm:flex-row gap-6">
            {/* Avatar */}
            <div className="flex-shrink-0">
              {selectedEndorsement.photo && (
                <div className="relative w-32 h-32 rounded-full overflow-hidden bg-surface">
                  <Image
                    src={selectedEndorsement.photo}
                    alt={selectedEndorsement.name}
                    fill
                    quality={95}
                    className="object-cover"
                    sizes="128px"
                  />
                </div>
              )}
            </div>
            {/* Content */}
            <div className="flex-1">
              <h3 className="text-2xl font-bold text-text mb-2">{selectedEndorsement.name}</h3>
              <p className="text-lg text-primary mb-4">{selectedEndorsement.title}</p>
              <p className="text-text-muted">
                {selectedEndorsement.name} is supporting Candace Calloway's campaign for Michigan State House Representative.
              </p>
            </div>
          </div>
        </Modal>
      )}
    </section>
  );
}
