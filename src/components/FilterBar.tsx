"use client";

import React from "react";
import { MapPin, Navigation } from "lucide-react";

interface FilterBarProps {
  locations: string[];
  selectedLocation: string;
  onLocationChange: (loc: string) => void;
  hasUserLocation?: boolean;
}

export function FilterBar({
  locations,
  selectedLocation,
  onLocationChange,
}: FilterBarProps) {
  return (
    <div className="w-full py-3">
      {/* Location Filter */}
      <div className="relative flex items-center max-w-sm">
        <MapPin className="absolute left-3.5 w-4 h-4 text-slate-400 pointer-events-none" />
        <select
          value={selectedLocation}
          onChange={(e) => onLocationChange(e.target.value)}
          className="w-full pl-9 pr-8 py-2 rounded-xl border border-slate-200 bg-white text-slate-900 text-xs sm:text-sm font-semibold appearance-none outline-none focus:outline-none focus:ring-0 shadow-xs cursor-pointer"
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
    </div>
  );
}
