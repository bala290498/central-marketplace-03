export interface Offer {
  id: string;
  title: string;
  description?: string;
  latitude: number;
  longitude: number;
  location?: string;
  area?: string;
  category?: string;
  business?: string;
  store?: string;
  merchant?: string;
  badge?: string;
  dealType?: string;
  mapUrl?: string;
  phone?: string;
  validity?: string;
  ends?: string;
  expiry?: string;
  distance?: number;
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
