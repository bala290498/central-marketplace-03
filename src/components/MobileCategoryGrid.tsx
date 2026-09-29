"use client";

import React from "react";
import {
  Home,
  Briefcase,
  UserCheck,
  Package,
  Wrench,
  Utensils,
  Car,
  ShoppingCart,
  Store,
  GraduationCap,
  Calendar,
  Tag,
} from "lucide-react";

interface MobileCategoryGridProps {
  selectedCategory: string;
  onSelectCategory: (cat: string) => void;
}

export function MobileCategoryGrid({
  selectedCategory,
  onSelectCategory,
}: MobileCategoryGridProps) {
  const appCategories = [
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
      name: "Wholesale",
      categoryValue: "Wholesale",
      icon: Store,
      bgColor: "bg-teal-100/90 text-teal-600",
    },
    {
      name: "Education",
      categoryValue: "Recruitment",
      icon: GraduationCap,
      bgColor: "bg-indigo-100/90 text-indigo-600",
    },
    {
      name: "Events",
      categoryValue: "Entertainment",
      icon: Calendar,
      bgColor: "bg-rose-100/90 text-rose-600",
    },
    {
      name: "Deals & Offers",
      categoryValue: "",
      icon: Tag,
      bgColor: "bg-red-100/90 text-red-600",
    },
  ];

  return (
    <div className="w-full bg-white rounded-3xl p-4 border border-slate-200/80 shadow-xs mb-6">
      <div className="grid grid-cols-4 gap-3">
        {appCategories.map((item, idx) => {
          const Icon = item.icon;
          const isSelected = selectedCategory === item.categoryValue;
          return (
            <button
              key={idx}
              type="button"
              onClick={() => onSelectCategory(item.categoryValue)}
              className={`flex flex-col items-center justify-center p-2 rounded-2xl transition-all ${
                isSelected
                  ? "ring-2 ring-blue-600 bg-blue-50/50 scale-105"
                  : "hover:bg-slate-50"
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
      </div>
    </div>
  );
}
