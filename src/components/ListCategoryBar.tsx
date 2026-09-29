"use client";

import React, { useRef, useState, useEffect } from "react";
import {
  Sparkles,
  UtensilsCrossed,
  CookingPot,
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
  Clock,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

interface ListCategoryBarProps {
  categories: string[];
  selectedCategory: string;
  onSelectCategory: (cat: string) => void;
  locations: string[];
  selectedLocation: string;
  selectedDistance: number | null;
  selectedValidity: string;
  validities?: string[];
  onLocationChange: (loc: string) => void;
  onDistanceChange: (dist: number | null) => void;
  onValidityChange: (val: string) => void;
}

export function ListCategoryBar({
  categories,
  selectedCategory,
  onSelectCategory,
  locations,
  selectedLocation,
  selectedDistance,
  selectedValidity,
  validities = [],
  onLocationChange,
  onDistanceChange,
  onValidityChange,
}: ListCategoryBarProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const updateScrollButtons = () => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 5);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 5);
  };

  useEffect(() => {
    updateScrollButtons();
    const el = scrollRef.current;
    if (el) {
      el.addEventListener("scroll", updateScrollButtons, { passive: true });
      window.addEventListener("resize", updateScrollButtons, { passive: true });
    }
    return () => {
      if (el) el.removeEventListener("scroll", updateScrollButtons);
      window.removeEventListener("resize", updateScrollButtons);
    };
  }, [categories]);

  const handleScroll = (direction: "left" | "right") => {
    const el = scrollRef.current;
    if (!el) return;
    const distance = direction === "left" ? -280 : 280;
    el.scrollBy({ left: distance, behavior: "smooth" });
  };

  const getCategoryIcon = (name: string) => {
    switch (name) {
      case "All":
      case "All Deals":
        return <Sparkles className="w-5 h-5" />;
      case "Dining & Cafes":
        return <UtensilsCrossed className="w-5 h-5" />;
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
        return <CookingPot className="w-5 h-5" />;
      case "Wholesale":
        return <Store className="w-5 h-5" />;
      default:
        return <Compass className="w-5 h-5" />;
    }
  };

  const getCategoryColors = (name: string) => {
    switch (name) {
      case "All":
      case "All Deals":
        return {
          iconColor: "text-orange-500",
          activeText: "text-orange-600 border-orange-500",
        };
      case "Dining & Cafes":
      case "Food":
        return {
          iconColor: "text-amber-500",
          activeText: "text-amber-600 border-amber-500",
        };
      case "Salon & Spa":
        return {
          iconColor: "text-pink-500",
          activeText: "text-pink-600 border-pink-500",
        };
      case "Grocery":
      case "Daily Needs":
        return {
          iconColor: "text-emerald-500",
          activeText: "text-emerald-600 border-emerald-500",
        };
      case "Fashion":
      case "Products":
        return {
          iconColor: "text-purple-500",
          activeText: "text-purple-600 border-purple-500",
        };
      case "Electronics":
        return {
          iconColor: "text-blue-500",
          activeText: "text-blue-600 border-blue-500",
        };
      case "Fitness":
        return {
          iconColor: "text-red-500",
          activeText: "text-red-600 border-red-500",
        };
      case "Pharmacy":
        return {
          iconColor: "text-teal-500",
          activeText: "text-teal-600 border-teal-500",
        };
      case "Entertainment":
        return {
          iconColor: "text-indigo-500",
          activeText: "text-indigo-600 border-indigo-500",
        };
      case "Auto Care":
      case "Vehicles":
        return {
          iconColor: "text-cyan-500",
          activeText: "text-cyan-600 border-cyan-500",
        };
      case "Home & Living":
      case "Services":
        return {
          iconColor: "text-sky-500",
          activeText: "text-sky-600 border-sky-500",
        };
      case "Recruitment":
        return {
          iconColor: "text-violet-500",
          activeText: "text-violet-600 border-violet-500",
        };
      case "Professional":
      case "Professionals":
        return {
          iconColor: "text-fuchsia-500",
          activeText: "text-fuchsia-600 border-fuchsia-500",
        };
      case "Property":
      case "Property Request":
        return {
          iconColor: "text-orange-500",
          activeText: "text-orange-600 border-orange-500",
        };
      case "Wholesale":
        return {
          iconColor: "text-rose-500",
          activeText: "text-rose-600 border-rose-500",
        };
      default:
        return {
          iconColor: "text-slate-500",
          activeText: "text-slate-900 border-slate-700",
        };
    }
  };

  const allItems = ["All", ...categories];

  return (
    <div className="w-full space-y-3">
      {/* Single Row Scrollable Category Chips with Desktop Controls */}
      <div className="flex items-center gap-2">
        {/* Left Arrow Button */}
        {canScrollLeft ? (
          <button
            type="button"
            onClick={() => handleScroll("left")}
            className="hidden md:flex items-center justify-center w-8 h-8 rounded-full bg-white shadow-xs border border-slate-200 text-slate-700 hover:bg-slate-100 hover:text-orange-600 transition-all flex-shrink-0 cursor-pointer"
            title="Scroll left"
          >
            <ChevronLeft className="w-4 h-4 stroke-[2.5]" />
          </button>
        ) : (
          <div className="hidden md:block w-8 flex-shrink-0" />
        )}

        {/* Scrollable Chips Container */}
        <div
          ref={scrollRef}
          className="flex-1 overflow-x-auto no-scrollbar py-1 flex items-center gap-4 scroll-smooth"
        >
          {allItems.map((name) => {
            const val = name === "All" ? "" : name;
            const isSelected = selectedCategory === val;
            const colors = getCategoryColors(name);
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
                      ? `${colors.iconColor} scale-110`
                      : `${colors.iconColor} opacity-75 group-hover:opacity-100 group-hover:scale-105`
                  }`}
                >
                  {getCategoryIcon(name)}
                </div>
                <span
                  className={`text-[11px] tracking-tight whitespace-nowrap transition-colors ${
                    isSelected
                      ? `font-extrabold ${colors.activeText} border-b-2 pb-0.5`
                      : "font-semibold text-slate-600 group-hover:text-slate-900"
                  }`}
                >
                  {name}
                </span>
              </button>
            );
          })}
        </div>

        {/* Right Arrow Button */}
        {canScrollRight ? (
          <button
            type="button"
            onClick={() => handleScroll("right")}
            className="hidden md:flex items-center justify-center w-8 h-8 rounded-full bg-white shadow-xs border border-slate-200 text-slate-700 hover:bg-slate-100 hover:text-orange-600 transition-all flex-shrink-0 cursor-pointer"
            title="Scroll right"
          >
            <ChevronRight className="w-4 h-4 stroke-[2.5]" />
          </button>
        ) : (
          <div className="hidden md:block w-8 flex-shrink-0" />
        )}
      </div>

      {/* Three Parallel Dropdown Selectors: Location, Distance, Validity */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-2.5 pt-0.5">
        {/* Dropdown 1: All Locations */}
        <div className="relative flex items-center">
          <MapPin className="absolute left-3 w-4 h-4 text-slate-400 pointer-events-none" />
          <select
            value={selectedLocation}
            onChange={(e) => onLocationChange(e.target.value)}
            className="w-full pl-8 pr-7 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-900 text-xs font-bold appearance-none outline-none focus:outline-none focus:ring-0 shadow-xs cursor-pointer truncate"
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

        {/* Dropdown 2: All Distances */}
        <div className="relative flex items-center">
          <Navigation className="absolute left-3 w-4 h-4 text-slate-400 pointer-events-none" />
          <select
            value={selectedDistance !== null ? selectedDistance : ""}
            onChange={(e) =>
              onDistanceChange(e.target.value ? Number(e.target.value) : null)
            }
            className="w-full pl-8 pr-7 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-900 text-xs font-bold appearance-none outline-none focus:outline-none focus:ring-0 shadow-xs cursor-pointer truncate"
          >
            <option value="">All distances</option>
            <option value="5">Within 5 km</option>
            <option value="10">Within 10 km</option>
            <option value="15">Within 15 km</option>
            <option value="20">Within 20 km</option>
          </select>
          <div className="absolute right-3 pointer-events-none text-slate-400 text-xs">▼</div>
        </div>

        {/* Dropdown 3: All Validities */}
        <div className="relative flex items-center">
          <Clock className="absolute left-3 w-4 h-4 text-slate-400 pointer-events-none" />
          <select
            value={selectedValidity}
            onChange={(e) => onValidityChange(e.target.value)}
            className="w-full pl-8 pr-7 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-900 text-xs font-bold appearance-none outline-none focus:outline-none focus:ring-0 shadow-xs cursor-pointer truncate"
          >
            <option value="">All validities</option>
            <option value="Limited Slots">Limited Slots</option>
            <option value="Expires Soon">Expires Soon</option>
            <option value="Until Filled">Until Filled</option>
            <option value="Until Found">Until Found</option>
            <option value="Available">Available</option>
            <option value="Valid All Days">Valid All Days</option>
          </select>
          <div className="absolute right-3 pointer-events-none text-slate-400 text-xs">▼</div>
        </div>
      </div>
    </div>
  );
}
