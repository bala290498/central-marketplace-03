"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ListFilter,
  PlusCircle,
  Grid,
} from "lucide-react";
import { MoreDrawer } from "./MoreDrawer";

export function BottomNav() {
  const pathname = usePathname();
  const [isMoreOpen, setIsMoreOpen] = useState(false);

  const isList = pathname === "/list";
  const isPost = pathname === "/list-your-business";

  return (
    <>
      {/* Mobile Fixed Bottom Navigation Bar (Post | Raised List Button | More) */}
      <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200/90 py-1.5 px-4 md:hidden shadow-lg shadow-slate-900/10">
        <div className="max-w-md mx-auto flex items-center justify-around relative">
          {/* Tab 1: Post */}
          <Link
            href="/list-your-business"
            className={`flex flex-col items-center justify-center py-1 px-4 rounded-xl transition-colors ${
              isPost && !isMoreOpen
                ? "text-blue-600 font-extrabold"
                : "text-slate-500 hover:text-slate-900"
            }`}
          >
            <PlusCircle className="w-5 h-5 mb-0.5" />
            <span className="text-[10px] font-bold">Post</span>
          </Link>

          {/* Tab 2: List (Raised Floating Blue Circular Action Button matching reference image) */}
          <div className="relative -top-4 flex flex-col items-center justify-center">
            <Link
              href="/list"
              className="w-13 h-13 rounded-full bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center shadow-lg shadow-blue-600/35 border-4 border-white transition-transform active:scale-95"
              title="All Listings"
            >
              <ListFilter className="w-6 h-6 stroke-[2.5]" />
            </Link>
            <span className="text-[10px] font-black text-blue-600 mt-0.5 tracking-tight">List</span>
          </div>

          {/* Tab 3: More */}
          <button
            type="button"
            onClick={() => setIsMoreOpen(true)}
            className={`flex flex-col items-center justify-center py-1 px-4 rounded-xl transition-colors ${
              isMoreOpen ? "text-orange-600 font-extrabold" : "text-slate-500 hover:text-slate-900"
            }`}
          >
            <Grid className="w-5 h-5 mb-0.5" />
            <span className="text-[10px] font-bold">More</span>
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
