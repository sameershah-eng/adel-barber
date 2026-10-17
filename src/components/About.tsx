import React from 'react';
import { motion } from 'framer-motion';
import { Scissors, ShieldCheck, HeartHandshake } from 'lucide-react';
import { businessData } from '../data/business';
import { SplitText } from '../lib/motion';
import { SmartImage } from './SmartImage';

export const About: React.FC = () => {
  return (
    <section id="about" className="section-y bg-white relative overflow-hidden border-y border-[#E8E0D2]/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header with Line Drawing Eyebrow */}
        <div className="flex flex-col md:flex-row md:items-end justify-between heading-block-mb gap-4 sm:gap-6">
          <div className="max-w-2xl">
            {/* Eyebrow with expanding line */}
            <div className="flex items-center gap-4 mb-3 sm:mb-4">
              <span className="eyebrow-label text-[#B8572B]">
                01 / THE PHILOSOPHY
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
              <SplitText highlightWords={{ Precision: 'text-[#1F4E5A]', Craft: 'text-signature-gradient' }}>
                Craft over speed. Precision for every texture.
              </SplitText>
            </h2>
          </div>

          <p className="text-base sm:text-lg text-[#57534E] max-w-md font-normal leading-relaxed">
            A traditional barbershop discipline calibrated for contemporary cuts. Serving Huddersfield with pride.
          </p>
        </div>

        {/* Asymmetric Overlapping Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Overlapping Images (7 cols) */}
          <div className="lg:col-span-7 relative order-2 lg:order-1">
            <div className="relative">
              {/* Primary Large Image */}
              <div className="rounded-3xl overflow-hidden shadow-2xl border border-[#E8E0D2] bg-[#FAF7F2] aspect-video relative">
                <SmartImage
                  src={businessData.images.aboutMain.src}
                  fallbackSrc={businessData.images.aboutMain.fallbackUrl}
                  alt={businessData.images.aboutMain.alt}
                  aspectRatio="16/9"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Secondary Overlapping Inset Image */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="absolute -bottom-8 -right-4 sm:-right-8 w-1/2 rounded-2xl overflow-hidden shadow-2xl border-4 border-white hidden sm:block aspect-square bg-white z-10"
              >
                <SmartImage
                  src={businessData.images.aboutSecondary.src}
                  fallbackSrc={businessData.images.aboutSecondary.fallbackUrl}
                  alt={businessData.images.aboutSecondary.alt}
                  aspectRatio="1/1"
                  className="w-full h-full object-cover"
                />
              </motion.div>

              {/* Accent Tag */}
              <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md px-4 py-2 rounded-xl border border-[#E8E0D2] text-xs font-bold text-[#1A1A1A] shadow-sm z-10">
                17 Cloth Hall St · Town Centre
              </div>
            </div>
          </div>

          {/* Story & Specialization (5 cols) */}
          <div className="lg:col-span-5 space-y-6 order-1 lg:order-2">
            <p className="text-[#1A1A1A] text-lg sm:text-xl font-medium leading-relaxed">
              At Adel Barber, we don’t rush people through an assembly line. Every appointment starts with an honest consultation and ends with surgical check lines.
            </p>

            <p className="text-[#57534E] text-base leading-relaxed">
              {businessData.fullStory}
            </p>

            {/* Specialist African & Textured Hair Card */}
            <div className="p-6 rounded-2xl bg-[#FAF7F2] border border-[#E8E0D2] space-y-3 relative overflow-hidden shadow-xs hover:border-[#B8572B]/60 transition-all">
              <div className="flex items-center gap-2 text-xs font-bold text-[#B8572B] uppercase tracking-wider">
                <Scissors className="w-4 h-4" />
                <span>Specialist Knowledge</span>
              </div>
              <h3 className="text-lg font-bold text-[#1A1A1A] font-display">
                African & Textured Hair Expertise
              </h3>
              <p className="text-sm text-[#57534E] leading-relaxed">
                Coarse, curly, and afro textures require unique clipper handling, tension control, and blade care. We know how to sculpt clean bevels, crisp tapers, and moisture-balanced finishes without burning or damaging sensitive scalps.
              </p>
            </div>

            {/* Value checklist */}
            <div className="grid grid-cols-2 gap-4 pt-2">
              <div className="flex items-start gap-2.5">
                <ShieldCheck className="w-4 h-4 text-[#B8572B] shrink-0 mt-0.5" />
                <span className="text-xs sm:text-sm font-semibold text-[#1A1A1A]">
                  Sterilised Japanese steel & foil shavers
                </span>
              </div>
              <div className="flex items-start gap-2.5">
                <HeartHandshake className="w-4 h-4 text-[#1F4E5A] shrink-0 mt-0.5" />
                <span className="text-xs sm:text-sm font-semibold text-[#1A1A1A]">
                  Walk-ins & scheduled appointments
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
