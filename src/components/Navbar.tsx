"use client";

import React, { useState, useRef, useMemo } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
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
import { UserLocation, Offer } from "@/types/offer";
import { SearchBarTrigger } from "./SearchBarTrigger";
import { SearchModal } from "./SearchModal";
import { getOffers } from "@/lib/offers";
import { useNotification } from "@/context/NotificationContext";

interface NavbarProps {
  userLocation?: UserLocation | null;
  userAreaLabel?: string;
  onDetectLocation?: () => void;
  isLocating?: boolean;
  onOpenSearch?: () => void;
  offers?: Offer[];
  children?: React.ReactNode;
  isSticky?: boolean;
}

export function Navbar({
  userLocation,
  userAreaLabel = "",
  onDetectLocation,
  isLocating = false,
  onOpenSearch,
  offers,
  children,
  isSticky = true,
}: NavbarProps) {
  const pathname = usePathname();
  const { hasUnread, badgeCount, openNotification } = useNotification();
  const [isMoreDropdownOpen, setIsMoreDropdownOpen] = useState(false);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState<boolean>(false);
  const timeoutId = useRef<NodeJS.Timeout | null>(null);

  const allOffers = useMemo(() => {
    return offers && offers.length > 0 ? offers : getOffers();
  }, [offers]);

  const handleSearchClick = () => {
    if (onOpenSearch) {
      onOpenSearch();
    } else {
      setIsSearchModalOpen(true);
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
    <>
      <header
        className={`relative z-50 ${
          isSticky ? "sticky top-0" : ""
        } bg-white/95 backdrop-blur-md border-b border-slate-200/80 py-2 sm:py-2.5 shadow-xs`}
      >
        <div className="max-w-7xl mx-auto px-3 sm:px-6">
          <div className="flex items-center justify-between gap-1.5 sm:gap-4">
            {/* Brand Title + Location (Left Side) */}
            <div className="flex items-center gap-2 sm:gap-3.5 min-w-0 flex-shrink-0">
              {/* Mobile View (< lg): Brand Name Line 1, Location Icon + Location Name Line 2 */}
              <div className="flex lg:hidden flex-col items-start justify-center min-w-0 leading-tight">
                <Link
                  href="/"
                  className="inline-flex items-center outline-none focus:outline-none focus:ring-0 rounded-lg transition-colors group flex-shrink-0"
                >
                  <span className="font-extrabold text-base xs:text-lg sm:text-xl tracking-tight whitespace-nowrap">
                    <span className="text-orange-500">Central</span>{" "}
                    <span className="text-slate-900">Marketplace</span>
                  </span>
                </Link>

                {onDetectLocation && (
                  <button
                    type="button"
                    onClick={onDetectLocation}
                    disabled={isLocating}
                    className="inline-flex items-center gap-1 text-xs xs:text-sm font-semibold text-slate-600 hover:text-orange-600 transition-colors cursor-pointer bg-transparent border-0 p-0 outline-none min-w-0 mt-0.5"
                    title={userAreaLabel ? `Location: ${userAreaLabel}` : "Allow location access"}
                  >
                    {isLocating ? (
                      <>
                        <Loader2 className="w-3.5 h-3.5 animate-spin text-orange-500 flex-shrink-0" />
                        <span className="text-slate-500 whitespace-nowrap">Locating...</span>
                      </>
                    ) : userLocation && userAreaLabel ? (
                      <>
                        <MapPin className="w-3.5 h-3.5 text-orange-500 flex-shrink-0" />
                        <span className="text-slate-700 font-medium whitespace-nowrap">
                          {userAreaLabel}
                        </span>
                      </>
                    ) : (
                      <>
                        <MapPin className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
                        <span className="text-slate-500 hover:text-slate-900 whitespace-nowrap">
                          Allow location
                        </span>
                      </>
                    )}
                  </button>
                )}
              </div>

              {/* Desktop View (>= lg): Brand Title + Vertical Line + Location Button */}
              <div className="hidden lg:flex items-center gap-3.5 min-w-0 flex-shrink-0">
                <Link
                  href="/"
                  className="inline-flex items-center outline-none focus:outline-none focus:ring-0 rounded-lg transition-colors group flex-shrink-0"
                >
                  <span className="font-extrabold text-lg tracking-tight whitespace-nowrap">
                    <span className="text-orange-500">Central</span>{" "}
                    <span className="text-slate-900">Marketplace</span>
                  </span>
                </Link>

                {onDetectLocation && (
                  <div className="flex items-center gap-2.5">
                    <div className="h-5.5 w-px bg-slate-300 flex-shrink-0 select-none" />
                    <button
                      type="button"
                      onClick={onDetectLocation}
                      disabled={isLocating}
                      className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-700 hover:text-orange-600 transition-colors cursor-pointer bg-transparent border-0 p-0 outline-none min-w-0 truncate"
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
                          <span className="text-slate-700 font-medium truncate max-w-[150px]">
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
                  </div>
                )}
              </div>
            </div>

            {/* Right Side Container: Right-Aligned Nav Links + Search Bar + Notification Bell */}
            <div className="flex items-center justify-end gap-1.5 sm:gap-2.5 ml-auto flex-shrink-0 min-w-0">
              {/* Desktop Nav Links */}
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

              {/* Right-Aligned Search Bar (Both Desktop & Mobile) */}
              <div className="w-[125px] xs:w-[155px] sm:w-[200px] md:w-[230px] lg:w-[260px] flex-shrink-0">
                <SearchBarTrigger
                  onClick={handleSearchClick}
                  placeholder="Search..."
                />
              </div>

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

          {children}
        </div>
      </header>

      {/* Global Search Modal triggered by Header Search Bar */}
      <SearchModal
        isOpen={isSearchModalOpen}
        onClose={() => setIsSearchModalOpen(false)}
        offers={allOffers}
        userLocation={userLocation}
      />
    </>
  );
}
