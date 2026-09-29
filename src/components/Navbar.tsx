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
  const [isHidden, setIsHidden] = useState(false);
  const [isCompact, setIsCompact] = useState(false);
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

  // Scroll listener for hide-on-scroll-down and show-on-scroll-up header (only if isSticky is true)
  useEffect(() => {
    if (!isSticky) return;

    let lastY = window.scrollY || 0;

    const handleScroll = () => {
      const y = Math.max(0, window.scrollY || 0);
      const delta = y - lastY;
      lastY = y;

      if (y < 30) {
        setIsHidden(false);
        setIsCompact(false);
        return;
      }

      if (delta > 6) {
        setIsHidden(true);
        setIsCompact(true);
      } else if (delta < -6) {
        setIsHidden(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isSticky]);

  const mainNavLinks = [
    { href: "/", label: "Home" },
    { href: "/list", label: "List" },
    { href: "/list-your-business", label: "Free Listing" },
  ];

  const moreSubLinks = [
    { href: "/how-it-works", label: "How it works", icon: HelpCircle },
    { href: "/we-are-hiring", label: "We're hiring", icon: Users },
    { href: "/report-an-issue", label: "Report an issue", icon: ShieldAlert },
  ];

  return (
    <header
      className={`${
        isSticky
          ? `sticky top-0 z-40 transition-all duration-300 ${
              isHidden ? "-translate-y-full opacity-0 pointer-events-none" : "translate-y-0 opacity-100"
            }`
          : ""
      } bg-white/95 backdrop-blur-md border-b border-slate-200/80 ${
        isCompact ? "py-2 shadow-xs" : "py-3 shadow-sm"
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-2.5">
        <div className="flex items-center justify-between gap-4">
          {/* Brand Logo & Title + Location (Desktop Header Group) */}
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="flex items-center gap-3 group outline-none focus:outline-none focus:ring-0 rounded-xl p-1 -ml-1 transition-all"
            >
              <img
                src="/logo/cm-icon.svg"
                alt="Central Marketplace Logo"
                className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl shadow-md shadow-orange-500/25 group-hover:scale-105 transition-transform duration-200 object-cover"
              />
              <div className="flex flex-col justify-center leading-tight">
                <div className="font-extrabold text-slate-900 text-sm sm:text-base tracking-tight group-hover:text-orange-600 transition-colors leading-tight">
                  Central <br /> Marketplace
                </div>
              </div>
            </Link>

            {/* Vertical Divider Line & Location Button (Desktop Header) */}
            {onDetectLocation && (
              <div className="hidden md:flex items-center gap-3">
                <div className="h-7 w-px bg-slate-200/90 select-none" />
                <button
                  type="button"
                  onClick={onDetectLocation}
                  disabled={isLocating}
                  className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full font-semibold text-xs sm:text-sm transition-all duration-200 border cursor-pointer ${
                    userLocation && userAreaLabel
                      ? "bg-orange-50 text-orange-700 border-orange-200 hover:bg-orange-100"
                      : "bg-orange-500 text-white border-transparent hover:bg-orange-600 shadow-xs shadow-orange-500/20"
                  }`}
                  title={userAreaLabel ? `Location: ${userAreaLabel}` : "Allow location access"}
                >
                  {isLocating ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      <span>Locating...</span>
                    </>
                  ) : userLocation && userAreaLabel ? (
                    <>
                      <MapPin className="w-3.5 h-3.5 text-orange-600 fill-orange-500/20" />
                      <span>{userAreaLabel}</span>
                    </>
                  ) : (
                    <>
                      <Navigation className="w-3.5 h-3.5" />
                      <span>Allow location</span>
                    </>
                  )}
                </button>
              </div>
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

          {/* Mobile Header Right Section: Location Button */}
          <div className="flex md:hidden items-center gap-2">

            {onDetectLocation && (
              <button
                type="button"
                onClick={onDetectLocation}
                disabled={isLocating}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full font-bold text-xs transition-all ${
                  userLocation && userAreaLabel
                    ? "bg-orange-50 text-orange-700 border border-orange-200"
                    : "bg-orange-500 text-white"
                }`}
              >
                {isLocating ? (
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                ) : (
                  <MapPin className="w-3.5 h-3.5" />
                )}
                <span className="max-w-[100px] truncate">
                  {isLocating ? "Locating..." : userAreaLabel ? userAreaLabel : "Location"}
                </span>
              </button>
            )}
          </div>
        </div>
        {children}
      </div>
    </header>
  );
}
