"use client";

import React from "react";
import { Offer, UserLocation } from "@/types/offer";
import { ArrowRight } from "lucide-react";
import { ShortOfferCard } from "./ShortOfferCard";

interface LatestListingsCarouselProps {
  offers: Offer[];
  userLocation: UserLocation | null;
  onSeeAll: () => void;
}

export function LatestListingsCarousel({
  offers,
  userLocation,
  onSeeAll,
}: LatestListingsCarouselProps) {
  if (!offers || offers.length === 0) return null;

  // Take last 5 entries for latest listings carousel
  const latestItems = offers.slice(-5).reverse();

  return (
    <section className="mb-8">
      {/* Header Row with Title & See All Button */}
      <div className="flex items-center justify-between mb-3 px-1">
        <h2 className="text-lg font-extrabold text-slate-900 tracking-tight">
          Latest Listings
        </h2>
        <button
          type="button"
          onClick={onSeeAll}
          className="inline-flex items-center gap-1 text-xs font-bold text-blue-600 hover:text-blue-700 transition-colors"
        >
          <span>See All</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Horizontal Carousel */}
      <div className="flex gap-3.5 overflow-x-auto no-scrollbar snap-x py-1 px-1 -mx-1">
        {latestItems.map((offer) => (
          <ShortOfferCard
            key={offer.id}
            offer={offer}
            userLocation={userLocation}
            className="w-64 flex-shrink-0 snap-start"
          />
        ))}
      </div>
    </section>
  );
}

