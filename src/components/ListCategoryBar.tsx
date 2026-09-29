"use client";

import React, { useState, useEffect } from "react";
import {
  Sparkles,
  Utensils,
  Scissors,
  ShoppingCart,
  ShoppingBag,
  Smartphone,
  Dumbbell,
  Pill,
  Film,
  Car,
  Home,
  Briefcase,
  UserCheck,
  Building,
  Package,
  Coffee,
  Store,
  Compass,
  MapPin,
  Navigation,
  Search,
} from "lucide-react";

interface ListCategoryBarProps {
  categories: string[];
  selectedCategory: string;
  onSelectCategory: (cat: string) => void;
  locations: string[];
  selectedLocation: string;
  selectedDistance: number | null;
  searchQuery: string;
  onLocationChange: (loc: string) => void;
  onDistanceChange: (dist: number | null) => void;
  onSearchChange: (query: string) => void;
}

export function ListCategoryBar({
  categories,
  selectedCategory,
  onSelectCategory,
  locations,
  selectedLocation,
  selectedDistance,
  searchQuery,
  onLocationChange,
  onDistanceChange,
  onSearchChange,
}: ListCategoryBarProps) {
  const [isSearchHidden, setIsSearchHidden] = useState(false);

  useEffect(() => {
    let lastY = window.scrollY || 0;

    const handleScroll = () => {
      const y = Math.max(0, window.scrollY || 0);
      const delta = y - lastY;
      lastY = y;

      if (y < 30) {
        setIsSearchHidden(false);
        return;
      }

      if (delta > 6) {
        setIsSearchHidden(true);
      } else if (delta < -6) {
        setIsSearchHidden(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const getCategoryIcon = (name: string) => {
    switch (name) {
      case "All":
      case "All Deals":
        return <Sparkles className="w-5 h-5" />;
      case "Dining & Cafes":
        return <Utensils className="w-5 h-5" />;
      case "Salon & Spa":
        return <Scissors className="w-5 h-5" />;
      case "Grocery":
        return <ShoppingCart className="w-5 h-5" />;
      case "Fashion":
        return <ShoppingBag className="w-5 h-5" />;
      case "Electronics":
        return <Smartphone className="w-5 h-5" />;
      case "Fitness":
        return <Dumbbell className="w-5 h-5" />;
      case "Pharmacy":
        return <Pill className="w-5 h-5" />;
      case "Entertainment":
        return <Film className="w-5 h-5" />;
      case "Auto Care":
        return <Car className="w-5 h-5" />;
      case "Home & Living":
      case "Services":
        return <Home className="w-5 h-5" />;
      case "Recruitment":
        return <Briefcase className="w-5 h-5" />;
      case "Professional":
        return <UserCheck className="w-5 h-5" />;
      case "Property":
      case "Property Request":
        return <Building className="w-5 h-5" />;
      case "Products":
        return <Package className="w-5 h-5" />;
      case "Food":
        return <Coffee className="w-5 h-5" />;
      case "Wholesale":
        return <Store className="w-5 h-5" />;
      default:
        return <Compass className="w-5 h-5" />;
    }
  };

  const allItems = ["All", ...categories];

  return (
    <div className="w-full space-y-3">
      {/* Search Bar - Hides on scroll down, shows on scroll up */}
      <div
        className={`sticky top-14 z-30 pt-1 pb-1 transition-all duration-300 ${
          isSearchHidden
            ? "-translate-y-24 opacity-0 pointer-events-none"
            : "translate-y-0 opacity-100"
        }`}
      >
        <div className="relative flex items-center">
          <Search className="absolute left-3.5 w-4 h-4 text-slate-400 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search products, services, listings..."
            className="w-full pl-9 pr-3 py-2.5 rounded-2xl border border-slate-200 bg-white text-slate-900 text-xs sm:text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-600 shadow-xs"
          />
        </div>
      </div>

      {/* Single Row Scrollable Category Chips (Icon on top, Text next line - NO chip container box) */}
      <div className="w-full overflow-x-auto no-scrollbar py-1 flex items-center gap-4">
        {allItems.map((name) => {
          const val = name === "All" ? "" : name;
          const isSelected = selectedCategory === val;
          return (
            <button
              key={name}
              type="button"
              onClick={() => onSelectCategory(val)}
              className="flex-shrink-0 flex flex-col items-center justify-center py-1 transition-all cursor-pointer group focus:outline-none min-w-[56px]"
            >
              <div
                className={`mb-1 transition-all duration-200 ${
                  isSelected
                    ? "text-blue-600 scale-110"
                    : "text-slate-400 group-hover:text-slate-600"
                }`}
              >
                {getCategoryIcon(name)}
              </div>
              <span
                className={`text-[11px] tracking-tight whitespace-nowrap transition-colors ${
                  isSelected
                    ? "font-extrabold text-blue-600 border-b-2 border-blue-600 pb-0.5"
                    : "font-semibold text-slate-600 group-hover:text-slate-900"
                }`}
              >
                {name}
              </span>
            </button>
          );
        })}
      </div>

      {/* Two Parallel Dropdown Selectors in a Single Row */}
      <div className="grid grid-cols-2 gap-2.5 pt-1">
        {/* All Locations Dropdown */}
        <div className="relative flex items-center">
          <MapPin className="absolute left-3 w-4 h-4 text-slate-400 pointer-events-none" />
          <select
            value={selectedLocation}
            onChange={(e) => onLocationChange(e.target.value)}
            className="w-full pl-8 pr-7 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-900 text-xs font-bold appearance-none focus:outline-none focus:ring-2 focus:ring-blue-600 shadow-xs"
          >
            <option value="">All locations</option>
            {locations.map((loc) => (
              <option key={loc} value={loc}>
                {loc}
              </option>
            ))}
          </select>
          <div className="absolute right-3 pointer-events-none text-slate-400 text-xs">▼</div>
        </div>

        {/* All Distances Dropdown */}
        <div className="relative flex items-center">
          <Navigation className="absolute left-3 w-4 h-4 text-slate-400 pointer-events-none" />
          <select
            value={selectedDistance !== null ? selectedDistance : ""}
            onChange={(e) =>
              onDistanceChange(e.target.value ? Number(e.target.value) : null)
            }
            className="w-full pl-8 pr-7 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-900 text-xs font-bold appearance-none focus:outline-none focus:ring-2 focus:ring-blue-600 shadow-xs"
          >
            <option value="">All distances</option>
            <option value="5">Within 5 km</option>
            <option value="10">Within 10 km</option>
            <option value="15">Within 15 km</option>
            <option value="20">Within 20 km</option>
          </select>
          <div className="absolute right-3 pointer-events-none text-slate-400 text-xs">▼</div>
        </div>
      </div>
    </div>
  );
}
