"use client";

import React from "react";
import { Offer, UserLocation } from "@/types/offer";
import { offerArea, distanceLabel } from "@/lib/utils";
import { MapPin, ArrowRight, Navigation } from "lucide-react";
import { getCategoryIcon } from "./OfferCard";

interface LatestListingsCarouselProps {
  offers: Offer[];
  userLocation: UserLocation | null;
  onSeeAll: () => void;
}

const CAROUSEL_THEMES = [
  {
    bg: "bg-[#FFF4F6]",
    border: "border-[#FDE2E7]",
    iconBg: "bg-[#E63956]",
    badgeBg: "bg-[#FDE2E8]",
    badgeText: "text-[#D81B43]",
    pinColor: "text-[#E63956]",
  },
  {
    bg: "bg-[#F0F6FF]",
    border: "border-[#DCE8FE]",
    iconBg: "bg-[#1E75EB]",
    badgeBg: "bg-[#DBEAFE]",
    badgeText: "text-[#1D4ED8]",
    pinColor: "text-[#1E75EB]",
  },
  {
    bg: "bg-[#FFF8EE]",
    border: "border-[#FDEBD0]",
    iconBg: "bg-[#F97316]",
    badgeBg: "bg-[#FFEDD5]",
    badgeText: "text-[#C2410C]",
    pinColor: "text-[#F97316]",
  },
  {
    bg: "bg-[#F0FDF4]",
    border: "border-[#DCFCE7]",
    iconBg: "bg-[#10B981]",
    badgeBg: "bg-[#DCFCE7]",
    badgeText: "text-[#15803D]",
    pinColor: "text-[#10B981]",
  },
];

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
        {latestItems.map((offer, idx) => {
          const badgeText = offer.badge || offer.dealType || "For Sale";
          const businessName = offer.business || offer.store || "";
          const areaName = offerArea(offer) || "Medavakkam";
          const theme = CAROUSEL_THEMES[idx % CAROUSEL_THEMES.length];
          const CategoryIcon = getCategoryIcon(offer.category, offer.title);

          return (
            <div
              key={offer.id}
              onClick={onSeeAll}
              className={`w-64 flex-shrink-0 snap-start ${theme.bg} rounded-3xl p-4 border ${theme.border} shadow-2xs hover:shadow-md transition-all cursor-pointer flex flex-col justify-between`}
            >
              <div>
                {/* Badge & Business */}
                <div className="flex items-center justify-between gap-2 mb-2">
                  <div className="flex items-center gap-1.5 text-[11px] font-extrabold text-slate-700 truncate">
                    <div className={`w-5 h-5 rounded-md ${theme.iconBg} text-white flex items-center justify-center flex-shrink-0`}>
                      <CategoryIcon className="w-3 h-3 stroke-[2.2]" />
                    </div>
                    <span className="truncate">{businessName || areaName}</span>
                  </div>

                  {badgeText && (
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-black tracking-wide flex-shrink-0 ${theme.badgeBg} ${theme.badgeText}`}
                    >
                      {badgeText}
                    </span>
                  )}
                </div>

                {/* Title */}
                <h3 className="text-sm font-extrabold text-slate-900 line-clamp-1 mb-1 hover:text-slate-700 transition-colors">
                  {offer.title}
                </h3>

                {/* Description */}
                {offer.description && (
                  <p className="text-xs text-slate-600 line-clamp-2 leading-snug">
                    {offer.description}
                  </p>
                )}
              </div>

              {/* Location & Distance Footer */}
              <div className="flex items-center justify-between text-[11px] font-bold text-slate-600 mt-3 pt-2.5 border-t border-slate-200/50">
                <span className="inline-flex items-center gap-1 truncate">
                  <MapPin className={`w-3 h-3 ${theme.pinColor} flex-shrink-0`} />
                  <span className="truncate">{areaName}</span>
                </span>
                <span className="inline-flex items-center gap-0.5 text-slate-500 font-semibold">
                  <Navigation className="w-2.5 h-2.5 transform rotate-45" />
                  <span>{userLocation ? distanceLabel(offer.distance) : "393+ km away"}</span>
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

