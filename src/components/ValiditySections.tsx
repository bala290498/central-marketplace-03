"use client";

import React from "react";
import { Offer, UserLocation } from "@/types/offer";
import {
  VALIDITY_CATEGORIES,
  ValidityCategoryKey,
  getOfferValidityCategory,
} from "@/lib/validity";
import { OfferCard } from "./OfferCard";
import { Flame, Hourglass, UserCheck, CheckCircle2, ArrowRight } from "lucide-react";

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
      "expires-in-days": [],
      "until-filled": [],
      available: [],
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
        <div className="flex items-center justify-between bg-white p-4 sm:p-5 rounded-3xl border border-slate-200/80 shadow-xs">
          <div className="flex items-center gap-3">
            <div
              className={`w-10 h-10 rounded-2xl ${
                activeConfig?.theme.accentBg || "bg-orange-500"
              } text-white flex items-center justify-center shadow-md`}
            >
              <Icon className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-extrabold text-slate-900 tracking-tight">
                {activeConfig?.label || "Validity Section"}
              </h2>
              <p className="text-xs text-slate-500">
                {activeConfig?.description || "Filtered offers"}
              </p>
            </div>
          </div>

          <span
            className={`px-3 py-1 rounded-full text-xs font-black ${
              activeConfig?.theme.badgeBg || "bg-orange-100 text-orange-700"
            }`}
          >
            {categoryOffers.length} Deals
          </span>
        </div>

        {categoryOffers.length === 0 ? (
          <div className="bg-white rounded-3xl p-8 text-center border border-slate-200">
            <p className="text-sm font-semibold text-slate-600">
              No offers found under this validity heading right now.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {categoryOffers.map((offer) => (
              <OfferCard
                key={offer.id}
                offer={offer}
                userLocation={userLocation}
                onShare={onShare}
              />
            ))}
          </div>
        )}
      </section>
    );
  }

  // Render all Validity Headings as distinct home sections
  return (
    <div className="space-y-10 mb-12">
      {VALIDITY_CATEGORIES.map((catConfig) => {
        const catOffers = groupedOffers[catConfig.key] || [];
        if (catOffers.length === 0) return null;

        const Icon = getIcon(catConfig.iconName);

        return (
          <section key={catConfig.key} className="space-y-4">
            {/* Section Header Banner */}
            <div className="flex items-center justify-between px-1">
              <div className="flex items-center gap-2.5">
                <div
                  className={`w-8 h-8 rounded-xl ${catConfig.theme.accentBg} text-white flex items-center justify-center shadow-xs flex-shrink-0`}
                >
                  <Icon className="w-4 h-4" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-base sm:text-lg font-extrabold text-slate-900 tracking-tight">
                      {catConfig.label}
                    </h3>
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-black ${catConfig.theme.badgeBg}`}
                    >
                      {catOffers.length}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 hidden sm:block">
                    {catConfig.description}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => onSeeAllValidity(catConfig.key)}
                className="inline-flex items-center gap-1 text-xs font-extrabold text-blue-600 hover:text-blue-700 transition-colors"
              >
                <span>View Category</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Grid of Offers for this Validity Heading */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
              {catOffers.map((offer) => (
                <OfferCard
                  key={offer.id}
                  offer={offer}
                  userLocation={userLocation}
                  onShare={onShare}
                />
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}
