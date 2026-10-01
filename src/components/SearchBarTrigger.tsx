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
}: SearchBarTriggerProps) {
  return (
    <div
      onClick={onClick}
      className={`w-full relative flex items-center gap-2.5 px-3.5 py-2 sm:py-2.5 rounded-full border border-slate-200/90 bg-white hover:border-orange-300 hover:shadow-md shadow-xs transition-all duration-200 cursor-pointer group ${className}`}
    >
      <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-orange-50 text-orange-500 flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
        <Search className="w-4 h-4 stroke-[2.5]" />
      </div>
      <span className="text-xs sm:text-sm font-semibold text-slate-400 flex-1 truncate group-hover:text-slate-600 transition-colors">
        {placeholder}
      </span>
    </div>
  );
}
