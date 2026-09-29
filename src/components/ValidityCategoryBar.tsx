"use client";

import React from "react";
import { Offer } from "@/types/offer";
import {
  VALIDITY_CATEGORIES,
  getOfferValidityCategory,
} from "@/lib/validity";
import {
  Flame,
  Hourglass,
  UserCheck,
  Search,
  CheckCircle2,
  Calendar,
  Sparkles,
} from "lucide-react";

interface ValidityCategoryBarProps {
  offers: Offer[];
  selectedValidity: string;
  onSelectValidity: (key: string) => void;
}

export function ValidityCategoryBar({
  offers,
  selectedValidity,
  onSelectValidity,
}: ValidityCategoryBarProps) {
  // Compute counts for each validity category
  const counts = React.useMemo(() => {
    const acc: Record<string, number> = {
      all: offers.length,
      "limited-slots": 0,
      "expires-soon": 0,
      "until-filled": 0,
      "until-found": 0,
      available: 0,
      "valid-all-days": 0,
    };

    offers.forEach((offer) => {
      const catKey = getOfferValidityCategory(offer);
      acc[catKey] = (acc[catKey] || 0) + 1;
    });

    return acc;
  }, [offers]);

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "Flame":
        return Flame;
      case "Hourglass":
        return Hourglass;
      case "UserCheck":
        return UserCheck;
      case "Search":
        return Search;
      case "Calendar":
        return Calendar;
      case "CheckCircle2":
        return CheckCircle2;
      default:
        return Sparkles;
    }
  };

  return (
    <div className="w-full mb-6">
      {/* Section Header */}
      <div className="flex items-center justify-between mb-3 px-1">
        <div className="flex items-center gap-2">
          <div className="w-2 h-5 rounded-full bg-gradient-to-b from-orange-500 to-amber-500" />
          <h2 className="text-base sm:text-lg font-extrabold text-slate-900 tracking-tight">
            Browse by Validity Status
          </h2>
        </div>
        <span className="text-xs font-bold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-full">
          {offers.length} Deals Active
        </span>
      </div>

      {/* Horizontal Filter Bar */}
      <div className="flex items-center gap-2.5 overflow-x-auto no-scrollbar py-1 px-1 -mx-1">
        {/* All Deals Pill */}
        <button
          type="button"
          onClick={() => onSelectValidity("all")}
          className={`flex items-center gap-2 px-3.5 py-2 rounded-2xl text-xs sm:text-sm font-extrabold transition-all duration-200 cursor-pointer flex-shrink-0 border ${
            selectedValidity === "all" || !selectedValidity
              ? "bg-gradient-to-r from-orange-500 to-amber-500 text-white border-transparent shadow-md shadow-orange-500/20 scale-102"
              : "bg-white text-slate-700 border-slate-200 hover:border-orange-300 hover:bg-orange-50/50"
          }`}
        >
          <Sparkles className="w-4 h-4 text-amber-300 fill-amber-300/30" />
          <span>All Deals</span>
          <span
            className={`px-2 py-0.5 rounded-full text-[10px] font-black ${
              selectedValidity === "all" || !selectedValidity
                ? "bg-white/20 text-white"
                : "bg-slate-100 text-slate-600"
            }`}
          >
            {counts.all}
          </span>
        </button>

        {/* Validity Category Pills */}
        {VALIDITY_CATEGORIES.map((cat) => {
          const isSelected = selectedValidity === cat.key;
          const Icon = getIcon(cat.iconName);
          const count = counts[cat.key] || 0;

          return (
            <button
              key={cat.key}
              type="button"
              onClick={() => onSelectValidity(cat.key)}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-2xl text-xs sm:text-sm font-extrabold transition-all duration-200 cursor-pointer flex-shrink-0 border ${
                isSelected
                  ? `bg-gradient-to-r ${cat.theme.gradient} text-white border-transparent shadow-md scale-102`
                  : `bg-white text-slate-700 border-slate-200 hover:border-slate-300 hover:${cat.theme.bg}`
              }`}
            >
              <Icon
                className={`w-4 h-4 ${
                  isSelected ? "text-white" : cat.theme.text
                }`}
              />
              <span>{cat.label}</span>
              <span
                className={`px-2 py-0.5 rounded-full text-[10px] font-black ${
                  isSelected ? "bg-white/20 text-white" : "bg-slate-100 text-slate-600"
                }`}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
