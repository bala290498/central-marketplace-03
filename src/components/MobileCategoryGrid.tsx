"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Home,
  Briefcase,
  UserCheck,
  Package,
  Wrench,
  Utensils,
  Car,
  ShoppingCart,
  Scissors,
  Smartphone,
  Dumbbell,
  Pill,
  Film,
  ChevronDown,
  ChevronUp,
  Sparkles,
} from "lucide-react";
import { AllCategoriesModal } from "./AllCategoriesModal";

interface MobileCategoryGridProps {
  selectedCategory?: string;
  onSelectCategory?: (cat: string) => void;
}

export function MobileCategoryGrid({
  selectedCategory = "",
  onSelectCategory,
}: MobileCategoryGridProps) {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const allCategories = [
    {
      name: "Property",
      categoryValue: "Property",
      icon: Home,
      bgColor: "bg-orange-100/90 text-orange-600",
    },
    {
      name: "Recruitment",
      categoryValue: "Recruitment",
      icon: Briefcase,
      bgColor: "bg-blue-100/90 text-blue-600",
    },
    {
      name: "Professionals",
      categoryValue: "Professional",
      icon: UserCheck,
      bgColor: "bg-purple-100/90 text-purple-600",
    },
    {
      name: "Products",
      categoryValue: "Products",
      icon: Package,
      bgColor: "bg-amber-100/90 text-amber-600",
    },
    {
      name: "Services",
      categoryValue: "Home & Living",
      icon: Wrench,
      bgColor: "bg-sky-100/90 text-sky-600",
    },
    {
      name: "Food",
      categoryValue: "Dining & Cafes",
      icon: Utensils,
      bgColor: "bg-orange-100/90 text-orange-600",
    },
    {
      name: "Vehicles",
      categoryValue: "Auto Care",
      icon: Car,
      bgColor: "bg-blue-100/90 text-blue-600",
    },
    {
      name: "Daily Needs",
      categoryValue: "Daily Needs",
      icon: ShoppingCart,
      bgColor: "bg-emerald-100/90 text-emerald-600",
    },
    {
      name: "Salon & Spa",
      categoryValue: "Salon & Spa",
      icon: Scissors,
      bgColor: "bg-pink-100/90 text-pink-600",
    },
    {
      name: "Electronics",
      categoryValue: "Electronics",
      icon: Smartphone,
      bgColor: "bg-blue-100/90 text-blue-600",
    },
    {
      name: "Fitness",
      categoryValue: "Fitness",
      icon: Dumbbell,
      bgColor: "bg-red-100/90 text-red-600",
    },
    {
      name: "Pharmacy",
      categoryValue: "Pharmacy",
      icon: Pill,
      bgColor: "bg-teal-100/90 text-teal-600",
    },
    {
      name: "Entertainment",
      categoryValue: "Entertainment",
      icon: Film,
      bgColor: "bg-indigo-100/90 text-indigo-600",
    },
  ];

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

  // Filter category items depending on collapse vs expand state:
  // Filter category items depending on collapse vs expand state:
  // 6 items + More/Less button when collapsed.
  const desktopVisible = isExpanded ? allCategories : allCategories.slice(0, 6);
  const mobileVisible = isExpanded ? allCategories : allCategories.slice(0, 5);

  return (
    <>
      <div className="w-full mb-6 transition-all duration-300">
        {/* Popular Categories Title */}
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-sm sm:text-base font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-orange-500" />
            <span>Popular Categories</span>
          </h2>
        </div>

        {/* Desktop View: 6 items + More/Less button in 1 single row (7 columns) when collapsed */}
        <div className="hidden md:grid grid-cols-7 gap-y-4 gap-x-3">
          {desktopVisible.map((item, idx) => {
            const Icon = item.icon;
            const isSelected = selectedCategory === item.categoryValue;
            return (
              <button
                key={idx}
                type="button"
                onClick={() => handleSelect(item.categoryValue)}
                className="flex flex-col items-center justify-center py-1.5 px-1 transition-all cursor-pointer group focus:outline-none"
              >
                <div
                  className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-1.5 shadow-2xs group-hover:scale-105 transition-transform ${
                    isSelected ? "ring-2 ring-orange-500 scale-105" : ""
                  } ${item.bgColor}`}
                >
                  <Icon className="w-6 h-6 stroke-[2.2]" />
                </div>
                <span
                  className={`text-[11px] text-center leading-tight transition-colors ${
                    isSelected
                      ? "font-extrabold text-orange-600"
                      : "font-bold text-slate-800 group-hover:text-slate-900"
                  }`}
                >
                  {item.name}
                </span>
              </button>
            );
          })}

          {/* Desktop Expander / Collapser Button */}
          <button
            type="button"
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex flex-col items-center justify-center py-1.5 px-1 transition-all cursor-pointer group focus:outline-none"
          >
            <div className="w-12 h-12 rounded-2xl bg-slate-200/80 text-slate-700 flex items-center justify-center mb-1.5 shadow-2xs group-hover:scale-105 transition-transform">
              {isExpanded ? (
                <ChevronUp className="w-6 h-6 stroke-[2.5]" />
              ) : (
                <ChevronDown className="w-6 h-6 stroke-[2.5]" />
              )}
            </div>
            <span className="text-[11px] font-extrabold text-orange-600 text-center leading-tight">
              {isExpanded ? "Less" : "More"}
            </span>
          </button>
        </div>

        {/* Mobile View: 3 columns grid (5 items + 1 More/Less button = 6 tiles collapsed) */}
        <div className="grid md:hidden grid-cols-3 gap-y-4 gap-x-2">
          {mobileVisible.map((item, idx) => {
            const Icon = item.icon;
            const isSelected = selectedCategory === item.categoryValue;
            return (
              <button
                key={idx}
                type="button"
                onClick={() => handleSelect(item.categoryValue)}
                className="flex flex-col items-center justify-center py-1.5 px-1 transition-all cursor-pointer group focus:outline-none"
              >
                <div
                  className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-1.5 shadow-2xs group-hover:scale-105 transition-transform ${
                    isSelected ? "ring-2 ring-orange-500 scale-105" : ""
                  } ${item.bgColor}`}
                >
                  <Icon className="w-6 h-6 stroke-[2.2]" />
                </div>
                <span
                  className={`text-[11px] text-center leading-tight transition-colors ${
                    isSelected
                      ? "font-extrabold text-orange-600"
                      : "font-bold text-slate-800 group-hover:text-slate-900"
                  }`}
                >
                  {item.name}
                </span>
              </button>
            );
          })}

          {/* Mobile Expander / Collapser Button */}
          <button
            type="button"
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex flex-col items-center justify-center py-1.5 px-1 transition-all cursor-pointer group focus:outline-none"
          >
            <div className="w-12 h-12 rounded-2xl bg-slate-200/80 text-slate-700 flex items-center justify-center mb-1.5 shadow-2xs group-hover:scale-105 transition-transform">
              {isExpanded ? (
                <ChevronUp className="w-6 h-6 stroke-[2.5]" />
              ) : (
                <ChevronDown className="w-6 h-6 stroke-[2.5]" />
              )}
            </div>
            <span className="text-[11px] font-extrabold text-orange-600 text-center leading-tight">
              {isExpanded ? "Less" : "More"}
            </span>
          </button>
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

