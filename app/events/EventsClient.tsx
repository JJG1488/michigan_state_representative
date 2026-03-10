'use client';

import { useState } from 'react';
import Image from 'next/image';
import Modal from '@/components/ui/Modal';

interface Event {
  id: string;
  title: string | null;
  image_url: string;
  created_at: string;
}

interface EventsClientProps {
  events: Event[];
}

export default function EventsClient({ events }: EventsClientProps) {
  const [selectedImage, setSelectedImage] = useState<Event | null>(null);

  if (events.length === 0) {
    return (
      <div className="text-center py-12 px-6 bg-surface rounded-xl">
        <p className="text-text-muted text-lg">No upcoming events at this time. Check back soon!</p>
      </div>
    );
  }

  return (
    <>
      <div className="space-y-6">
        {events.map((event) => (
          <div key={event.id} className="rounded-xl border border-border overflow-hidden hover:shadow-md transition-shadow">
            <button
              type="button"
              onClick={() => setSelectedImage(event)}
              className="w-full cursor-pointer"
            >
              <Image
                src={event.image_url}
                alt={event.title || 'Event flyer'}
                width={800}
                height={1035}
                className="w-full"
                sizes="(max-width: 768px) 100vw, 720px"
              />
            </button>
            {event.title && (
              <div className="p-4">
                <h3 className="text-lg font-semibold text-text">{event.title}</h3>
              </div>
            )}
          </div>
        ))}
      </div>

      <Modal isOpen={!!selectedImage} onClose={() => setSelectedImage(null)}>
        {selectedImage && (
          <Image
            src={selectedImage.image_url}
            alt={selectedImage.title || 'Event flyer'}
            width={1200}
            height={1554}
            className="w-full rounded-lg"
            sizes="(max-width: 1024px) 95vw, 900px"
          />
        )}
      </Modal>
    </>
  );
}
