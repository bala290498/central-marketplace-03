"use client";

import React from "react";
import { Offer, UserLocation } from "@/types/offer";
import {
  offerArea,
  distanceLabel,
  directionsUrl,
  getBadgeTone,
} from "@/lib/utils";
import { Phone, MapPin, Share2, Compass, Clock, Building2 } from "lucide-react";

interface OfferCardProps {
  offer: Offer;
  userLocation: UserLocation | null;
  onShare: (offer: Offer) => void;
}

export function OfferCard({ offer, userLocation, onShare }: OfferCardProps) {
  const badgeText = offer.badge || offer.dealType || "";
  const businessName = offer.business || offer.store || offer.merchant || "";
  const validityText = offer.validity || offer.ends || offer.expiry || "";
  const areaName = offerArea(offer);
  const toneClass = getBadgeTone(offer.id || badgeText || offer.title);

  const cleanPhone = offer.phone ? offer.phone.replace(/\s+/g, "") : "";
  const mapLink = directionsUrl(userLocation, offer);

  return (
    <article className="group relative bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200/90 dark:border-slate-800 shadow-xs hover:shadow-lg hover:border-orange-200 dark:hover:border-orange-900/50 transition-all duration-300 flex flex-col justify-between">
      <div>
        {/* Header: Business & Badge */}
        <div className="flex items-start justify-between gap-3 mb-2.5">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 dark:text-slate-400">
            <Building2 className="w-3.5 h-3.5 text-orange-500 flex-shrink-0" />
            <span className="truncate">{businessName}</span>
          </div>

          {badgeText && (
            <span
              className={`px-2.5 py-1 rounded-lg text-[11px] font-extrabold tracking-wide uppercase shadow-2xs flex-shrink-0 ${toneClass}`}
            >
              {badgeText}
            </span>
          )}
        </div>

        {/* Title & Description */}
        <h2 className="text-lg font-bold text-slate-900 dark:text-white leading-snug mb-1.5 group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors">
          {offer.title}
        </h2>
        {offer.description && (
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed line-clamp-2">
            {offer.description}
          </p>
        )}

        {/* Meta Info Pill Chips */}
        <div className="flex flex-wrap items-center gap-2 mt-4 pt-3 border-t border-slate-100 dark:border-slate-800/80 text-xs font-medium">
          {areaName && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-50 dark:bg-amber-950/50 text-amber-800 dark:text-amber-300 border border-amber-200/80 dark:border-amber-900/40">
              <MapPin className="w-3 h-3 text-amber-600 dark:text-amber-400" />
              <span>↗ {areaName}</span>
            </span>
          )}

          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/50 text-emerald-800 dark:text-emerald-300 border border-emerald-200/80 dark:border-emerald-900/40">
            <Compass className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
            <span>{userLocation ? distanceLabel(offer.distance) : "km"}</span>
          </span>

          {validityText && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-rose-50 dark:bg-rose-950/50 text-rose-800 dark:text-rose-300 border border-rose-200/80 dark:border-rose-900/40">
              <Clock className="w-3 h-3 text-rose-600 dark:text-rose-400" />
              <span>{validityText}</span>
            </span>
          )}
        </div>

        <p className="text-[11px] text-slate-400 dark:text-slate-500 italic mt-2">
          *call and confirm the deal before visit
        </p>
      </div>

      {/* Action Buttons */}
      <div className="grid grid-cols-3 gap-2 mt-4 pt-3 border-t border-slate-100 dark:border-slate-800">
        {cleanPhone ? (
          <a
            href={`tel:${cleanPhone}`}
            className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm shadow-xs transition-colors"
          >
            <Phone className="w-3.5 h-3.5" />
            <span>Call</span>
          </a>
        ) : (
          <div />
        )}

        <a
          href={mapLink}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs sm:text-sm shadow-xs transition-colors"
        >
          <MapPin className="w-3.5 h-3.5" />
          <span>Maps</span>
        </a>

        <button
          type="button"
          onClick={() => onShare(offer)}
          className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-orange-50 hover:bg-orange-100 dark:bg-orange-950/60 dark:hover:bg-orange-900/60 text-orange-700 dark:text-orange-300 font-bold text-xs sm:text-sm border border-orange-200 dark:border-orange-800 transition-colors"
        >
          <Share2 className="w-3.5 h-3.5 text-orange-600 dark:text-orange-400" />
          <span>Share</span>
        </button>
      </div>
    </article>
  );
}
