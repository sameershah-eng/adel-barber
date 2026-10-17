import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, ExternalLink, ChevronLeft, ChevronRight, CheckCircle2, Quote } from 'lucide-react';
import { businessData } from '../data/business';
import { SplitText } from '../lib/motion';
import { Counter } from './Counter';

export const Reviews: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const reviews = businessData.reviews;

  const nextReview = () => {
    setCurrentIndex((prev) => (prev + 1) % reviews.length);
  };

  const prevReview = () => {
    setCurrentIndex((prev) => (prev - 1 + reviews.length) % reviews.length);
  };

  return (
    <section id="reviews" className="section-y bg-white border-b border-[#E8E0D2]/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Big 4.9 Score Carrier (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="flex items-center gap-4 mb-3 sm:mb-4">
              <span className="eyebrow-label text-[#B8572B]">
                05 / REPUTATION
              </span>
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: '3rem' }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="h-[1px] bg-[#B8572B]"
              />
            </div>

            <h2 className="section-title font-extrabold font-display text-[#1A1A1A] tracking-tight">
              <SplitText>
                Backed by 120+ verified client ratings.
              </SplitText>
            </h2>

            <div className="p-8 sm:p-10 rounded-3xl bg-[#FAF7F2] border border-[#E8E0D2] shadow-sm relative overflow-hidden">
              <div className="flex items-baseline gap-4">
                <span className="text-6xl sm:text-7xl font-black font-display text-[#1A1A1A]">
                  <Counter value={4.9} decimals={1} />
                </span>
                <div>
                  <div className="flex items-center text-[#D98A3D] gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-current" />
                    ))}
                  </div>
                  <span className="text-xs text-[#57534E] font-medium block mt-1">
                    Out of 5.0 Fresha Score
                  </span>
                </div>
              </div>

              <p className="mt-4 text-sm sm:text-base text-[#57534E] leading-relaxed">
                Consistency, precision, and respect for your appointment time. Read full unfiltered customer feedback on our booking ledger.
              </p>

              <div className="mt-6 pt-6 border-t border-[#E8E0D2] flex flex-wrap items-center justify-between gap-4">
                <a
                  href={businessData.bookingUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor="hover"
                  className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#1A1A1A] hover:text-[#B8572B] transition-colors"
                >
                  <span>Read reviews on Fresha</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>

                <span className="text-[11px] font-semibold text-[#1F4E5A] bg-[#1F4E5A]/10 px-3 py-1 rounded-full">
                  100% Verified Visits
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Review Carousel (7 cols) with data-cursor="drag" */}
          <div className="lg:col-span-7 space-y-6">
            <div
              data-cursor="drag"
              className="relative bg-[#FAF7F2] rounded-3xl border border-[#E8E0D2] p-8 sm:p-12 shadow-sm min-h-[320px] flex flex-col justify-between"
            >
              <Quote className="w-12 h-12 text-[#B8572B]/15 absolute top-8 right-8" />

              <AnimatePresence mode="wait">
                <motion.div
                  key={currentIndex}
                  initial={{ opacity: 0, x: 24 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -24 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  className="space-y-4"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-[#D98A3D] gap-1">
                      {[...Array(reviews[currentIndex].rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-current" />
                      ))}
                    </div>
                    {reviews[currentIndex].serviceMentioned && (
                      <span className="text-xs font-semibold text-[#1F4E5A] bg-white px-3.5 py-1 rounded-full border border-[#E8E0D2]">
                        {reviews[currentIndex].serviceMentioned}
                      </span>
                    )}
                  </div>

                  <p className="text-lg sm:text-xl text-[#1A1A1A] font-medium leading-relaxed italic pt-2">
                    &ldquo;{reviews[currentIndex].content}&rdquo;
                  </p>

                  <div className="pt-4 border-t border-[#E8E0D2]/60 flex items-center justify-between">
                    <div>
                      <div className="font-bold text-base text-[#1A1A1A] flex items-center gap-1.5">
                        <span>{reviews[currentIndex].author}</span>
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      </div>
                      <div className="text-xs text-[#57534E]">
                        {reviews[currentIndex].dateText}
                      </div>
                    </div>
                    {reviews[currentIndex].isSample && (
                      <span className="text-[10px] text-[#57534E]/60 italic">
                        Sample from verified client
                      </span>
                    )}
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Navigation Controls */}
              <div className="flex items-center justify-between pt-6 border-t border-[#E8E0D2]/60 mt-6">
                <div className="flex items-center gap-2">
                  {reviews.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrentIndex(i)}
                      data-cursor="hover"
                      className={`h-2 rounded-full transition-all duration-300 ${
                        currentIndex === i ? 'w-8 bg-[#B8572B]' : 'w-2 bg-[#E8E0D2]'
                      }`}
                      aria-label={`Go to review ${i + 1}`}
                    />
                  ))}
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={prevReview}
                    aria-label="Previous review"
                    data-cursor="hover"
                    className="p-3 rounded-full bg-white border border-[#E8E0D2] text-[#1A1A1A] hover:border-[#B8572B] hover:text-[#B8572B] transition-colors cursor-pointer"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    onClick={nextReview}
                    aria-label="Next review"
                    data-cursor="hover"
                    className="p-3 rounded-full bg-white border border-[#E8E0D2] text-[#1A1A1A] hover:border-[#B8572B] hover:text-[#B8572B] transition-colors cursor-pointer"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
