import { Metadata } from "next";
import { getOffers } from "@/lib/offers";
import { SpotlightView } from "@/components/SpotlightView";

export const metadata: Metadata = {
  title: "Spotlight Deals & Premier Merchant Offers | Central Marketplace",
  description:
    "Explore premier neighborhood spotlight deals, handpicked merchant discounts, and top business listings around you on Central Marketplace.",
  openGraph: {
    title: "Spotlight Deals | Central Marketplace",
    description:
      "Handpicked neighborhood spotlight deals, exclusive merchant offers, and top business listings around you.",
    siteName: "Central Marketplace - Nearby Listing Platform",
    url: "https://centralmarketplace.in/spotlight",
    locale: "en_IN",
    type: "website",
  },
};

export default function SpotlightPage() {
  const initialOffers = getOffers();

  return <SpotlightView initialOffers={initialOffers} />;
}
