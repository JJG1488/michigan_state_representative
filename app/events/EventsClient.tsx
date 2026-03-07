'use client';

import Image from 'next/image';
import { theme } from '@/theme.config';

interface Event {
  id: string;
  date: string;
  time?: string;
  location: string;
  venue?: string;
  address?: string;
  type: string;
  flyer?: string;
}

interface EventsClientProps {
  events: Event[];
}

export default function EventsClient({ events }: EventsClientProps) {
  const rsvpUrl = theme.forms.rsvp;

  const now = new Date();
  const cutoff = new Date(now);
  cutoff.setDate(cutoff.getDate() - 2);
  const visibleEvents = events.filter((e) => new Date(e.date) >= cutoff);

  if (visibleEvents.length === 0) {
    return (
      <div className="text-center py-12 px-6 bg-surface rounded-xl">
        <p className="text-text-muted text-lg">No upcoming events at this time. Check back soon!</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {visibleEvents.map((event) => (
        <div key={event.id} className="p-6 rounded-xl border border-border hover:shadow-md transition-shadow">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h3 className="text-xl font-bold text-text">{event.type}</h3>
              <div className="flex flex-wrap items-center gap-3 mt-2 text-sm text-text-muted">
                <span className="flex items-center gap-1">
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></svg>
                  {event.date}{event.time ? ` at ${event.time}` : ''}
                </span>
                <span className="flex items-center gap-1">
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></svg>
                  {event.location}
                </span>
              </div>
              {event.venue && (
                <p className="mt-2 text-sm font-medium text-text">{event.venue}</p>
              )}
              {event.address && (
                <p className="text-sm text-text-muted">{event.address}</p>
              )}
            </div>
            {rsvpUrl ? (
              <a
                href={rsvpUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-2.5 bg-primary text-white font-semibold rounded-lg hover:bg-cta-hover transition-colors text-sm text-center"
              >
                RSVP
              </a>
            ) : (
              <a
                href={`mailto:${theme.contact.email}?subject=RSVP: ${event.type} — ${event.date}`}
                className="px-6 py-2.5 bg-primary text-white font-semibold rounded-lg hover:bg-cta-hover transition-colors text-sm text-center"
              >
                RSVP
              </a>
            )}
          </div>

          {event.flyer && (
            <div className="mt-4">
              <Image
                src={event.flyer}
                alt={`${event.type} — ${event.location} flyer`}
                width={800}
                height={1035}
                className="w-full rounded-lg"
              />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
