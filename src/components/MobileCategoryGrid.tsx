"use client";

import React, { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { ChevronDown, ChevronUp, Sparkles, ArrowRight } from "lucide-react";
import { AllCategoriesModal } from "./AllCategoriesModal";
import { getCategoryMeta } from "@/lib/categories";

interface MobileCategoryGridProps {
  categories?: string[];
  selectedCategory?: string;
  onSelectCategory?: (cat: string) => void;
}

const DEFAULT_CATEGORIES = [
  "Daily Needs",
  "Electronic Services",
  "Electronics",
  "Entertainment",
  "Fashion",
  "Fitness",
  "Food",
  "Grocery",
  "Home Services",
  "Pharmacy",
  "Products",
  "Professional",
  "Property",
  "Property Request",
  "Recruitment",
  "Salon & Spa",
  "Vehicles",
  "Wholesale",
];

export function MobileCategoryGrid({
  categories,
  selectedCategory = "",
  onSelectCategory,
}: MobileCategoryGridProps) {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const rawList = categories && categories.length > 0 ? categories : DEFAULT_CATEGORIES;

  const categoryMetas = useMemo(() => {
    return rawList.map((catName, idx) => getCategoryMeta(catName, idx));
  }, [rawList]);

  const handleSelect = (catValue: string) => {
    if (onSelectCategory) {
      onSelectCategory(catValue);
    }
    if (catValue) {
      router.push(`/list?category=${encodeURIComponent(catValue)}`);
    } else {
      router.push("/list");
    }
  };

  const desktopVisible = isExpanded ? categoryMetas : categoryMetas.slice(0, 6);
  const mobileVisible = isExpanded ? categoryMetas : categoryMetas.slice(0, 5);

  return (
    <>
      <div className="w-full mb-6 transition-all duration-300">
        {/* Popular Categories Title */}
        <div className="mb-3.5 flex items-center justify-between px-1">
          <h2 className="text-lg font-extrabold text-slate-900 tracking-tight">
            Popular Categories
          </h2>
          <button
            type="button"
            onClick={() => setIsModalOpen(true)}
            className="text-xs font-extrabold text-blue-600 hover:text-blue-700 transition-colors inline-flex items-center gap-1 cursor-pointer"
          >
            <span>All Categories</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Desktop Grid (Latest Listings Card Style) */}
        <div className="hidden md:grid grid-cols-7 gap-3">
          {desktopVisible.map((item, idx) => {
            const Icon = item.icon;
            const isSelected = selectedCategory === item.value;
            const theme = item.theme;

            return (
              <div
                key={idx}
                onClick={() => handleSelect(item.value)}
                className={`p-3.5 rounded-3xl border ${theme.bg} ${theme.border} ${
                  isSelected ? "ring-2 ring-orange-500 shadow-md scale-102" : "shadow-2xs hover:shadow-md"
                } transition-all duration-200 cursor-pointer flex flex-col justify-between group h-28`}
              >
                <div className="flex items-center justify-between gap-1 mb-2">
                  <div className={`w-8 h-8 rounded-xl ${theme.iconBg} text-white flex items-center justify-center flex-shrink-0 shadow-2xs group-hover:scale-105 transition-transform`}>
                    <Icon className="w-4 h-4 stroke-[2.2]" />
                  </div>
                  <span className={`px-1.5 py-0.5 rounded-full text-[9px] font-black ${theme.badgeBg} ${theme.textColor} uppercase tracking-wider`}>
                    Browse
                  </span>
                </div>
                <span className="text-xs font-extrabold text-slate-900 line-clamp-1 group-hover:text-slate-800 tracking-tight">
                  {item.name}
                </span>
              </div>
            );
          })}

          {/* Desktop Expander / Collapser Tile */}
          <div
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-3.5 rounded-3xl border border-slate-200 bg-slate-100/80 hover:bg-slate-200/80 shadow-2xs hover:shadow-md transition-all duration-200 cursor-pointer flex flex-col justify-between group h-28"
          >
            <div className="flex items-center justify-between gap-1 mb-2">
              <div className="w-8 h-8 rounded-xl bg-orange-500 text-white flex items-center justify-center flex-shrink-0 shadow-2xs group-hover:scale-105 transition-transform">
                {isExpanded ? (
                  <ChevronUp className="w-4 h-4 stroke-[2.5]" />
                ) : (
                  <ChevronDown className="w-4 h-4 stroke-[2.5]" />
                )}
              </div>
              <span className="px-1.5 py-0.5 rounded-full text-[9px] font-black bg-orange-100 text-orange-700 uppercase tracking-wider">
                {isExpanded ? "Less" : "More"}
              </span>
            </div>
            <span className="text-xs font-extrabold text-orange-600 line-clamp-1 tracking-tight">
              {isExpanded ? "Show Less" : "Show More"}
            </span>
          </div>
        </div>

        {/* Mobile View: 3 columns grid (Latest Listings Card Style) */}
        <div className="grid md:hidden grid-cols-3 gap-2.5">
          {mobileVisible.map((item, idx) => {
            const Icon = item.icon;
            const isSelected = selectedCategory === item.value;
            const theme = item.theme;

            return (
              <div
                key={idx}
                onClick={() => handleSelect(item.value)}
                className={`p-3 rounded-2xl border ${theme.bg} ${theme.border} ${
                  isSelected ? "ring-2 ring-orange-500 shadow-md scale-102" : "shadow-2xs hover:shadow-md"
                } transition-all duration-200 cursor-pointer flex flex-col justify-between group h-24`}
              >
                <div className="flex items-center justify-between gap-1 mb-1">
                  <div className={`w-7 h-7 rounded-lg ${theme.iconBg} text-white flex items-center justify-center flex-shrink-0 shadow-2xs group-hover:scale-105 transition-transform`}>
                    <Icon className="w-3.5 h-3.5 stroke-[2.2]" />
                  </div>
                  <ArrowRight className={`w-3 h-3 ${theme.textColor} opacity-60 group-hover:opacity-100 transition-opacity`} />
                </div>
                <span className="text-[11px] font-extrabold text-slate-900 line-clamp-1 group-hover:text-slate-800 tracking-tight">
                  {item.name}
                </span>
              </div>
            );
          })}

          {/* Mobile Expander / Collapser Tile */}
          <div
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-3 rounded-2xl border border-slate-200 bg-slate-100/80 hover:bg-slate-200/80 shadow-2xs hover:shadow-md transition-all duration-200 cursor-pointer flex flex-col justify-between group h-24"
          >
            <div className="flex items-center justify-between gap-1 mb-1">
              <div className="w-7 h-7 rounded-lg bg-orange-500 text-white flex items-center justify-center flex-shrink-0 shadow-2xs group-hover:scale-105 transition-transform">
                {isExpanded ? (
                  <ChevronUp className="w-3.5 h-3.5 stroke-[2.5]" />
                ) : (
                  <ChevronDown className="w-3.5 h-3.5 stroke-[2.5]" />
                )}
              </div>
            </div>
            <span className="text-[11px] font-extrabold text-orange-600 line-clamp-1 tracking-tight">
              {isExpanded ? "Less" : "More"}
            </span>
          </div>
        </div>
      </div>

      {/* All Categories Modal Sheet */}
      <AllCategoriesModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSelectCategory={handleSelect}
      />
    </>
  );
}
