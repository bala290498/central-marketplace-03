"use client";

import React, { useState, useEffect, useRef, useMemo } from "react";
import { createPortal } from "react-dom";
import { useRouter } from "next/navigation";
import { Offer, UserLocation } from "@/types/offer";
import { offerArea } from "@/lib/utils";
import { getCategoryIcon, getCategoryColors } from "@/lib/categories";
import {
  Search,
  X,
  MapPin,
  Sparkles,
  ArrowRight,
} from "lucide-react";

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  offers: Offer[];
  userLocation?: UserLocation | null;
  initialQuery?: string;
}

export function SearchModal({
  isOpen,
  onClose,
  offers,
  userLocation,
  initialQuery = "",
}: SearchModalProps) {
  const router = useRouter();
  const [query, setQuery] = useState(initialQuery);
  const [mounted, setMounted] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (isOpen) {
      setQuery(initialQuery);
      setTimeout(() => inputRef.current?.focus(), 100);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen, initialQuery]);

  // Handle ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  // Live filter findings
  const findings = useMemo(() => {
    const trimmed = query.trim().toLowerCase();
    if (!trimmed) return offers.slice(0, 8); // show recent/featured when empty

    return offers.filter((offer) => {
      const titleMatch = offer.title?.toLowerCase().includes(trimmed);
      const descMatch = offer.description?.toLowerCase().includes(trimmed);
      const businessMatch = offer.business?.toLowerCase().includes(trimmed);
      const categoryMatch = offer.category?.toLowerCase().includes(trimmed);
      const locationMatch = offer.location?.toLowerCase().includes(trimmed);
      const badgeMatch = offer.badge?.toLowerCase().includes(trimmed);

      return (
        titleMatch ||
        descMatch ||
        businessMatch ||
        categoryMatch ||
        locationMatch ||
        badgeMatch
      );
    });
  }, [offers, query]);

  if (!isOpen || !mounted) return null;

  const handleSelectFinding = (offer: Offer) => {
    onClose();
    if (offer.isSpotlight) {
      router.push("/spotlight");
    } else if (offer.id) {
      router.push(`/list?id=${encodeURIComponent(offer.id)}`);
    } else if (offer.category) {
      router.push(`/list?category=${encodeURIComponent(offer.category)}&search=${encodeURIComponent(offer.title)}`);
    } else {
      router.push(`/list?search=${encodeURIComponent(offer.title)}`);
    }
  };

  const handleViewAllResults = () => {
    onClose();
    if (query.trim()) {
      router.push(`/list?search=${encodeURIComponent(query.trim())}`);
    } else {
      router.push("/list");
    }
  };

  const popularTags = [
    "Food",
    "Grocery",
    "Electronics",
    "Salon & Spa",
    "Home Services",
    "Wholesale",
    "Property",
  ];

  return createPortal(
    <div className="fixed inset-0 z-[100] flex flex-col items-center justify-start bg-slate-900/60 backdrop-blur-md p-2 sm:p-4 animate-in fade-in duration-200">
      {/* Modal Container */}
      <div className="w-full max-w-2xl bg-white shadow-2xl rounded-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh] sm:max-h-[85vh] mt-2 sm:mt-8 animate-in zoom-in-95 duration-200">
        
        {/* Search Header Input */}
        <div className="p-3.5 sm:p-4 border-b border-slate-100 flex items-center gap-3 bg-slate-50/70">
          <Search className="w-5 h-5 text-orange-500 flex-shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search deals, shops, locations, categories, badges, services..."
            className="flex-1 bg-transparent text-sm sm:text-base font-semibold text-slate-900 outline-none placeholder:text-slate-400"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery("")}
              className="p-1 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-200/60 transition-colors cursor-pointer"
              title="Clear search"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            title="Close"
            className="p-2 rounded-full text-slate-500 hover:text-slate-900 hover:bg-slate-200/80 transition-colors flex-shrink-0 cursor-pointer"
          >
            <X className="w-5 h-5 stroke-[2.2]" />
          </button>
        </div>

        {/* Popular Category Tags Quick Access */}
        <div className="px-4 py-2.5 bg-slate-50 border-b border-slate-100 flex items-center gap-2 overflow-x-auto no-scrollbar">
          <span className="text-[11px] font-extrabold text-slate-400 uppercase tracking-wider whitespace-nowrap flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-amber-500" />
            Popular:
          </span>
          {popularTags.map((tag) => (
            <button
              key={tag}
              type="button"
              onClick={() => setQuery(tag)}
              className={`px-2.5 py-1 rounded-full text-xs font-extrabold transition-all whitespace-nowrap cursor-pointer ${
                query.toLowerCase() === tag.toLowerCase()
                  ? "bg-orange-500 text-white shadow-xs"
                  : "bg-white text-slate-700 border border-slate-200/80 hover:border-orange-300 hover:bg-orange-50/50"
              }`}
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Bottom Findings Header */}
        <div className="px-4 py-2 bg-slate-100/60 border-b border-slate-200/60 flex items-center justify-between">
          <span className="text-xs font-black text-slate-600 uppercase tracking-wider">
            {query.trim() ? `Search Findings (${findings.length})` : "Featured Listings"}
          </span>
          {query.trim() && findings.length > 0 && (
            <button
              type="button"
              onClick={handleViewAllResults}
              className="text-xs font-bold text-orange-600 hover:text-orange-700 flex items-center gap-1 cursor-pointer"
            >
              <span>View All Results</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Scrollable Findings List at Bottom */}
        <div className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-2.5 divide-y divide-slate-100">
          {findings.length > 0 ? (
            findings.map((offer) => {
              const CategoryIcon = getCategoryIcon(offer.category, offer.title);
              const categoryColors = getCategoryColors(offer.category);
              const areaName = offerArea(offer) || "Medavakkam";

              return (
                <div
                  key={offer.id}
                  onClick={() => handleSelectFinding(offer)}
                  className="pt-2.5 first:pt-0 group flex items-center justify-between gap-3 p-3 rounded-xl hover:bg-orange-50/40 border border-transparent hover:border-orange-100 transition-all cursor-pointer"
                >
                  <div className="flex items-start gap-3 min-w-0 flex-1">
                    <div
                      className={`w-9 h-9 rounded-lg ${categoryColors.iconBg} text-white flex items-center justify-center flex-shrink-0 shadow-2xs mt-0.5`}
                    >
                      <CategoryIcon className="w-4.5 h-4.5 stroke-[2.2]" />
                    </div>
                    <div className="flex flex-col min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-sm font-extrabold text-slate-900 truncate group-hover:text-orange-600 transition-colors">
                          {offer.title}
                        </span>
                        {offer.isSpotlight && (
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-amber-100 text-amber-800 border border-amber-300/60 flex items-center gap-1">
                            <Sparkles className="w-3 h-3 text-amber-600 fill-amber-500" />
                            Spotlight
                          </span>
                        )}
                        {!offer.isSpotlight && offer.badge && (
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-orange-100 text-orange-700">
                            {offer.badge}
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 mt-0.5 flex-wrap">
                        <span>{offer.business || offer.category}</span>
                        <span>•</span>
                        <span className="flex items-center gap-0.5 text-slate-600">
                          <MapPin className="w-3 h-3 text-red-500" />
                          {areaName}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-1 text-slate-400 group-hover:text-orange-600 transition-colors flex-shrink-0">
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              );
            })
          ) : (
            <div className="p-8 text-center">
              <p className="text-sm font-bold text-slate-700 mb-1">
                No matching listings found for &quot;{query}&quot;
              </p>
              <p className="text-xs text-slate-400">
                Try searching for broader terms like &quot;Food&quot;, &quot;Salon&quot;, &quot;Grocery&quot;, or &quot;Rent&quot;.
              </p>
            </div>
          )}
        </div>

        {/* Modal Bottom Bar */}
        <div className="p-3 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 font-semibold">
          <span>Click any finding to open details</span>
          <button
            type="button"
            onClick={handleViewAllResults}
            className="px-3 py-1.5 rounded-lg bg-orange-500 hover:bg-orange-600 text-white font-extrabold shadow-2xs transition-colors cursor-pointer"
          >
            Show All ({findings.length})
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}
