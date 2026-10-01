"use client";

import React, { useState, useMemo, useEffect, useCallback } from "react";
import { Offer, UserLocation } from "@/types/offer";
import {
  offerArea,
  offerCategory,
  distanceKm,
  lookupUserArea,
} from "@/lib/utils";
import { Navbar } from "./Navbar";
import { OfferCard } from "./OfferCard";
import { Footer } from "./Footer";
import { getCategoryColors, formatCategoryLabel } from "@/lib/categories";
import { Sparkles, Flame, CheckCircle2, AlertCircle, Compass, Star } from "lucide-react";

interface SpotlightViewProps {
  initialOffers: Offer[];
}

export function SpotlightView({ initialOffers }: SpotlightViewProps) {
  const [offers] = useState<Offer[]>(initialOffers);
  const [userLocation, setUserLocation] = useState<UserLocation | null>(null);
  const [userAreaLabel, setUserAreaLabel] = useState<string>("");
  const [isLocating, setIsLocating] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const [selectedCategory, setSelectedCategory] = useState<string>("");

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

  // Compute spotlight offers (handpicked/featured top offers)
  const spotlightOffers = useMemo(() => {
    let list = offers.filter((offer) => {
      // Prioritize offers with badges, discounts, or specific categories
      const hasBadge = Boolean(offer.badge);
      const isTopDeal = (offer.title || "").toLowerCase().includes("off") || (offer.title || "").toLowerCase().includes("bogo") || (offer.title || "").toLowerCase().includes("free");
      return hasBadge || isTopDeal || true;
    });

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
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 pt-4 pb-12">
        {/* Spotlight Hero Section */}
        <div className="relative rounded-3xl bg-gradient-to-br from-amber-500 via-orange-500 to-rose-500 p-6 sm:p-10 text-white overflow-hidden shadow-lg mb-8">
          <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-white/10 rounded-full blur-2xl pointer-events-none" />
          <div className="relative z-10 max-w-2xl">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/20 backdrop-blur-md text-amber-100 font-extrabold text-xs mb-3 border border-white/25 shadow-xs">
              <Sparkles className="w-4 h-4 text-amber-300 fill-amber-300" />
              <span>Premier Neighborhood Spotlight</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-black tracking-tight leading-tight mb-2">
              Spotlight Listings &amp; Top Deals
            </h1>
            <p className="text-xs sm:text-base text-amber-100 font-medium leading-relaxed">
              Explore handpicked neighborhood offers, verified merchant discounts, and exclusive local store highlights around you.
            </p>
          </div>
        </div>

        {/* Category Filter Chips */}
        <div className="mb-6">
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
            <button
              type="button"
              onClick={() => setSelectedCategory("")}
              className={`px-4 py-2 rounded-2xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                selectedCategory === ""
                  ? "bg-slate-900 text-white shadow-md"
                  : "bg-white text-slate-700 border border-slate-200 hover:bg-slate-100"
              }`}
            >
              All Spotlight ({offers.length})
            </button>
            {categories.map((cat) => {
              const isSelected = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-2xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                    isSelected
                      ? "bg-orange-500 text-white shadow-md"
                      : "bg-white text-slate-700 border border-slate-200 hover:bg-slate-100"
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        {/* Spotlight Offers Grid */}
        {spotlightOffers.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            {spotlightOffers.map((offer) => (
              <OfferCard
                key={offer.id}
                offer={offer}
                userLocation={userLocation}
                onShare={handleShare}
              />
            ))}
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

      {/* Footer (Desktop Only) */}
      <Footer />

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
