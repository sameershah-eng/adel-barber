import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Copy, Check, Navigation, Train, Car, Bus } from 'lucide-react';
import { businessData } from '../data/business';
import { SplitText } from '../lib/motion';

export const Location: React.FC = () => {
  const [copied, setCopied] = useState(false);

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(businessData.address.fullString);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section id="location" className="py-28 sm:py-36 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-16 sm:mb-20">
          <div className="flex items-center gap-4 mb-4">
            <span className="eyebrow-label text-[#B8572B]">
              07 / LOCATION & TRANSIT
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
              Cloth Hall Street, Huddersfield
            </SplitText>
          </h2>

          <p className="mt-4 text-base sm:text-lg text-[#57534E]">
            Situated in central Huddersfield, steps away from the train station, bus interchange, and local car parks.
          </p>
        </div>

        {/* Map & Address Split Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Address & Wayfinding Card (5 cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between p-8 sm:p-10 rounded-3xl bg-[#FAF7F2] border border-[#E8E0D2] shadow-sm space-y-6">
            <div className="space-y-5">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#1F4E5A]">
                <MapPin className="w-4 h-4 text-[#B8572B]" />
                <span>Shop Address</span>
              </div>

              <div>
                <h3 className="text-3xl font-bold font-display text-[#1A1A1A]">
                  17 Cloth Hall St
                </h3>
                <p className="text-base text-[#57534E] mt-1.5 leading-relaxed">
                  Huddersfield, HD1 2DX<br />
                  West Yorkshire, United Kingdom
                </p>
              </div>

              {/* Action Buttons: Copy Address & Get Directions */}
              <div className="pt-2 flex flex-wrap items-center gap-3">
                <button
                  onClick={handleCopyAddress}
                  data-cursor="hover"
                  className="px-4 py-3 rounded-full bg-white border border-[#E8E0D2] text-xs font-bold text-[#1A1A1A] hover:border-[#B8572B] hover:text-[#B8572B] transition-colors flex items-center gap-2 shadow-xs cursor-pointer"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Copied Address!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-[#B8572B]" />
                      <span>Copy Address</span>
                    </>
                  )}
                </button>

                <a
                  href={businessData.address.googleMapsDirectionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor="hover"
                  className="px-5 py-3 rounded-full bg-[#1A1A1A] text-white text-xs font-bold uppercase tracking-wider hover:bg-[#B8572B] transition-colors flex items-center gap-2 shadow-xs"
                >
                  <Navigation className="w-3.5 h-3.5 text-[#E9C46A]" />
                  <span>Get Directions</span>
                </a>
              </div>
            </div>

            {/* Public Transport & Arrival Tips */}
            <div className="pt-6 border-t border-[#E8E0D2] space-y-3.5">
              <div className="eyebrow-label text-[#57534E]">
                Nearby Transit & Parking
              </div>

              <div className="space-y-2.5 text-xs text-[#57534E]">
                <div className="flex items-start gap-2.5">
                  <Train className="w-4 h-4 text-[#B8572B] shrink-0 mt-0.5" />
                  <span>
                    <strong className="text-[#1A1A1A]">Huddersfield Station:</strong> 4 min walk (0.2 miles) via St George&apos;s Square.
                  </span>
                </div>

                <div className="flex items-start gap-2.5">
                  <Bus className="w-4 h-4 text-[#1F4E5A] shrink-0 mt-0.5" />
                  <span>
                    <strong className="text-[#1A1A1A]">Huddersfield Bus Station:</strong> 5 min walk through town centre.
                  </span>
                </div>

                <div className="flex items-start gap-2.5">
                  <Car className="w-4 h-4 text-[#D98A3D] shrink-0 mt-0.5" />
                  <span>
                    <strong className="text-[#1A1A1A]">Parking:</strong> Kingsgate Shopping Centre & Market Hall parking within easy stroll.
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Embedded Google Map Iframe (7 cols) */}
          <div className="lg:col-span-7 rounded-3xl overflow-hidden border border-[#E8E0D2] shadow-sm min-h-[400px] sm:min-h-[460px] bg-[#FAF7F2] relative">
            <iframe
              title="Adel Barber Huddersfield Location Map"
              src={businessData.address.googleMapsEmbedUrl}
              className="w-full h-full min-h-[400px] sm:min-h-[460px] border-0"
              loading="lazy"
              allowFullScreen={false}
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
