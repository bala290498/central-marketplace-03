"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Offer, UserLocation } from "@/types/offer";
import { lookupUserArea, distanceKm } from "@/lib/utils";
import { Navbar } from "./Navbar";
import { MobileCategoryGrid } from "./MobileCategoryGrid";
import { LatestListingsCarousel } from "./LatestListingsCarousel";
import { HomeFeatureSections } from "./HomeFeatureSections";

import { Footer } from "./Footer";
import { CheckCircle2, AlertCircle } from "lucide-react";

interface OfferGridProps {
  initialOffers: Offer[];
}

export function OfferGrid({ initialOffers }: OfferGridProps) {
  const router = useRouter();
  const [offers] = useState<Offer[]>(initialOffers);
  const [userLocation, setUserLocation] = useState<UserLocation | null>(null);
  const [userAreaLabel, setUserAreaLabel] = useState<string>("");
  const [isLocating, setIsLocating] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Filter States
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [selectedValidity, setSelectedValidity] = useState<string>("all");

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Trigger geolocation detection with fallback
  const detectLocation = useCallback(() => {
    if (typeof window === "undefined" || !navigator.geolocation) {
      triggerToast("Geolocation is not supported by your browser");
      return;
    }

    setIsLocating(true);

    const handleSuccess = async (position: GeolocationPosition) => {
      const coords = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      };
      setUserLocation(coords);
      setIsLocating(false);

      const areaLabel = await lookupUserArea(coords.latitude, coords.longitude);
      if (areaLabel) {
        setUserAreaLabel(areaLabel);
      }
    };

    const handleError = () => {
      // Retry with enableHighAccuracy: false if high accuracy fails
      navigator.geolocation.getCurrentPosition(
        handleSuccess,
        () => {
          setIsLocating(false);
          triggerToast("Could not detect location. Showing all deals.");
        },
        { enableHighAccuracy: false, timeout: 10000, maximumAge: 300000 }
      );
    };

    navigator.geolocation.getCurrentPosition(
      handleSuccess,
      handleError,
      { enableHighAccuracy: true, timeout: 6000, maximumAge: 60000 }
    );
  }, []);

  // Auto-detect location on load
  useEffect(() => {
    detectLocation();
  }, [detectLocation]);

  const handleSeeAll = () => {
    if (selectedCategory) {
      router.push(`/list?category=${encodeURIComponent(selectedCategory)}`);
    } else {
      router.push("/list");
    }
  };

  const handleShare = (offer: Offer) => {
    if (typeof window !== "undefined" && navigator.share) {
      navigator
        .share({
          title: offer.title,
          text: `${offer.title} at ${offer.business || offer.location || "Central Marketplace"}`,
          url: window.location.href,
        })
        .catch(() => {});
    } else if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      triggerToast("Link copied to clipboard!");
    }
  };

  // Compute dynamic categories list from offers
  const categories = React.useMemo(() => {
    return Array.from(
      new Set(offers.map((o) => o.category).filter(Boolean))
    ).sort() as string[];
  }, [offers]);

  // Compute distance for all offers when userLocation exists
  const offersWithDistance = React.useMemo(() => {
    if (!userLocation) return offers;
    return offers.map((offer) => ({
      ...offer,
      distance: distanceKm(
        userLocation.latitude,
        userLocation.longitude,
        Number(offer.latitude),
        Number(offer.longitude)
      ),
    }));
  }, [offers, userLocation]);

  return (
    <div className="min-h-screen bg-slate-50/60 text-slate-900 flex flex-col justify-between">
      {/* Sticky Header */}
      <Navbar
        userLocation={userLocation}
        userAreaLabel={userAreaLabel}
        onDetectLocation={detectLocation}
        isLocating={isLocating}
      />

      {/* Main Deals Container */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 pt-3 sm:pt-4 pb-2 sm:pb-6">
        {/* 1. Business Categories Grid */}
        <div className="mb-4">
          <MobileCategoryGrid
            categories={categories}
            selectedCategory={selectedCategory}
            offers={offersWithDistance}
            userLocation={userLocation}
            onSelectCategory={(cat) => {
              setSelectedCategory(cat);
              router.push(`/list?category=${encodeURIComponent(cat)}`);
            }}
          />
        </div>

        {/* 2. Latest Listings Horizontal Carousel */}
        <LatestListingsCarousel
          offers={offersWithDistance}
          userLocation={userLocation}
          onSeeAll={handleSeeAll}
        />

        {/* 3. Informational Feature Carousels */}
        <HomeFeatureSections />
      </main>

      {/* Footer (Desktop & Mobile) */}
      <Footer />

      {/* Floating Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-20 right-6 z-50 flex items-center gap-2 px-4 py-3 rounded-2xl bg-slate-900 text-white text-xs sm:text-sm font-semibold shadow-xl border border-slate-800 animate-in fade-in duration-200">
          {toastMessage.toLowerCase().includes("could not") ||
          toastMessage.toLowerCase().includes("failed") ||
          toastMessage.toLowerCase().includes("not supported") ? (
            <AlertCircle className="w-4 h-4 text-amber-400 flex-shrink-0" />
          ) : (
            <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
          )}
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
