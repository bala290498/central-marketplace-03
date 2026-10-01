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
  FileText,
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
    { href: "/spotlight", label: "Spotlight" },
    { href: "/list", label: "List" },
    { href: "/register", label: "Free Listing" },
  ];

  const moreSubLinks = [
    { href: "/about-us", label: "Why Central Marketplace", icon: HelpCircle },
    { href: "/we-are-hiring", label: "We're hiring", icon: Users },
    { href: "/report-an-issue", label: "Report an issue", icon: ShieldAlert },
    { href: "/terms", label: "Terms & Conditions", icon: FileText },
  ];

  return (
    <header
      className={`relative z-50 ${
        isSticky ? "sticky top-0" : ""
      } bg-white/95 backdrop-blur-md border-b border-slate-200/80 py-3.5 sm:py-3 shadow-xs`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-2.5">
        <div className="flex items-center justify-between gap-3 sm:gap-4">
          {/* Brand Title (Left Side on Desktop & Mobile) */}
          <div className="flex items-center gap-3 sm:gap-3.5 min-w-0">
            <Link
              href="/"
              className="inline-flex items-center outline-none focus:outline-none focus:ring-0 rounded-lg transition-colors group flex-shrink-0"
            >
              <span className="font-extrabold text-base sm:text-lg tracking-tight whitespace-nowrap">
                <span className="text-orange-500">Central</span>{" "}
                <span className="text-slate-900">Marketplace</span>
              </span>
            </Link>

            {onDetectLocation && (
              <>
                <div className="hidden md:block h-5.5 w-px bg-slate-300 flex-shrink-0 select-none" />

                {/* Location Button on Desktop (Next to title with vertical line) */}
                <button
                  type="button"
                  onClick={onDetectLocation}
                  disabled={isLocating}
                  className="hidden md:inline-flex items-center gap-1.5 text-sm font-bold text-slate-700 hover:text-orange-600 transition-colors cursor-pointer bg-transparent border-0 p-0 outline-none min-w-0 truncate"
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
                      <span className="text-slate-800 font-bold truncate">
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

          {/* Location Button on Mobile (Pushed to Right Side, No Vertical Line) */}
          {onDetectLocation && (
            <button
              type="button"
              onClick={onDetectLocation}
              disabled={isLocating}
              className="md:hidden inline-flex items-center gap-1 text-xs font-bold text-slate-700 hover:text-orange-600 transition-colors cursor-pointer bg-transparent border-0 p-0 outline-none min-w-0 truncate ml-auto"
              title={userAreaLabel ? `Location: ${userAreaLabel}` : "Allow location access"}
            >
              {isLocating ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin text-orange-500 flex-shrink-0" />
                  <span className="text-slate-500 truncate">Locating...</span>
                </>
              ) : userLocation && userAreaLabel ? (
                <>
                  <MapPin className="w-3.5 h-3.5 text-orange-500 flex-shrink-0" />
                  <span className="text-slate-800 font-bold truncate max-w-[140px] xs:max-w-[180px]">
                    {userAreaLabel}
                  </span>
                </>
              ) : (
                <>
                  <MapPin className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
                  <span className="text-slate-600 hover:text-slate-900 truncate">
                    Allow location
                  </span>
                </>
              )}
            </button>
          )}

          {/* Desktop Nav Links & More Hover Dropdown */}
          <nav className="hidden md:flex items-center space-x-1 sm:space-x-2">

            {mainNavLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative py-1 px-2.5 text-xs sm:text-sm font-extrabold transition-colors ${
                    isActive
                      ? "text-orange-500"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  <span>{link.label}</span>
                  {isActive && (
                    <span className="absolute bottom-0 left-1 right-1 h-0.5 bg-orange-500 rounded-full" />
                  )}
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
                className={`relative inline-flex items-center gap-1 py-1 px-2.5 text-xs sm:text-sm font-extrabold transition-colors cursor-pointer ${
                  moreSubLinks.some((l) => pathname === l.href) || isMoreDropdownOpen
                    ? "text-orange-500"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                <span>More</span>
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform duration-200 ${
                    isMoreDropdownOpen ? "transform rotate-180 text-orange-500" : ""
                  }`}
                />
                {(moreSubLinks.some((l) => pathname === l.href) || isMoreDropdownOpen) && (
                  <span className="absolute bottom-0 left-1 right-1 h-0.5 bg-orange-500 rounded-full" />
                )}
              </button>

              {/* Collapsible Dropdown Menu */}
              {isMoreDropdownOpen && (
                <div className="absolute right-0 top-full mt-1 w-max min-w-[220px] bg-white/95 backdrop-blur-md rounded-2xl p-1.5 shadow-xl border border-slate-200/90 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                  {moreSubLinks.map((sub) => {
                    const SubIcon = sub.icon;
                    const isSubActive = pathname === sub.href;
                    return (
                      <Link
                        key={sub.href}
                        href={sub.href}
                        onClick={() => setIsMoreDropdownOpen(false)}
                        className={`flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                          isSubActive
                            ? "bg-orange-50 text-orange-600"
                            : "text-slate-700 hover:bg-slate-100 hover:text-slate-900"
                        }`}
                      >
                        <SubIcon className="w-4 h-4 text-slate-500 shrink-0" />
                        <span className="whitespace-nowrap">{sub.label}</span>
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
