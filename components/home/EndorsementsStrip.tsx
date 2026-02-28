import { theme } from '@/theme.config';
import Image from 'next/image';

export default function EndorsementsStrip() {
  return (
    <section className="py-16 sm:py-20 bg-surface">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-center text-sm font-semibold uppercase tracking-widest text-text-muted mb-8">
          Endorsed By
        </h2>

        {/* Endorsement Cards Grid */}
        <div className="grid sm:grid-cols-2 gap-4">
          {theme.endorsements.confirmed.map((endorsement) => (
            <div
              key={endorsement.name}
              className="flex items-center gap-4 p-5 rounded-xl border border-border bg-white hover:shadow-md transition-shadow"
            >
              {endorsement.photo && (
                <Image
                  src={endorsement.photo}
                  alt={endorsement.name}
                  width={56}
                  height={56}
                  className="rounded-full object-cover w-14 h-14"
                />
              )}
              <div>
                <p className="font-bold text-text">{endorsement.name}</p>
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
                <p className="text-sm text-text-muted">

                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
