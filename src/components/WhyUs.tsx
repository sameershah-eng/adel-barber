import React from 'react';
import { motion } from 'framer-motion';
import { Scissors, Flame, MapPin, Calendar, Star, Compass } from 'lucide-react';
import { businessData } from '../data/business';
import { SplitText } from '../lib/motion';
import { Counter } from './Counter';

export const WhyUs: React.FC = () => {
  const getIcon = (id: string) => {
    switch (id) {
      case 'fades':
        return <Scissors className="w-5 h-5 text-[#B8572B]" />;
      case 'textures':
        return <Compass className="w-5 h-5 text-[#1F4E5A]" />;
      case 'ritual':
        return <Flame className="w-5 h-5 text-[#D98A3D]" />;
      case 'location':
        return <MapPin className="w-5 h-5 text-[#B8572B]" />;
      case 'seven-days':
        return <Calendar className="w-5 h-5 text-[#1F4E5A]" />;
      case 'reputation':
        return <Star className="w-5 h-5 text-[#D98A3D] fill-current" />;
      default:
        return <Scissors className="w-5 h-5 text-[#B8572B]" />;
    }
  };

  return (
    <section id="why-us" className="py-28 sm:py-36 bg-white border-b border-[#E8E0D2]/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="max-w-3xl mb-16 sm:mb-20">
          <div className="flex items-center gap-4 mb-4">
            <span className="eyebrow-label text-[#B8572B]">
              03 / THE STANDARD
            </span>
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: '4rem' }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="h-[1px] bg-[#B8572B]"
            />
          </div>

          <h2 className="section-title font-extrabold font-display text-[#1A1A1A] tracking-tight">
            <SplitText>
              Why Huddersfield Chooses Adel Barber
            </SplitText>
          </h2>

          <p className="mt-4 text-base sm:text-lg text-[#57534E]">
            Six uncompromising pillars that govern our daily craft in Huddersfield town centre.
          </p>
        </div>

        {/* Bento Grid with Spring Counters */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {businessData.bentoFeatures.map((feat, index) => (
            <motion.div
              key={feat.id}
              whileInView={{ opacity: 1, y: 0 }}
              initial={{ opacity: 0, y: 24 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.6, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -6 }}
              className={`p-8 rounded-3xl border border-[#E8E0D2] bg-[#FAF7F2] hover:bg-white hover:border-[#B8572B]/60 hover:shadow-2xl transition-all duration-300 flex flex-col justify-between ${feat.colSpanDesktop}`}
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <span className="text-xs font-mono font-bold tracking-widest text-[#B8572B]">
                    {feat.number}
                  </span>
                  <div className="p-3 rounded-2xl bg-white border border-[#E8E0D2]/60 shadow-xs">
                    {getIcon(feat.id)}
                  </div>
                </div>

                <h3 className="text-2xl font-bold font-display text-[#1A1A1A] mb-3">
                  {feat.id === 'reputation' ? (
                    <span className="flex items-center gap-2">
                      <Counter value={4.9} decimals={1} suffix=" ★" />
                      <span>Proven Reputation</span>
                    </span>
                  ) : (
                    feat.title
                  )}
                </h3>

                <p className="text-sm text-[#57534E] leading-relaxed">
                  {feat.description}
                </p>
              </div>

              {feat.highlight && (
                <div className="mt-8 pt-4 border-t border-[#E8E0D2]/60 text-xs font-semibold text-[#1A1A1A] flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#B8572B]" />
                  <span>{feat.highlight}</span>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
