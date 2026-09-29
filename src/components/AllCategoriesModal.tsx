"use client";

import React from "react";
import { X, Tag } from "lucide-react";
import { getCategoryMeta, formatCategoryLabel } from "@/lib/categories";

interface AllCategoriesModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectCategory: (categoryValue: string) => void;
  categories?: string[];
}

const DEFAULT_CATEGORY_LIST = [
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

export function AllCategoriesModal({
  isOpen,
  onClose,
  onSelectCategory,
  categories,
}: AllCategoriesModalProps) {
  if (!isOpen) return null;

  const rawList = categories && categories.length > 0 ? categories : DEFAULT_CATEGORY_LIST;
  const items = rawList.map((cat, idx) => getCategoryMeta(cat, idx));

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
            className="p-1.5 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Grid Body */}
        <div className="p-6 overflow-y-auto">
          <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
            {/* All Deals Option */}
            <button
              type="button"
              onClick={() => {
                onSelectCategory("");
                onClose();
              }}
              className="flex flex-col items-center justify-center p-2.5 rounded-2xl border border-slate-100 hover:border-orange-300 hover:bg-orange-50/40 transition-all group cursor-pointer"
            >
              <div className="w-11 h-11 rounded-2xl bg-orange-100 text-orange-600 flex items-center justify-center mb-1.5 shadow-xs">
                <Tag className="w-5 h-5 stroke-[2.2]" />
              </div>
              <span className="text-[11px] font-extrabold text-slate-800 text-center leading-tight group-hover:text-orange-600">
                All Deals
              </span>
            </button>

            {items.map((item, idx) => {
              const Icon = item.icon;
              return (
                <button
                  key={idx}
                  type="button"
                  onClick={() => {
                    onSelectCategory(item.value);
                    onClose();
                  }}
                  className="flex flex-col items-center justify-center p-2.5 rounded-2xl border border-slate-100 hover:border-blue-300 hover:bg-blue-50/40 transition-all group cursor-pointer"
                >
                  <div className={`w-11 h-11 rounded-2xl flex items-center justify-center mb-1.5 shadow-xs ${item.theme.iconBg} text-white`}>
                    <Icon className="w-5 h-5 stroke-[2.2]" />
                  </div>
                  <span className="text-[11px] font-extrabold text-slate-800 text-center leading-tight whitespace-pre-line group-hover:text-blue-600 max-w-full">
                    {formatCategoryLabel(item.name)}
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
