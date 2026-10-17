import { BusinessData } from '../types';

// ============================================================================
// ADEL BARBER - CENTRAL BUSINESS DATA STORE
// Client can edit text, hours, services, images, and links here directly.
// ============================================================================

// TODO: Replace with real client phone number once confirmed
export const PHONE_NUMBER = '+44 0000 000000'; // TODO: replace with real number in business.ts

export const businessData: BusinessData = {
  name: 'Adel Barber',
  tagline: "Huddersfield's Precision Barbershop",
  shortDescription:
    'Sharp cuts, clean lines, and timeless grooming in the heart of Huddersfield town centre. Dedicated craftsmen for all hair types and textures.',
  fullStory:
    'Located on Cloth Hall Street in central Huddersfield, Adel Barber delivers high-calibre grooming grounded in classic barbering values and modern precision. From surgical skin fades and sculpted beard lines to traditional hot towel treatments, our chair is built on respect for every client and mastery of all hair types — with renowned expertise in African, coiled, and textured hair.',
  
  // Local images stored in public/images/ with verified remote fallbacks
  images: {
    hero: {
      src: '/images/hero.jpg',
      fallbackUrl: 'https://images.unsplash.com/photo-1622286342621-4bd786c2447c?auto=format&fit=crop&w=1600&q=80',
      alt: 'Master barber sculpting a precision skin fade at Adel Barber Huddersfield',
    },
    heroSecondary: {
      src: '/images/hero-2.jpg',
      fallbackUrl: 'https://images.unsplash.com/photo-1512690459411-b9245aed614b?auto=format&fit=crop&w=1600&q=80',
      alt: 'Traditional hot towel shave and grooming ritual',
    },
    aboutMain: {
      src: '/images/about-1.jpg',
      fallbackUrl: 'https://images.unsplash.com/photo-1517832606299-7ae9b720a186?auto=format&fit=crop&w=1600&q=80',
      alt: 'Shop interior on Cloth Hall Street with vintage leather barber chairs',
    },
    aboutSecondary: {
      src: '/images/about-2.jpg',
      fallbackUrl: 'https://images.unsplash.com/photo-1621605815971-fbc98d665033?auto=format&fit=crop&w=1600&q=80',
      alt: 'Razor beard sculpt and detailed cheek line carving',
    },
    cta: {
      src: '/images/cta.jpg',
      fallbackUrl: 'https://images.unsplash.com/photo-1534778356534-d3d45b6df1da?auto=format&fit=crop&w=1600&q=80',
      alt: 'Adel Barber leather chairs waiting on Cloth Hall Street',
    },
  },

  address: {
    line1: '17 Cloth Hall St',
    city: 'Huddersfield',
    postalCode: 'HD1 2DX',
    county: 'West Yorkshire',
    country: 'United Kingdom',
    fullString: '17 Cloth Hall St, Huddersfield, HD1 2DX, United Kingdom',
    locationContext: 'In the heart of Huddersfield town centre, West Yorkshire',
    googleMapsEmbedUrl:
      'https://maps.google.com/maps?q=17+Cloth+Hall+St,+Huddersfield+HD1+2DX&output=embed',
    googleMapsDirectionsUrl:
      'https://www.google.com/maps/dir/?api=1&destination=17+Cloth+Hall+St,+Huddersfield+HD1+2DX,+UK',
  },

  phone: {
    display: PHONE_NUMBER,
    telHref: `tel:${PHONE_NUMBER.replace(/\s+/g, '')}`,
    isPlaceholder: true,
    note: 'Phone number pending client confirmation. Click to call directly.',
  },

  bookingUrl: 'https://www.fresha.com/lvp/adel-barber-cloth-hall-street-Kzr63q',

  rating: {
    score: 4.9,
    maxScore: 5.0,
    countText: 'Verified Customer Reviews',
    label: 'Exceptional 4.9 / 5 Rating',
    source: 'Fresha & Google Verified',
  },

  // Opening Hours
  hours: [
    {
      dayName: 'Monday',
      dayIndex: 1,
      openTime: '09:00',
      closeTime: '18:00',
      formattedDisplay: '9:00 AM – 6:00 PM',
    },
    {
      dayName: 'Tuesday',
      dayIndex: 2,
      openTime: '09:00',
      closeTime: '18:00',
      formattedDisplay: '9:00 AM – 6:00 PM',
    },
    {
      dayName: 'Wednesday',
      dayIndex: 3,
      openTime: '09:00',
      closeTime: '18:00',
      formattedDisplay: '9:00 AM – 6:00 PM',
    },
    {
      dayName: 'Thursday',
      dayIndex: 4,
      openTime: '09:00',
      closeTime: '18:00',
      formattedDisplay: '9:00 AM – 6:00 PM',
    },
    {
      dayName: 'Friday',
      dayIndex: 5,
      openTime: '09:00',
      closeTime: '18:00',
      formattedDisplay: '9:00 AM – 6:00 PM',
    },
    {
      dayName: 'Saturday',
      dayIndex: 6,
      openTime: '09:00',
      closeTime: '18:00',
      formattedDisplay: '9:00 AM – 6:00 PM',
    },
    {
      dayName: 'Sunday',
      dayIndex: 0,
      openTime: '10:00',
      closeTime: '17:00',
      formattedDisplay: '10:00 AM – 5:00 PM',
    },
  ],

  // Client Services categorized by "Barbering" and "Hair & Styling"
  services: [
    {
      id: 'mens-haircut',
      name: "Men's Haircut",
      category: 'hair-styling',
      categoryLabel: 'Hair & Styling',
      tagline: 'Tailored consultation, scissor work, clipper graduation, and styled finish',
      description:
        'A comprehensive haircut tailored to your head shape, hair density, and daily routine. Includes hair wash, consultation, and bespoke matte or natural finish.',
      duration: '35–45 mins',
      price: '',
      badge: 'Core Service',
    },
    {
      id: 'skin-fades',
      name: 'Skin Fades & Tapers',
      category: 'hair-styling',
      categoryLabel: 'Hair & Styling',
      tagline: 'Seamless razor fade down to bare skin with laser-sharp edge work',
      description:
        'Low, mid, or high skin fade executed with foil shavers, precision foil gradients, and architectural shape-ups. Clean silhouette that grows out effortlessly.',
      duration: '40–50 mins',
      price: '',
      badge: 'Signature',
    },
    {
      id: 'textured-african-hair',
      name: 'African & Textured Hair Specialist',
      category: 'hair-styling',
      categoryLabel: 'Hair & Styling',
      tagline: 'Expert care for afro curls, coils, waves, lineups, and textured grooming',
      description:
        'Specialist technique for Afro-Caribbean, curly, and thick wavy textures. Moisture-locking preps, razor-sharp crisp edges, taper fades, and curl shaping.',
      duration: '45 mins',
      price: '',
      badge: 'Specialist Craft',
    },
    {
      id: 'beard-trim',
      name: 'Beard Trim & Sculpting',
      category: 'barbering',
      categoryLabel: 'Barbering',
      tagline: 'Cheekbone and neckline precision razor carving with conditioning oils',
      description:
        'Freehand clipper shaping, foil definition, cheek line tapering, and organic beard balm nourishment to keep your facial hair structured and soft.',
      duration: '25–30 mins',
      price: '',
      badge: 'Grooming Essential',
    },
    {
      id: 'hot-towel-shave',
      name: 'Traditional Hot Towel Shave',
      category: 'barbering',
      categoryLabel: 'Barbering',
      tagline: 'Eucalyptus steam wrap, warm lather, cut-throat blade, and cold towel close',
      description:
        'The definitive gentlemen’s ritual. Steamed towel infusion, rich pre-shave cream, artisan straight-razor shave, and an astringent cold towel with aftershave balm.',
      duration: '40 mins',
      price: '',
      badge: 'Signature Ritual',
    },
    {
      id: 'head-shave',
      name: 'Full Head Shave',
      category: 'barbering',
      categoryLabel: 'Barbering',
      tagline: 'Foil or traditional straight razor smooth shave with soothing scalp tonic',
      description:
        'Polished to absolute perfection. Includes warm oil massage, hot lather preparation, close razor glide, and cooling scalp moisturiser.',
      duration: '30 mins',
      price: '',
      badge: 'Precision Finish',
    },
  ],

  // Bento Grid: Why Choose Us
  bentoFeatures: [
    {
      id: 'fades',
      number: '01',
      title: 'Precision Fades & Tapers',
      description:
        'Zero-gap clipper engineering and foil blending for fades that transition like smoke and retain their structure for weeks.',
      highlight: 'Surgical accuracy down to 0.0mm',
      colSpanDesktop: 'md:col-span-2',
      accent: 'copper',
    },
    {
      id: 'textures',
      number: '02',
      title: 'Specialist in All Hair Types',
      description:
        'Dedicated mastery across straight, wavy, curly, and Afro-textured hair. Every hair pattern receives specialized care and proper product formulations.',
      highlight: 'African & Textured Hair Specialist',
      colSpanDesktop: 'md:col-span-1',
      accent: 'teal',
    },
    {
      id: 'ritual',
      number: '03',
      title: 'The Hot Towel Ritual',
      description:
        'Unwind in our vintage leather chairs with essential-oil steamed towels, warm rich lather, and smooth cut-throat blade glide.',
      highlight: 'Steamed Eucalyptus & Rich Balm',
      colSpanDesktop: 'md:col-span-1',
      accent: 'amber',
    },
    {
      id: 'location',
      number: '04',
      title: 'Heart of Huddersfield Town Centre',
      description:
        'Centrally situated at 17 Cloth Hall Street, moments from the train station, bus interchange, and town shopping quarters.',
      highlight: '17 Cloth Hall St · HD1 2DX',
      colSpanDesktop: 'md:col-span-2',
      accent: 'copper',
    },
    {
      id: 'seven-days',
      number: '05',
      title: 'Open 7 Days a Week',
      description:
        'Grooming that fits your schedule. Monday to Saturday 9:00am–6:00pm and Sunday 10:00am–5:00pm.',
      highlight: 'Full Weekend Availability',
      colSpanDesktop: 'md:col-span-1',
      accent: 'teal',
    },
    {
      id: 'reputation',
      number: '06',
      title: '4.9 ★ Proven Local Reputation',
      description:
        'Consistently rated 4.9 stars by local clients who trust our consistency, friendly banter, and relentless eye for detail.',
      highlight: 'Over 120+ Verified Reviews',
      colSpanDesktop: 'md:col-span-2',
      accent: 'amber',
    },
  ],

  // Gallery Photos (local files + verified remote fallback URLs)
  gallery: [
    {
      id: 'g-1',
      title: 'Craftsmanship Skin Fade',
      caption: 'Detailed foil fade transition with clean neckline perimeter',
      url: '/images/gallery-1.jpg',
      fallbackUrl: 'https://images.unsplash.com/photo-1622286342621-4bd786c2447c?auto=format&fit=crop&w=1600&q=80',
      aspect: '4/3',
    },
    {
      id: 'g-2',
      title: 'Steamed Hot Towel Ritual',
      caption: 'Traditional straight razor hot towel prep and facial treatment',
      url: '/images/gallery-2.jpg',
      fallbackUrl: 'https://images.unsplash.com/photo-1512690459411-b9245aed614b?auto=format&fit=crop&w=1600&q=80',
      aspect: '4/3',
    },
    {
      id: 'g-3',
      title: 'Cloth Hall Street Shop Floor',
      caption: 'Our welcoming shop interior on Cloth Hall Street with vintage leather chairs',
      url: '/images/gallery-3.jpg',
      fallbackUrl: 'https://images.unsplash.com/photo-1517832606299-7ae9b720a186?auto=format&fit=crop&w=1600&q=80',
      aspect: '4/3',
    },
    {
      id: 'g-4',
      title: 'Beard Sculpting & Lining',
      caption: 'Razor sharp cheek contours and conditioning botanical balm treatment',
      url: '/images/gallery-4.jpg',
      fallbackUrl: 'https://images.unsplash.com/photo-1621605815971-fbc98d665033?auto=format&fit=crop&w=1600&q=80',
      aspect: '4/3',
    },
    {
      id: 'g-5',
      title: 'Scissor Over Comb Detail',
      caption: 'Classical bespoke shear work for textured hair and natural volume',
      url: '/images/gallery-5.jpg',
      fallbackUrl: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=1600&q=80',
      aspect: '4/3',
    },
    {
      id: 'g-6',
      title: 'Artisan Barbering Toolkit',
      caption: 'Sanitized Japanese steel blades, high-torque clippers, and brass finishes',
      url: '/images/gallery-6.jpg',
      fallbackUrl: 'https://images.unsplash.com/photo-1585747860715-2ba37e788b70?auto=format&fit=crop&w=1600&q=80',
      aspect: '4/3',
    },
    {
      id: 'g-7',
      title: 'Classic Chair View',
      caption: 'Premium grooming chairs in a relaxed Huddersfield setting',
      url: '/images/gallery-7.jpg',
      fallbackUrl: 'https://images.unsplash.com/photo-1534778356534-d3d45b6df1da?auto=format&fit=crop&w=1600&q=80',
      aspect: '4/3',
    },
    {
      id: 'g-8',
      title: 'Precision Line-Up',
      caption: 'Razor sharp geometric contouring and hairline definition',
      url: '/images/gallery-8.jpg',
      fallbackUrl: 'https://images.unsplash.com/photo-1599351431202-1e0f0137899a?auto=format&fit=crop&w=1600&q=80',
      aspect: '4/3',
    },
  ],

  // SAMPLE REVIEWS: Client must replace these with real reviews from their Fresha or Google page
  reviews: [
    // SAMPLE: replace with real review
    {
      id: 'rev-1',
      author: 'Marcus T.',
      rating: 5,
      dateText: 'Verified Client · 2 weeks ago',
      serviceMentioned: 'Skin Fade & Beard Sculpt',
      content:
        'Easily the sharpest fade in Huddersfield. The attention to detail around the ears and beard line is immaculate. The vibe in the shop is welcoming, relaxed, and genuinely professional.',
      verified: true,
      isSample: true,
    },
    // SAMPLE: replace with real review
    {
      id: 'rev-2',
      author: 'David K.',
      rating: 5,
      dateText: 'Verified Client · 1 month ago',
      serviceMentioned: 'African Textured Hair Cut',
      content:
        'Finding a barber in West Yorkshire who genuinely understands textured and Afro hair is rare. Adel knows hair geometry inside out. No rush, clean edges, and top tier hospitality.',
      verified: true,
      isSample: true,
    },
    // SAMPLE: replace with real review
    {
      id: 'rev-3',
      author: 'James R.',
      rating: 5,
      dateText: 'Verified Client · 3 weeks ago',
      serviceMentioned: 'Hot Towel Shave & Cut',
      content:
        'The hot towel shave is a game changer. Steamed eucalyptus towel, smooth blade glide, and zero irritation. You walk in rough and walk out completely refreshed. 10/10.',
      verified: true,
      isSample: true,
    },
  ],

  socials: [
    {
      name: 'Fresha Booking',
      handle: 'Adel Barber Huddersfield',
      url: 'https://www.fresha.com/lvp/adel-barber-cloth-hall-street-Kzr63q',
    },
    {
      name: 'Instagram',
      handle: '@adelbarber.hudds',
      url: 'https://instagram.com',
    },
    {
      name: 'Google Maps',
      handle: '17 Cloth Hall St, HD1 2DX',
      url: 'https://www.google.com/maps/dir/?api=1&destination=17+Cloth+Hall+St,+Huddersfield+HD1+2DX,+UK',
    },
  ],
};
