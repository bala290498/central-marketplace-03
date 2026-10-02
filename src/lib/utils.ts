import { Offer, UserLocation } from "@/types/offer";

export function offerArea(offer: Offer): string {
  return offer.location || offer.area || "";
}

export function offerCategory(offer: Offer): string {
  return offer.category || "";
}

export function displayedKm(km?: number): number {
  if (km === undefined || km === null || isNaN(km)) return 0;
  return Math.round(Number(km) || 0);
}

export function distanceLabel(km?: number): string {
  if (km === undefined || km === null) return "km";
  return `${displayedKm(km)}+ km away`;
}

export function distanceKm(
  lat1: number,
  lon1: number,
  lat2?: number | null,
  lon2?: number | null
): number {
  if (
    lat2 === null ||
    lat2 === undefined ||
    lon2 === null ||
    lon2 === undefined ||
    isNaN(Number(lat2)) ||
    isNaN(Number(lon2))
  ) {
    return 9999;
  }
  const nLat2 = Number(lat2);
  const nLon2 = Number(lon2);
  const R = 6371; // Earth's radius in km
  const dLat = ((nLat2 - lat1) * Math.PI) / 180;
  const dLon = ((nLon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((nLat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

export function directionsUrl(userLocation: UserLocation | null, offer: Offer): string {
  if (offer.mapUrl) return offer.mapUrl;
  if (offer.latitude != null && offer.longitude != null) {
    if (userLocation) {
      const origin = `${userLocation.latitude},${userLocation.longitude}`;
      const destination = `${offer.latitude},${offer.longitude}`;
      return `https://www.google.com/maps/dir/?api=1&origin=${encodeURIComponent(
        origin
      )}&destination=${encodeURIComponent(destination)}&travelmode=driving`;
    }
    return `https://www.google.com/maps/search/?api=1&query=${offer.latitude},${offer.longitude}`;
  }
  return "";
}

export function getBadgeTone(key: string): string {
  const hash = Math.abs(
    key.split("").reduce((sum, ch) => sum + ch.charCodeAt(0), 0)
  );
  const toneIndex = hash % 12;

  const toneClasses = [
    "bg-red-50 text-red-700 border border-red-200",
    "bg-orange-50 text-orange-700 border border-orange-200",
    "bg-amber-50 text-amber-700 border border-amber-200",
    "bg-lime-50 text-lime-700 border border-lime-200",
    "bg-emerald-50 text-emerald-700 border border-emerald-200",
    "bg-teal-50 text-teal-700 border border-teal-200",
    "bg-cyan-50 text-cyan-700 border border-cyan-200",
    "bg-blue-50 text-blue-700 border border-blue-200",
    "bg-indigo-50 text-indigo-700 border border-indigo-200",
    "bg-violet-50 text-violet-700 border border-violet-200",
    "bg-fuchsia-50 text-fuchsia-700 border border-fuchsia-200",
    "bg-pink-50 text-pink-700 border border-pink-200",
  ];

  return toneClasses[toneIndex];
}

export function formatAddress(address: Record<string, string>): string {
  if (!address) return "";
  const area =
    address.suburb ||
    address.neighbourhood ||
    address.quarter ||
    address.village ||
    address.town ||
    address.city_district ||
    "";
  const city = address.city || address.county || address.state_district || "";

  if (area && city && area.toLowerCase() !== city.toLowerCase()) {
    return `${area}, ${city}`;
  }
  return area || city || "";
}

export async function lookupUserArea(latitude: number, longitude: number): Promise<string> {
  try {
    const osmUrl = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&zoom=16&addressdetails=1&accept-language=en&lat=${encodeURIComponent(
      latitude
    )}&lon=${encodeURIComponent(longitude)}`;
    const res = await fetch(osmUrl, {
      headers: {
        Accept: "application/json",
        "Accept-Language": "en",
        "User-Agent": "CentralMarketplace/1.0",
      },
    });
    if (res.ok) {
      const data = await res.json();
      const area = formatAddress(data.address);
      if (area) return area;
    }
  } catch (err) {
    // Fallback geocoding provider
  }

  try {
    const backupRes = await fetch(
      `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${encodeURIComponent(
        latitude
      )}&longitude=${encodeURIComponent(longitude)}&localityLanguage=en`
    );
    const backup = await backupRes.json();
    const locality = backup.locality || backup.suburb || backup.neighbourhood || "";
    const city = backup.city || backup.principalSubdivision || "";
    if (locality && city && locality.toLowerCase() !== city.toLowerCase()) {
      return `${locality}, ${city}`;
    }
    return locality || city || "";
  } catch (err) {
    return "";
  }
}
