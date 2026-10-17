export interface BusinessHoursDay {
  dayName: 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday';
  dayIndex: number; // 0 = Sunday, 1 = Monday, ..., 6 = Saturday (matching Date.getDay())
  openTime: string; // "09:00"
  closeTime: string; // "18:00"
  formattedDisplay: string; // "9:00 am – 6:00 pm"
}

export interface ServiceItem {
  id: string;
  name: string;
  category: 'barbering' | 'hair-styling';
  categoryLabel: string;
  tagline: string;
  description: string;
  duration?: string;
  price?: string; // Optional: "Ask in store" if blank, or custom
  badge?: string;
  iconName?: string;
}

export interface GalleryPhoto {
  id: string;
  title: string;
  caption: string;
  url: string;
  fallbackUrl?: string;
  aspect?: string;
}

export interface BentoFeature {
  id: string;
  number: string;
  title: string;
  description: string;
  highlight?: string;
  colSpanDesktop: string; // Tailwind col-span class
  accent?: 'copper' | 'teal' | 'amber';
}

export interface ReviewItem {
  id: string;
  author: string;
  rating: number;
  dateText: string;
  serviceMentioned?: string;
  content: string;
  verified: boolean;
  isSample?: boolean;
}

export interface BusinessData {
  name: string;
  tagline: string;
  shortDescription: string;
  fullStory: string;
  images: {
    hero: { src: string; fallbackUrl: string; alt: string };
    heroSecondary: { src: string; fallbackUrl: string; alt: string };
    aboutMain: { src: string; fallbackUrl: string; alt: string };
    aboutSecondary: { src: string; fallbackUrl: string; alt: string };
    cta: { src: string; fallbackUrl: string; alt: string };
  };
  address: {
    line1: string;
    city: string;
    postalCode: string;
    county: string;
    country: string;
    fullString: string;
    locationContext: string;
    googleMapsEmbedUrl: string;
    googleMapsDirectionsUrl: string;
  };
  phone: {
    display: string;
    telHref: string;
    isPlaceholder: boolean;
    note: string;
  };
  bookingUrl: string;
  rating: {
    score: number;
    maxScore: number;
    countText: string;
    label: string;
    source: string;
  };
  hours: BusinessHoursDay[];
  services: ServiceItem[];
  bentoFeatures: BentoFeature[];
  gallery: GalleryPhoto[];
  reviews: ReviewItem[];
  socials: {
    name: string;
    handle: string;
    url: string;
  }[];
}
