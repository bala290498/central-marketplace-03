"use client";

import React, { useState, useMemo, useEffect, useCallback } from "react";
import { useSearchParams } from "next/navigation";
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
import { ListCategoryBar } from "./ListCategoryBar";
import { OfferCard } from "./OfferCard";
import { getOfferValidityCategory } from "@/lib/validity";
import { CheckCircle2, AlertCircle, Search, X } from "lucide-react";

interface ListingsViewProps {
  initialOffers: Offer[];
}

export function ListingsView({ initialOffers }: ListingsViewProps) {
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get("category") || "";
  const validityParam = searchParams.get("validity") || "";

  const [offers] = useState<Offer[]>(initialOffers);
  const [userLocation, setUserLocation] = useState<UserLocation | null>(null);
  const [userAreaLabel, setUserAreaLabel] = useState<string>("");
  const [isLocating, setIsLocating] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Filter States
  const [selectedCategory, setSelectedCategory] = useState<string>(categoryParam);
  const [selectedLocation, setSelectedLocation] = useState<string>("");
  const [selectedDistance, setSelectedDistance] = useState<number | null>(null);
  const [selectedValidity, setSelectedValidity] = useState<string>(validityParam);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isHeaderHidden, setIsHeaderHidden] = useState<boolean>(false);

  // Stable, flicker-free scroll listener with transition lock
  useEffect(() => {
    let lastY = typeof window !== "undefined" ? window.scrollY || 0 : 0;
    let isLocked = false;

    const handleScroll = () => {
      if (isLocked) return;
      const currentY = Math.max(0, window.scrollY || 0);
      const delta = currentY - lastY;

      // At top of page (< 50px), always show header
      if (currentY <= 50) {
        if (isHeaderHidden) {
          setIsHeaderHidden(false);
        }
        lastY = currentY;
        return;
      }

      // Scroll Down -> Hide Navbar Header (scroll delta > 30px)
      if (delta > 30 && !isHeaderHidden) {
        setIsHeaderHidden(true);
        isLocked = true;
        lastY = currentY;
        setTimeout(() => {
          isLocked = false;
          lastY = Math.max(0, window.scrollY || 0);
        }, 320);
        return;
      }

      // Scroll Up -> Show Navbar Header (scroll delta < -30px)
      if (delta < -30 && isHeaderHidden) {
        setIsHeaderHidden(false);
        isLocked = true;
        lastY = currentY;
        setTimeout(() => {
          isLocked = false;
          lastY = Math.max(0, window.scrollY || 0);
        }, 320);
        return;
      }

      lastY = currentY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isHeaderHidden]);

  useEffect(() => {
    if (categoryParam) {
      setSelectedCategory(categoryParam);
    }
  }, [categoryParam]);

  useEffect(() => {
    if (validityParam) {
      setSelectedValidity(validityParam);
    }
  }, [validityParam]);

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

  const categories = useMemo(() => {
    return Array.from(new Set(offers.map(offerCategory).filter(Boolean))).sort();
  }, [offers]);

  const locations = useMemo(() => {
    return Array.from(new Set(offers.map(offerArea).filter(Boolean))).sort();
  }, [offers]);

  const validities = useMemo(() => {
    return Array.from(
      new Set(offers.map((o) => o.validity || o.ends || o.expiry).filter(Boolean))
    ).sort() as string[];
  }, [offers]);

  const processedOffers = useMemo(() => {
    let list = offers.filter((offer) => {
      const areaOk = !selectedLocation || offerArea(offer) === selectedLocation;
      const catOk = !selectedCategory || offerCategory(offer) === selectedCategory;
      const valText = (offer.validity || offer.ends || offer.expiry || "").toLowerCase().trim();
      const selValLower = selectedValidity.toLowerCase().trim();
      const validityOk =
        !selectedValidity ||
        getOfferValidityCategory(offer) === selectedValidity ||
        valText === selValLower;

      const searchLower = searchQuery.toLowerCase().trim();
      const searchOk =
        !searchLower ||
        offer.title.toLowerCase().includes(searchLower) ||
        (offer.description && offer.description.toLowerCase().includes(searchLower)) ||
        (offer.business && offer.business.toLowerCase().includes(searchLower)) ||
        (offer.location && offer.location.toLowerCase().includes(searchLower));

      return areaOk && catOk && validityOk && searchOk;
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
  }, [offers, selectedCategory, selectedLocation, selectedDistance, selectedValidity, searchQuery, userLocation]);

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
      } catch (err) {}
    } else if (typeof navigator !== "undefined" && navigator.clipboard) {
      try {
        await navigator.clipboard.writeText(shareText);
        triggerToast("Deal copied to clipboard!");
      } catch (err) {
        triggerToast("Failed to copy deal");
      }
    }
  };

  const handleCategorySelect = (cat: string) => {
    setSelectedCategory(cat);
    setSearchQuery("");
  };

  const handleLocationSelect = (loc: string) => {
    setSelectedLocation(loc);
    setSearchQuery("");
  };

  const handleDistanceSelect = (dist: number | null) => {
    setSelectedDistance(dist);
    setSearchQuery("");
  };

  const handleValiditySelect = (val: string) => {
    setSelectedValidity(val);
    setSearchQuery("");
  };

  return (
    <div className="min-h-screen bg-slate-50/60 text-slate-900 flex flex-col">
      {/* Unified Top Sticky Container */}
      <div className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs">
        {/* Collapsible Navbar Header Section */}
        <div
          className={`transition-all duration-300 ease-in-out overflow-hidden ${
            isHeaderHidden
              ? "max-h-0 opacity-0 pointer-events-none"
              : "max-h-96 opacity-100"
          }`}
        >
          <Navbar
            userLocation={userLocation}
            userAreaLabel={userAreaLabel}
            onDetectLocation={detectLocation}
            isLocating={isLocating}
            isSticky={false}
          >
            <div className="hidden md:flex relative items-center pt-1 pb-0.5">
              <Search className="absolute left-3.5 w-4 h-4 text-slate-400 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search products, services, listings..."
                className="w-full pl-9 pr-10 py-2.5 rounded-2xl border border-slate-200 bg-slate-50 focus:bg-white text-slate-900 text-xs sm:text-sm font-medium outline-none focus:outline-none focus:ring-0 shadow-xs transition-colors"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 p-1 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-200/70 transition-all cursor-pointer focus:outline-none"
                  title="Clear search"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </Navbar>
        </div>

        {/* Permanent Category & Dropdown Filter Bar (ALWAYS visible, NO OVERLAPPING) */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-2.5 bg-white border-t border-slate-100">
          <ListCategoryBar
            categories={categories}
            selectedCategory={selectedCategory}
            onSelectCategory={handleCategorySelect}
            locations={locations}
            selectedLocation={selectedLocation}
            selectedDistance={selectedDistance}
            selectedValidity={selectedValidity}
            validities={validities}
            onLocationChange={handleLocationSelect}
            onDistanceChange={handleDistanceSelect}
            onValidityChange={handleValiditySelect}
          />
        </div>
      </div>

      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 pt-4 pb-16">

        {/* Listings Grid */}
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
              No matching listings found
            </h3>
            <p className="text-sm text-slate-500 max-w-md mx-auto mb-6">
              Try resetting your category or location filters to view all available listings.
            </p>
            <button
              type="button"
              onClick={() => {
                setSelectedCategory("");
                setSelectedLocation("");
                setSelectedDistance(null);
                setSelectedValidity("");
                setSearchQuery("");
              }}
              className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-md transition-colors"
            >
              Reset All Filters
            </button>
          </div>
        )}
      </main>

      {toastMessage && (
        <div className="fixed bottom-20 right-6 z-50 flex items-center gap-2 px-4 py-3 rounded-2xl bg-slate-900 text-white text-xs sm:text-sm font-semibold shadow-xl border border-slate-800 animate-bounce">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
