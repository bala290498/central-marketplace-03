"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Offer, UserLocation } from "@/types/offer";
import { lookupUserArea } from "@/lib/utils";
import { Navbar } from "./Navbar";
import { MobileCategoryGrid } from "./MobileCategoryGrid";
import { LatestListingsCarousel } from "./LatestListingsCarousel";
import { ValidityCategoryBar } from "./ValidityCategoryBar";
import { ValiditySections } from "./ValiditySections";
import { CheckCircle2 } from "lucide-react";

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
        {/* 1. Business Categories Grid */}
        <div className="mb-4">
          <MobileCategoryGrid
            selectedCategory={selectedCategory}
            onSelectCategory={(cat) => {
              setSelectedCategory(cat);
              router.push(`/list?category=${encodeURIComponent(cat)}`);
            }}
          />
        </div>

        {/* 2. Latest Listings Horizontal Carousel */}
        <LatestListingsCarousel
          offers={offers}
          userLocation={userLocation}
          onSeeAll={handleSeeAll}
        />

        {/* 3. Validity Headings Categories Filter Bar */}
        <ValidityCategoryBar
          offers={offers}
          selectedValidity={selectedValidity}
          onSelectValidity={(key) => setSelectedValidity(key)}
        />

        {/* 4. Validity Headings Sections / Grid */}
        <ValiditySections
          offers={offers}
          userLocation={userLocation}
          selectedValidity={selectedValidity}
          onShare={handleShare}
          onSeeAllValidity={(key) => setSelectedValidity(key)}
        />
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
