'use client';

import { useState } from 'react';

interface Event {
  id: string;
  date: string;
  location: string;
  type: string;
}

interface EventsClientProps {
  events: Event[];
  rsvpEnabled: boolean;
}

export default function EventsClient({ events, rsvpEnabled }: EventsClientProps) {
  const [rsvpEvent, setRsvpEvent] = useState<string | null>(null);
  const [rsvpData, setRsvpData] = useState({ name: '', email: '', numberAttending: 1 });
  const [rsvpStatus, setRsvpStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  // Filter out past events
  const now = new Date();
  const upcomingEvents = events.filter((e) => new Date(e.date) >= now);

  const handleRsvp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!rsvpEvent) return;
    setRsvpStatus('loading');
    try {
      const res = await fetch('/api/rsvp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...rsvpData, eventId: rsvpEvent }),
      });
      if (res.ok) {
        setRsvpStatus('success');
      } else {
        setRsvpStatus('error');
      }
    } catch {
      setRsvpStatus('error');
    }
  };

  if (upcomingEvents.length === 0) {
    return (
      <div className="text-center py-12 px-6 bg-surface rounded-xl">
        <p className="text-text-muted text-lg">No upcoming events at this time. Check back soon!</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {upcomingEvents.map((event) => (
        <div key={event.id} className="p-6 rounded-xl border border-border hover:shadow-md transition-shadow">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h3 className="text-xl font-bold text-text">{event.type}</h3>
              <div className="flex flex-wrap items-center gap-3 mt-2 text-sm text-text-muted">
                <span className="flex items-center gap-1">
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></svg>
                  {event.date}
                </span>
                <span className="flex items-center gap-1">
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></svg>
                  {event.location}
                </span>
              </div>
            </div>
            {rsvpEnabled && rsvpEvent !== event.id && (
              <button
                onClick={() => { setRsvpEvent(event.id); setRsvpStatus('idle'); }}
                className="px-6 py-2.5 bg-primary text-white font-semibold rounded-lg hover:bg-cta-hover transition-colors text-sm"
              >
                RSVP
              </button>
            )}
          </div>

          {rsvpEvent === event.id && (
            <div className="mt-4 p-4 bg-surface rounded-lg">
              {rsvpStatus === 'success' ? (
                <p className="text-green-600 font-medium">Thanks for RSVPing! We&apos;ll see you there.</p>
              ) : (
                <form onSubmit={handleRsvp} className="space-y-3">
                  <div className="grid sm:grid-cols-3 gap-3">
                    <div>
                      <label htmlFor={`rsvp-name-${event.id}`} className="sr-only">Name</label>
                      <input id={`rsvp-name-${event.id}`} type="text" required placeholder="Your name" value={rsvpData.name} onChange={(e) => setRsvpData({ ...rsvpData, name: e.target.value })} className="w-full px-3 py-2 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary text-sm" />
                    </div>
                    <div>
                      <label htmlFor={`rsvp-email-${event.id}`} className="sr-only">Email</label>
                      <input id={`rsvp-email-${event.id}`} type="email" required placeholder="Email" value={rsvpData.email} onChange={(e) => setRsvpData({ ...rsvpData, email: e.target.value })} className="w-full px-3 py-2 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary text-sm" />
                    </div>
                    <div>
                      <label htmlFor={`rsvp-count-${event.id}`} className="sr-only">Number attending</label>
                      <select id={`rsvp-count-${event.id}`} value={rsvpData.numberAttending} onChange={(e) => setRsvpData({ ...rsvpData, numberAttending: parseInt(e.target.value) })} className="w-full px-3 py-2 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary text-sm">
                        {[1,2,3,4,5,6,7,8,9,10].map(n => <option key={n} value={n}>{n} {n === 1 ? 'person' : 'people'}</option>)}
                      </select>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button type="submit" disabled={rsvpStatus === 'loading'} className="px-4 py-2 bg-primary text-white font-semibold rounded-lg hover:bg-cta-hover transition-colors text-sm disabled:opacity-50">
                      {rsvpStatus === 'loading' ? 'Submitting...' : 'Confirm RSVP'}
                    </button>
                    <button type="button" onClick={() => setRsvpEvent(null)} className="px-4 py-2 text-text-muted hover:text-text text-sm">Cancel</button>
                  </div>
                  {rsvpStatus === 'error' && <p className="text-red-500 text-sm">Something went wrong. Please try again.</p>}
                </form>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
