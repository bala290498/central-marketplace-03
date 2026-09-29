"use client";

import React from "react";
import {
  X,
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
  Scissors,
  Smartphone,
  Dumbbell,
  Pill,
  Film,
} from "lucide-react";

interface AllCategoriesModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectCategory: (categoryValue: string) => void;
}

export function AllCategoriesModal({
  isOpen,
  onClose,
  onSelectCategory,
}: AllCategoriesModalProps) {
  if (!isOpen) return null;

  const categories = [
    { name: "Property", value: "Property", icon: Home, bg: "bg-orange-100 text-orange-600" },
    { name: "Recruitment", value: "Recruitment", icon: Briefcase, bg: "bg-blue-100 text-blue-600" },
    { name: "Professionals", value: "Professional", icon: UserCheck, bg: "bg-purple-100 text-purple-600" },
    { name: "Products", value: "Products", icon: Package, bg: "bg-amber-100 text-amber-600" },
    { name: "Services", value: "Home & Living", icon: Wrench, bg: "bg-sky-100 text-sky-600" },
    { name: "Food", value: "Food", icon: Utensils, bg: "bg-orange-100 text-orange-600" },
    { name: "Salon & Spa", value: "Salon & Spa", icon: Scissors, bg: "bg-pink-100 text-pink-600" },
    { name: "Electronics", value: "Electronics", icon: Smartphone, bg: "bg-blue-100 text-blue-600" },
    { name: "Fitness", value: "Fitness", icon: Dumbbell, bg: "bg-red-100 text-red-600" },
    { name: "Pharmacy", value: "Pharmacy", icon: Pill, bg: "bg-teal-100 text-teal-600" },
    { name: "Entertainment", value: "Entertainment", icon: Film, bg: "bg-indigo-100 text-indigo-600" },
    { name: "Vehicles", value: "Auto Care", icon: Car, bg: "bg-cyan-100 text-cyan-600" },
    { name: "Daily Needs", value: "Daily Needs", icon: ShoppingCart, bg: "bg-emerald-100 text-emerald-600" },
    { name: "Wholesale", value: "Wholesale", icon: Store, bg: "bg-violet-100 text-violet-600" },
    { name: "Education", value: "Recruitment", icon: GraduationCap, bg: "bg-indigo-100 text-indigo-600" },
    { name: "Events", value: "Entertainment", icon: Calendar, bg: "bg-rose-100 text-rose-600" },
    { name: "All Deals & Offers", value: "", icon: Tag, bg: "bg-red-100 text-red-600" },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-slate-900/50 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="w-full max-w-lg bg-white rounded-t-3xl sm:rounded-3xl shadow-2xl border border-slate-200 overflow-hidden max-h-[85vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50/50">
          <div>
            <h2 className="font-extrabold text-slate-900 text-base">All Categories</h2>
            <p className="text-xs text-slate-500">Select a category to filter listings</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-200/60"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Grid Body */}
        <div className="p-6 overflow-y-auto">
          <div className="grid grid-cols-4 gap-3">
            {categories.map((item, idx) => {
              const Icon = item.icon;
              return (
                <button
                  key={idx}
                  type="button"
                  onClick={() => {
                    onSelectCategory(item.value);
                    onClose();
                  }}
                  className="flex flex-col items-center justify-center p-2.5 rounded-2xl border border-slate-100 hover:border-blue-300 hover:bg-blue-50/40 transition-all group"
                >
                  <div className={`w-11 h-11 rounded-2xl flex items-center justify-center mb-1.5 shadow-xs ${item.bg}`}>
                    <Icon className="w-5 h-5 stroke-[2.2]" />
                  </div>
                  <span className="text-[11px] font-bold text-slate-800 text-center leading-tight group-hover:text-blue-600">
                    {item.name}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
