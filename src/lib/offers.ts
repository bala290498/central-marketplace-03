import { Offer } from "@/types/offer";
import offersData from "@/data/offers.json";

export function getOffers(): Offer[] {
  return offersData as Offer[];
}
