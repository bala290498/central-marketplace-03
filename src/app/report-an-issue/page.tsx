"use client";

import React, { useState, useMemo, useRef, useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ShieldAlert, AlertOctagon, CheckCircle2, Search, Sparkles, Tag, ChevronDown } from "lucide-react";
import { getOffers, getSpotlightOffers } from "@/lib/offers";

interface SearchableItem {
  id: string;
  title: string;
  business: string;
  location: string;
  type: "Spotlight" | "Listing";
}

export default function ReportPage() {
  const [reason, setReason] = useState<string>("Fake or fraudulent listing");
  const [listingId, setListingId] = useState<string>("");
  const [details, setDetails] = useState<string>("");
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);

  const dropdownRef = useRef<HTMLDivElement>(null);

  const reasons = [
    "Fake or fraudulent listing",
    "Inappropriate content",
    "Wrong category",
    "Spam or repeated listing",
    "Already sold / not available",
    "Other",
  ];

  // Combined searchable items (Spotlight + Regular Listings)
  const searchableItems = useMemo<SearchableItem[]>(() => {
    const listOffers: SearchableItem[] = getOffers().map((o) => ({
      id: o.id,
      title: o.title,
      business: o.business || o.store || o.merchant || "",
      location: o.location || o.area || "",
      type: "Listing",
    }));
    const spotlightOffers: SearchableItem[] = getSpotlightOffers().map((o) => ({
      id: o.id,
      title: o.title,
      business: o.business || o.store || o.merchant || "",
      location: o.location || o.area || "",
      type: "Spotlight",
    }));

    const map = new Map<string, SearchableItem>();
    spotlightOffers.forEach((item) => map.set(item.id, item));
    listOffers.forEach((item) => {
      if (!map.has(item.id)) map.set(item.id, item);
    });

    return Array.from(map.values());
  }, []);

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

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col">
      <Navbar />

      <main className="flex-1 max-w-2xl w-full mx-auto px-4 sm:px-6 py-8 sm:py-12">
        {/* Page Title Header */}
        <div className="text-center mb-8">
          <div className="w-14 h-14 rounded-2xl bg-red-100 text-red-600 flex items-center justify-center mx-auto mb-3 shadow-xs">
            <ShieldAlert className="w-7 h-7" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Report an Issue
          </h1>
          <p className="text-sm sm:text-base text-slate-500 max-w-lg mx-auto mt-2 leading-relaxed">
            Report inappropriate, fake, or misleading listings so our team can review and take action.
          </p>
        </div>

        {/* Direct Page Form Content (No Container Card) */}
        {isSubmitted ? (
          <div className="py-10 text-left space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shadow-xs">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h2 className="font-extrabold text-slate-900 text-xl sm:text-2xl">Report Submitted</h2>
            <p className="text-sm text-slate-600 max-w-sm leading-relaxed">
              Thank you for notifying us. Our safety team will review this report and take appropriate action immediately.
            </p>
            <div className="pt-4">
              <button
                type="button"
                onClick={() => {
                  setIsSubmitted(false);
                  setListingId("");
                  setDetails("");
                }}
                className="px-6 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs shadow-md transition-colors cursor-pointer"
              >
                Submit Another Report
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

            {/* Select Reason Dropdown */}
            <div>
              <label className="block text-xs sm:text-sm font-bold text-slate-900 mb-1.5">
                Select Reason <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <select
                  required
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  className="w-full px-4 py-3 rounded-2xl border border-slate-200 bg-white text-xs sm:text-sm font-semibold text-slate-900 outline-none focus:ring-2 focus:ring-orange-500 shadow-2xs appearance-none cursor-pointer pr-10"
                >
                  {reasons.map((r) => (
                    <option key={r} value={r}>
                      {r}
                    </option>
                  ))}
                </select>
                <div className="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none text-slate-400">
                  <ChevronDown className="w-4 h-4" />
                </div>
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
                placeholder="Please provide more information..."
                className="w-full px-4 py-3 rounded-2xl border border-slate-200 bg-white text-xs sm:text-sm font-medium focus:outline-none focus:ring-2 focus:ring-orange-500 resize-none shadow-2xs"
              />
            </div>

            {/* Submit Button (Centered, No Glowing Shadow) */}
            <div className="text-center pt-2">
              <button
                type="submit"
                className="w-auto px-8 sm:px-10 py-3 sm:py-3.5 rounded-2xl bg-orange-500 hover:bg-orange-600 text-white font-extrabold text-sm sm:text-base transition-colors cursor-pointer inline-flex items-center justify-center gap-2"
              >
                Submit Report
              </button>
            </div>
          </form>
        )}
      </main>

      <Footer />
    </div>
  );
}


