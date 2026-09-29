"use client";

import React from "react";
import {
  Sparkles,
  UtensilsCrossed,
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
  Store,
  Compass,
} from "lucide-react";

interface CategorySelectorProps {
  categories: string[];
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
}

export function CategorySelector({
  categories,
  selectedCategory,
  onSelectCategory,
}: CategorySelectorProps) {
  const getCategoryIcon = (name: string) => {
    switch (name) {
      case "All Deals":
        return <Sparkles className="w-4 h-4 text-orange-500" />;
      case "Food":
      case "Dining & Cafes":
        return <UtensilsCrossed className="w-4 h-4 text-amber-500" />;
      case "Salon & Spa":
        return <Scissors className="w-4 h-4 text-pink-500" />;
      case "Grocery":
        return <ShoppingCart className="w-4 h-4 text-emerald-500" />;
      case "Fashion":
        return <ShoppingBag className="w-4 h-4 text-purple-500" />;
      case "Electronics":
        return <Smartphone className="w-4 h-4 text-blue-500" />;
      case "Fitness":
        return <Dumbbell className="w-4 h-4 text-red-500" />;
      case "Pharmacy":
        return <Pill className="w-4 h-4 text-teal-500" />;
      case "Entertainment":
        return <Film className="w-4 h-4 text-indigo-500" />;
      case "Auto Care":
        return <Car className="w-4 h-4 text-cyan-500" />;
      case "Home & Living":
        return <Home className="w-4 h-4 text-rose-500" />;
      case "Recruitment":
        return <Briefcase className="w-4 h-4 text-yellow-600" />;
      case "Professional":
        return <UserCheck className="w-4 h-4 text-slate-600" />;
      case "Property":
      case "Property Request":
        return <Building className="w-4 h-4 text-sky-600" />;
      case "Products":
        return <Package className="w-4 h-4 text-orange-600" />;
      case "Wholesale":
        return <Store className="w-4 h-4 text-violet-600" />;
      default:
        return <Compass className="w-4 h-4 text-orange-500" />;
    }
  };

  const allItems = ["All Deals", ...categories];

  return (
    <div className="w-full overflow-x-auto no-scrollbar py-2 px-1 flex items-center gap-2 border-b border-slate-100">
      {allItems.map((name) => {
        const val = name === "All Deals" ? "" : name;
        const isSelected = selectedCategory === val;
        return (
          <button
            key={name}
            type="button"
            onClick={() => onSelectCategory(val)}
            className={`flex-shrink-0 inline-flex items-center gap-2 px-3.5 py-2 rounded-2xl font-bold text-xs sm:text-sm transition-all duration-200 cursor-pointer ${
              isSelected
                ? "bg-orange-500 text-white shadow-md shadow-orange-500/20 scale-[1.02]"
                : "bg-slate-100 text-slate-700 hover:bg-slate-200/80 hover:text-slate-900 border border-slate-200/60"
            }`}
          >
            <span
              className={`p-1 rounded-lg transition-colors ${
                isSelected ? "bg-white/20 text-white" : "bg-white shadow-xs"
              }`}
            >
              {getCategoryIcon(name)}
            </span>
            <span>{name}</span>
          </button>
        );
      })}
    </div>
  );
}
