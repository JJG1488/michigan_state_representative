'use client';

import { useState } from 'react';
import Image from 'next/image';
import Modal from '@/components/ui/Modal';

interface Endorsement {
  readonly name: string;
  readonly title: string;
  readonly photo: string;
}

interface EndorsementsGridProps {
  endorsements: readonly Endorsement[];
}

export default function EndorsementsGrid({ endorsements }: EndorsementsGridProps) {
  const [selectedEndorsement, setSelectedEndorsement] = useState<Endorsement | null>(null);
  const [hoveredName, setHoveredName] = useState<string | null>(null);

  if (!endorsements || endorsements.length === 0) {
    return <div>No endorsements found</div>;
  }

  return (
    <>
      <div className="grid sm:grid-cols-2 gap-6">
        {endorsements.map((endorsement) => (
          <div
            key={endorsement.name}
            onClick={() => setSelectedEndorsement(endorsement)}
            onMouseEnter={() => setHoveredName(endorsement.name)}
            onMouseLeave={() => setHoveredName(null)}
            style={{
              boxShadow: hoveredName === endorsement.name ? '0 20px 25px -5px rgba(0, 0, 0, 0.1)' : '0 0 0 1px var(--color-border)',
              backgroundColor: hoveredName === endorsement.name ? 'rgba(6, 9, 81, 0.05)' : 'white',
              transition: 'all 0.3s ease'
            }}
            className="flex gap-4 p-4 rounded-xl border border-border cursor-pointer"
          >
            {/* Avatar */}
            <div className="flex-shrink-0">
              {endorsement.photo ? (
                <div className="relative w-24 h-24 rounded-full overflow-hidden bg-surface shadow-sm">
                  <Image
                    src={endorsement.photo}
                    alt={endorsement.name}
                    fill
                    quality={95}
                    style={{
                      transform: hoveredName === endorsement.name ? 'scale(1.1)' : 'scale(1)',
                      transition: 'transform 0.3s ease'
                    }}
                    className="object-cover"
                    sizes="96px"
                  />
                </div>
              ) : (
                <div style={{
                  width: '96px',
                  height: '96px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #060951, #065124)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontWeight: 'bold',
                  fontSize: '24px',
                  boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
                  transform: hoveredName === endorsement.name ? 'scale(1.1)' : 'scale(1)',
                  transition: 'transform 0.3s ease'
                }}>
                  {endorsement.name.split(' ').map(n => n[0]).join('')}
                </div>
              )}
            </div>
            {/* Content */}
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

      {/* Modal */}
      {selectedEndorsement && (
        <Modal isOpen={!!selectedEndorsement} onClose={() => {
          setSelectedEndorsement(null);
        }}>
          <div style={{
            backgroundColor: 'white',
            padding: '32px',
            borderRadius: '12px',
            border: '1px solid var(--color-border)'
          }} className="flex flex-col sm:flex-row gap-6">
            {/* Avatar */}
            <div className="flex-shrink-0">
              {selectedEndorsement.photo ? (
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
              ) : (
                <div style={{
                  width: '128px',
                  height: '128px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #060951, #065124)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontWeight: 'bold',
                  fontSize: '48px'
                }}>
                  {selectedEndorsement.name.split(' ').map(n => n[0]).join('')}
                </div>
              )}
            </div>
            {/* Content */}
            <div className="flex-1">
              <h3 className="text-2xl font-bold text-text mb-2">{selectedEndorsement.name}</h3>
              <p className="text-lg text-primary mb-4">{selectedEndorsement.title}</p>
              <p className="text-text-muted">
                {selectedEndorsement.name}'s endorsement means a lot to the campaign.
              </p>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
}
