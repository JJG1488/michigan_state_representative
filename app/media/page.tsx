import { theme } from '@/theme.config';
import MediaGallery from '@/components/media/MediaGallery';

export const metadata = {
  title: 'Media | Candace Calloway for Michigan State Representative',
  description: 'Photos, videos, and resources from Candace Calloway\'s campaign for Michigan State House Representative District 5.',
};

export default function MediaPage() {
  return (
    <main className="min-h-screen bg-white pt-24 sm:pt-28">
      {/* Header Section */}
      <section className="relative py-12 sm:py-16 bg-gradient-to-br from-primary/10 to-secondary/10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl font-bold text-primary mb-4">
              Campaign Media
            </h1>
            <p className="text-lg sm:text-xl text-text-muted max-w-3xl mx-auto">
              Photos, videos, and downloadable resources from the campaign trail. Stay updated with our latest coverage and materials.
            </p>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-12 sm:py-20 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <MediaGallery items={theme.media || []} />
      </section>
    </main>
  );
}
