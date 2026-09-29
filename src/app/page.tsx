import { Metadata } from "next";
import { getOffers } from "@/lib/offers";
import { OfferGrid } from "@/components/OfferGrid";

export const metadata: Metadata = {
  title: "Central Marketplace | Local Deals & Nearby Offers",
  description:
    "Discover exclusive nearby deals, discounts, dining offers, salon savings, and local business listings around you in Chennai.",
  keywords: ["deals", "local offers", "Chennai discounts", "Central Marketplace", "nearby savings"],
  openGraph: {
    title: "Central Marketplace | Local Deals & Nearby Offers",
    description: "Exclusive verified discounts and local business listings around you.",
    type: "website",
  },
};

export default function HomePage() {
  const initialOffers = getOffers();

  return <OfferGrid initialOffers={initialOffers} />;
}
