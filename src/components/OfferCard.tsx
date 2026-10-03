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
  Map,
  Share2,
  Navigation,
  Timer,
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

const WHITE_CARD_THEME: ThemeConfig = {
  cardBg: "bg-white",
  cardBorder: "border-slate-200",
  headerIconBg: "bg-[#F97316]",
  headerIconColor: "text-white",
  badgeBg: "bg-orange-50",
  badgeTextColor: "text-orange-700",
  circleBg: "bg-orange-50",
  sparkColor: "#F97316",
  storePrimary: "#F97316",
  pinColor: "text-slate-400",
  arrowColor: "text-orange-500",
};

function getCardTheme(key?: string): ThemeConfig {
  return WHITE_CARD_THEME;
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

function WhatsAppIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M19.05 4.91A9.816 9.816 0 0 0 12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01zm-7.01 15.24c-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.19 8.19 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24 2.2 0 4.27.86 5.82 2.42a8.2 8.2 0 0 1 2.41 5.83c.02 4.54-3.68 8.23-8.22 8.23zm4.52-6.16c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.12-.17.25-.66.81-.81.98-.15.17-.3.19-.55.07-.25-.12-1.05-.39-2.01-1.24-.74-.66-1.24-1.47-1.39-1.72-.15-.25-.02-.38.11-.5.11-.11.25-.29.37-.43.12-.14.16-.24.24-.4.08-.17.04-.31-.02-.43s-.56-1.36-.77-1.86c-.2-.48-.41-.42-.56-.43h-.48c-.17 0-.44.06-.67.31-.23.25-.87.85-.87 2.07 0 1.22.89 2.4 1.01 2.56.12.17 1.75 2.67 4.24 3.74.59.26 1.05.41 1.41.53.59.19 1.13.16 1.56.1.48-.07 1.47-.6 1.67-1.18.2-.58.2-1.08.14-1.18-.06-.1-.22-.16-.47-.28z" />
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
  const rawWhatsapp = offer.whatsapp || offer.phone || "";
  const cleanWhatsapp = rawWhatsapp.replace(/\D/g, "");
  const whatsappUrl = cleanWhatsapp ? `https://wa.me/${cleanWhatsapp}` : null;
  const mapLink = directionsUrl(userLocation, offer);
  const distanceStr = userLocation ? distanceLabel(offer.distance) : "393+ km away";

  return (
    <article
      className={`group relative rounded-none border ${theme.cardBg} ${theme.cardBorder} p-5 sm:p-6 shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between overflow-hidden`}
    >
      {/* Must Try Top Right Corner Ribbon */}
      {(offer.mustTry || offer.isMustTry) && (
        <div className="absolute top-0 right-0 z-20 w-28 h-28 overflow-hidden pointer-events-none">
          <div className="absolute top-4 -right-9 w-36 py-1 bg-gradient-to-r from-rose-600 via-red-600 to-amber-500 text-white text-[10px] font-black uppercase tracking-wider flex items-center justify-center text-center leading-none transform rotate-45 shadow-md border-y border-white/30 pl-0.5">
            MUST TRY
          </div>
        </div>
      )}

      <div className="relative z-10">
        {/* Top Header Row */}
        <div className="flex items-start justify-between gap-2.5 mb-3">
          {/* Header Icon + Brand Name & Category Stack */}
          <div className="flex items-center gap-2 min-w-0 flex-1">
            <div
              className={`w-7.5 h-7.5 rounded-lg ${categoryColors.iconBg} text-white flex items-center justify-center flex-shrink-0 shadow-2xs mt-0.5`}
            >
              <CategoryIcon className="w-4 h-4 stroke-[2.2]" />
            </div>
            <div className="flex flex-col text-left min-w-0">
              <span className="text-xs sm:text-sm font-extrabold text-slate-800 truncate leading-tight">
                {businessName || areaName}
              </span>
              {categoryName && (
                <span className="text-[11px] font-semibold text-slate-500 truncate leading-tight mt-0.5">
                  {categoryName}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Title with Badge inline next to Title */}
        <h2 className="text-lg sm:text-xl font-extrabold text-slate-900 leading-snug mb-1.5 tracking-tight group-hover:text-slate-800 transition-colors flex items-center flex-wrap gap-2">
          <span>{offer.title}</span>
          {badgeText && (
            <span
              className={`px-2.5 py-0.5 rounded-full text-[11px] font-black tracking-wide ${theme.badgeBg} ${theme.badgeTextColor} inline-flex items-center flex-shrink-0 align-middle`}
            >
              {badgeText}
            </span>
          )}
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
            <MapPin className="w-4 h-4 text-red-500 fill-red-500/20 flex-shrink-0" />
            <span className="truncate max-w-[120px]">{areaName}</span>
          </div>

          {offer.latitude != null && offer.longitude != null && (
            <>
              <span className="text-slate-300 font-light select-none">|</span>
              {/* Distance */}
              <div className="flex items-center gap-1">
                <Navigation className={`w-4 h-4 ${theme.arrowColor} fill-current transform rotate-45 flex-shrink-0`} />
                <span>{distanceStr}</span>
              </div>
            </>
          )}

          <span className="text-slate-300 font-light select-none">|</span>

          {/* Validity Status */}
          <div className="flex items-center gap-1.5">
            <Timer className="w-4 h-4 text-rose-600 flex-shrink-0" />
            <span className="truncate max-w-[140px]">{validityText}</span>
          </div>
        </div>
      </div>

      {/* Action Buttons: Call (flex-[3] = width equal to other 3 combined) | WhatsApp (flex-1) | Maps (flex-1) | Share (flex-1) */}
      <div className="flex items-center gap-2 pt-2 border-t border-slate-200/50">
        {cleanPhone ? (
          <a
            href={`tel:${cleanPhone}`}
            className="flex-[3] min-w-0 flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-none bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs sm:text-sm shadow-xs transition-all duration-200 active:scale-95"
          >
            <Phone className="w-4 h-4 fill-current flex-shrink-0" />
            <span className="truncate">Call</span>
          </a>
        ) : (
          <button
            type="button"
            disabled
            title="No Phone"
            aria-label="No Phone"
            className="flex-[3] min-w-0 flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-none bg-slate-100 text-slate-400 border border-slate-200/60 font-bold text-xs sm:text-sm cursor-not-allowed opacity-70 flex-shrink-0"
          >
            <Phone className="w-4 h-4 text-slate-400 flex-shrink-0" />
            <span className="truncate">Call</span>
          </button>
        )}

        {whatsappUrl ? (
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            title="WhatsApp"
            aria-label="WhatsApp"
            className="flex-1 py-2.5 px-3 rounded-none bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200/80 font-extrabold text-xs sm:text-sm shadow-2xs transition-all duration-200 active:scale-95 flex items-center justify-center flex-shrink-0"
          >
            <WhatsAppIcon className="w-4.5 h-4.5 text-emerald-600" />
          </a>
        ) : (
          <button
            type="button"
            disabled
            title="WhatsApp"
            aria-label="WhatsApp"
            className="flex-1 py-2.5 px-3 rounded-none bg-slate-100 text-slate-400 border border-slate-200/60 font-bold text-xs sm:text-sm cursor-not-allowed opacity-70 flex items-center justify-center flex-shrink-0"
          >
            <WhatsAppIcon className="w-4.5 h-4.5 text-slate-400" />
          </button>
        )}

        {mapLink ? (
          <a
            href={mapLink}
            target="_blank"
            rel="noopener noreferrer"
            title="Maps"
            aria-label="Maps"
            className="flex-1 py-2.5 px-3 rounded-none bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200/80 font-extrabold text-xs sm:text-sm shadow-2xs transition-all duration-200 active:scale-95 flex items-center justify-center flex-shrink-0"
          >
            <Map className="w-4 h-4 text-blue-600" />
          </a>
        ) : (
          <button
            type="button"
            disabled
            title="No Map"
            aria-label="No Map"
            className="flex-1 py-2.5 px-3 rounded-none bg-slate-100 text-slate-400 border border-slate-200/60 font-bold text-xs sm:text-sm cursor-not-allowed opacity-70 flex items-center justify-center flex-shrink-0"
          >
            <Map className="w-4 h-4 text-slate-400" />
          </button>
        )}

        <button
          type="button"
          onClick={() => onShare(offer)}
          title="Share"
          aria-label="Share"
          className="flex-1 py-2.5 px-3 rounded-none bg-pink-50 hover:bg-pink-100 text-pink-700 border border-pink-200/80 font-extrabold text-xs sm:text-sm shadow-2xs transition-all duration-200 active:scale-95 cursor-pointer flex items-center justify-center flex-shrink-0"
        >
          <Share2 className="w-4 h-4 text-pink-600" />
        </button>
      </div>
    </article>
  );
}


