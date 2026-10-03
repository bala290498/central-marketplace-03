"use client";

import React from "react";
import {
  SlidersHorizontal,
  RotateCcw,
  MapPin,
  ChevronDown,
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

export function FilterBar({
  locations = [],
  selectedLocation = "",
  onLocationChange = () => {},
  sortBy = "",
  onSortChange = () => {},
  onResetAll = () => {},
}: FilterBarProps) {
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

      {/* Row 2: Location Dropdown */}
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

      {/* Row 3: Sort By Dropdown */}
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
