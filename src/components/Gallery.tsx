import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ZoomIn, ChevronLeft, ChevronRight } from 'lucide-react';
import { businessData } from '../data/business';
import { SplitText } from '../lib/motion';
import { SmartImage } from './SmartImage';

export const Gallery: React.FC = () => {
  const [activePhotoIndex, setActivePhotoIndex] = useState<number | null>(null);
  const photos = businessData.gallery;
  const marqueePhotos = [...photos, ...photos];

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (activePhotoIndex === null) return;
      if (e.key === 'Escape') setActivePhotoIndex(null);
      if (e.key === 'ArrowRight') {
        setActivePhotoIndex((prev) => (prev !== null ? (prev + 1) % photos.length : 0));
      }
      if (e.key === 'ArrowLeft') {
        setActivePhotoIndex((prev) => (prev !== null ? (prev - 1 + photos.length) % photos.length : 0));
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activePhotoIndex, photos.length]);

  return (
    <section id="gallery" className="section-y bg-[#FAF7F2] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 heading-block-mb">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-2xl">
            <div className="flex items-center gap-4 mb-3 sm:mb-4">
              <span className="eyebrow-label text-[#B8572B]">
                04 / VISUAL SHOWCASE
              </span>
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: '4rem' }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="h-[1px] bg-[#B8572B]"
              />
            </div>

            <h2 className="section-title font-extrabold font-display text-[#1A1A1A] tracking-tight">
              <SplitText>
                Life In The Chair
              </SplitText>
            </h2>
          </div>

          <p className="text-base sm:text-lg text-[#57534E] max-w-md">
            Click any photograph to view our sharp line-ups, hot towel treatments, and shop atmosphere in high definition.
          </p>
        </div>
      </div>

      {/* Infinite Horizontal Marquee Strip */}
      <div className="relative w-full group py-2">
        <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-r from-[#FAF7F2] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-l from-[#FAF7F2] to-transparent z-10 pointer-events-none" />

        <div className="flex gap-6 overflow-x-hidden no-scrollbar">
          <motion.div
            className="flex gap-6 shrink-0"
            animate={{ x: ['0%', '-50%'] }}
            transition={{
              duration: 35,
              ease: 'linear',
              repeat: Infinity,
            }}
            whileHover={{ animationPlayState: 'paused' }}
          >
            {marqueePhotos.map((photo, idx) => (
              <div
                key={`${photo.id}-${idx}`}
                onClick={() => setActivePhotoIndex(idx % photos.length)}
                className="relative w-80 sm:w-96 md:w-[420px] h-64 sm:h-80 rounded-3xl overflow-hidden cursor-pointer shadow-md border border-[#E8E0D2] group/item shrink-0 bg-white"
              >
                {/* Full Color SmartImage with dual fallback */}
                <SmartImage
                  src={photo.url}
                  fallbackSrc={photo.fallbackUrl}
                  alt={photo.title}
                  aspectRatio="4/3"
                  className="w-full h-full object-cover group-hover/item:scale-105 transition-transform duration-500 ease-out"
                />

                {/* Overlay Card on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A]/85 via-transparent to-transparent opacity-0 group-hover/item:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6 text-white pointer-events-none">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-base font-bold font-display">{photo.title}</h4>
                      <p className="text-xs text-white/80 line-clamp-1">{photo.caption}</p>
                    </div>
                    <div className="p-2.5 rounded-full bg-white/20 backdrop-blur-md text-white">
                      <ZoomIn className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {activePhotoIndex !== null && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
            role="dialog"
            aria-modal="true"
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActivePhotoIndex(null)}
              className="fixed inset-0 bg-[#1A1A1A]/95 backdrop-blur-md"
            />

            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="relative max-w-4xl w-full bg-[#1A1A1A] rounded-3xl overflow-hidden shadow-2xl border border-white/10 z-10 text-white"
            >
              <div className="p-4 sm:p-5 flex items-center justify-between border-b border-white/10">
                <span className="eyebrow-label text-[#E9C46A]">
                  Photo {activePhotoIndex + 1} of {photos.length}
                </span>
                <button
                  onClick={() => setActivePhotoIndex(null)}
                  className="p-2 rounded-full text-white/70 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                  aria-label="Close photo preview"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="relative bg-black flex items-center justify-center max-h-[65vh] overflow-hidden">
                <SmartImage
                  src={photos[activePhotoIndex].url}
                  fallbackSrc={photos[activePhotoIndex].fallbackUrl}
                  alt={photos[activePhotoIndex].title}
                  priority={true}
                  aspectRatio="4/3"
                  className="max-h-[65vh] w-auto max-w-full object-contain mx-auto"
                />

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setActivePhotoIndex(
                      (activePhotoIndex - 1 + photos.length) % photos.length
                    );
                  }}
                  className="absolute left-4 p-3 rounded-full bg-black/60 text-white hover:bg-[#B8572B] transition-colors cursor-pointer"
                  aria-label="Previous image"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setActivePhotoIndex((activePhotoIndex + 1) % photos.length);
                  }}
                  className="absolute right-4 p-3 rounded-full bg-black/60 text-white hover:bg-[#B8572B] transition-colors cursor-pointer"
                  aria-label="Next image"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>

              <div className="p-6 bg-[#1A1A1A] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h3 className="text-xl font-bold font-display text-white">
                    {photos[activePhotoIndex].title}
                  </h3>
                  <p className="text-sm text-white/70 mt-1">
                    {photos[activePhotoIndex].caption}
                  </p>
                </div>
                <div className="text-xs text-white/40 whitespace-nowrap">
                  Adel Barber · 17 Cloth Hall St
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
