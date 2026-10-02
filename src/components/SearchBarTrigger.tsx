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
  placeholder = "Search deals, shops, locations, categories, badges, services...",
  className = "",
}: SearchBarTriggerProps) {
  return (
    <div
      onClick={onClick}
      className={`w-full relative flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-1 rounded-full border border-slate-200/90 bg-white hover:border-orange-300 hover:shadow-md shadow-xs transition-all duration-200 cursor-pointer group h-[34px] sm:h-[38px] ${className}`}
    >
      <div className="w-5 h-5 sm:w-6.5 sm:h-6.5 rounded-full bg-orange-50 text-orange-500 flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
        <Search className="w-3 h-3 sm:w-3.5 sm:h-3.5 stroke-[2.5]" />
      </div>
      <span className="text-[10px] sm:text-xs font-semibold text-slate-400 flex-1 truncate group-hover:text-slate-600 transition-colors">
        {placeholder}
      </span>
    </div>
  );
}
