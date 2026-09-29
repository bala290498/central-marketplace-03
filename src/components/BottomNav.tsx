"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  ListFilter,
  PlusCircle,
  MoreHorizontal,
} from "lucide-react";
import { MoreDrawer } from "./MoreDrawer";

export function BottomNav() {
  const pathname = usePathname();
  const [isMoreOpen, setIsMoreOpen] = useState(false);

  const isHome = pathname === "/";
  const isList = pathname === "/list";
  const isPost = pathname === "/list-your-business";

  return (
    <>
      {/* Mobile Fixed Bottom Navigation Bar (Home | List | Post | More) */}
      <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200/90 py-1.5 px-3 md:hidden shadow-lg shadow-slate-900/10">
        <div className="max-w-md mx-auto grid grid-cols-4 items-center justify-between text-center relative">
          {/* Tab 1: Home */}
          <Link
            href="/"
            className={`flex flex-col items-center justify-center py-1 rounded-xl transition-colors ${
              isHome && !isMoreOpen
                ? "text-orange-600 font-extrabold"
                : "text-slate-500 hover:text-slate-900 font-medium"
            }`}
          >
            <Home className="w-5 h-5 mb-0.5" />
            <span className="text-[10px] tracking-tight">Home</span>
          </Link>

          {/* Tab 2: List */}
          <Link
            href="/list"
            className={`flex flex-col items-center justify-center py-1 rounded-xl transition-colors ${
              isList && !isMoreOpen
                ? "text-orange-600 font-extrabold"
                : "text-slate-500 hover:text-slate-900 font-medium"
            }`}
          >
            <ListFilter className="w-5 h-5 mb-0.5" />
            <span className="text-[10px] tracking-tight">List</span>
          </Link>

          {/* Tab 3: Free Listing */}
          <Link
            href="/list-your-business"
            className={`flex flex-col items-center justify-center py-1 rounded-xl transition-colors ${
              isPost && !isMoreOpen
                ? "text-orange-600 font-extrabold"
                : "text-slate-500 hover:text-slate-900 font-medium"
            }`}
          >
            <PlusCircle className="w-5 h-5 mb-0.5" />
            <span className="text-[9px] tracking-tight font-semibold leading-none">Free Listing</span>
          </Link>

          {/* Tab 4: More */}
          <button
            type="button"
            onClick={() => setIsMoreOpen(true)}
            className={`flex flex-col items-center justify-center py-1 rounded-xl transition-colors cursor-pointer ${
              isMoreOpen
                ? "text-orange-600 font-extrabold"
                : "text-slate-500 hover:text-slate-900 font-medium"
            }`}
          >
            <MoreHorizontal className="w-5 h-5 mb-0.5" />
            <span className="text-[10px] tracking-tight">More</span>
          </button>
        </div>
      </nav>

      {/* Bottom Sheet Attached Modal for "More" */}
      <MoreDrawer
        isOpen={isMoreOpen}
        onClose={() => setIsMoreOpen(false)}
      />
    </>
  );
}
