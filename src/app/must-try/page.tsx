"use client";

import React, { useState, useMemo, useRef, useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import { Star, Search, Sparkles, Tag, ChevronDown, CheckCircle2, HelpCircle } from "lucide-react";
import { getOffers, getSpotlightOffers } from "@/lib/offers";

interface SearchableItem {
  id: string;
  title: string;
  business: string;
  location: string;
  description: string;
  type: "Spotlight" | "Listing";
}

const RATING_LABELS: Record<number, string> = {
  1: "1 Star - Poor",
  2: "2 Stars - Fair",
  3: "3 Stars - Good",
  4: "4 Stars - Very Good",
  5: "5 Stars - Must Try!",
};

export default function MustTryPage() {
  const [listingId, setListingId] = useState<string>("");
  const [isTrueOption, setIsTrueOption] = useState<string>("Yes, 100% True");
  const [rating, setRating] = useState<number>(5);
  const [hoverRating, setHoverRating] = useState<number>(0);
  const [details, setDetails] = useState<string>("");
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);

  const dropdownRef = useRef<HTMLDivElement>(null);

  // Combined searchable items (Spotlight + Regular Listings)
  const searchableItems = useMemo<SearchableItem[]>(() => {
    const listOffers: SearchableItem[] = getOffers().map((o) => ({
      id: o.id,
      title: o.title,
      business: o.business || o.store || o.merchant || "",
      location: o.location || o.area || "",
      description: o.description || "",
      type: "Listing",
    }));
    const spotlightOffers: SearchableItem[] = getSpotlightOffers().map((o) => ({
      id: o.id,
      title: o.title,
      business: o.business || o.store || o.merchant || "",
      location: o.location || o.area || "",
      description: o.description || "",
      type: "Spotlight",
    }));

    const map = new Map<string, SearchableItem>();
    spotlightOffers.forEach((item) => map.set(item.id, item));
    listOffers.forEach((item) => {
      if (!map.has(item.id)) map.set(item.id, item);
    });

    return Array.from(map.values());
  }, []);

  const selectedItem = useMemo(() => {
    if (!listingId.trim()) return null;
    return (
      searchableItems.find(
        (item) => item.title.toLowerCase().trim() === listingId.toLowerCase().trim()
      ) || null
    );
  }, [searchableItems, listingId]);

  const filteredItems = useMemo(() => {
    if (!listingId.trim()) return searchableItems;
    const q = listingId.toLowerCase().trim();
    return searchableItems.filter(
      (item) =>
        item.title.toLowerCase().includes(q) ||
        item.business.toLowerCase().includes(q) ||
        item.location.toLowerCase().includes(q)
    );
  }, [searchableItems, listingId]);

  // Click outside listener to close dropdown
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  const activeRating = hoverRating || rating;

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col">
      <Navbar />

      <main className="flex-1 max-w-2xl w-full mx-auto px-4 sm:px-6 py-8 sm:py-12">
        {/* Page Title Header */}
        <div className="text-center mb-8">
          <div className="w-14 h-14 rounded-2xl bg-amber-100 text-amber-600 flex items-center justify-center mx-auto mb-3 shadow-xs">
            <Star className="w-7 h-7 fill-amber-500 text-amber-500" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Must Try
          </h1>
          <p className="text-sm sm:text-base text-slate-500 max-w-lg mx-auto mt-2 leading-relaxed">
            Rate your favorite listings and help the community discover top-recommended picks.
          </p>
        </div>

        {/* Direct Page Form Content */}
        {isSubmitted ? (
          <div className="py-10 text-left space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shadow-xs">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h2 className="font-extrabold text-slate-900 text-xl sm:text-2xl">Rating Submitted</h2>
            <p className="text-sm text-slate-600 max-w-sm leading-relaxed">
              Thank you for sharing your rating! Your feedback helps highlight the best listings on Central Marketplace.
            </p>
            <div className="pt-4">
              <button
                type="button"
                onClick={() => {
                  setIsSubmitted(false);
                  setListingId("");
                  setIsTrueOption("Yes, 100% True");
                  setRating(5);
                  setDetails("");
                }}
                className="px-6 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs shadow-md transition-colors cursor-pointer"
              >
                Submit Another Rating
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Searchable Listing Title Combobox */}
            <div className="relative" ref={dropdownRef}>
              <label className="block text-xs sm:text-sm font-bold text-slate-900 mb-1.5">
                Listing Title <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Search className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  required
                  value={listingId}
                  onFocus={() => setIsDropdownOpen(true)}
                  onChange={(e) => {
                    setListingId(e.target.value);
                    setIsDropdownOpen(true);
                  }}
                  placeholder="Type or search listing title..."
                  className="w-full pl-10 pr-10 py-3 rounded-2xl border border-slate-200 bg-white text-xs sm:text-sm font-medium focus:outline-none focus:ring-2 focus:ring-orange-500 shadow-2xs"
                />
                <button
                  type="button"
                  onClick={() => setIsDropdownOpen((prev) => !prev)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600 cursor-pointer"
                >
                  <ChevronDown className={`w-4 h-4 transition-transform ${isDropdownOpen ? "rotate-180" : ""}`} />
                </button>
              </div>

              {/* Search Dropdown Popup */}
              {isDropdownOpen && (
                <div className="absolute z-30 left-0 right-0 mt-2 bg-white rounded-2xl border border-slate-200 shadow-xl max-h-64 overflow-y-auto divide-y divide-slate-100">
                  {filteredItems.length > 0 ? (
                    filteredItems.map((item) => (
                      <button
                        key={`${item.type}-${item.id}`}
                        type="button"
                        onClick={() => {
                          setListingId(item.title);
                          setIsDropdownOpen(false);
                        }}
                        className="w-full px-4 py-3 text-left hover:bg-slate-50 transition-colors flex items-center justify-between gap-3 group cursor-pointer"
                      >
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-2">
                            <span className="font-extrabold text-xs sm:text-sm text-slate-900 truncate">
                              {item.title}
                            </span>
                          </div>
                          {(item.business || item.location) && (
                            <div className="text-[11px] text-slate-500 flex items-center gap-2 mt-0.5">
                              {item.business && <span>{item.business}</span>}
                              {item.location && <span>({item.location})</span>}
                            </div>
                          )}
                        </div>
                        <span
                          className={`text-[10px] font-extrabold px-2 py-0.5 rounded-md flex-shrink-0 flex items-center gap-1 ${
                            item.type === "Spotlight"
                              ? "bg-amber-100 text-amber-800 border border-amber-200"
                              : "bg-orange-100 text-orange-800 border border-orange-200"
                          }`}
                        >
                          {item.type === "Spotlight" ? <Sparkles className="w-3 h-3 text-amber-600" /> : <Tag className="w-3 h-3 text-orange-600" />}
                          {item.type}
                        </span>
                      </button>
                    ))
                  ) : (
                    <div className="p-4 text-xs text-slate-500 text-center">
                      No matching listing found. You can continue typing custom input.
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Verification Field (Appears once listing title is entered/selected) */}
            {listingId.trim() !== "" && (
              <div className="bg-orange-50/80 border border-orange-200 rounded-2xl p-4 sm:p-5 space-y-3.5 animate-in fade-in duration-200">
                <div className="flex items-start gap-2.5">
                  <HelpCircle className="w-5 h-5 text-orange-600 flex-shrink-0 mt-0.5" />
                  <div className="space-y-1.5 min-w-0 flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-[10px] font-black uppercase tracking-wider text-orange-700 bg-orange-100/90 px-2 py-0.5 rounded-md border border-orange-200/80">
                        Selected Listing
                      </span>
                      {selectedItem?.business && (
                        <span className="text-xs font-extrabold text-slate-700">
                          {selectedItem.business}
                        </span>
                      )}
                    </div>
                    <h3 className="text-sm sm:text-base font-extrabold text-slate-900 leading-snug">
                      {selectedItem?.title || listingId}
                    </h3>
                    {selectedItem?.description && (
                      <p className="text-xs text-slate-600 leading-relaxed bg-white/80 p-2.5 rounded-xl border border-orange-200/60">
                        {selectedItem.description}
                      </p>
                    )}
                    <p className="text-xs sm:text-sm font-extrabold text-slate-900 pt-1">
                      Is this offer / claim true as described? <span className="text-red-500">*</span>
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-2 pt-1">
                  {["Yes, 100% True", "Partially True", "No, False / Invalid"].map((opt) => (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => setIsTrueOption(opt)}
                      className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
                        isTrueOption === opt
                          ? "bg-orange-500 text-white border-orange-500 shadow-xs"
                          : "bg-white text-slate-700 border-slate-200 hover:border-orange-300 hover:bg-orange-50/50"
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Rating Stars Selection */}
            <div>
              <label className="block text-xs sm:text-sm font-bold text-slate-900 mb-2">
                Your Rating <span className="text-red-500">*</span>
              </label>
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1 bg-white p-2.5 rounded-2xl border border-slate-200 shadow-2xs">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      onMouseEnter={() => setHoverRating(star)}
                      onMouseLeave={() => setHoverRating(0)}
                      className="p-1 focus:outline-none cursor-pointer transition-transform hover:scale-115"
                    >
                      <Star
                        className={`w-7 h-7 sm:w-8 sm:h-8 transition-colors ${
                          star <= activeRating
                            ? "text-amber-400 fill-amber-400"
                            : "text-slate-200 fill-slate-100"
                        }`}
                      />
                    </button>
                  ))}
                </div>
                <span className="text-xs sm:text-sm font-extrabold text-amber-600 ml-2">
                  {RATING_LABELS[activeRating] || `${activeRating} Stars`}
                </span>
              </div>
            </div>

            {/* Additional Details */}
            <div>
              <label className="block text-xs sm:text-sm font-bold text-slate-900 mb-1.5">
                Additional Details <span className="text-red-500">*</span>
              </label>
              <textarea
                required
                rows={4}
                value={details}
                onChange={(e) => setDetails(e.target.value)}
                placeholder="Share your experience or why this listing is a must try..."
                className="w-full px-4 py-3 rounded-2xl border border-slate-200 bg-white text-xs sm:text-sm font-medium focus:outline-none focus:ring-2 focus:ring-orange-500 resize-none shadow-2xs"
              />
            </div>

            {/* Submit Button */}
            <div className="text-center pt-2">
              <button
                type="submit"
                className="w-auto px-8 sm:px-10 py-3 sm:py-3.5 rounded-2xl bg-orange-500 hover:bg-orange-600 text-white font-extrabold text-sm sm:text-base transition-colors cursor-pointer inline-flex items-center justify-center gap-2"
              >
                Submit Rating
              </button>
            </div>
          </form>
        )}
      </main>
    </div>
  );
}
