export interface Offer {
  id: string;
  title: string;
  description?: string;
  latitude?: number | null;
  longitude?: number | null;
  location?: string;
  area?: string;
  category?: string;
  business?: string;
  store?: string;
  merchant?: string;
  badge?: string;
  dealType?: string;
  mapUrl?: string | null;
  phone?: string;
  whatsapp?: string;
  validity?: string;
  ends?: string;
  expiry?: string;
  distance?: number;
  whatsNew?: string;
  whatsDifferent?: string;
  features?: string[];
  marketPrice?: number | string;
  ourPrice?: number | string;
  isVerified?: boolean;
  isSpotlight?: boolean;
  dateCreated?: string;
}

export interface UserLocation {
  latitude: number;
  longitude: number;
}

export interface FilterState {
  category: string;
  location: string;
  maxDistance: number | null;
  searchQuery: string;
}
