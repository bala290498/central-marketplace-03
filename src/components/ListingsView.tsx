"use client";

import React, { useState, useMemo, useEffect, useCallback, useRef } from "react";
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
import { SearchModal } from "./SearchModal";
import { Footer } from "./Footer";
import { FilterBar } from "./FilterBar";
import { getOfferValidityCategory, normalizeValidity } from "@/lib/validity";
import { CheckCircle2, AlertCircle } from "lucide-react";

interface ListingsViewProps {
  initialOffers: Offer[];
}

export function ListingsView({ initialOffers }: ListingsViewProps) {
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get("category") || "";
  const validityParam = searchParams.get("validity") || "";
  const dealTypeParam = searchParams.get("dealType") || "";
  const searchParam = searchParams.get("search") || "";
  const idParam = searchParams.get("id") || "";

  const [offers] = useState<Offer[]>(initialOffers);
  const [userLocation, setUserLocation] = useState<UserLocation | null>(null);
  const [userAreaLabel, setUserAreaLabel] = useState<string>("");
  const [isLocating, setIsLocating] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState<boolean>(false);

  // Filter States
  const [selectedCategory, setSelectedCategory] = useState<string>(categoryParam);
  const [selectedLocation, setSelectedLocation] = useState<string>("");
  const [selectedDistance, setSelectedDistance] = useState<number | null>(null);
  const [selectedValidity, setSelectedValidity] = useState<string>(normalizeValidity(validityParam));
  const [selectedDealType, setSelectedDealType] = useState<string>(dealTypeParam);
  const [searchQuery, setSearchQuery] = useState<string>(searchParam);
  const [selectedId, setSelectedId] = useState<string>(idParam);

  useEffect(() => {
    if (categoryParam) {
      setSelectedCategory(categoryParam);
    }
  }, [categoryParam]);

  useEffect(() => {
    if (validityParam) {
      setSelectedValidity(normalizeValidity(validityParam));
    }
  }, [validityParam]);

  useEffect(() => {
    if (dealTypeParam) {
      setSelectedDealType(dealTypeParam);
    }
  }, [dealTypeParam]);

  useEffect(() => {
    setSearchQuery(searchParam);
  }, [searchParam]);

  useEffect(() => {
    if (idParam) {
      setSelectedId(idParam);
    }
  }, [idParam]);

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

  const dealTypes = useMemo(() => {
    const items = offers
      .map((o) => o.dealType || o.badge)
      .filter(Boolean) as string[];
    return Array.from(new Set(items)).sort();
  }, [offers]);

  const processedOffers = useMemo(() => {
    let list = offers.filter((offer) => {
      const areaOk =
        !selectedLocation ||
        offerArea(offer).toLowerCase() === selectedLocation.toLowerCase() ||
        (offer.location && offer.location.toLowerCase() === selectedLocation.toLowerCase());

      const catOk = !selectedCategory || offerCategory(offer) === selectedCategory;

      const offerValNorm = normalizeValidity(getOfferValidityCategory(offer)).toLowerCase();
      const selValNorm = normalizeValidity(selectedValidity).toLowerCase();
      const valText = (offer.validity || offer.ends || offer.expiry || "").toLowerCase().trim();
      const validityOk =
        !selectedValidity ||
        offerValNorm === selValNorm ||
        valText === selValNorm ||
        (selValNorm && valText.includes(selValNorm));

      const dtText = (offer.dealType || offer.badge || "").toLowerCase().trim();
      const selDtNorm = selectedDealType.toLowerCase().trim();
      const dealTypeOk =
        !selectedDealType ||
        dtText === selDtNorm ||
        (selDtNorm && dtText.includes(selDtNorm)) ||
        (selDtNorm && offer.title.toLowerCase().includes(selDtNorm));

      const searchLower = searchQuery.toLowerCase().trim();
      const searchOk =
        !searchLower ||
        offer.title.toLowerCase().includes(searchLower) ||
        (offer.description && offer.description.toLowerCase().includes(searchLower)) ||
        (offer.business && offer.business.toLowerCase().includes(searchLower)) ||
        (offer.location && offer.location.toLowerCase().includes(searchLower));

      return areaOk && catOk && validityOk && dealTypeOk && searchOk;
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

    if (selectedId) {
      const matchIndex = list.findIndex((o) => o.id === selectedId);
      if (matchIndex > 0) {
        const [targetCard] = list.splice(matchIndex, 1);
        list.unshift(targetCard);
      } else if (matchIndex === -1) {
        const fullMatch = offers.find((o) => o.id === selectedId);
        if (fullMatch) {
          list.unshift(fullMatch);
        }
      }
    }

    return list;
  }, [
    offers,
    selectedCategory,
    selectedLocation,
    selectedDistance,
    selectedValidity,
    selectedDealType,
    searchQuery,
    selectedId,
    userLocation,
  ]);

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

  const stickyHeaderRef = useRef<HTMLDivElement>(null);
  const mainContentRef = useRef<HTMLDivElement>(null);
  const cardsGridRef = useRef<HTMLDivElement>(null);

  const scrollToTopCard = useCallback(() => {
    if (typeof window === "undefined") return;
    // Do not scroll page on desktop views (width >= 1024px) to keep left sidebar completely static
    if (window.innerWidth >= 1024) return;

    if (document.activeElement && typeof (document.activeElement as HTMLElement).blur === "function") {
      (document.activeElement as HTMLElement).blur();
    }
    setTimeout(() => {
      window.requestAnimationFrame(() => {
        const headerEl = stickyHeaderRef.current;
        const headerHeight = headerEl ? headerEl.getBoundingClientRect().height : 140;
        const targetEl = cardsGridRef.current || mainContentRef.current;
        if (targetEl) {
          const targetTop = targetEl.getBoundingClientRect().top + window.scrollY;
          const targetScroll = Math.max(0, targetTop - headerHeight - 20);
          window.scrollTo({
            top: targetScroll,
            behavior: "smooth",
          });
        }
      });
    }, 120);
  }, []);

  const handleCategorySelect = (cat: string) => {
    setSelectedCategory(cat);
    setSearchQuery("");
    setSelectedId("");
    scrollToTopCard();
  };

  const handleLocationSelect = (loc: string) => {
    setSelectedLocation(loc);
    setSearchQuery("");
    setSelectedId("");
    scrollToTopCard();
  };

  const handleDistanceSelect = (dist: number | null) => {
    setSelectedDistance(dist);
    setSearchQuery("");
    setSelectedId("");
    scrollToTopCard();
  };

  const handleValiditySelect = (val: string) => {
    setSelectedValidity(val);
    setSearchQuery("");
    setSelectedId("");
    scrollToTopCard();
  };

  const handleDealTypeSelect = (dt: string) => {
    setSelectedDealType(dt);
    setSearchQuery("");
    setSelectedId("");
    scrollToTopCard();
  };

  const handleResetAll = () => {
    setSelectedCategory("");
    setSelectedLocation("");
    setSelectedDistance(null);
    setSelectedValidity("");
    setSelectedDealType("");
    setSearchQuery("");
    setSelectedId("");
    scrollToTopCard();
  };

  return (
    <div className="min-h-screen bg-slate-50/60 text-slate-900 flex flex-col">
      {/* Unified Top Sticky Container */}
      <div ref={stickyHeaderRef} className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs">
        <div className="relative z-50">
          <Navbar
            userLocation={userLocation}
            userAreaLabel={userAreaLabel}
            onDetectLocation={detectLocation}
            isLocating={isLocating}
            isSticky={false}
          />
        </div>

        {/* Category Filter Bar */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-2.5 bg-white border-t border-slate-100">
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
            onOpenSearch={() => setIsSearchModalOpen(true)}
          />
        </div>
      </div>

      <main ref={mainContentRef} className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 pt-5 pb-16 scroll-mt-36">
        <div className="flex flex-col lg:flex-row gap-6 items-start">
          {/* Desktop Left Side Bar (Filters) - 100% Static & Sticky with generous header clearance */}
          <aside className="w-full lg:w-72 flex-shrink-0 lg:sticky lg:top-[185px] hidden lg:block self-start z-30">
            <FilterBar
              selectedCategory={selectedCategory}
              onClearCategory={() => handleCategorySelect("")}
              locations={locations}
              selectedLocation={selectedLocation}
              onLocationChange={handleLocationSelect}
              dealTypes={dealTypes}
              selectedDealType={selectedDealType}
              onDealTypeChange={handleDealTypeSelect}
              validities={validities}
              selectedValidity={selectedValidity}
              onValidityChange={handleValiditySelect}
              selectedDistance={selectedDistance}
              onDistanceChange={handleDistanceSelect}
              searchQuery={searchQuery}
              onClearSearch={() => setSearchQuery("")}
              onResetAll={handleResetAll}
              userLocation={userLocation}
              onDetectLocation={detectLocation}
              isLocating={isLocating}
            />
          </aside>

          {/* Right Main Content Area: Listings Grid */}
          <div className="flex-1 min-w-0 w-full">
            {/* Active Filters Bar (shown on Mobile/Tablet < lg) */}
            {(selectedCategory || selectedLocation || selectedDistance !== null || selectedValidity || selectedDealType || searchQuery) && (
              <div className="flex lg:hidden flex-wrap items-center gap-2 mb-4 p-3 bg-white border border-slate-200/80 rounded-2xl shadow-2xs">
                <span className="text-xs font-bold text-slate-500 mr-1">Active filters:</span>
                {selectedCategory && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-orange-50 text-orange-600 border border-orange-200/70">
                    Category: {selectedCategory}
                    <button type="button" onClick={() => handleCategorySelect("")} className="hover:text-orange-800 ml-0.5 cursor-pointer font-extrabold">×</button>
                  </span>
                )}
                {selectedLocation && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-blue-50 text-blue-600 border border-blue-200/70">
                    Location: {selectedLocation}
                    <button type="button" onClick={() => handleLocationSelect("")} className="hover:text-blue-800 ml-0.5 cursor-pointer font-extrabold">×</button>
                  </span>
                )}
                {selectedDealType && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-amber-50 text-amber-700 border border-amber-200/70">
                    Post Type: {selectedDealType}
                    <button type="button" onClick={() => handleDealTypeSelect("")} className="hover:text-amber-900 ml-0.5 cursor-pointer font-extrabold">×</button>
                  </span>
                )}
                {selectedDistance !== null && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-600 border border-emerald-200/70">
                    Within {selectedDistance} km
                    <button type="button" onClick={() => handleDistanceSelect(null)} className="hover:text-emerald-800 ml-0.5 cursor-pointer font-extrabold">×</button>
                  </span>
                )}
                {selectedValidity && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-purple-50 text-purple-600 border border-purple-200/70">
                    Post Validity: {selectedValidity}
                    <button type="button" onClick={() => handleValiditySelect("")} className="hover:text-purple-800 ml-0.5 cursor-pointer font-extrabold">×</button>
                  </span>
                )}
                {searchQuery && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-slate-100 text-slate-700 border border-slate-300">
                    "{searchQuery}"
                    <button type="button" onClick={() => setSearchQuery("")} className="hover:text-slate-900 ml-0.5 cursor-pointer font-extrabold">×</button>
                  </span>
                )}
              </div>
            )}

            {/* Listings Grid: 2 Columns on Desktop */}
            {processedOffers.length > 0 ? (
              <div ref={cardsGridRef} className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
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
              <div className="bg-white rounded-2xl p-12 text-center border border-slate-200 my-4 shadow-xs">
                <div className="w-16 h-16 rounded-2xl bg-orange-50 text-orange-500 flex items-center justify-center mx-auto mb-4">
                  <AlertCircle className="w-8 h-8" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">
                  No matching listings found
                </h3>
                <p className="text-sm text-slate-500 max-w-md mx-auto mb-6">
                  Try resetting your category, location, or distance filters to view all available listings.
                </p>
                <button
                  type="button"
                  onClick={handleResetAll}
                  className="px-4 py-2 rounded-xl bg-orange-600 hover:bg-orange-700 text-white font-bold text-sm shadow-md transition-colors cursor-pointer"
                >
                  Reset All Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </main>

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

      {/* Desktop Footer (Hidden on mobile) */}
      <Footer />

      {/* Global Search Modal */}
      <SearchModal
        isOpen={isSearchModalOpen}
        onClose={() => setIsSearchModalOpen(false)}
        offers={offers}
        userLocation={userLocation}
      />
    </div>
  );
}
