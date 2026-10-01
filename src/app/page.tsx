import { Metadata } from "next";
import { getOffers } from "@/lib/offers";
import { OfferGrid } from "@/components/OfferGrid";

export const metadata: Metadata = {
  title: "Central Marketplace | Nearby Listing Platform",
  description:
    "Central Marketplace is your premier nearby listing platform to discover verified neighborhood deals, dining discounts, salon savings, and business listings around you.",
  keywords: [
    "nearby listing platform",
    "local deals",
    "nearby offers",
    "Central Marketplace",
    "local business directory",
  ],
  openGraph: {
    title: "Central Marketplace | Nearby Listing Platform",
    description:
      "Central Marketplace is your premier nearby listing platform. Discover exclusive verified discounts and local business listings around you.",
    siteName: "Central Marketplace - Nearby Listing Platform",
    url: "https://centralmarketplace.in",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "/logo/logo.svg",
        width: 800,
        height: 800,
        alt: "Central Marketplace - Nearby Listing Platform",
      },
    ],
  },
};

export default function HomePage() {
  const initialOffers = getOffers();

  return <OfferGrid initialOffers={initialOffers} />;
}
