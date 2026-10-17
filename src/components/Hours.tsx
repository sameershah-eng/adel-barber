import React from 'react';
import { motion } from 'framer-motion';
import { Clock, Calendar } from 'lucide-react';
import { businessData } from '../data/business';
import { useBusinessHours } from '../hooks/useBusinessHours';
import { SplitText } from '../lib/motion';

export const Hours: React.FC = () => {
  const status = useBusinessHours();

  return (
    <section id="hours" className="py-28 sm:py-36 bg-[#FAF7F2] border-b border-[#E8E0D2]/80">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header with Eyebrow Drawing Line */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="flex items-center justify-center gap-4 mb-4">
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: '3rem' }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="h-[1px] bg-[#B8572B]"
            />
            <span className="eyebrow-label text-[#B8572B]">
              06 / SCHEDULE
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
              Opening Hours
            </SplitText>
          </h2>

          <p className="mt-4 text-base sm:text-lg text-[#57534E]">
            Open 7 days a week in Huddersfield town centre. Early evening availability every weekday.
          </p>

          {/* Live Badge */}
          <div className="mt-8 inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-white border border-[#E8E0D2] shadow-sm text-xs sm:text-sm">
            <span
              className={`w-2.5 h-2.5 rounded-full ${
                status.isOpen ? 'bg-emerald-500 animate-pulse' : 'bg-stone-400'
              }`}
            />
            <span className="font-bold text-[#1A1A1A]">{status.statusBadgeText}</span>
            <span className="text-[#57534E]">({status.subText})</span>
          </div>
        </div>

        {/* Hours Table Card */}
        <motion.div
          whileInView={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: 24 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="rounded-3xl bg-white border border-[#E8E0D2] shadow-xl overflow-hidden"
        >
          {/* Top Thin Barber Strip Accent */}
          <div className="h-2 w-full barber-pole-stripe" />

          <div className="p-8 sm:p-10">
            <div className="divide-y divide-[#F4EFE6]">
              {businessData.hours.map((day) => {
                const isToday = status.currentDayIndex === day.dayIndex;

                return (
                  <div
                    key={day.dayName}
                    className={`py-4 sm:py-5 px-4 sm:px-6 rounded-2xl flex items-center justify-between transition-colors ${
                      isToday
                        ? 'bg-[#FAF7F2] border-l-4 border-[#B8572B] font-bold shadow-xs'
                        : 'hover:bg-[#FAF7F2]/60'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className={`text-base sm:text-lg font-display ${isToday ? 'text-[#B8572B]' : 'text-[#1A1A1A]'}`}>
                        {day.dayName}
                      </span>
                      {isToday && (
                        <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-[#B8572B]/10 text-[#B8572B]">
                          Today
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-4">
                      <span className={`text-base sm:text-lg tabular-nums font-mono ${isToday ? 'text-[#1A1A1A] font-bold' : 'text-[#57534E]'}`}>
                        {day.formattedDisplay}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-8 pt-6 border-t border-[#F4EFE6] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#57534E]">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#B8572B]" />
                <span>Last haircut appointment booked 30 mins prior to closing.</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-[#1F4E5A]" />
                <span>Appointments guaranteed via Fresha; walk-ins taken on arrival.</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
