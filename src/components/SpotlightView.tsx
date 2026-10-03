"use client";

import React, { useState, useMemo, useEffect, useCallback, useRef } from "react";
import { Offer, UserLocation } from "@/types/offer";
import {
  offerArea,
  offerCategory,
  distanceKm,
  lookupUserArea,
  directionsUrl,
} from "@/lib/utils";
import { Navbar } from "./Navbar";
import { getCategoryIcon, getCategoryColors } from "@/lib/categories";
import {
  Sparkles,
  BadgeCheck,
  Phone,
  MapPin,
  Map,
  Share2,
  Navigation,
  Timer,
  AlertCircle,
  CheckCircle2,
  Tag,
  Info,
} from "lucide-react";

interface SpotlightViewProps {
  initialOffers: Offer[];
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

export function SpotlightView({ initialOffers }: SpotlightViewProps) {
  const [offers] = useState<Offer[]>(initialOffers);
  const [userLocation, setUserLocation] = useState<UserLocation | null>(null);
  const [userAreaLabel, setUserAreaLabel] = useState<string>("");
  const [isLocating, setIsLocating] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>("");

  const [mobileBannerLoaded, setMobileBannerLoaded] = useState<boolean>(false);
  const [desktopBannerLoaded, setDesktopBannerLoaded] = useState<boolean>(false);
  const mobileImgRef = useRef<HTMLImageElement>(null);
  const desktopImgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (mobileImgRef.current?.complete) setMobileBannerLoaded(true);
    if (desktopImgRef.current?.complete) setDesktopBannerLoaded(true);
  }, []);

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const detectLocation = useCallback(() => {
    if (typeof window === "undefined" || !navigator.geolocation) {
      return;
    }
    setIsLocating(true);
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const coords = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        };
        setUserLocation(coords);
        setIsLocating(false);
        const areaLabel = await lookupUserArea(coords.latitude, coords.longitude);
        if (areaLabel) setUserAreaLabel(areaLabel);
      },
      () => setIsLocating(false),
      { enableHighAccuracy: true, timeout: 12000, maximumAge: 60000 }
    );
  }, []);

  useEffect(() => {
    detectLocation();
  }, [detectLocation]);

  // Max 20 spotlight offers allowed
  const spotlightOffers = useMemo(() => {
    let list = offers.slice(0, 20);

    if (selectedCategory) {
      list = list.filter((o) => offerCategory(o) === selectedCategory);
    }

    if (userLocation) {
      list = list
        .map((offer) => ({
          ...offer,
          distance: distanceKm(
            userLocation.latitude,
            userLocation.longitude,
            Number(offer.latitude),
            Number(offer.longitude)
          ),
        }))
        .sort((a, b) => (a.distance || 0) - (b.distance || 0));
    }

    return list;
  }, [offers, selectedCategory, userLocation]);

  const categories = useMemo(() => {
    return Array.from(new Set(offers.map(offerCategory).filter(Boolean))).sort();
  }, [offers]);

  const handleShare = async (offer: Offer) => {
    const title = offer.title || "Spotlight Deal";
    const business = offer.business || offer.store || "";
    const description = offer.description || "";
    const shareText = `*${business}*\n*${title}*\n${description}\n\nExplore more on centralmarketplace.in`;

    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share({ title, text: shareText });
      } catch (err) {}
    } else if (typeof navigator !== "undefined" && navigator.clipboard) {
      try {
        await navigator.clipboard.writeText(shareText);
        triggerToast("Spotlight deal copied to clipboard!");
      } catch (err) {
        triggerToast("Failed to copy deal");
      }
    }
  };

  return (
    <div className="min-h-screen bg-slate-50/60 text-slate-900 flex flex-col justify-between">
      {/* Sticky Header */}
      <Navbar
        userLocation={userLocation}
        userAreaLabel={userAreaLabel}
        onDetectLocation={detectLocation}
        isLocating={isLocating}
      />

      {/* Main Spotlight Container */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 pt-4 pb-16">
        {/* Spotlight Hero Section with Skeleton Loader (Sharp Corners) */}
        <div className="relative rounded-none overflow-hidden shadow-md mb-6 border border-slate-200/80 bg-slate-200 min-h-[140px] xs:min-h-[180px] md:min-h-[220px]">
          {/* Mobile Skeleton Loader */}
          {!mobileBannerLoaded && (
            <div className="block md:hidden absolute inset-0 bg-slate-200 animate-pulse z-10">
              <div className="w-full h-full bg-gradient-to-r from-slate-200 via-slate-100 to-slate-200 animate-pulse" />
            </div>
          )}

          {/* Desktop Skeleton Loader */}
          {!desktopBannerLoaded && (
            <div className="hidden md:block absolute inset-0 bg-slate-200 animate-pulse z-10">
              <div className="w-full h-full bg-gradient-to-r from-slate-200 via-slate-100 to-slate-200 animate-pulse" />
            </div>
          )}

          {/* Mobile Hero Banner Image */}
          <img
            ref={mobileImgRef}
            src="/spotlight/mobile.jpeg"
            alt="Spotlight Mobile Banner"
            onLoad={() => setMobileBannerLoaded(true)}
            className={`w-full h-auto object-cover block md:hidden rounded-none transition-opacity duration-300 ${
              mobileBannerLoaded ? "opacity-100" : "opacity-0"
            }`}
          />

          {/* Desktop Hero Banner Image */}
          <img
            ref={desktopImgRef}
            src="/spotlight/desktop.jpeg"
            alt="Spotlight Desktop Banner"
            onLoad={() => setDesktopBannerLoaded(true)}
            className={`w-full h-auto object-cover hidden md:block rounded-none transition-opacity duration-300 ${
              desktopBannerLoaded ? "opacity-100" : "opacity-0"
            }`}
          />
        </div>

        {/* Spotlight Offers List */}
        {spotlightOffers.length > 0 ? (
          <div className="space-y-6">
            {spotlightOffers.map((offer, idx) => {
              const numStr = String(idx + 1).padStart(2, "0");
              const businessName = offer.business || offer.store || offer.merchant || "";
              const areaName = offerArea(offer) || "Chennai";
              const categoryName = offer.category || "";
              const validityText = offer.validity || offer.ends || offer.expiry || "Available";
              const rawBadge = offer.badge || offer.dealType || "";
              const badgeText = rawBadge.replace(/\bspotlight\b/gi, "").replace(/\s+/g, " ").trim();
              const CategoryIcon = getCategoryIcon(categoryName, offer.title);
              const categoryColors = getCategoryColors(categoryName);
              const cleanPhone = offer.phone ? offer.phone.replace(/\s+/g, "") : "";
              const rawWhatsapp = offer.whatsapp || offer.phone || "";
              const cleanWhatsapp = rawWhatsapp.replace(/\D/g, "");
              const whatsappUrl = cleanWhatsapp ? `https://wa.me/${cleanWhatsapp}` : null;
              const mapLink = directionsUrl(userLocation, offer);
              const whatsNewText = offer.whatsNew || offer.whatsDifferent;

              return (
                <article
                  key={offer.id}
                  className="bg-white rounded-none border border-slate-200 p-5 sm:p-6 shadow-xs hover:shadow-md transition-all duration-300 relative overflow-hidden"
                >
                  {/* Must Try Top Right Corner Ribbon */}
                  {(offer.mustTry || offer.isMustTry) && (
                    <div className="absolute top-0 right-0 z-20 w-28 h-28 overflow-hidden pointer-events-none">
                      <div className="absolute top-4 -right-9 w-36 py-1 bg-gradient-to-r from-rose-600 via-red-600 to-amber-500 text-white text-[10px] font-black uppercase tracking-wider flex items-center justify-center text-center leading-none transform rotate-45 shadow-md border-y border-white/30 pl-0.5">
                        MUST TRY
                      </div>
                    </div>
                  )}
                  {/* DESKTOP LAYOUT (Full-width banner card) */}
                  <div className="hidden md:flex items-stretch gap-6">
                    {/* Left: Number Badge (Fills Top, Left, Bottom sides with Magenta #A00058 & White text) */}
                    <div className="flex flex-col items-center justify-center bg-[#A00058] w-20 px-2 py-4 -mt-5 -mb-5 -ml-5 sm:-mt-6 sm:-mb-6 sm:-ml-6 flex-shrink-0 text-center select-none shadow-xs">
                      <span className="text-3xl font-black text-white tracking-tighter">
                        {numStr}
                      </span>
                      <span className="text-[9.5px] font-black uppercase text-white/95 tracking-wider mt-1">
                        Spotlight
                      </span>
                    </div>

                    {/* Middle: Core Details (Separated from Right container by a dotted vertical line) */}
                    <div className="flex-1 min-w-0 flex flex-col justify-between pr-6 border-r-2 border-dotted border-slate-300">
                      <div>
                        {/* Header: Icon + Brand Name (Line 1) & Category (Line 2) + Badge Pill */}
                        <div className="flex items-start justify-between gap-3 mb-3">
                          <div className="flex items-center gap-2 min-w-0 flex-1">
                            <div className={`w-7.5 h-7.5 rounded-lg ${categoryColors.iconBg} text-white flex items-center justify-center flex-shrink-0 shadow-2xs mt-0.5`}>
                              <CategoryIcon className="w-4 h-4 stroke-[2.2]" />
                            </div>
                            <div className="flex flex-col text-left min-w-0">
                              <span className="text-xs sm:text-sm font-extrabold text-slate-800 truncate leading-tight">
                                {businessName || areaName}
                              </span>
                              <div className="flex items-center gap-2 flex-wrap text-[11px] font-semibold text-slate-500 mt-0.5">
                                <div className="flex items-center gap-1 font-bold text-slate-700">
                                  <MapPin className="w-3.5 h-3.5 text-red-500 fill-red-500/20" />
                                  <span>{areaName}</span>
                                </div>
                                <span className="text-slate-300">•</span>
                                <div className="flex items-center gap-1 font-bold text-slate-700">
                                  <Timer className="w-3.5 h-3.5 text-rose-600" />
                                  <span>{validityText}</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Title with Badge inline next to Title */}
                        <h2 className="text-xl font-extrabold text-slate-900 leading-snug mb-2 flex items-center flex-wrap gap-2">
                          <span>{offer.title}</span>
                          {badgeText && (
                            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-black tracking-wide bg-orange-50 text-orange-700 flex-shrink-0 align-middle">
                              {badgeText}
                            </span>
                          )}
                        </h2>

                        {/* Description */}
                        {offer.description && (
                          <p className="text-xs text-slate-600 leading-relaxed mb-3">
                            {offer.description}
                          </p>
                        )}

                        {/* 3 Key Features */}
                        <div className="flex items-center justify-between text-xs font-bold text-slate-700 py-2 border-y border-slate-100 w-full mb-3">
                          {(offer.features && offer.features.length > 0
                            ? offer.features.slice(0, 3)
                            : ["100% Genuine Offer", "Instant Redemption", "Verified Merchant"]
                          ).map((feat, fIdx, arr) => (
                            <React.Fragment key={fIdx}>
                              <div className="flex items-center gap-1.5 min-w-0">
                                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                                <span className="truncate text-slate-700 text-[11.5px] font-extrabold">{feat}</span>
                              </div>
                              {fIdx < arr.length - 1 && (
                                <span className="text-slate-300 font-normal px-1">|</span>
                              )}
                            </React.Fragment>
                          ))}
                        </div>

                        {/* What's New / What's Different Box */}
                        {whatsNewText && (
                          <div className="bg-amber-50/80 border border-amber-200/90 rounded-xl p-2.5 mb-3 text-xs text-amber-900 flex items-start gap-2">
                            <Sparkles className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" />
                            <div>
                              <strong className="font-extrabold text-amber-950">What&apos;s New / Different: </strong>
                              <span>{whatsNewText}</span>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Right: Light Low-Intensity Green Container (No horizontal line) */}
                    <div className="w-64 bg-emerald-50/60 border border-emerald-200/60 rounded-2xl p-3.5 flex flex-col justify-between flex-shrink-0">
                      {/* Special Pricing Display (Larger text, without inner horizontal line) */}
                      {offer.marketPrice && offer.ourPrice ? (
                        <div className="text-center mb-3">
                          <div className="text-xs font-bold text-slate-400 line-through mb-0.5">
                            Market Price {offer.marketPrice}
                          </div>
                          <div className="text-xl sm:text-2xl font-black text-emerald-700">
                            Our Price {offer.ourPrice}
                          </div>
                        </div>
                      ) : (
                        <div className="flex-1" />
                      )}

                      {/* Action Buttons */}
                      <div className="space-y-3 mt-auto">
                        {cleanPhone ? (
                          <a
                            href={`tel:${cleanPhone}`}
                            className="w-full flex items-center justify-center gap-2 py-2.5 px-3 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs shadow-xs transition-colors rounded-xl"
                          >
                            <Phone className="w-4 h-4 fill-current" />
                            <span>Call Merchant</span>
                          </a>
                        ) : (
                          <button
                            type="button"
                            disabled
                            title="No Phone"
                            aria-label="No Phone"
                            className="w-full flex items-center justify-center gap-2 py-2.5 px-3 bg-slate-100 text-slate-400 border border-slate-200/60 font-extrabold text-xs cursor-not-allowed opacity-70 rounded-xl"
                          >
                            <Phone className="w-4 h-4 text-slate-400" />
                            <span>Call Merchant</span>
                          </button>
                        )}

                        {/* 3 Circular Action Icons with text placed outside below */}
                        <div className="flex items-center justify-around gap-2 pt-1">
                          {whatsappUrl ? (
                            <a
                              href={whatsappUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex flex-col items-center gap-1 group"
                              title="Chat on WhatsApp"
                            >
                              <div className="w-9.5 h-9.5 rounded-full bg-white border border-emerald-200/90 shadow-2xs flex items-center justify-center text-emerald-600 group-hover:bg-emerald-50 group-hover:border-emerald-300 transition-all">
                                <WhatsAppIcon className="w-4.5 h-4.5" />
                              </div>
                              <span className="text-[11px] font-extrabold text-emerald-950 group-hover:text-emerald-700">
                                Chat
                              </span>
                            </a>
                          ) : (
                            <button
                              type="button"
                              disabled
                              className="flex flex-col items-center gap-1 cursor-not-allowed opacity-60"
                              title="WhatsApp Unavailable"
                            >
                              <div className="w-9.5 h-9.5 rounded-full bg-slate-100 border border-slate-200/60 shadow-2xs flex items-center justify-center text-slate-400">
                                <WhatsAppIcon className="w-4.5 h-4.5 text-slate-400" />
                              </div>
                              <span className="text-[11px] font-bold text-slate-400">
                                Chat
                              </span>
                            </button>
                          )}

                          {mapLink ? (
                            <a
                              href={mapLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex flex-col items-center gap-1 group"
                              title="View Route"
                            >
                              <div className="w-9.5 h-9.5 rounded-full bg-white border border-blue-200/90 shadow-2xs flex items-center justify-center text-blue-600 group-hover:bg-blue-50 group-hover:border-blue-300 transition-all">
                                <Map className="w-4.5 h-4.5" />
                              </div>
                              <span className="text-[11px] font-extrabold text-blue-950 group-hover:text-blue-700">
                                Route
                              </span>
                            </a>
                          ) : (
                            <button
                              type="button"
                              disabled
                              className="flex flex-col items-center gap-1 cursor-not-allowed opacity-60"
                              title="Route Unavailable"
                            >
                              <div className="w-9.5 h-9.5 rounded-full bg-slate-100 border border-slate-200/60 shadow-2xs flex items-center justify-center text-slate-400">
                                <Map className="w-4.5 h-4.5 text-slate-400" />
                              </div>
                              <span className="text-[11px] font-bold text-slate-400">
                                Route
                              </span>
                            </button>
                          )}

                          <button
                            type="button"
                            onClick={() => handleShare(offer)}
                            className="flex flex-col items-center gap-1 group cursor-pointer"
                            title="Share Deal"
                          >
                            <div className="w-9.5 h-9.5 rounded-full bg-white border border-pink-200/90 shadow-2xs flex items-center justify-center text-pink-600 group-hover:bg-pink-50 group-hover:border-pink-300 transition-all">
                              <Share2 className="w-4.5 h-4.5" />
                            </div>
                            <span className="text-[11px] font-extrabold text-pink-950 group-hover:text-pink-700">
                              Share
                            </span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* MOBILE LAYOUT (Vertical Numbered Card) */}
                  <div className="block md:hidden space-y-3">
                    {/* 1st Row: Full-width Header Container extending 3 sides to card end (Top, Left, Right) */}
                    <div className="-mt-5 -mx-5 mb-3 bg-[#A00058] text-white px-4 py-2.5 flex items-center justify-between select-none shadow-xs">
                      {/* Card Number on top full width */}
                      <div className="flex items-center gap-2">
                        <span className="text-base font-black tracking-tight text-white">
                          #{numStr}
                        </span>
                        <span className="text-[10px] font-black uppercase tracking-wider text-white/90 bg-white/20 px-2 py-0.5 rounded-full">
                          Spotlight
                        </span>
                      </div>
                    </div>

                    {/* Brand Name, Category, Location & Expiry Row */}
                    <div className="flex items-center gap-2.5 mb-2">
                      <div className={`w-7.5 h-7.5 rounded-lg ${categoryColors.iconBg} text-white flex items-center justify-center flex-shrink-0 shadow-2xs mt-0.5`}>
                        <CategoryIcon className="w-4 h-4 stroke-[2.2]" />
                      </div>
                      <div className="flex flex-col text-left min-w-0 flex-1">
                        <span className="text-xs font-extrabold text-slate-800 truncate leading-tight">
                          {businessName || areaName}
                        </span>
                        <div className="flex items-center gap-1.5 flex-wrap text-[10.5px] font-semibold text-slate-500 mt-0.5">
                          <div className="flex items-center gap-0.5 font-bold text-slate-700">
                            <MapPin className="w-3 h-3 text-red-500 fill-red-500/20" />
                            <span>{areaName}</span>
                          </div>
                          <span className="text-slate-300">•</span>
                          <div className="flex items-center gap-0.5 font-bold text-slate-700">
                            <Timer className="w-3 h-3 text-rose-600" />
                            <span>{validityText}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Title with Badge inline next to Title */}
                    <h2 className="text-base font-extrabold text-slate-900 leading-snug flex items-center flex-wrap gap-1.5">
                      <span>{offer.title}</span>
                      {badgeText && (
                        <span className="px-2.5 py-0.5 rounded-full text-[10.5px] font-black tracking-wide bg-orange-50 text-orange-700 flex-shrink-0 align-middle">
                          {badgeText}
                        </span>
                      )}
                    </h2>

                    {/* Description */}
                    {offer.description && (
                      <p className="text-xs text-slate-600 leading-relaxed">
                        {offer.description}
                      </p>
                    )}

                    {/* 3 Key Features */}
                    <div className="flex items-center gap-1.5 text-xs font-bold text-slate-700 py-1 flex-wrap">
                      {(offer.features && offer.features.length > 0
                        ? offer.features.slice(0, 3)
                        : ["100% Genuine Offer", "Instant Redemption", "Verified Merchant"]
                      ).map((feat, fIdx) => (
                        <div
                          key={fIdx}
                          className="flex items-center gap-1 bg-slate-100/90 px-2 py-0.5 rounded-md text-slate-800 text-[10.5px] font-bold"
                        >
                          <CheckCircle2 className="w-3 h-3 text-emerald-600 flex-shrink-0" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>

                    {/* What's New / What's Different Box */}
                    {whatsNewText && (
                      <div className="bg-amber-50/80 border border-amber-200/90 rounded-xl p-2.5 text-xs text-amber-900 flex items-start gap-2">
                        <Sparkles className="w-3.5 h-3.5 text-amber-500 flex-shrink-0 mt-0.5" />
                        <div>
                          <strong className="font-extrabold text-amber-950">What&apos;s New / Different: </strong>
                          <span>{whatsNewText}</span>
                        </div>
                      </div>
                    )}

                    {/* Special Pricing Display */}
                    {offer.marketPrice && offer.ourPrice && (
                      <div className="bg-emerald-50 border border-emerald-200/80 p-2.5 rounded-xl text-xs flex items-center justify-between">
                        <span className="text-slate-400 line-through font-medium">
                          Market Price {offer.marketPrice}
                        </span>
                        <span className="text-emerald-700 font-black text-sm">
                          Our Price {offer.ourPrice}
                        </span>
                      </div>
                    )}

                    {/* Action Buttons Row (Matching List Card / OfferCard style) */}
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
                        onClick={() => handleShare(offer)}
                        title="Share"
                        aria-label="Share"
                        className="flex-1 py-2.5 px-3 rounded-none bg-pink-50 hover:bg-pink-100 text-pink-700 border border-pink-200/80 font-extrabold text-xs sm:text-sm shadow-2xs transition-all duration-200 active:scale-95 cursor-pointer flex items-center justify-center flex-shrink-0"
                      >
                        <Share2 className="w-4 h-4 text-pink-600" />
                      </button>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        ) : (
          <div className="bg-white rounded-2xl p-12 text-center border border-slate-200 my-6 shadow-xs">
            <div className="w-14 h-14 rounded-2xl bg-amber-50 text-amber-500 flex items-center justify-center mx-auto mb-3">
              <AlertCircle className="w-7 h-7" />
            </div>
            <h3 className="text-base font-bold text-slate-900 mb-1">
              No Spotlight deals found in this category
            </h3>
            <button
              type="button"
              onClick={() => setSelectedCategory("")}
              className="mt-3 px-4 py-2 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs shadow-md transition-colors"
            >
              Show All Spotlight Deals
            </button>
          </div>
        )}
      </main>



      {/* Floating Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-20 right-6 z-50 flex items-center gap-2 px-4 py-3 rounded-2xl bg-slate-900 text-white text-xs sm:text-sm font-semibold shadow-xl border border-slate-800 animate-in fade-in duration-200">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
