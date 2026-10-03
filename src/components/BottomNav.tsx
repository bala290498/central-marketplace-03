"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  Sparkles,
  ListFilter,
  PlusCircle,
  Star,
} from "lucide-react";

export function BottomNav() {
  const pathname = usePathname();

  const isHome = pathname === "/";
  const isSpotlight = pathname === "/spotlight";
  const isList = pathname === "/list";
  const isPost = pathname === "/register";
  const isMustTry = pathname === "/must-try";

  return (
    <>
      {/* Mobile Fixed Bottom Navigation Bar (Home | Spotlight | List | Free Posting | Must Try) */}
      <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200/90 py-2 px-1 md:hidden shadow-lg shadow-slate-900/10">
        <div className="max-w-md mx-auto grid grid-cols-5 items-center justify-between text-center relative">
          {/* Tab 1: Home */}
          <Link
            href="/"
            className={`flex flex-col items-center justify-center py-0.5 rounded-xl transition-colors ${
              isHome
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
              isSpotlight
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
              isList
                ? "text-orange-600 font-black"
                : "text-slate-500 hover:text-slate-900 font-bold"
            }`}
          >
            <ListFilter className="w-5 h-5 mb-0.5 stroke-[2.2]" />
            <span className="text-[10px] tracking-tight font-bold">List</span>
          </Link>

          {/* Tab 4: Free Posting */}
          <Link
            href="/register"
            className={`flex flex-col items-center justify-center py-0.5 rounded-xl transition-colors ${
              isPost
                ? "text-orange-600 font-black"
                : "text-slate-500 hover:text-slate-900 font-bold"
            }`}
          >
            <PlusCircle className="w-5 h-5 mb-0.5 stroke-[2.2]" />
            <span className="text-[9px] tracking-tight font-bold leading-none whitespace-nowrap">Free Posting</span>
          </Link>

          {/* Tab 5: Must Try */}
          <Link
            href="/must-try"
            className={`flex flex-col items-center justify-center py-0.5 rounded-xl transition-colors ${
              isMustTry
                ? "text-orange-600 font-black"
                : "text-slate-500 hover:text-slate-900 font-bold"
            }`}
          >
            <Star className="w-5 h-5 mb-0.5 stroke-[2.2]" />
            <span className="text-[9.5px] tracking-tight font-bold leading-none whitespace-nowrap">Must Try</span>
          </Link>
        </div>
      </nav>
    </>
  );
}

