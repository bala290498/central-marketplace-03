"use client";

import React, { useState, useEffect, useMemo, useCallback } from "react";
import { Offer, UserLocation } from "@/types/offer";
import {
  offerArea,
  offerCategory,
  displayedKm,
  distanceKm,
  directionsUrl,
  lookupUserArea,
} from "@/lib/utils";
import { Navbar } from "./Navbar";
import { HeroBanner } from "./HeroBanner";
import { MobileCategoryGrid } from "./MobileCategoryGrid";
import { LatestListingsCarousel } from "./LatestListingsCarousel";
import { CategorySelector } from "./CategorySelector";
import { FilterBar } from "./FilterBar";
import { OfferCard } from "./OfferCard";
import { Sparkles, CheckCircle2, AlertCircle } from "lucide-react";

interface OfferGridProps {
  initialOffers: Offer[];
}

export function OfferGrid({ initialOffers }: OfferGridProps) {
  const [offers] = useState<Offer[]>(initialOffers);
  const [userLocation, setUserLocation] = useState<UserLocation | null>(null);
  const [userAreaLabel, setUserAreaLabel] = useState<string>("");
  const [isLocating, setIsLocating] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Filter States
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [selectedLocation, setSelectedLocation] = useState<string>("");
  const [selectedDistance, setSelectedDistance] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Trigger geolocation detection
  const detectLocation = useCallback(() => {
    if (typeof window === "undefined" || !navigator.geolocation) {
      triggerToast("Geolocation is not supported by your browser");
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
        triggerToast("Location detected successfully!");

        // Reverse lookup area label
        const areaLabel = await lookupUserArea(coords.latitude, coords.longitude);
        if (areaLabel) {
          setUserAreaLabel(areaLabel);
        }
      },
      (error) => {
        setIsLocating(false);
        triggerToast("Could not detect location. Showing all deals.");
      },
      { enableHighAccuracy: true, timeout: 12000, maximumAge: 60000 }
    );
  }, []);

  // Auto-detect location on load
  useEffect(() => {
    detectLocation();
  }, [detectLocation]);

  // Extract unique categories & unique locations
  const categories = useMemo(() => {
    return Array.from(
      new Set(offers.map(offerCategory).filter(Boolean))
    ).sort();
  }, [offers]);

  const locations = useMemo(() => {
    return Array.from(
      new Set(offers.map(offerArea).filter(Boolean))
    ).sort();
  }, [offers]);

  // Compute filtered & sorted offers
  const processedOffers = useMemo(() => {
    let list = offers.filter((offer) => {
      const areaOk =
        !selectedLocation || offerArea(offer) === selectedLocation;
      const catOk =
        !selectedCategory || offerCategory(offer) === selectedCategory;

      const searchLower = searchQuery.toLowerCase().trim();
      const searchOk =
        !searchLower ||
        offer.title.toLowerCase().includes(searchLower) ||
        (offer.description && offer.description.toLowerCase().includes(searchLower)) ||
        (offer.business && offer.business.toLowerCase().includes(searchLower)) ||
        (offer.location && offer.location.toLowerCase().includes(searchLower));

      return areaOk && catOk && searchOk;
    });

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

      if (selectedDistance !== null) {
        list = list.filter(
          (offer) => displayedKm(offer.distance) <= selectedDistance
        );
      }
    }

    return list;
  }, [offers, selectedCategory, selectedLocation, selectedDistance, searchQuery, userLocation]);

  const scrollToOffers = () => {
    const el = document.getElementById("offers-section");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Handle Share functionality
  const handleShare = async (offer: Offer) => {
    const title = offer.title || "Deal";
    const business = offer.business || offer.store || "";
    const description = offer.description || "";
    const validity = offer.validity || offer.ends || "";
    const location = offerArea(offer);
    const phone = offer.phone || "";
    const map = directionsUrl(userLocation, offer);

    const shareText = [
      business ? `*${business}*` : "",
      `*${title}*`,
      description,
      validity ? `Validity: ${validity}` : "",
      "",
      location ? `Location: ${location}` : "",
      phone ? `Call: ${phone}` : "",
      "_call and confirm the deal before visit_",
      "",
      `Map: ${map}`,
      "",
      "For more deals visit: centralmarketplace.in",
    ]
      .filter(Boolean)
      .join("\n");

    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share({ title, text: shareText });
      } catch (err) {
        // Share cancelled or unhandled
      }
    } else if (typeof navigator !== "undefined" && navigator.clipboard) {
      try {
        await navigator.clipboard.writeText(shareText);
        triggerToast("Deal copied to clipboard!");
      } catch (err) {
        triggerToast("Failed to copy deal");
      }
    }
  };

  return (
    <div className="min-h-screen bg-slate-50/60 text-slate-900 flex flex-col">
      {/* Sticky Header */}
      <Navbar
        userLocation={userLocation}
        userAreaLabel={userAreaLabel}
        onDetectLocation={detectLocation}
        isLocating={isLocating}
      />

      {/* Main Deals Container */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 pt-4 pb-16">
        {/* 1. Hero Banner with Search Bar */}
        <HeroBanner
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
        />

        {/* 2. Categories Section (3x3 grid with View All tile) */}
        <div className="mb-2">
          <MobileCategoryGrid
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
          />
        </div>

        {/* 3. Latest Listings Horizontal Carousel */}
        <LatestListingsCarousel
          offers={processedOffers}
          userLocation={userLocation}
          onSeeAll={scrollToOffers}
        />

        {/* 4. Full Filtered Offers Section */}
        <div id="offers-section">
          {/* Banner / Headline */}
          <div className="mb-3 flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-slate-600">
              <Sparkles className="w-4 h-4 text-orange-500" />
              <span>
                {selectedCategory
                  ? `Showing results for "${selectedCategory}"`
                  : userLocation
                  ? "Exclusive verified discounts near you"
                  : "Browse local deals across Chennai"}
              </span>
            </div>

            <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-slate-200/80 text-slate-700">
              {processedOffers.length} {processedOffers.length === 1 ? "Listing" : "Listings"}
            </span>
          </div>

          {/* Filters Container */}
          <div className="bg-white/95 backdrop-blur-md rounded-2xl p-3 sm:p-4 border border-slate-200/80 shadow-xs mb-6 space-y-2">
            {/* Category Chips (Desktop & Tablet) */}
            <div className="hidden md:block">
              <CategorySelector
                categories={categories}
                selectedCategory={selectedCategory}
                onSelectCategory={setSelectedCategory}
              />
            </div>

            {/* Location & Distance Dropdowns */}
            <FilterBar
              locations={locations}
              selectedLocation={selectedLocation}
              selectedDistance={selectedDistance}
              searchQuery={searchQuery}
              onLocationChange={setSelectedLocation}
              onDistanceChange={setSelectedDistance}
              onSearchChange={setSearchQuery}
              hasUserLocation={!!userLocation}
            />
          </div>

          {/* Offers Grid */}
          {processedOffers.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              {processedOffers.map((offer) => (
                <OfferCard
                  key={offer.id}
                  offer={offer}
                  userLocation={userLocation}
                  onShare={handleShare}
                />
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 my-8 shadow-xs">
              <div className="w-16 h-16 rounded-2xl bg-orange-50 text-orange-500 flex items-center justify-center mx-auto mb-4">
                <AlertCircle className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">
                No matching deals found
              </h3>
              <p className="text-sm text-slate-500 max-w-md mx-auto mb-6">
                Try adjusting your category, distance, or location filters to see more offers around you.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSelectedCategory("");
                  setSelectedLocation("");
                  setSelectedDistance(null);
                  setSearchQuery("");
                }}
                className="px-4 py-2 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-sm shadow-md transition-colors"
              >
                Reset Filters
              </button>
            </div>
          )}
        </div>
      </main>

      {/* Floating Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-20 right-6 z-50 flex items-center gap-2 px-4 py-3 rounded-2xl bg-slate-900 text-white text-xs sm:text-sm font-semibold shadow-xl border border-slate-800 animate-bounce">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
