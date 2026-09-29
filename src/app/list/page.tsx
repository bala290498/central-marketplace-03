import { Metadata } from "next";
import { Suspense } from "react";
import { getOffers } from "@/lib/offers";
import { ListingsView } from "@/components/ListingsView";

export const metadata: Metadata = {
  title: "All Listings | Central Marketplace",
  description:
    "Explore all local listings, properties, services, products, dining deals, and professional services across Chennai.",
};

export default function ListPage() {
  const initialOffers = getOffers();

  return (
    <Suspense fallback={<div className="min-h-screen bg-slate-50 flex items-center justify-center text-sm font-semibold text-slate-500">Loading listings...</div>}>
      <ListingsView initialOffers={initialOffers} />
    </Suspense>
  );
}
