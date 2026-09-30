"use client";

import React from "react";
import { Offer, UserLocation } from "@/types/offer";
import {
  offerArea,
  distanceLabel,
  directionsUrl,
} from "@/lib/utils";
import { getCategoryIcon, getCategoryColors } from "@/lib/categories";
import {
  Phone,
  MapPin,
  Share2,
  Navigation,
  Home,
  Briefcase,
  UserCheck,
  Package,
  Wrench,
  UtensilsCrossed,
  CookingPot,
  Car,
  ShoppingCart,
  Store,
  GraduationCap,
  Scissors,
  Smartphone,
  Shirt,
  Cpu,
  Dumbbell,
  Pill,
  Film,
  LucideIcon,
} from "lucide-react";

interface OfferCardProps {
  offer: Offer;
  userLocation: UserLocation | null;
  onShare: (offer: Offer) => void;
}

interface ThemeConfig {
  cardBg: string;
  cardBorder: string;
  headerIconBg: string;
  headerIconColor: string;
  badgeBg: string;
  badgeTextColor: string;
  circleBg: string;
  sparkColor: string;
  storePrimary: string;
  pinColor: string;
  arrowColor: string;
}

const LIGHT_ORANGE_THEME: ThemeConfig = {
  cardBg: "bg-[#FFF8EE]",
  cardBorder: "border-[#FDEBD0]",
  headerIconBg: "bg-[#F97316]",
  headerIconColor: "text-white",
  badgeBg: "bg-[#FFEDD5]",
  badgeTextColor: "text-[#C2410C]",
  circleBg: "bg-[#FFEDD5]",
  sparkColor: "#F97316",
  storePrimary: "#F97316",
  pinColor: "text-[#F97316]",
  arrowColor: "text-[#F97316]",
};



function getCardTheme(key?: string): ThemeConfig {
  return LIGHT_ORANGE_THEME;
}

function StoreGraphic({ primaryColor }: { primaryColor: string }) {
  return (
    <svg
      viewBox="0 0 80 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-12 h-12 sm:w-14 sm:h-14"
    >
      {/* Back Base / Store Wall */}
      <rect x="20" y="34" width="40" height="28" rx="3" fill="#FFFFFF" />
      <rect x="20" y="34" width="40" height="28" rx="3" fill={primaryColor} opacity="0.1" />

      {/* Door */}
      <rect x="26" y="44" width="11" height="18" rx="2" fill={primaryColor} />
      <circle cx="34" cy="53" r="1.2" fill="#FFFFFF" />

      {/* Window */}
      <rect x="42" y="44" width="13" height="12" rx="2" fill={primaryColor} opacity="0.85" />
      <path d="M48.5 44V56M42 50H55" stroke="#FFFFFF" strokeWidth="1.2" strokeLinecap="round" />

      {/* Awning Top Roof Bar */}
      <path
        d="M14 26C14 23.7909 15.7909 22 18 22H62C64.2091 22 66 23.7909 66 26V34H14V26Z"
        fill={primaryColor}
      />

      {/* Scalloped Awning Roof Stripes */}
      <path d="M14 34C14 36.2091 15.7909 38 18 38C20.2091 38 22 36.2091 22 34H14Z" fill={primaryColor} />
      <path d="M22 34C22 36.2091 23.7909 38 26 38C28.2091 38 30 36.2091 30 34H22Z" fill="#FFFFFF" opacity="0.85" />
      <path d="M30 34C30 36.2091 31.7909 38 34 38C36.2091 38 38 36.2091 38 34H30Z" fill={primaryColor} />
      <path d="M38 34C38 36.2091 39.7909 38 42 38C44.2091 38 46 36.2091 46 34H38Z" fill="#FFFFFF" opacity="0.85" />
      <path d="M46 34C46 36.2091 47.7909 38 50 38C52.2091 38 54 36.2091 54 34H46Z" fill={primaryColor} />
      <path d="M54 34C54 36.2091 55.7909 38 58 38C60.2091 38 62 36.2091 62 34H54Z" fill="#FFFFFF" opacity="0.85" />
      <path d="M62 34C62 36.2091 63.7909 38 66 38C68.2091 38 70 36.2091 70 34H62Z" fill={primaryColor} />
    </svg>
  );
}

