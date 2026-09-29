"use client";

import React from "react";
import { Search, X } from "lucide-react";

interface HeroBannerProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export function HeroBanner({ searchQuery, onSearchChange }: HeroBannerProps) {
  return (
    <div className="relative w-full rounded-3xl bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 p-6 text-white shadow-lg shadow-blue-600/20 mb-6 overflow-hidden">
      {/* Decorative Background Accent */}
      <div className="absolute -right-8 -bottom-8 w-44 h-44 rounded-full bg-white/10 blur-xl pointer-events-none" />
      <div className="absolute -left-8 -top-8 w-36 h-36 rounded-full bg-blue-400/20 blur-lg pointer-events-none" />

      <div className="relative z-10 max-w-xl">
        <h1 className="text-xl sm:text-2xl font-black tracking-tight leading-snug mb-4">
          Buy, Sell, Find, Hire <br />
          Everything in One Place
        </h1>

        {/* Search Bar inside Hero Banner */}
        <div className="relative flex items-center">
          <Search className="absolute left-3.5 w-4 h-4 text-slate-400 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search for products, services, properties..."
            className="w-full pl-10 pr-10 py-3 rounded-2xl bg-white text-slate-900 text-xs sm:text-sm font-medium placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-400 shadow-md transition-all"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => onSearchChange("")}
              className="absolute right-3 p-1 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-all cursor-pointer focus:outline-none"
              title="Clear search"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
