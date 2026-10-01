"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  Sparkles,
  ListFilter,
  PlusCircle,
  MoreHorizontal,
} from "lucide-react";
import { MoreDrawer } from "./MoreDrawer";

export function BottomNav() {
  const pathname = usePathname();
  const [isMoreOpen, setIsMoreOpen] = useState(false);

  const isHome = pathname === "/";
  const isSpotlight = pathname === "/spotlight";
  const isList = pathname === "/list";
  const isPost = pathname === "/register";

  return (
    <>
      {/* Mobile Fixed Bottom Navigation Bar (Home | Spotlight | List | Free Listing | More) */}
      <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200/90 py-2 px-1 md:hidden shadow-lg shadow-slate-900/10">
        <div className="max-w-md mx-auto grid grid-cols-5 items-center justify-between text-center relative">
          {/* Tab 1: Home */}
          <Link
            href="/"
            className={`flex flex-col items-center justify-center py-0.5 rounded-xl transition-colors ${
              isHome && !isMoreOpen
                ? "text-orange-600 font-black"
                : "text-slate-500 hover:text-slate-900 font-bold"
            }`}
          >
            <Home className="w-5 h-5 mb-0.5 stroke-[2.2]" />
            <span className="text-[10px] tracking-tight font-bold">Home</span>
          </Link>

          {/* Tab 2: Spotlight */}
          <Link
            href="/spotlight"
            className={`flex flex-col items-center justify-center py-0.5 rounded-xl transition-colors ${
              isSpotlight && !isMoreOpen
                ? "text-orange-600 font-black"
                : "text-slate-500 hover:text-slate-900 font-bold"
            }`}
          >
            <Sparkles className="w-5 h-5 mb-0.5 stroke-[2.2]" />
            <span className="text-[9.5px] tracking-tight font-bold leading-none">Spotlight</span>
          </Link>

          {/* Tab 3: List */}
          <Link
            href="/list"
            className={`flex flex-col items-center justify-center py-0.5 rounded-xl transition-colors ${
              isList && !isMoreOpen
                ? "text-orange-600 font-black"
                : "text-slate-500 hover:text-slate-900 font-bold"
            }`}
          >
            <ListFilter className="w-5 h-5 mb-0.5 stroke-[2.2]" />
            <span className="text-[10px] tracking-tight font-bold">List</span>
          </Link>

          {/* Tab 4: Free Listing */}
          <Link
            href="/register"
            className={`flex flex-col items-center justify-center py-0.5 rounded-xl transition-colors ${
              isPost && !isMoreOpen
                ? "text-orange-600 font-black"
                : "text-slate-500 hover:text-slate-900 font-bold"
            }`}
          >
            <PlusCircle className="w-5 h-5 mb-0.5 stroke-[2.2]" />
            <span className="text-[9.5px] tracking-tight font-bold leading-none">Listing</span>
          </Link>

          {/* Tab 5: More */}
          <button
            type="button"
            onClick={() => setIsMoreOpen(true)}
            className={`flex flex-col items-center justify-center py-0.5 rounded-xl transition-colors cursor-pointer ${
              isMoreOpen
                ? "text-orange-600 font-black"
                : "text-slate-500 hover:text-slate-900 font-bold"
            }`}
          >
            <MoreHorizontal className="w-5 h-5 mb-0.5 stroke-[2.2]" />
            <span className="text-[10px] tracking-tight font-bold">More</span>
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
