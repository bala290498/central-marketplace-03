"use client";

import React from "react";
import { Offer, UserLocation } from "@/types/offer";
import { offerArea, distanceLabel, getBadgeTone } from "@/lib/utils";
import { MapPin, ArrowRight, Building2 } from "lucide-react";

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
        {latestItems.map((offer) => {
          const badgeText = offer.badge || offer.dealType || "";
          const businessName = offer.business || offer.store || "";
          const areaName = offerArea(offer);
          const toneClass = getBadgeTone(offer.id || badgeText || offer.title);

          return (
            <div
              key={offer.id}
              onClick={onSeeAll}
              className="w-64 flex-shrink-0 snap-start bg-white rounded-2xl p-4 border border-slate-200/90 shadow-xs hover:shadow-md hover:border-orange-300 transition-all cursor-pointer flex flex-col justify-between"
            >
              <div>
                {/* Badge & Business */}
                <div className="flex items-center justify-between gap-2 mb-2">
                  <div className="flex items-center gap-1 text-[11px] font-semibold text-slate-500 truncate">
                    <Building2 className="w-3 h-3 text-orange-500 flex-shrink-0" />
                    <span className="truncate">{businessName}</span>
                  </div>

                  {badgeText && (
                    <span
                      className={`px-2 py-0.5 rounded-md text-[10px] font-black uppercase tracking-wide flex-shrink-0 ${toneClass}`}
                    >
                      {badgeText}
                    </span>
                  )}
                </div>

                {/* Title */}
                <h3 className="text-sm font-bold text-slate-900 line-clamp-1 mb-1 hover:text-orange-600 transition-colors">
                  {offer.title}
                </h3>

                {/* Description */}
                {offer.description && (
                  <p className="text-xs text-slate-500 line-clamp-2 leading-snug">
                    {offer.description}
                  </p>
                )}
              </div>

              {/* Location & Distance Footer */}
              <div className="flex items-center justify-between text-[11px] font-medium text-slate-500 mt-3 pt-2.5 border-t border-slate-100">
                <span className="inline-flex items-center gap-1 text-slate-700 font-semibold truncate">
                  <MapPin className="w-3 h-3 text-amber-600 flex-shrink-0" />
                  <span className="truncate">{areaName || "Chennai"}</span>
                </span>
                <span className="text-slate-400 font-normal">
                  {userLocation ? distanceLabel(offer.distance) : ""}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
