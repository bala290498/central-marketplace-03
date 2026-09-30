import { Metadata } from "next";
import { getOffers } from "@/lib/offers";
import { OfferGrid } from "@/components/OfferGrid";

export const metadata: Metadata = {
  title: "Central Marketplace | Local Listing Platform",
  description:
    "Central Marketplace is your premier local listing platform to discover verified neighborhood deals, dining discounts, salon savings, and business listings around you.",
  keywords: [
    "local listing platform",
    "local deals",
    "nearby offers",
    "Central Marketplace",
    "local business directory",
  ],
  openGraph: {
    title: "Central Marketplace | Local Listing Platform",
    description:
      "Central Marketplace is your premier local listing platform. Discover exclusive verified discounts and local business listings around you.",
    siteName: "Central Marketplace - Local Listing Platform",
    url: "https://centralmarketplace.in",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "/logo/logo.svg",
        width: 800,
        height: 800,
        alt: "Central Marketplace - Local Listing Platform",
      },
    ],
  },
};

export default function HomePage() {
  const initialOffers = getOffers();

  return <OfferGrid initialOffers={initialOffers} />;
}
