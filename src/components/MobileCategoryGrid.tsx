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
  Grid,
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
    if (onSelectCategory) {
      onSelectCategory(catValue);
    }
    if (catValue) {
      router.push(`/list?category=${encodeURIComponent(catValue)}`);
    } else {
      router.push("/list");
    }
  };

  return (
    <>
      <div className="w-full mb-6">
        <div className="grid grid-cols-3 gap-y-4 gap-x-2">
          {gridCategories.map((item, idx) => {
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
                    isSelected ? "ring-2 ring-blue-600 scale-105" : ""
                  } ${item.bgColor}`}
                >
                  <Icon className="w-6 h-6 stroke-[2.2]" />
                </div>
                <span
                  className={`text-[11px] text-center leading-tight transition-colors ${
                    isSelected
                      ? "font-extrabold text-blue-600"
                      : "font-bold text-slate-800 group-hover:text-slate-900"
                  }`}
                >
                  {item.name}
                </span>
              </button>
            );
          })}

          {/* 9th Slot: View All Categories Tile */}
          <button
            type="button"
            onClick={() => setIsModalOpen(true)}
            className="flex flex-col items-center justify-center py-1.5 px-1 transition-all cursor-pointer group focus:outline-none"
          >
            <div className="w-12 h-12 rounded-2xl bg-slate-200/80 text-slate-700 flex items-center justify-center mb-1.5 shadow-2xs group-hover:scale-105 transition-transform">
              <Grid className="w-6 h-6 stroke-[2.2]" />
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
