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

export function distanceKm(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371; // Earth's radius in km
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

export function directionsUrl(userLocation: UserLocation | null, offer: Offer): string {
  if (userLocation) {
    const origin = `${userLocation.latitude},${userLocation.longitude}`;
    const destination = `${offer.latitude},${offer.longitude}`;
    return `https://www.google.com/maps/dir/?api=1&origin=${encodeURIComponent(
      origin
    )}&destination=${encodeURIComponent(destination)}&travelmode=driving`;
  }
  return offer.mapUrl || `https://www.google.com/maps/search/?api=1&query=${offer.latitude},${offer.longitude}`;
}

export function getBadgeTone(key: string): string {
  const hash = Math.abs(
    key.split("").reduce((sum, ch) => sum + ch.charCodeAt(0), 0)
  );
  const toneIndex = hash % 12;

  const toneClasses = [
    "bg-red-50 text-red-700 dark:bg-red-950/60 dark:text-red-300 border border-red-200 dark:border-red-800",
    "bg-orange-50 text-orange-700 dark:bg-orange-950/60 dark:text-orange-300 border border-orange-200 dark:border-orange-800",
    "bg-amber-50 text-amber-700 dark:bg-amber-950/60 dark:text-amber-300 border border-amber-200 dark:border-amber-800",
    "bg-lime-50 text-lime-700 dark:bg-lime-950/60 dark:text-lime-300 border border-lime-200 dark:border-lime-800",
    "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800",
    "bg-teal-50 text-teal-700 dark:bg-teal-950/60 dark:text-teal-300 border border-teal-200 dark:border-teal-800",
    "bg-cyan-50 text-cyan-700 dark:bg-cyan-950/60 dark:text-cyan-300 border border-cyan-200 dark:border-cyan-800",
    "bg-blue-50 text-blue-700 dark:bg-blue-300 border border-blue-200 dark:border-blue-800",
    "bg-indigo-50 text-indigo-700 dark:bg-indigo-300 border border-indigo-200 dark:border-indigo-800",
    "bg-violet-50 text-violet-700 dark:bg-violet-300 border border-violet-200 dark:border-violet-800",
    "bg-fuchsia-50 text-fuchsia-700 dark:bg-fuchsia-300 border border-fuchsia-200 dark:border-fuchsia-800",
    "bg-pink-50 text-pink-700 dark:bg-pink-300 border border-pink-200 dark:border-pink-800",
  ];

  return toneClasses[toneIndex];
}

export function formatAddress(address: Record<string, string>): string {
  if (!address) return "";
  return (
    address.suburb ||
    address.neighbourhood ||
    address.quarter ||
    address.village ||
    address.town ||
    address.city_district ||
    address.city ||
    ""
  );
}

export async function lookupUserArea(latitude: number, longitude: number): Promise<string> {
  try {
    const osmUrl = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&zoom=16&addressdetails=1&lat=${encodeURIComponent(
      latitude
    )}&lon=${encodeURIComponent(longitude)}`;
    const res = await fetch(osmUrl, { headers: { Accept: "application/json" } });
    if (!res.ok) throw new Error("OSM Geocode failed");
    const data = await res.json();
    const area = formatAddress(data.address);
    if (area) return area;
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
    return backup.locality || backup.city || backup.principalSubdivision || "";
  } catch (err) {
    return "";
  }
}
