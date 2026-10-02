import { Offer } from "@/types/offer";
import offersData from "@/data/offers.json";
import spotlightData from "@/data/spotlight.json";

export function getOffers(): Offer[] {
  return offersData as Offer[];
}

export function getSpotlightOffers(): Offer[] {
  return (spotlightData as Offer[]).map((o) => ({
    ...o,
    isSpotlight: true,
  }));
}

export function getAllOffers(): Offer[] {
  const regular = (offersData as Offer[]).map((o) => ({
    ...o,
    isSpotlight: false,
  }));
  const spotlight = (spotlightData as Offer[]).map((o) => ({
    ...o,
    isSpotlight: true,
  }));

  const combined = [...spotlight, ...regular];
  const seen = new Set<string>();
  return combined.filter((o) => {
    const key = o.id || `${o.title}-${o.business || o.category}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}
