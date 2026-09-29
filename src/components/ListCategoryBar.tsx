"use client";

import React, { useRef, useState, useEffect } from "react";
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
  onLocationChange: (loc: string) => void;
  onDistanceChange: (dist: number | null) => void;
}

export function ListCategoryBar({
  categories,
  selectedCategory,
  onSelectCategory,
  locations,
  selectedLocation,
  selectedDistance,
  onLocationChange,
  onDistanceChange,
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
      {/* Single Row Scrollable Category Chips with Desktop Controls */}
      <div className="relative flex items-center">
        {canScrollLeft && (
          <button
            type="button"
            onClick={() => handleScroll("left")}
            className="hidden md:flex absolute left-0 z-20 items-center justify-center w-8 h-8 rounded-full bg-white shadow-md border border-slate-200 text-slate-700 hover:bg-slate-100 hover:text-orange-600 transition-all -ml-2"
            title="Scroll left"
          >
            <ChevronLeft className="w-4 h-4 stroke-[2.5]" />
          </button>
        )}

        <div
          ref={scrollRef}
          className="w-full overflow-x-auto no-scrollbar py-1 flex items-center gap-4 scroll-smooth"
        >
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
                      ? "text-orange-500 scale-110"
                      : "text-slate-400 group-hover:text-slate-600"
                  }`}
                >
                  {getCategoryIcon(name)}
                </div>
                <span
                  className={`text-[11px] tracking-tight whitespace-nowrap transition-colors ${
                    isSelected
                      ? "font-extrabold text-orange-600 border-b-2 border-orange-500 pb-0.5"
                      : "font-semibold text-slate-600 group-hover:text-slate-900"
                  }`}
                >
                  {name}
                </span>
              </button>
            );
          })}
        </div>

        {canScrollRight && (
          <button
            type="button"
            onClick={() => handleScroll("right")}
            className="hidden md:flex absolute right-0 z-20 items-center justify-center w-8 h-8 rounded-full bg-white shadow-md border border-slate-200 text-slate-700 hover:bg-slate-100 hover:text-orange-600 transition-all -mr-2"
            title="Scroll right"
          >
            <ChevronRight className="w-4 h-4 stroke-[2.5]" />
          </button>
        )}
      </div>

      {/* Two Parallel Dropdown Selectors in a Single Row */}
      <div className="grid grid-cols-2 gap-2.5 pt-0.5">
        {/* All Locations Dropdown */}
        <div className="relative flex items-center">
          <MapPin className="absolute left-3 w-4 h-4 text-slate-400 pointer-events-none" />
          <select
            value={selectedLocation}
            onChange={(e) => onLocationChange(e.target.value)}
            className="w-full pl-8 pr-7 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-900 text-xs font-bold appearance-none focus:outline-none focus:ring-2 focus:ring-orange-500 shadow-xs"
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
            className="w-full pl-8 pr-7 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-900 text-xs font-bold appearance-none focus:outline-none focus:ring-2 focus:ring-orange-500 shadow-xs"
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
