"use client";

import React, { useState, useEffect, useRef, Suspense } from "react";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  MapPin,
  Navigation,
  Loader2,
  ChevronDown,
  HelpCircle,
  Users,
  ShieldAlert,
} from "lucide-react";
import { UserLocation } from "@/types/offer";

interface NavbarProps {
  userLocation?: UserLocation | null;
  userAreaLabel?: string;
  onDetectLocation?: () => void;
  isLocating?: boolean;
  children?: React.ReactNode;
  isSticky?: boolean;
}



export function Navbar({
  userLocation,
  userAreaLabel = "",
  onDetectLocation,
  isLocating = false,
  children,
  isSticky = true,
}: NavbarProps) {
  const pathname = usePathname();
  const [isMoreDropdownOpen, setIsMoreDropdownOpen] = useState(false);
  const timeoutId = useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = () => {
    if (timeoutId.current) clearTimeout(timeoutId.current);
    setIsMoreDropdownOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutId.current = setTimeout(() => {
      setIsMoreDropdownOpen(false);
    }, 150);
  };

  const mainNavLinks = [
    { href: "/", label: "Home" },
    { href: "/list", label: "List" },
    { href: "/register", label: "Free Listing" },
  ];

  const moreSubLinks = [
    { href: "/about-us", label: "Why Central Marketplace", icon: HelpCircle },
    { href: "/we-are-hiring", label: "We're hiring", icon: Users },
    { href: "/report-an-issue", label: "Report an issue", icon: ShieldAlert },
  ];

  return (
    <header
      className={`relative z-50 ${
        isSticky ? "sticky top-0" : ""
      } bg-white/95 backdrop-blur-md border-b border-slate-200/80 py-3.5 sm:py-3 shadow-xs`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-2.5">
        <div className="flex items-center justify-between gap-3 sm:gap-4">
          {/* Brand Title + Vertical Line + Location (Desktop & Mobile) */}
          <div className="flex items-center gap-3 sm:gap-3.5 min-w-0">
            <Link
              href="/"
              className="inline-flex items-center outline-none focus:outline-none focus:ring-0 rounded-lg transition-colors group flex-shrink-0"
            >
              <span className="font-extrabold text-orange-500 text-base sm:text-lg tracking-tight hover:text-orange-600 transition-colors whitespace-nowrap">
                Central Marketplace
              </span>
            </Link>

            {onDetectLocation && (
              <>
                <div className="h-5 sm:h-5.5 w-px bg-slate-300 flex-shrink-0 select-none" />

                <button
                  type="button"
                  onClick={onDetectLocation}
                  disabled={isLocating}
                  className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-slate-700 hover:text-orange-600 transition-colors cursor-pointer bg-transparent border-0 p-0 outline-none min-w-0 truncate"
                  title={userAreaLabel ? `Location: ${userAreaLabel}` : "Allow location access"}
                >
                  {isLocating ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin text-orange-500 flex-shrink-0" />
                      <span className="text-slate-500 truncate">Locating...</span>
                    </>
                  ) : userLocation && userAreaLabel ? (
                    <>
                      <MapPin className="w-4 h-4 text-orange-500 flex-shrink-0" />
                      <span className="text-slate-800 font-bold truncate max-w-[130px] xs:max-w-[170px] sm:max-w-[220px] md:max-w-none">
                        {userAreaLabel}
                      </span>
                    </>
                  ) : (
                    <>
                      <MapPin className="w-4 h-4 text-slate-400 flex-shrink-0" />
                      <span className="text-slate-600 hover:text-slate-900 truncate">
                        Allow location
                      </span>
                    </>
                  )}
                </button>
              </>
            )}
          </div>

          {/* Desktop Nav Links & More Hover Dropdown */}
          <nav className="hidden md:flex items-center space-x-1 sm:space-x-1.5">

            {mainNavLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-bold transition-colors ${
                    isActive
                      ? "bg-orange-50 text-orange-600"
                      : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}

            {/* Desktop More Hover Dropdown */}
            <div
              className="relative"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <button
                type="button"
                onClick={() => setIsMoreDropdownOpen(!isMoreDropdownOpen)}
                className={`inline-flex items-center gap-1 px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-bold transition-colors cursor-pointer ${
                  moreSubLinks.some((l) => pathname === l.href) || isMoreDropdownOpen
                    ? "bg-orange-50 text-orange-600"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                }`}
              >
                <span>More</span>
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform duration-200 ${
                    isMoreDropdownOpen ? "transform rotate-180 text-orange-600" : ""
                  }`}
                />
              </button>

              {/* Collapsible Dropdown Menu */}
              {isMoreDropdownOpen && (
                <div className="absolute right-0 top-full mt-1 w-52 bg-white/95 backdrop-blur-md rounded-2xl p-1.5 shadow-xl border border-slate-200/90 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                  {moreSubLinks.map((sub) => {
                    const SubIcon = sub.icon;
                    const isSubActive = pathname === sub.href;
                    return (
                      <Link
                        key={sub.href}
                        href={sub.href}
                        onClick={() => setIsMoreDropdownOpen(false)}
                        className={`flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-bold transition-all ${
                          isSubActive
                            ? "bg-orange-50 text-orange-600"
                            : "text-slate-700 hover:bg-slate-100 hover:text-slate-900"
                        }`}
                      >
                        <SubIcon className="w-4 h-4 text-slate-500" />
                        <span>{sub.label}</span>
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          </nav>
        </div>
        {children}
      </div>
    </header>
  );
}
