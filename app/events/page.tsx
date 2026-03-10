import type { Metadata } from 'next';
import { createClient } from '@/lib/supabase/server';
import SectionHeader from '@/components/shared/SectionHeader';
import CTABanner from '@/components/shared/CTABanner';
import EventsClient from './EventsClient';

export const revalidate = 60;

export const metadata: Metadata = {
  title: 'Events',
  description: 'Upcoming events for Candace Calloway\'s campaign — town halls, community meetings, and more.',
};

interface EventRow {
  id: string;
  title: string | null;
  image_url: string;
  created_at: string;
}

export default async function EventsPage() {
  let events: EventRow[] = [];

  try {
    const supabase = await createClient();
    const { data } = await supabase
      .from('events')
      .select('id, title, image_url, created_at')
      .order('created_at', { ascending: false });

    if (data) {
      events = data;
    }
  } catch {
    // Supabase unreachable — show empty state
  }

  return (
    <>
      <section className="py-16 sm:py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            title="Upcoming Events"
            subtitle="Join us in person — meet Candace, hear the vision, and connect with your neighbors."
          />
          <EventsClient events={events} />
        </div>
      </section>
      <CTABanner />
    </>
  );
}
