import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Phone, Calendar, Clock, MapPin, ExternalLink, Scissors } from 'lucide-react';
import { businessData, PHONE_NUMBER } from '../data/business';
import { ServiceItem } from '../types';
import { useBusinessHours } from '../hooks/useBusinessHours';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedService: ServiceItem | null;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  selectedService,
}) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const status = useBusinessHours();

  // Escape key listener & focus trap
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    // Prevent body scroll when modal is open
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-labelledby="booking-modal-title"
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-[#1A1A1A]/70 backdrop-blur-sm"
          />

          {/* Modal Container */}
          <motion.div
            ref={modalRef}
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ type: 'spring', duration: 0.35, bounce: 0.15 }}
            className="relative w-full max-w-lg bg-[#FAF7F2] rounded-2xl shadow-2xl border border-[#E8E0D2] overflow-hidden z-10"
          >
            {/* Top Barber Stripe Accent */}
            <div className="h-1.5 w-full barber-pole-stripe" />

            {/* Modal Header */}
            <div className="p-6 pb-4 flex items-start justify-between border-b border-[#E8E0D2]/60">
              <div>
                <div className="text-xs uppercase tracking-wider font-semibold text-[#B8572B]">
                  Schedule Your Cut
                </div>
                <h3
                  id="booking-modal-title"
                  className="text-2xl font-bold font-display text-[#1A1A1A] mt-1"
                >
                  Book with Adel Barber
                </h3>
              </div>
              <button
                onClick={onClose}
                aria-label="Close booking modal"
                className="p-2 text-[#57534E] hover:text-[#1A1A1A] rounded-full hover:bg-[#F4EFE6] transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-6">
              {/* Selected Service Detail */}
              {selectedService ? (
                <div className="p-4 rounded-xl bg-white border border-[#E8E0D2] shadow-sm">
                  <div className="flex items-center gap-2 text-xs font-semibold text-[#B8572B] uppercase tracking-wide">
                    <Scissors className="w-3.5 h-3.5" />
                    <span>{selectedService.categoryLabel}</span>
                  </div>
                  <h4 className="text-lg font-bold text-[#1A1A1A] mt-1">
                    {selectedService.name}
                  </h4>
                  <p className="text-sm text-[#57534E] mt-1">
                    {selectedService.tagline}
                  </p>
                  <div className="flex items-center gap-4 mt-3 text-xs text-[#57534E] pt-2 border-t border-[#F4EFE6]">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-[#B8572B]" />
                      {selectedService.duration || 'Approx. 40 mins'}
                    </span>
                    <span>·</span>
                    <span>{selectedService.price || 'Price: Ask in store'}</span>
                  </div>
                </div>
              ) : (
                <div className="p-4 rounded-xl bg-white border border-[#E8E0D2] shadow-sm">
                  <div className="flex items-center gap-2 text-xs font-semibold text-[#B8572B] uppercase tracking-wide">
                    <Scissors className="w-3.5 h-3.5" />
                    <span>General Appointment</span>
                  </div>
                  <h4 className="text-lg font-bold text-[#1A1A1A] mt-1">
                    Choose Service on Arrival or Booking
                  </h4>
                  <p className="text-sm text-[#57534E] mt-1">
                    Fades, beard sculpting, hot towel shaves, or textured hair cuts. Walk-ins welcomed subject to chair availability.
                  </p>
                </div>
              )}

              {/* Live Status & Location Snippet */}
              <div className="grid grid-cols-2 gap-3 text-xs text-[#57534E]">
                <div className="p-3 rounded-lg bg-[#F4EFE6] flex items-start gap-2">
                  <Clock className="w-4 h-4 text-[#B8572B] shrink-0 mt-0.5" />
                  <div>
                    <div className="font-semibold text-[#1A1A1A]">{status.statusBadgeText}</div>
                    <div>Mon–Sat: 9am–6pm | Sun: 10am–5pm</div>
                  </div>
                </div>
                <div className="p-3 rounded-lg bg-[#F4EFE6] flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-[#1F4E5A] shrink-0 mt-0.5" />
                  <div>
                    <div className="font-semibold text-[#1A1A1A]">Huddersfield Centre</div>
                    <div>17 Cloth Hall St, HD1 2DX</div>
                  </div>
                </div>
              </div>

              {/* Primary Booking Methods */}
              <div className="space-y-3 pt-2">
                {/* Method 1: Fresha Online Booking */}
                <a
                  href={businessData.bookingUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor="book"
                  className="flex items-center justify-between w-full px-5 py-3.5 rounded-xl bg-[#1A1A1A] text-white font-medium hover:bg-[#B8572B] transition-colors shadow-sm group"
                >
                  <div className="flex items-center gap-3">
                    <Calendar className="w-5 h-5 text-[#E9C46A]" />
                    <div className="text-left">
                      <div className="text-sm font-semibold">Book Online via Fresha</div>
                      <div className="text-xs text-white/70">
                        Pick time slot, instant calendar confirmation
                      </div>
                    </div>
                  </div>
                  <ExternalLink className="w-4 h-4 text-white/60 group-hover:text-white transition-colors" />
                </a>

                {/* Method 2: Call Barbershop */}
                <a
                  href={businessData.phone.telHref}
                  data-cursor="book"
                  className="flex items-center justify-between w-full px-5 py-3.5 rounded-xl bg-white border border-[#E8E0D2] text-[#1A1A1A] font-medium hover:border-[#B8572B] hover:bg-[#FAF7F2] transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    <Phone className="w-5 h-5 text-[#B8572B]" />
                    <div className="text-left">
                      <div className="text-sm font-semibold">Call to Book: {PHONE_NUMBER}</div>
                      <div className="text-xs text-[#57534E]">
                        Immediate booking with our barbers
                      </div>
                    </div>
                  </div>
                  <span className="text-xs font-semibold px-2.5 py-1 rounded-md bg-[#F4EFE6] text-[#B8572B] group-hover:bg-[#B8572B] group-hover:text-white transition-colors">
                    Call
                  </span>
                </a>
              </div>

              {/* Client Note / Trust Marker */}
              <p className="text-center text-xs text-[#57534E]/80">
                Walk-ins are also welcome at 17 Cloth Hall Street. 4.9★ rating based on verified visits.
              </p>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
