"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Offer, UserLocation } from "@/types/offer";
import { offerArea, distanceLabel } from "@/lib/utils";
import { MapPin, Navigation } from "lucide-react";
import { getCategoryIcon, getCategoryColors } from "@/lib/categories";

interface ShortOfferCardProps {
  offer: Offer;
  userLocation: UserLocation | null;
  className?: string;
  onClick?: () => void;
}

const WHITE_SHORT_THEME = {
  bg: "bg-white",
  border: "border-slate-200",
  iconBg: "bg-[#F97316]",
  badgeBg: "bg-orange-50",
  badgeText: "text-orange-700",
  pinColor: "text-slate-400",
};

export function getShortTheme(key?: string) {
  return WHITE_SHORT_THEME;
}

export function ShortOfferCard({
  offer,
  userLocation,
  className = "",
  onClick,
}: ShortOfferCardProps) {
  const router = useRouter();

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onClick) {
      onClick();
    } else {
      const cat = offer.category ? encodeURIComponent(offer.category) : "";
      if (cat) {
        router.push(`/list?category=${cat}`);
      } else {
        router.push("/list");
      }
    }
  };

  const badgeText = offer.badge || offer.dealType || offer.validity || "Available";
  const businessName = offer.business || offer.store || offer.merchant || "";
  const areaName = offerArea(offer) || "Medavakkam";
  const theme = getShortTheme(offer.id || offer.title || badgeText);
  const CategoryIcon = getCategoryIcon(offer.category, offer.title);
  const categoryColors = getCategoryColors(offer.category);

  return (
    <div
      onClick={handleClick}
      className={`${theme.bg} rounded-none p-4 border ${theme.border} shadow-2xs hover:shadow-md transition-all cursor-pointer flex flex-col justify-between group ${className}`}
    >
      <div>
        {/* Header Row: Category Icon + Brand Name & Category Stack + Badge */}
        <div className="flex items-start justify-between gap-2 mb-2">
          <div className="flex items-center gap-1.5 min-w-0 flex-1">
            <div
              className={`w-6 h-6 rounded-md ${categoryColors.iconBg} text-white flex items-center justify-center flex-shrink-0 mt-0.5`}
            >
              <CategoryIcon className="w-3.5 h-3.5 stroke-[2.2]" />
            </div>
            <div className="flex flex-col text-left min-w-0">
              <span className="text-[11px] font-extrabold text-slate-700 truncate leading-tight">
                {businessName || areaName}
              </span>
              {offer.category && (
                <span className="text-[10px] font-semibold text-slate-400 truncate leading-tight mt-0.5">
                  {offer.category}
                </span>
              )}
            </div>
          </div>

          {badgeText && (
            <span
              className={`px-2 py-0.5 rounded-full text-[10px] font-black tracking-wide flex-shrink-0 ml-auto mt-0.5 ${theme.badgeBg} ${theme.badgeText}`}
            >
              {badgeText}
            </span>
          )}
        </div>

        {/* Title */}
        <h3 className="text-sm font-extrabold text-slate-900 line-clamp-1 mb-1 group-hover:text-blue-600 transition-colors">
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
          <MapPin className="w-3.5 h-3.5 text-rose-500 fill-rose-500/20 flex-shrink-0" />
          <span className="truncate">{areaName}</span>
        </span>
        {offer.latitude != null && offer.longitude != null && (
          <span className="inline-flex items-center gap-0.5 text-slate-500 font-semibold">
            <Navigation className="w-2.5 h-2.5 transform rotate-45" />
            <span>{userLocation ? distanceLabel(offer.distance) : "393+ km away"}</span>
          </span>
        )}
      </div>
    </div>
  );
}
