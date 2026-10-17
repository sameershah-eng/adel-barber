import React from 'react';
import { Calendar, Phone, Sparkles, MapPin } from 'lucide-react';
import { businessData, PHONE_NUMBER } from '../data/business';
import { SplitText } from '../lib/motion';
import { SmartImage } from './SmartImage';

interface BookingCTAProps {
  onOpenBooking: () => void;
}

export const BookingCTA: React.FC<BookingCTAProps> = ({ onOpenBooking }) => {
  return (
    <section className="py-24 relative overflow-hidden bg-[#1A1A1A] text-white">
      {/* Background Copper & Amber Radial Highlights */}
      <div
        className="absolute top-0 right-1/4 w-[36rem] h-[36rem] bg-[#B8572B]/20 rounded-full blur-[120px] pointer-events-none -z-10"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-0 left-1/4 w-[32rem] h-[32rem] bg-[#D98A3D]/18 rounded-full blur-[100px] pointer-events-none -z-10"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="p-8 sm:p-14 md:p-18 rounded-[36px] bg-gradient-to-br from-[#B8572B] via-[#9E461F] to-[#1F4E5A] shadow-2xl relative overflow-hidden border border-white/15">
          {/* Subtle Atmospheric Shop Photo Texture in Background */}
          <div className="absolute inset-0 opacity-15 mix-blend-overlay pointer-events-none">
            <SmartImage
              src={businessData.images.cta.src}
              fallbackSrc={businessData.images.cta.fallbackUrl}
              alt={businessData.images.cta.alt}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="max-w-3xl space-y-6 relative z-10">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/15 backdrop-blur-md text-white text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-[#E9C46A]" />
              <span>Huddersfield&apos;s Precision Barbershop</span>
            </div>

            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold font-display tracking-tight text-white leading-none">
              <SplitText>
                Your chair is waiting.
              </SplitText>
            </h2>

            <p className="text-base sm:text-xl text-white/90 leading-relaxed max-w-2xl font-normal">
              Whether you need a weekly skin fade, beard line sculpting, an unhurried hot towel shave, or specialist textured hair grooming — step into Adel Barber.
            </p>

            <div className="pt-4 flex flex-wrap items-center gap-4">
              <button
                onClick={onOpenBooking}
                className="px-8 py-4 rounded-full bg-white text-[#1A1A1A] font-display font-extrabold text-xs tracking-wide uppercase hover:bg-[#FAF7F2] transition-all active:scale-97 shadow-xl flex items-center gap-2.5 cursor-pointer"
              >
                <Calendar className="w-4 h-4 text-[#B8572B]" />
                <span>Book Online Now</span>
              </button>

              <a
                href={businessData.phone.telHref}
                className="px-7 py-4 rounded-full bg-black/40 backdrop-blur-md border border-white/25 text-white font-display font-bold text-xs uppercase tracking-wider hover:bg-black/60 transition-all active:scale-97 flex items-center gap-2.5"
              >
                <Phone className="w-4 h-4 text-[#E9C46A]" />
                <span>Call: {PHONE_NUMBER}</span>
              </a>
            </div>

            <div className="pt-6 flex flex-wrap items-center gap-y-2 gap-x-6 text-xs text-white/80">
              <div className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-[#E9C46A]" />
                <span>17 Cloth Hall St, HD1 2DX</span>
              </div>
              <div>·</div>
              <div>Open Mon–Sat 9–6, Sun 10–5</div>
              <div>·</div>
              <div>Walk-ins Always Welcome</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
