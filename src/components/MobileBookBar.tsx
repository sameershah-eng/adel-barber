import React from 'react';
import { Phone, Calendar } from 'lucide-react';
import { businessData, PHONE_NUMBER } from '../data/business';

interface MobileBookBarProps {
  onOpenBooking: () => void;
}

export const MobileBookBar: React.FC<MobileBookBarProps> = ({ onOpenBooking }) => {
  return (
    <aside
      aria-label="Mobile quick booking bar"
      className="fixed bottom-0 left-0 right-0 z-40 md:hidden bg-[#FAF7F2]/95 backdrop-blur-lg border-t border-[#E8E0D2] px-4 pt-2.5 pb-[max(0.75rem,env(safe-area-inset-bottom))] shadow-2xl"
    >
      <div className="flex items-center gap-3 max-w-md mx-auto">
        {/* Quick Call Button */}
        <a
          href={businessData.phone.telHref}
          className="flex-1 py-3 px-3 rounded-xl bg-white border border-[#E8E0D2] text-[#1A1A1A] font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 active:bg-[#F4EFE6] shadow-xs min-h-[44px]"
        >
          <Phone className="w-4 h-4 text-[#B8572B]" />
          <span>Call Shop</span>
        </a>

        {/* Book Button */}
        <button
          onClick={onOpenBooking}
          className="flex-1 py-3 px-3 rounded-xl bg-[#1A1A1A] text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 active:bg-[#B8572B] shadow-sm min-h-[44px]"
        >
          <Calendar className="w-4 h-4 text-[#E9C46A]" />
          <span>Book Online</span>
        </button>
      </div>
    </aside>
  );
};
