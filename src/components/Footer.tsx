import React from 'react';
import { MapPin, Phone, Clock, ExternalLink, Instagram, Calendar } from 'lucide-react';
import { businessData } from '../data/business';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const handleSmoothScroll = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const yOffset = -80;
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-[#1A1A1A] text-white/80 border-t border-white/10 pt-16 pb-24 md:pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 pb-14 border-b border-white/10">
          {/* Brand & Mission (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-2">
              <span className="text-2xl font-extrabold font-display tracking-tight text-white">
                {businessData.name}
              </span>
              <span className="w-2 h-2 rounded-full bg-[#B8572B]" />
            </div>

            <p className="text-sm text-white/70 leading-relaxed max-w-sm">
              {businessData.shortDescription}
            </p>

            <div className="pt-2">
              <a
                href={businessData.bookingUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white/10 hover:bg-[#B8572B] text-white text-xs font-bold uppercase tracking-wider transition-colors"
              >
                <Calendar className="w-3.5 h-3.5 text-[#E9C46A]" />
                <span>Fresha Booking Portal</span>
                <ExternalLink className="w-3 h-3 text-white/60" />
              </a>
            </div>
          </div>

          {/* Quick Links (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <div className="text-xs font-bold uppercase tracking-widest text-[#E9C46A]">
              Navigation
            </div>
            <ul className="space-y-2 text-sm">
              <li>
                <button
                  onClick={() => handleSmoothScroll('services')}
                  data-cursor="hover"
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Grooming Services & Pricing
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleSmoothScroll('about')}
                  data-cursor="hover"
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Our Philosophy & Story
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleSmoothScroll('why-us')}
                  data-cursor="hover"
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Why Choose Adel Barber
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleSmoothScroll('gallery')}
                  data-cursor="hover"
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Life In The Chair (Gallery)
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleSmoothScroll('hours')}
                  data-cursor="hover"
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Weekly Opening Hours
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleSmoothScroll('location')}
                  data-cursor="hover"
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Shop Directions & Transit
                </button>
              </li>
            </ul>
          </div>

          {/* Hours Summary (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <div className="text-xs font-bold uppercase tracking-widest text-[#E9C46A]">
              Hours
            </div>
            <div className="text-xs space-y-1.5 text-white/70">
              <div>
                <strong className="text-white block">Mon – Sat:</strong>
                9:00 AM – 6:00 PM
              </div>
              <div className="pt-1">
                <strong className="text-white block">Sunday:</strong>
                10:00 AM – 5:00 PM
              </div>
              <div className="pt-2 text-[#E9C46A]">
                Walk-ins welcome daily
              </div>
            </div>
          </div>

          {/* Location & Contact (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <div className="text-xs font-bold uppercase tracking-widest text-[#E9C46A]">
              Location & Phone
            </div>
            <div className="text-xs space-y-2 text-white/70">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#B8572B] shrink-0 mt-0.5" />
                <span>
                  17 Cloth Hall St, Huddersfield<br />
                  HD1 2DX, United Kingdom
                </span>
              </div>
              <div className="flex items-center gap-2 pt-1">
                <Phone className="w-4 h-4 text-[#B8572B] shrink-0" />
                <a
                  href={businessData.phone.telHref}
                  className="hover:text-white font-medium"
                >
                  {businessData.phone.display}
                </a>
              </div>
            </div>

            <div className="pt-2 flex items-center gap-3">
              {businessData.socials.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.name}
                  className="p-2 rounded-lg bg-white/5 hover:bg-white/15 text-white/70 hover:text-white transition-colors"
                  title={social.handle}
                >
                  {social.name.includes('Instagram') ? (
                    <Instagram className="w-4 h-4" />
                  ) : (
                    <ExternalLink className="w-4 h-4" />
                  )}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Respect */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/50">
          <div>
            &copy; {currentYear} {businessData.name}. All rights reserved. Huddersfield, West Yorkshire.
          </div>
          <div className="flex items-center gap-6">
            <span>Specialist in all hair types</span>
            <span>·</span>
            <span>4.9★ Rated Barbershop</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
