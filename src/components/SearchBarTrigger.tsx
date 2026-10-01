"use client";

import React from "react";
import { Search } from "lucide-react";

interface SearchBarTriggerProps {
  onClick: () => void;
  placeholder?: string;
  className?: string;
  variant?: "home" | "compact";
}

export function SearchBarTrigger({
  onClick,
  placeholder = "Search deals, stores, categories...",
  className = "",
  variant = "home",
}: SearchBarTriggerProps) {
  if (variant === "compact") {
    return (
      <button
        type="button"
        onClick={onClick}
        className={`w-full sm:w-56 flex items-center gap-2 px-3 py-2.5 rounded-xl border border-slate-200 bg-white hover:border-orange-300 hover:bg-orange-50/30 text-slate-700 text-xs font-bold shadow-xs transition-all cursor-pointer truncate ${className}`}
        title="Click to search"
      >
        <Search className="w-4 h-4 text-orange-500 flex-shrink-0" />
        <span className="truncate text-slate-500 font-semibold">{placeholder}</span>
      </button>
    );
  }

  return (
    <div
      onClick={onClick}
      className={`w-full relative flex items-center gap-3 px-4 py-3 rounded-2xl border border-slate-200/90 bg-white hover:border-orange-300 hover:shadow-md shadow-xs transition-all duration-200 cursor-pointer group ${className}`}
    >
      <div className="w-8 h-8 rounded-xl bg-orange-50 text-orange-500 flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
        <Search className="w-4 h-4 stroke-[2.5]" />
      </div>
      <span className="text-xs sm:text-sm font-semibold text-slate-400 flex-1 truncate group-hover:text-slate-600 transition-colors">
        {placeholder}
      </span>
      <span className="px-2 py-0.5 rounded-md bg-slate-100 text-[10px] font-black text-slate-500 border border-slate-200/60 hidden sm:inline-block">
        ⌘K / Search
      </span>
    </div>
  );
}
