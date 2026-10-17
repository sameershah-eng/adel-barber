import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, ArrowRight } from 'lucide-react';
import { businessData } from '../data/business';
import { ServiceItem } from '../types';
import { SplitText } from '../lib/motion';

interface ServicesProps {
  onSelectService: (service: ServiceItem) => void;
}

export const Services: React.FC<ServicesProps> = ({ onSelectService }) => {
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'hair-styling' | 'barbering'>('all');

  const categories = [
    { id: 'all', label: 'All Services' },
    { id: 'hair-styling', label: 'Hair & Styling' },
    { id: 'barbering', label: 'Barbering & Shaves' },
  ];

  const filteredServices = businessData.services.filter((s) => {
    if (selectedCategory === 'all') return true;
    return s.category === selectedCategory;
  });

  return (
    <section id="services" className="py-28 sm:py-36 bg-[#FAF7F2] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header with Eyebrow Drawing Line */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="flex items-center justify-center gap-4 mb-4">
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: '3rem' }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="h-[1px] bg-[#B8572B]"
            />
            <span className="eyebrow-label text-[#B8572B]">
              02 / SERVICES & TREATMENTS
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
              Precision Grooming Services
            </SplitText>
          </h2>

          <p className="mt-4 text-base sm:text-lg text-[#57534E] leading-relaxed">
            Every cut and shave is delivered with deliberate attention. Transparent timing, unhurried consultations, and bespoke finishing.
          </p>

          {/* Interactive Category Segmented Tabs with Sliding Pill */}
          <div className="mt-10 inline-flex items-center p-1.5 rounded-full bg-white border border-[#E8E0D2] shadow-xs">
            {categories.map((cat) => {
              const isActive = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id as any)}
                  data-cursor="hover"
                  className={`relative px-5 sm:px-7 py-2.5 text-xs sm:text-sm font-bold transition-colors rounded-full whitespace-nowrap cursor-pointer ${
                    isActive ? 'text-white' : 'text-[#57534E] hover:text-[#1A1A1A]'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeCategoryPill"
                      className="absolute inset-0 bg-[#1A1A1A] rounded-full shadow-sm"
                      transition={{ type: 'spring', stiffness: 420, damping: 32 }}
                    />
                  )}
                  <span className="relative z-10">{cat.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Services Grid with AnimatePresence & Conic Gradient Hover Glow */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedCategory}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.35 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
          >
            {filteredServices.map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                whileHover={{ y: -6 }}
                className="group relative rounded-3xl p-[1.5px] transition-all duration-300 flex flex-col justify-between"
              >
                {/* Rotating conic gradient border on hover */}
                <div className="absolute inset-0 rounded-3xl animated-gradient-border opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />

                {/* Inner White Card */}
                <div className="w-full h-full rounded-[22px] bg-white border border-[#E8E0D2] p-7 sm:p-8 flex flex-col justify-between shadow-xs group-hover:shadow-xl transition-shadow">
                  {/* Top Badge and Category */}
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span className="eyebrow-label text-[#B8572B]">
                        {service.categoryLabel}
                      </span>
                      {service.badge && (
                        <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-[#FAF7F2] text-[#1F4E5A] border border-[#E8E0D2]">
                          {service.badge}
                        </span>
                      )}
                    </div>

                    <h3 className="text-2xl font-bold font-display text-[#1A1A1A] group-hover:text-[#B8572B] transition-colors">
                      {service.name}
                    </h3>

                    <p className="text-xs font-serif italic text-[#1F4E5A] mt-1 text-sm">
                      {service.tagline}
                    </p>

                    <p className="text-sm text-[#57534E] mt-3 leading-relaxed">
                      {service.description}
                    </p>
                  </div>

                  {/* Card Footer: Duration, Price, and Action */}
                  <div className="pt-6 mt-6 border-t border-[#F4EFE6] space-y-4">
                    <div className="flex items-center justify-between text-xs text-[#57534E]">
                      <span className="flex items-center gap-1.5 font-medium">
                        <Clock className="w-4 h-4 text-[#B8572B]" />
                        {service.duration || '35–45 mins'}
                      </span>
                      <span className="font-semibold px-2.5 py-1 rounded-full bg-[#FAF7F2] text-[#1A1A1A] border border-[#E8E0D2]">
                        {service.price ? service.price : 'Ask in store'}
                      </span>
                    </div>

                    <button
                      onClick={() => onSelectService(service)}
                      data-cursor="book"
                      className="w-full py-3.5 px-4 rounded-xl bg-[#FAF7F2] group-hover:bg-[#1A1A1A] text-[#1A1A1A] group-hover:text-white font-bold text-xs uppercase tracking-wider border border-[#E8E0D2] group-hover:border-[#1A1A1A] transition-all flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <span>Book Treatment</span>
                      <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        <div className="mt-12 text-center text-xs text-[#57534E] max-w-xl mx-auto">
          <p>
            * Prices confirmed in shop based on styling requirements. Walk-ins always welcome at 17 Cloth Hall St.
          </p>
        </div>
      </div>
    </section>
  );
};
