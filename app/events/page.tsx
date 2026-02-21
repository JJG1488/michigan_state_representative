import type { Metadata } from 'next';
import { theme } from '@/theme.config';
import SectionHeader from '@/components/shared/SectionHeader';
import CTABanner from '@/components/shared/CTABanner';
import EventsClient from './EventsClient';

export const metadata: Metadata = {
  title: 'Events',
  description: 'Upcoming events for Candace Calloway\'s campaign — town halls, community meetings, and more.',
};

export default function EventsPage() {
  const events = theme.events.announcementEvents.map((event, index) => ({
    id: `event-${index}`,
    ...event,
  }));

  return (
    <>
      <section className="py-16 sm:py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            title="Upcoming Events"
            subtitle="Join us in person — meet Candace, hear the vision, and connect with your neighbors."
          />
          <EventsClient events={events} rsvpEnabled={theme.events.rsvpEnabled} />
        </div>
      </section>
      <CTABanner />
    </>
  );
}
