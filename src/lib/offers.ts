import { Offer } from "@/types/offer";
import offersData from "@/data/offers.json";
import spotlightData from "@/data/spotlight.json";

export function getOffers(): Offer[] {
  return offersData as Offer[];
}

export function getSpotlightOffers(): Offer[] {
  return spotlightData as Offer[];
}
