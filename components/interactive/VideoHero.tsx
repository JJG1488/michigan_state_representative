'use client';

import { useRef, useState, useEffect } from 'react';
import { useInView } from 'framer-motion';
import Image from 'next/image';
import Modal from '@/components/ui/Modal';

interface VideoHeroProps {
  posterImage: string;
  ambientVideoSrc?: string;
  fullVideoUrl?: string;
  candidateName: string;
  bioExcerpt: string;
  children?: React.ReactNode;
}

export default function VideoHero({
  posterImage,
  ambientVideoSrc,
  fullVideoUrl,
  candidateName,
  bioExcerpt,
  children,
}: VideoHeroProps) {
  const ref = useRef(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const isInView = useInView(ref, { once: false, amount: 0.3 });
  const [showModal, setShowModal] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (videoRef.current && !isMobile) {
      if (isInView) {
        videoRef.current.play().catch(() => {});
      } else {
        videoRef.current.pause();
      }
    }
  }, [isInView, isMobile]);

  return (
    <>
      <section ref={ref} className="relative min-h-[60vh] sm:min-h-[70vh] flex items-center overflow-hidden">
        {/* Background - video or poster */}
        {ambientVideoSrc && !isMobile ? (
          <video
            ref={videoRef}
            className="absolute inset-0 w-full h-full object-cover"
            src={ambientVideoSrc}
            muted
            loop
            playsInline
            poster={posterImage}
          />
        ) : (
          <div className="absolute inset-0">
            <Image
              src={posterImage}
              alt=""
              fill
              className="object-cover"
              priority
              sizes="100vw"
            />
          </div>
        )}

        {/* Overlay */}
        <div className="absolute inset-0 bg-primary/70" />

        {/* Content */}
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center text-white">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-4">
            {candidateName}
          </h1>
          <p className="text-lg sm:text-xl text-white/80 max-w-2xl mx-auto mb-8">
            {bioExcerpt}
          </p>

          {fullVideoUrl && (
            <button
              onClick={() => setShowModal(true)}
              className="inline-flex items-center gap-3 px-8 py-4 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-all duration-200 group"
              aria-label="Watch intro video"
            >
              <span className="w-12 h-12 flex items-center justify-center rounded-full bg-white text-primary group-hover:scale-110 transition-transform">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <polygon points="5 3 19 12 5 21 5 3" />
                </svg>
              </span>
              <span className="font-semibold text-lg">Watch Video</span>
            </button>
          )}

          {children}
        </div>
      </section>

      {/* Video Modal */}
      {fullVideoUrl && (
        <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
          <div className="relative w-full aspect-video bg-black rounded-lg overflow-hidden">
            <iframe
              src={`${fullVideoUrl}?autoplay=1`}
              className="absolute inset-0 w-full h-full"
              allow="autoplay; fullscreen; picture-in-picture"
              allowFullScreen
              title="Candidate introduction video"
            />
          </div>
        </Modal>
      )}
    </>
  );
}
