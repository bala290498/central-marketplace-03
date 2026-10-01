"use client";

import React, { useState, useEffect, useRef, useMemo } from "react";
import { useRouter } from "next/navigation";
import { Offer, UserLocation } from "@/types/offer";
import { offerArea, distanceLabel, directionsUrl } from "@/lib/utils";
import { getCategoryIcon, getCategoryColors } from "@/lib/categories";
import {
  Search,
  X,
  MapPin,
  Phone,
  Map,
  Share2,
  Sparkles,
  ArrowRight,
  SlidersHorizontal,
} from "lucide-react";

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  offers: Offer[];
  userLocation?: UserLocation | null;
  initialQuery?: string;
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

export function SearchModal({
  isOpen,
  onClose,
  offers,
  userLocation,
  initialQuery = "",
}: SearchModalProps) {
  const router = useRouter();
  const [query, setQuery] = useState(initialQuery);
  const inputRef = useRef<HTMLInputElement>(null);

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

  if (!isOpen) return null;

  const handleSelectFinding = (offer: Offer) => {
    onClose();
    if (offer.category) {
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

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-start bg-slate-900/60 backdrop-blur-md p-2 sm:p-4 animate-in fade-in duration-200">
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
            placeholder="Search deals, stores, categories, services..."
            className="flex-1 bg-transparent text-sm sm:text-base font-semibold text-slate-900 outline-none placeholder:text-slate-400"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery("")}
              className="p-1 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-200/60 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            type="button"
            onClick={onClose}
            className="px-2.5 py-1 rounded-lg text-xs font-extrabold text-slate-600 hover:text-slate-900 hover:bg-slate-200/80 transition-colors border border-slate-200/80"
          >
            Esc / Close
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
              const cleanPhone = offer.phone ? offer.phone.replace(/\s+/g, "") : "";
              const rawWhatsapp = offer.whatsapp || offer.phone || "";
              const cleanWhatsapp = rawWhatsapp.replace(/\D/g, "");
              const whatsappUrl = cleanWhatsapp ? `https://wa.me/${cleanWhatsapp}` : null;
              const mapLink = directionsUrl(userLocation || null, offer);

              return (
                <div
                  key={offer.id}
                  onClick={() => handleSelectFinding(offer)}
                  className="pt-2.5 first:pt-0 group flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3 rounded-xl hover:bg-orange-50/40 border border-transparent hover:border-orange-100 transition-all cursor-pointer"
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
                        {offer.badge && (
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

                  {/* Quick Action Icons */}
                  <div className="flex items-center gap-1.5 self-end sm:self-center flex-shrink-0" onClick={(e) => e.stopPropagation()}>
                    {cleanPhone && (
                      <a
                        href={`tel:${cleanPhone}`}
                        title="Call"
                        className="w-8 h-8 rounded-lg bg-emerald-100 hover:bg-emerald-200 text-emerald-700 flex items-center justify-center transition-colors"
                      >
                        <Phone className="w-4 h-4 fill-current" />
                      </a>
                    )}
                    {whatsappUrl && (
                      <a
                        href={whatsappUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        title="WhatsApp"
                        className="w-8 h-8 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-600 flex items-center justify-center transition-colors"
                      >
                        <WhatsAppIcon className="w-4 h-4" />
                      </a>
                    )}
                    {mapLink && (
                      <a
                        href={mapLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        title="Map"
                        className="w-8 h-8 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-600 flex items-center justify-center transition-colors"
                      >
                        <Map className="w-4 h-4" />
                      </a>
                    )}
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
    </div>
  );
}
