"use client";

import React from "react";
import {
  SlidersHorizontal,
  RotateCcw,
  MapPin,
  ChevronDown,
  Navigation,
  ArrowUpDown,
} from "lucide-react";
import { UserLocation } from "@/types/offer";

interface FilterBarProps {
  selectedCategory?: string;
  onClearCategory?: () => void;
  locations?: string[];
  selectedLocation?: string;
  onLocationChange?: (loc: string) => void;
  dealTypes?: string[];
  selectedDealType?: string;
  onDealTypeChange?: (dt: string) => void;
  validities?: string[];
  selectedValidity?: string;
  onValidityChange?: (val: string) => void;
  selectedDistance?: number | null;
  onDistanceChange?: (dist: number | null) => void;
  sortBy?: string;
  onSortChange?: (sort: string) => void;
  searchQuery?: string;
  onClearSearch?: () => void;
  onResetAll?: () => void;
  userLocation?: UserLocation | null;
  onDetectLocation?: () => void;
  isLocating?: boolean;
}

const DISTANCE_POINTS = [5, 10, 15, 20];

export function FilterBar({
  selectedCategory = "",
  onClearCategory = () => {},
  locations = [],
  selectedLocation = "",
  onLocationChange = () => {},
  selectedDistance = null,
  onDistanceChange = () => {},
  sortBy = "",
  onSortChange = () => {},
  searchQuery = "",
  onClearSearch = () => {},
  onResetAll = () => {},
  userLocation,
  onDetectLocation,
  isLocating = false,
}: FilterBarProps) {
  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Number(e.target.value);
    onDistanceChange?.(val);
    if (!userLocation && onDetectLocation) {
      onDetectLocation();
    }
  };

  const handlePointClick = (pt: number) => {
    onDistanceChange?.(pt);
    if (!userLocation && onDetectLocation) {
      onDetectLocation();
    }
  };

  const hasActiveFilters =
    Boolean(selectedCategory) ||
    Boolean(selectedLocation) ||
    selectedDistance !== null ||
    Boolean(searchQuery);

  return (
    <div className="bg-white border border-slate-200 rounded-none p-4 sm:p-5 shadow-xs font-sans space-y-4">
      {/* Row 1: Filters Header with Icon & Reset All in Right Corner */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="w-4 sm:w-5 h-4 sm:h-5 text-orange-500 flex-shrink-0" />
          <h2 className="text-sm sm:text-base font-extrabold text-slate-900 tracking-tight">
            Filters
          </h2>
        </div>
        <button
          type="button"
          onClick={() => onResetAll?.()}
          className="text-xs font-bold text-slate-500 hover:text-orange-600 transition-colors cursor-pointer flex items-center gap-1.5 group"
        >
          <RotateCcw className="w-3.5 h-3.5 text-slate-400 group-hover:text-orange-600 group-hover:rotate-[-45deg] transition-all" />
          <span>Reset All</span>
        </button>
      </div>

      {/* Row 2: Active Filters */}
      {hasActiveFilters && (
        <div className="py-2.5 px-3 bg-slate-50 border border-slate-200/90 rounded-xl space-y-2">
          <div className="text-[11px] font-bold text-slate-500">
            <span>Active Filters</span>
          </div>
          <div className="flex flex-wrap items-center gap-1.5">
            {selectedCategory && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-bold bg-orange-100 text-orange-700 border border-orange-200">
                Cat: {selectedCategory}
                <button
                  type="button"
                  onClick={onClearCategory}
                  className="hover:text-orange-950 ml-0.5 cursor-pointer font-extrabold"
                >
                  ×
                </button>
              </span>
            )}
            {selectedLocation && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-bold bg-blue-100 text-blue-700 border border-blue-200">
                Loc: {selectedLocation}
                <button
                  type="button"
                  onClick={() => onLocationChange?.("")}
                  className="hover:text-blue-950 ml-0.5 cursor-pointer font-extrabold"
                >
                  ×
                </button>
              </span>
            )}
            {selectedDistance !== null && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-bold bg-emerald-100 text-emerald-700 border border-emerald-200">
                {selectedDistance} km
                <button
                  type="button"
                  onClick={() => onDistanceChange?.(null)}
                  className="hover:text-emerald-950 ml-0.5 cursor-pointer font-extrabold"
                >
                  ×
                </button>
              </span>
            )}
            {searchQuery && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-bold bg-slate-200 text-slate-700 border border-slate-300">
                "{searchQuery}"
                <button
                  type="button"
                  onClick={onClearSearch}
                  className="hover:text-slate-900 ml-0.5 cursor-pointer font-extrabold"
                >
                  ×
                </button>
              </span>
            )}
          </div>
        </div>
      )}

      {/* Row 3: Sliding Bar (4 points: 5, 10, 15, 20) with Text Indicator */}
      <div className="space-y-2 py-1 border-b border-slate-100">
        <div className="flex items-center justify-between text-xs">
          <span className="font-bold text-slate-700">Distance Radius</span>
          <span className="font-extrabold text-orange-600 bg-orange-50 px-2 py-0.5 rounded-full text-[11px] border border-orange-200/60">
            {selectedDistance !== null ? `Within ${selectedDistance} km` : "Any Distance"}
          </span>
        </div>

        <div className="relative pt-2 pb-1">
          <input
            type="range"
            min="5"
            max="20"
            step="5"
            value={selectedDistance ?? 20}
            onChange={handleSliderChange}
            className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-orange-500 focus:outline-none"
          />
          {/* 4 Points Labels: 5, 10, 15, 20 */}
          <div className="flex justify-between items-center text-[11px] font-bold pt-2 px-0.5">
            {DISTANCE_POINTS.map((pt) => {
              const isActive = selectedDistance === pt;
              return (
                <button
                  key={pt}
                  type="button"
                  onClick={() => handlePointClick(pt)}
                  className={`transition-all cursor-pointer hover:text-orange-600 ${
                    isActive
                      ? "text-orange-600 font-extrabold scale-110"
                      : "text-slate-500 font-semibold"
                  }`}
                >
                  {pt} km
                </button>
              );
            })}
          </div>
        </div>

        {!userLocation && onDetectLocation && (
          <div className="flex items-center justify-between gap-2 mt-1 text-[11px] text-slate-500 bg-slate-50 p-2 rounded-xl border border-slate-200/60">
            <span className="truncate">Enable GPS for exact distance filter</span>
            <button
              type="button"
              onClick={onDetectLocation}
              disabled={isLocating}
              className="text-orange-600 font-bold hover:underline flex items-center gap-1 flex-shrink-0 cursor-pointer"
            >
              <Navigation className="w-3 h-3" />
              <span>{isLocating ? "Locating..." : "Detect"}</span>
            </button>
          </div>
        )}
      </div>

      {/* Row 4: Location Dropdown */}
      <div className="space-y-1.5 py-1 border-b border-slate-100">
        <label className="block text-xs font-bold text-slate-700">Location</label>
        <div className="relative flex items-center">
          <MapPin className="absolute left-3 w-4 h-4 text-slate-400 pointer-events-none" />
          <select
            value={selectedLocation}
            onChange={(e) => onLocationChange?.(e.target.value)}
            className="w-full pl-9 pr-8 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-900 text-xs font-bold appearance-none outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 shadow-2xs cursor-pointer transition-all"
          >
            <option value="">All locations</option>
            {locations.map((loc) => (
              <option key={loc} value={loc}>
                {loc}
              </option>
            ))}
          </select>
          <ChevronDown className="absolute right-3 w-4 h-4 text-slate-400 pointer-events-none" />
        </div>
      </div>

      {/* Row 5: Sort By Dropdown */}
      <div className="space-y-1.5 pt-1">
        <label className="block text-xs font-bold text-slate-700">Sort By</label>
        <div className="relative flex items-center">
          <ArrowUpDown className="absolute left-3 w-4 h-4 text-slate-400 pointer-events-none" />
          <select
            value={sortBy}
            onChange={(e) => onSortChange?.(e.target.value)}
            className="w-full pl-9 pr-8 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-900 text-xs font-bold appearance-none outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 shadow-2xs cursor-pointer transition-all"
          >
            <option value="">Default Order</option>
            <option value="newer">Newer First</option>
            <option value="older">Older First</option>
            <option value="mustTry">Must Try</option>
          </select>
          <ChevronDown className="absolute right-3 w-4 h-4 text-slate-400 pointer-events-none" />
        </div>
      </div>
    </div>
  );
}

