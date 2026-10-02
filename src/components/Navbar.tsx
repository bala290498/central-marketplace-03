"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  MapPin,
  Loader2,
  ChevronDown,
  HelpCircle,
  Users,
  ShieldAlert,
  FileText,
  Bell,
} from "lucide-react";
import { UserLocation } from "@/types/offer";
import { SearchBarTrigger } from "./SearchBarTrigger";
import { useNotification } from "@/context/NotificationContext";

interface NavbarProps {
  userLocation?: UserLocation | null;
  userAreaLabel?: string;
  onDetectLocation?: () => void;
  isLocating?: boolean;
  onOpenSearch?: () => void;
  children?: React.ReactNode;
  isSticky?: boolean;
}

export function Navbar({
  userLocation,
  userAreaLabel = "",
  onDetectLocation,
  isLocating = false,
  onOpenSearch,
  children,
  isSticky = true,
}: NavbarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const { hasUnread, badgeCount, openNotification } = useNotification();
  const [isMoreDropdownOpen, setIsMoreDropdownOpen] = useState(false);
  const timeoutId = useRef<NodeJS.Timeout | null>(null);

  const handleSearchClick = () => {
    if (onOpenSearch) {
      onOpenSearch();
    } else {
      router.push("/list");
    }
  };

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
    { href: "/register", label: "Free Posting" },
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
      } bg-white/95 backdrop-blur-md border-b border-slate-200/80 py-2.5 sm:py-3 shadow-xs`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-2">
        <div className="flex items-center justify-between gap-2 sm:gap-4">
          {/* Brand Title (Left Side) */}
          <div className="flex items-center gap-2.5 sm:gap-3.5 min-w-0 flex-shrink-0">
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
                <div className="hidden lg:block h-5.5 w-px bg-slate-300 flex-shrink-0 select-none" />

                {/* Location Button on Desktop (Next to title with vertical line) */}
                <button
                  type="button"
                  onClick={onDetectLocation}
                  disabled={isLocating}
                  className="hidden lg:inline-flex items-center gap-1.5 text-sm font-bold text-slate-700 hover:text-orange-600 transition-colors cursor-pointer bg-transparent border-0 p-0 outline-none min-w-0 truncate"
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
                      <span className="text-slate-800 font-bold truncate max-w-[150px]">
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

          {/* Search Bar in Header (Desktop & Tablet) */}
          <div className="hidden md:block flex-1 max-w-sm lg:max-w-md mx-2 sm:mx-3">
            <SearchBarTrigger
              onClick={handleSearchClick}
              placeholder="Search deals, shops, locations, categories..."
            />
          </div>

          {/* Right Side: Location (Mobile) + Desktop Nav Links + Notification Bell */}
          <div className="flex items-center gap-1.5 sm:gap-2 flex-shrink-0 ml-auto md:ml-0">
            {onDetectLocation && (
              <button
                type="button"
                onClick={onDetectLocation}
                disabled={isLocating}
                className="lg:hidden inline-flex items-center gap-1 text-xs font-bold text-slate-700 hover:text-orange-600 transition-colors cursor-pointer bg-transparent border-0 p-0 outline-none min-w-0 truncate"
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
                    <span className="text-slate-800 font-bold truncate max-w-[110px] sm:max-w-[150px]">
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

            {/* Header Right Corner Notification Bell Button */}
            <button
              type="button"
              onClick={openNotification}
              aria-label="Notifications"
              title="Notifications"
              className="relative p-1.5 sm:p-2 rounded-full text-slate-700 hover:text-orange-600 hover:bg-orange-50/60 transition-all cursor-pointer group flex-shrink-0"
            >
              <Bell className="w-5 h-5 stroke-[2.2] group-hover:scale-110 transition-transform text-slate-800 hover:text-orange-600" />
              {hasUnread && (
                <span className="absolute -top-0.5 -right-0.5 w-4.5 h-4.5 sm:w-5 sm:h-5 bg-red-500 text-white rounded-full text-[10px] font-black flex items-center justify-center ring-2 ring-white shadow-md">
                  {badgeCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Search Bar in Header (< md) */}
        <div className="md:hidden w-full pt-0.5">
          <SearchBarTrigger
            onClick={handleSearchClick}
            placeholder="Search deals, shops, locations..."
          />
        </div>

        {children}
      </div>
    </header>
  );
}
