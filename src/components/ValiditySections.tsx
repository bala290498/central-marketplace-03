"use client";

import React from "react";
import { Offer, UserLocation } from "@/types/offer";
import {
  VALIDITY_CATEGORIES,
  ValidityCategoryKey,
  getOfferValidityCategory,
} from "@/lib/validity";
import { ShortOfferCard } from "./ShortOfferCard";
import {
  Flame,
  Hourglass,
  UserCheck,
  Search,
  CheckCircle2,
  Calendar,
  ArrowRight,
} from "lucide-react";

interface ValiditySectionsProps {
  offers: Offer[];
  userLocation: UserLocation | null;
  selectedValidity: string;
  onShare: (offer: Offer) => void;
  onSeeAllValidity: (key: string) => void;
}

export function ValiditySections({
  offers,
  userLocation,
  selectedValidity,
  onShare,
  onSeeAllValidity,
}: ValiditySectionsProps) {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "Flame":
        return Flame;
      case "Hourglass":
        return Hourglass;
      case "UserCheck":
        return UserCheck;
      case "Search":
        return Search;
      case "Calendar":
        return Calendar;
      case "CheckCircle2":
        return CheckCircle2;
      default:
        return CheckCircle2;
    }
  };

  // Group offers by validity category key
  const groupedOffers = React.useMemo(() => {
    const map: Record<ValidityCategoryKey, Offer[]> = {
      "limited-slots": [],
      "expires-soon": [],
      "until-filled": [],
      "until-found": [],
      available: [],
      "valid-all-days": [],
    };

    offers.forEach((offer) => {
      const catKey = getOfferValidityCategory(offer);
      map[catKey].push(offer);
    });

    return map;
  }, [offers]);

  // If a single validity category is selected, render just that category section with full grid
  if (selectedValidity && selectedValidity !== "all") {
    const activeConfig = VALIDITY_CATEGORIES.find(
      (c) => c.key === selectedValidity
    );
    const categoryOffers =
      groupedOffers[selectedValidity as ValidityCategoryKey] || [];
    const Icon = activeConfig ? getIcon(activeConfig.iconName) : CheckCircle2;

    return (
      <section className="space-y-4 mb-10">
        <div className="flex items-center justify-between mb-3 px-1">
          <h2 className="text-lg font-extrabold text-slate-900 tracking-tight">
            {activeConfig?.label || "Validity Section"}
          </h2>
          <button
            type="button"
            onClick={() => onSeeAllValidity("all")}
            className="inline-flex items-center gap-1 text-xs font-bold text-blue-600 hover:text-blue-700 transition-colors cursor-pointer"
          >
            <span>View All</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {categoryOffers.length === 0 ? (
          <div className="bg-white rounded-none p-8 text-center border border-slate-200">
            <p className="text-sm font-semibold text-slate-600">
              No offers found under this validity heading right now.
            </p>
          </div>
        ) : (
          <div className="flex gap-3.5 overflow-x-auto no-scrollbar snap-x py-1 px-1 -mx-1">
            {categoryOffers.map((offer) => (
              <ShortOfferCard
                key={offer.id}
                offer={offer}
                userLocation={userLocation}
                className="w-80 sm:w-96 flex-shrink-0 snap-start"
              />
            ))}
          </div>
        )}
      </section>
    );
  }

  // Render all Validity Headings as distinct home sections
  return (
    <div className="space-y-6 sm:space-y-10 mb-2 sm:mb-8">
      {VALIDITY_CATEGORIES.map((catConfig) => {
        const catOffers = groupedOffers[catConfig.key] || [];
        if (catOffers.length === 0) return null;

        const Icon = getIcon(catConfig.iconName);

        return (
          <section key={catConfig.key} className="space-y-4">
            {/* Section Header */}
            <div className="flex items-center justify-between mb-3 px-1">
              <h2
                onClick={() => onSeeAllValidity(catConfig.label)}
                className="text-lg font-extrabold text-slate-900 tracking-tight cursor-pointer hover:text-blue-600 transition-colors"
              >
                {catConfig.label}
              </h2>
              <button
                type="button"
                onClick={() => onSeeAllValidity(catConfig.label)}
                className="inline-flex items-center gap-1 text-xs font-bold text-blue-600 hover:text-blue-700 transition-colors cursor-pointer"
              >
                <span>View Category</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Horizontal Carousel of Offers for this Validity Heading */}
            <div className="flex gap-3.5 overflow-x-auto no-scrollbar snap-x py-1 px-1 -mx-1">
              {catOffers.map((offer) => (
                <ShortOfferCard
                  key={offer.id}
                  offer={offer}
                  userLocation={userLocation}
                  className="w-80 sm:w-96 flex-shrink-0 snap-start"
                />
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}
