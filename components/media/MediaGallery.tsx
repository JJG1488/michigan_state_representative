'use client';

import { useState } from 'react';
import Image from 'next/image';
import Modal from '@/components/ui/Modal';
import { motion } from 'framer-motion';

interface MediaItem {
  id: string;
  title?: string;
  type: 'photo' | 'video' | 'file';
  src: string;
  thumbnail?: string;
  description?: string;
  date?: string;
}

interface MediaGalleryProps {
  items: readonly MediaItem[];
}

export default function MediaGallery({ items }: MediaGalleryProps) {
  const [selectedItem, setSelectedItem] = useState<MediaItem | null>(null);
  const [filter, setFilter] = useState<'all' | 'photo' | 'video' | 'file'>('all');

  const filteredItems = filter === 'all' ? items : items.filter(item => item.type === filter);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <>
      {/* Filter Buttons */}
      <div className="flex flex-wrap gap-3 mb-8 justify-center">
        {(['all', 'photo', 'video'] as const).map((category) => (
          <button
            key={category}
            onClick={() => setFilter(category)}
            className={`px-6 py-2 rounded-full font-semibold transition-all duration-200 capitalize ${
              filter === category
                ? 'bg-primary text-white shadow-lg'
                : 'bg-surface text-text border border-border hover:border-primary hover:text-primary'
            }`}
          >
            {category === 'all' ? 'All Media' : category}
          </button>
        ))}
      </div>

      {/* Gallery Grid */}
      <motion.div
        key={filter}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {filteredItems.map((item) => (
          <motion.div
            key={item.id}
            variants={itemVariants}
            onClick={() => setSelectedItem(item)}
            className="group cursor-pointer"
          >
            <div className="relative rounded-xl overflow-hidden bg-surface shadow-md hover:shadow-xl transition-all duration-300 h-56">
              {item.type === 'photo' && (
                <Image
                  src={item.src}
                  alt={item.title || 'Campaign photo'}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              )}
              {item.type === 'video' && (
                <div className="w-full h-full bg-black/20 flex items-center justify-center">
                  {item.thumbnail ? (
                    <Image
                      src={item.thumbnail}
                      alt={item.title || 'Video thumbnail'}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  ) : (
                    <div className="bg-gradient-to-br from-primary to-secondary w-full h-full flex items-center justify-center" />
                  )}
                  <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="white" className="absolute group-hover:scale-110 transition-transform">
                    <polygon points="5 3 19 12 5 21 5 3" />
                  </svg>
                </div>
              )}
              {item.type === 'file' && (
                <div className="w-full h-full bg-gradient-to-br from-secondary/20 to-primary/20 flex items-center justify-center flex-col gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-primary">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                    <polyline points="14 2 14 8 20 8" />
                  </svg>
                  <span className="text-xs text-primary font-semibold">Download</span>
                </div>
              )}

              {/* Overlay */}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                <div className="text-white">
                  <h3 className="font-bold text-lg">{item.title}</h3>
                  {item.date && <p className="text-sm text-white/80">{item.date}</p>}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Empty State */}
      {filteredItems.length === 0 && (
        <div className="text-center py-12">
          <p className="text-text-muted text-lg">No media items found in this category.</p>
        </div>
      )}

      {/* Modal */}
      {selectedItem && (
        <Modal isOpen={!!selectedItem} onClose={() => setSelectedItem(null)}>
          <div className="max-w-5xl w-full max-h-[90vh] overflow-y-auto">
            {selectedItem.type === 'photo' && (
              <div className="relative w-full h-[600px] rounded-xl overflow-hidden mb-4">
                <Image
                  src={selectedItem.src}
                  alt={selectedItem.title || 'Campaign photo'}
                  fill
                  className="object-contain"
                  sizes="100vw"
                />
              </div>
            )}

            {selectedItem.type === 'video' && (
              <div className="relative w-full h-[600px] rounded-xl overflow-hidden mb-4 bg-black">
                {selectedItem.src.includes('youtube') ? (
                  <iframe
                    width="100%"
                    height="100%"
                    src={selectedItem.src}
                    title={selectedItem.title}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full"
                  />
                ) : (
                  <video
                    width="100%"
                    height="100%"
                    controls
                    className="w-full h-full"
                  >
                    <source src={selectedItem.src} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                )}
              </div>
            )}

            {selectedItem.type === 'file' && (
              <div className="bg-surface rounded-xl p-8 text-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-primary mx-auto mb-4">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                  <polyline points="14 2 14 8 20 8" />
                </svg>
                <p className="text-text-muted">PDF Document</p>
              </div>
            )}

            {/* Content */}
            <div>
              <h2 className="text-2xl font-bold text-text mb-2">{selectedItem.title}</h2>
              {selectedItem.date && (
                <p className="text-sm text-text-muted mb-4">{selectedItem.date}</p>
              )}
              {selectedItem.description && (
                <p className="text-text-muted mb-4">{selectedItem.description}</p>
              )}

              {selectedItem.type === 'file' && (
                <a
                  href={selectedItem.src}
                  download
                  className="inline-flex items-center px-6 py-3 bg-primary text-white font-semibold rounded-lg hover:bg-primary/90 transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="mr-2">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                    <polyline points="7 10 12 15 17 10" />
                    <line x1="12" y1="15" x2="12" y2="3" />
                  </svg>
                  Download
                </a>
              )}

              {selectedItem.type === 'video' && selectedItem.src.includes('youtube') && (
                <a
                  href={selectedItem.src}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-6 py-3 bg-primary text-white font-semibold rounded-lg hover:bg-primary/90 transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="white" className="mr-2">
                    <polygon points="5 3 19 12 5 21 5 3" />
                  </svg>
                  Watch on YouTube
                </a>
              )}
            </div>
          </div>
        </Modal>
      )}
    </>
  );
}
