"use client";

import React, { useRef, useState, useEffect } from "react";
import {
  formatCategoryLabel,
  getCategoryIcon as getLibCategoryIcon,
  getCategoryColors as getLibCategoryColors,
} from "@/lib/categories";
import {
  Sparkles,
  UtensilsCrossed,
  CookingPot,
  Scissors,
  ShoppingCart,
  ShoppingBag,
  Shirt,
  Smartphone,
  Dumbbell,
  Pill,
  Film,
  Truck,
  Home,
  Briefcase,
  UserCheck,
  Building,
  Package,
  Coffee,
  Store,
  Compass,
  Wrench,
  Cpu,
  MapPin,
  Navigation,
  Clock,
  ChevronLeft,
  ChevronRight,
  Filter,
  Search,
} from "lucide-react";

import { SearchBarTrigger } from "./SearchBarTrigger";

interface ListCategoryBarProps {
  categories: string[];
  selectedCategory: string;
  onSelectCategory: (cat: string) => void;
  locations: string[];
  selectedLocation: string;
  selectedDistance?: number | null;
  selectedValidity: string;
  validities?: string[];
  onLocationChange: (loc: string) => void;
  onDistanceChange?: (dist: number | null) => void;
  onValidityChange: (val: string) => void;
  onOpenSearch?: () => void;
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
  onOpenSearch,
}: ListCategoryBarProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const selectedChipRef = useRef<HTMLButtonElement | null>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  // Auto-scroll to center selected category chip in container
  useEffect(() => {
    const timer = setTimeout(() => {
      const chip = selectedChipRef.current;
      const container = scrollRef.current;
      if (chip && container) {
        const containerWidth = container.clientWidth;
        const chipOffsetLeft = chip.offsetLeft;
        const chipWidth = chip.clientWidth;

        const targetScrollLeft = chipOffsetLeft - containerWidth / 2 + chipWidth / 2;

        container.scrollTo({
          left: Math.max(0, targetScrollLeft),
          behavior: "smooth",
        });
      }
    }, 60);

    return () => clearTimeout(timer);
  }, [selectedCategory]);

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

  const renderCategoryIcon = (name: string) => {
    const Icon = getLibCategoryIcon(name);
    return <Icon className="w-5 h-5" />;
  };

  const getCategoryColors = (name: string) => {
    return getLibCategoryColors(name);
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
          className="flex-1 overflow-x-auto no-scrollbar py-1 flex items-start gap-4 scroll-smooth"
        >
          {allItems.map((name) => {
            const val = name === "All" ? "" : name;
            const isSelected = selectedCategory === val;
            const colors = getCategoryColors(name);
            return (
              <button
                key={name}
                ref={isSelected ? selectedChipRef : null}
                type="button"
                onClick={() => onSelectCategory(val)}
                className={`flex-shrink-0 flex flex-col items-center justify-center w-[76px] sm:w-[80px] h-[64px] p-1.5 rounded-2xl transition-all cursor-pointer group focus:outline-none ${
                  isSelected
                    ? `${colors.outlineBorder}`
                    : "border border-slate-200/80 bg-white hover:border-slate-300 hover:bg-slate-50/60"
                }`}
              >
                <div
                  className={`h-5 flex items-center justify-center mb-0.5 transition-all duration-200 ${
                    isSelected
                      ? `${colors.iconColor} scale-110`
                      : `${colors.iconColor} opacity-75 group-hover:opacity-100 group-hover:scale-105`
                  }`}
                >
                  {renderCategoryIcon(name)}
                </div>
                <span
                  className={`text-[10px] sm:text-[11px] tracking-tight text-center leading-tight whitespace-pre-line transition-colors line-clamp-2 px-0.5 ${
                    isSelected
                      ? `font-extrabold ${colors.textColor || colors.activeText}`
                      : "font-semibold text-slate-600 group-hover:text-slate-900"
                  }`}
                >
                  {formatCategoryLabel(name)}
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

      {/* Mobile/Tablet Dropdown Selectors Control Row (< lg) */}
      <div className="flex items-center gap-2 sm:gap-3 w-full pt-0.5 pb-0.5 sm:pb-0 lg:hidden">

        {/* Dropdown 1: All Locations (Visible on Mobile/Tablet < lg) */}
        <div className="relative flex items-center flex-1 sm:flex-initial sm:w-44 min-w-0 lg:hidden">
          <MapPin className="absolute left-2.5 sm:left-3 w-3.5 sm:w-4 h-3.5 sm:h-4 text-slate-400 pointer-events-none" />
          <select
            value={selectedLocation}
            onChange={(e) => onLocationChange(e.target.value)}
            className="w-full pl-7 sm:pl-8 pr-6 sm:pr-7 h-[38px] rounded-full border border-slate-200 bg-white text-slate-900 text-[11px] sm:text-xs font-bold appearance-none outline-none focus:outline-none focus:ring-0 shadow-xs cursor-pointer truncate"
          >
            <option value="">All locations</option>
            {locations.map((loc) => (
              <option key={loc} value={loc}>
                {loc}
              </option>
            ))}
          </select>
          <div className="absolute right-2.5 sm:right-3 pointer-events-none text-slate-400 text-[10px] sm:text-xs">▼</div>
        </div>

        {/* Dropdown 2: All Validities (Visible on Mobile/Tablet < lg) */}
        <div className="relative flex items-center flex-1 sm:flex-initial sm:w-44 min-w-0 lg:hidden">
          <Clock className="absolute left-2.5 sm:left-3 w-3.5 sm:w-4 h-3.5 sm:h-4 text-slate-400 pointer-events-none" />
          <select
            value={selectedValidity}
            onChange={(e) => onValidityChange(e.target.value)}
            className="w-full pl-7 sm:pl-8 pr-6 sm:pr-7 h-[38px] rounded-full border border-slate-200 bg-white text-slate-900 text-[11px] sm:text-xs font-bold appearance-none outline-none focus:outline-none focus:ring-0 shadow-xs cursor-pointer truncate"
          >
            <option value="">All post validities</option>
            <option value="Limited">Limited</option>
            <option value="Expires Soon">Expires Soon</option>
            <option value="Until Filled">Until Filled</option>
            <option value="Until Found">Until Found</option>
            <option value="Available">Available</option>
            <option value="Valid All Days">Valid All Days</option>
          </select>
          <div className="absolute right-2.5 sm:right-3 pointer-events-none text-slate-400 text-[10px] sm:text-xs">▼</div>
        </div>
      </div>
    </div>
  );
}
