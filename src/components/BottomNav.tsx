"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  ListFilter,
  Plus,
  ShieldAlert,
  Grid,
} from "lucide-react";
import { MoreDrawer } from "./MoreDrawer";
import { ReportModal } from "./ReportModal";

export function BottomNav() {
  const pathname = usePathname();
  const [isMoreOpen, setIsMoreOpen] = useState(false);
  const [isReportOpen, setIsReportOpen] = useState(false);

  const isHome = pathname === "/";

  return (
    <>
      {/* Mobile Fixed Bottom Navigation Bar */}
      <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200/90 py-1.5 px-3 md:hidden shadow-lg shadow-slate-900/10">
        <div className="max-w-md mx-auto flex items-center justify-around relative">
          {/* Tab 1: Home */}
          <Link
            href="/"
            className={`flex flex-col items-center justify-center py-1 px-2.5 rounded-xl transition-colors ${
              isHome && !isMoreOpen && !isReportOpen
                ? "text-blue-600 font-extrabold"
                : "text-slate-500 hover:text-slate-900"
            }`}
          >
            <Home className="w-5 h-5 mb-0.5" />
            <span className="text-[10px]">Home</span>
          </Link>

          {/* Tab 2: List */}
          <Link
            href="/"
            onClick={() => {
              const el = document.getElementById("offers-section");
              if (el) el.scrollIntoView({ behavior: "smooth" });
            }}
            className="flex flex-col items-center justify-center py-1 px-2.5 rounded-xl text-slate-500 hover:text-slate-900 transition-colors"
          >
            <ListFilter className="w-5 h-5 mb-0.5" />
            <span className="text-[10px] font-semibold">List</span>
          </Link>

          {/* Tab 3: Center Post Action Button */}
          <div className="relative -top-4 flex items-center justify-center">
            <Link
              href="/list-your-business"
              className="w-13 h-13 rounded-full bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center shadow-lg shadow-blue-600/35 border-4 border-white transition-transform active:scale-95"
              title="Post a Listing"
            >
              <Plus className="w-7 h-7 stroke-[2.5]" />
            </Link>
          </div>

          {/* Tab 4: Report */}
          <button
            type="button"
            onClick={() => setIsReportOpen(true)}
            className={`flex flex-col items-center justify-center py-1 px-2.5 rounded-xl transition-colors ${
              isReportOpen ? "text-red-600 font-extrabold" : "text-slate-500 hover:text-slate-900"
            }`}
          >
            <ShieldAlert className="w-5 h-5 mb-0.5" />
            <span className="text-[10px] font-semibold">Report</span>
          </button>

          {/* Tab 5: More (Replaced Profile with suitable Grid icon) */}
          <button
            type="button"
            onClick={() => setIsMoreOpen(true)}
            className={`flex flex-col items-center justify-center py-1 px-2.5 rounded-xl transition-colors ${
              isMoreOpen ? "text-orange-600 font-extrabold" : "text-slate-500 hover:text-slate-900"
            }`}
          >
            <Grid className="w-5 h-5 mb-0.5" />
            <span className="text-[10px] font-semibold">More</span>
          </button>
        </div>
      </nav>

      {/* Bottom Sheet Attached Modal for "More" */}
      <MoreDrawer
        isOpen={isMoreOpen}
        onClose={() => setIsMoreOpen(false)}
        onOpenReport={() => setIsReportOpen(true)}
      />

      {/* Report Modal */}
      <ReportModal
        isOpen={isReportOpen}
        onClose={() => setIsReportOpen(false)}
      />
    </>
  );
}
