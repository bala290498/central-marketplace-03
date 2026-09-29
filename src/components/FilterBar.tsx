"use client";

import React from "react";
import { MapPin, Navigation, Search } from "lucide-react";

interface FilterBarProps {
  locations: string[];
  selectedLocation: string;
  selectedDistance: number | null;
  searchQuery: string;
  onLocationChange: (loc: string) => void;
  onDistanceChange: (dist: number | null) => void;
  onSearchChange: (query: string) => void;
  hasUserLocation: boolean;
}

export function FilterBar({
  locations,
  selectedLocation,
  selectedDistance,
  searchQuery,
  onLocationChange,
  onDistanceChange,
  onSearchChange,
  hasUserLocation,
}: FilterBarProps) {
  return (
    <div className="w-full grid grid-cols-1 sm:grid-cols-3 gap-2.5 py-3">
      {/* Search Input */}
      <div className="relative flex items-center">
        <Search className="absolute left-3.5 w-4 h-4 text-slate-400 pointer-events-none" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search offers or shops..."
          className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-xs sm:text-sm font-medium focus:outline-none focus:ring-2 focus:ring-orange-500 shadow-xs"
        />
      </div>

      {/* Location Filter */}
      <div className="relative flex items-center">
        <MapPin className="absolute left-3.5 w-4 h-4 text-slate-400 pointer-events-none" />
        <select
          value={selectedLocation}
          onChange={(e) => onLocationChange(e.target.value)}
          className="w-full pl-9 pr-8 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-xs sm:text-sm font-semibold appearance-none focus:outline-none focus:ring-2 focus:ring-orange-500 shadow-xs"
        >
          <option value="">All locations</option>
          {locations.map((loc) => (
            <option key={loc} value={loc}>
              {loc}
            </option>
          ))}
        </select>
        <div className="absolute right-3.5 pointer-events-none text-slate-400 text-xs">▼</div>
      </div>

      {/* Distance Filter */}
      <div className="relative flex items-center">
        <Navigation className="absolute left-3.5 w-4 h-4 text-slate-400 pointer-events-none" />
        <select
          value={selectedDistance !== null ? selectedDistance : ""}
          onChange={(e) =>
            onDistanceChange(e.target.value ? Number(e.target.value) : null)
          }
          className="w-full pl-9 pr-8 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-xs sm:text-sm font-semibold appearance-none focus:outline-none focus:ring-2 focus:ring-orange-500 shadow-xs"
        >
          <option value="">All distances</option>
          <option value="5">Within 5 km</option>
          <option value="10">Within 10 km</option>
          <option value="15">Within 15 km</option>
          <option value="20">Within 20 km</option>
        </select>
        <div className="absolute right-3.5 pointer-events-none text-slate-400 text-xs">▼</div>
      </div>
    </div>
  );
}