export function OfferCard({ offer, userLocation, onShare }: OfferCardProps) {
  const badgeText = offer.badge || offer.dealType || "For Sale";
  const businessName = offer.business || offer.store || offer.merchant || "";
  const areaName = offerArea(offer) || "Medavakkam";
  const categoryName = offer.category || "";
  const validityText = offer.validity || offer.ends || offer.expiry || "Available";
  const theme = getCardTheme(offer.id || offer.title || badgeText);
  const CategoryIcon = getCategoryIcon(categoryName, offer.title);
  const categoryColors = getCategoryColors(categoryName);

  const cleanPhone = offer.phone ? offer.phone.replace(/\s+/g, "") : "";
  const mapLink = directionsUrl(userLocation, offer);
  const distanceStr = userLocation ? distanceLabel(offer.distance) : "393+ km away";

  return (
    <article
      className={`group relative rounded-3xl border ${theme.cardBg} ${theme.cardBorder} p-5 sm:p-6 shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between overflow-hidden`}
    >
      {/* Large Low-Intensity Watermark Category Icon on Right Side */}
      <div className="absolute -right-4 -top-3 sm:-right-6 sm:-top-4 pointer-events-none select-none z-0 transition-all duration-300 group-hover:scale-105">
        <CategoryIcon
          className={`w-32 h-32 sm:w-40 sm:h-40 stroke-[1.4] opacity-[0.16] ${theme.pinColor}`}
        />
      </div>

      <div className="relative z-10">
        {/* Top Header Row */}
        <div className="flex items-center justify-between gap-3 mb-3">
          {/* Left Metadata Chips */}
          <div className="flex items-center gap-2 flex-wrap pt-1">
            {/* Header Icon + Business/Area Name */}
            <div className="flex items-center gap-1.5">
              <div
                className={`w-6 h-6 rounded-lg ${categoryColors.iconBg} text-white flex items-center justify-center flex-shrink-0 shadow-2xs`}
              >
                <CategoryIcon className="w-3.5 h-3.5 stroke-[2.2]" />
              </div>
              <span className="text-xs sm:text-sm font-extrabold text-slate-800 truncate max-w-[160px] sm:max-w-[220px]">
                {businessName || areaName}
              </span>
            </div>

            {/* Badge Pill */}
            {badgeText && (
              <span
                className={`px-2.5 py-0.5 rounded-full text-[11px] font-black tracking-wide ${theme.badgeBg} ${theme.badgeTextColor} flex-shrink-0`}
              >
                {badgeText}
              </span>
            )}
          </div>
        </div>

        {/* Title */}
        <h2 className="text-lg sm:text-xl font-extrabold text-slate-900 leading-snug mb-1.5 tracking-tight group-hover:text-slate-800 transition-colors">
          {offer.title}
        </h2>

        {/* Description */}
        {offer.description && (
          <p className="text-xs sm:text-sm text-slate-600/90 leading-relaxed line-clamp-2 mb-4 font-normal">
            {offer.description}
          </p>
        )}

        {/* Bottom Info Row (MapPin | Distance | Validity Status) */}
        <div className="flex items-center flex-wrap gap-2 text-xs font-bold text-slate-700 mb-5">
          {/* Location Pin */}
          <div className="flex items-center gap-1">
            <MapPin className={`w-4 h-4 ${theme.pinColor} fill-current/10`} />
            <span className="truncate max-w-[120px]">{areaName}</span>
          </div>

          <span className="text-slate-300 font-light select-none">|</span>

          {/* Distance */}
          <div className="flex items-center gap-1">
            <Navigation className={`w-3.5 h-3.5 ${theme.arrowColor} fill-current transform rotate-45`} />
            <span>{distanceStr}</span>
          </div>

          <span className="text-slate-300 font-light select-none">|</span>

          {/* Validity Status */}
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 flex-shrink-0 animate-pulse" />
            <span className="text-emerald-700 font-extrabold truncate max-w-[140px]">{validityText}</span>
          </div>
        </div>
      </div>

      {/* Action Buttons: Call | Maps | Share */}
      <div className="grid grid-cols-3 gap-2 pt-2 border-t border-slate-200/50">
        {cleanPhone ? (
          <a
            href={`tel:${cleanPhone}`}
            className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs sm:text-sm shadow-xs transition-all duration-200 active:scale-95"
          >
            <Phone className="w-3.5 h-3.5 fill-current" />
            <span>Call</span>
          </a>
        ) : (
          <a
            href="#"
            onClick={(e) => e.preventDefault()}
            className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-2xl bg-emerald-600/80 text-white font-extrabold text-xs sm:text-sm shadow-xs transition-all duration-200 cursor-not-allowed opacity-90"
          >
            <Phone className="w-3.5 h-3.5 fill-current" />
            <span>Call</span>
          </a>
        )}

        <a
          href={mapLink}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs sm:text-sm shadow-xs transition-all duration-200 active:scale-95"
        >
          <MapPin className="w-3.5 h-3.5" />
          <span>Maps</span>
        </a>

        <button
          type="button"
          onClick={() => onShare(offer)}
          className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-2xl bg-pink-600 hover:bg-pink-700 text-white font-extrabold text-xs sm:text-sm shadow-xs transition-all duration-200 active:scale-95 cursor-pointer"
        >
          <Share2 className="w-3.5 h-3.5" />
          <span>Share</span>
        </button>
      </div>
    </article>
  );
}


