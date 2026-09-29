"use client";

import React, { useState } from "react";
import {
  Home,
  Briefcase,
  UserCheck,
  Package,
  Wrench,
  Utensils,
  Car,
  ShoppingCart,
  Grid,
} from "lucide-react";
import { AllCategoriesModal } from "./AllCategoriesModal";

interface MobileCategoryGridProps {
  selectedCategory: string;
  onSelectCategory: (cat: string) => void;
}

export function MobileCategoryGrid({
  selectedCategory,
  onSelectCategory,
}: MobileCategoryGridProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // 3x3 grid: 8 categories + 1 "View All" button
  const gridCategories = [
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
  ];

  const handleSelect = (catValue: string) => {
    onSelectCategory(catValue);
    const el = document.getElementById("offers-section");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <div className="w-full bg-white rounded-3xl p-4 border border-slate-200/80 shadow-xs mb-6">
        <div className="grid grid-cols-3 gap-3">
          {gridCategories.map((item, idx) => {
            const Icon = item.icon;
            const isSelected = selectedCategory === item.categoryValue;
            return (
              <button
                key={idx}
                type="button"
                onClick={() => handleSelect(item.categoryValue)}
                className={`flex flex-col items-center justify-center p-2.5 rounded-2xl transition-all ${
                  isSelected
                    ? "ring-2 ring-blue-600 bg-blue-50/50 scale-105"
                    : "hover:bg-slate-50 border border-slate-100/80"
                }`}
              >
                <div
                  className={`w-11 h-11 rounded-2xl flex items-center justify-center mb-1.5 shadow-xs transition-transform ${item.bgColor}`}
                >
                  <Icon className="w-5 h-5 stroke-[2.2]" />
                </div>
                <span className="text-[11px] font-bold text-slate-800 text-center leading-tight">
                  {item.name}
                </span>
              </button>
            );
          })}

          {/* 9th Slot: View All Categories Tile */}
          <button
            type="button"
            onClick={() => setIsModalOpen(true)}
            className="flex flex-col items-center justify-center p-2.5 rounded-2xl border border-slate-200 bg-slate-50 hover:bg-slate-100 transition-all group"
          >
            <div className="w-11 h-11 rounded-2xl bg-slate-200/80 text-slate-700 flex items-center justify-center mb-1.5 shadow-xs group-hover:scale-105 transition-transform">
              <Grid className="w-5 h-5 stroke-[2.2]" />
            </div>
            <span className="text-[11px] font-extrabold text-blue-600 text-center leading-tight">
              View All
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
