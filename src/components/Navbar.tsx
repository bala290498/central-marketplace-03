"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  MapPin,
  Navigation,
  Loader2,
  ChevronDown,
  HelpCircle,
  Users,
  ShieldAlert,
  Search,
  X,
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
  const router = useRouter();
  const [isHidden, setIsHidden] = useState(false);
  const [isCompact, setIsCompact] = useState(false);
  const [isMoreDropdownOpen, setIsMoreDropdownOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const timeoutId = useRef<NodeJS.Timeout | null>(null);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/list?search=${encodeURIComponent(searchQuery.trim())}`);
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
    { href: "/list-your-business", label: "Post" },
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
              <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-orange-500 flex items-center justify-center text-white font-black text-lg shadow-md shadow-orange-500/25 group-hover:scale-105 transition-transform duration-200">
                CM
              </div>
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

          {/* Desktop Nav Links with Search Icon before Home & More Hover Dropdown */}
          <nav className="hidden md:flex items-center space-x-1 sm:space-x-1.5">
            {/* Search Icon / Input immediately BEFORE Home page link */}
            <div className="relative flex items-center mr-0.5 sm:mr-1">
              {isSearchOpen ? (
                <form onSubmit={handleSearchSubmit} className="relative flex items-center">
                  <input
                    type="text"
                    placeholder="Search deals..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    autoFocus
                    className="w-40 sm:w-52 pl-8 pr-7 py-1.5 rounded-xl text-xs sm:text-sm bg-slate-100 border border-orange-200 outline-none focus:outline-none focus:ring-0 font-medium text-slate-800 transition-all"
                  />
                  <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 pointer-events-none" />
                  <button
                    type="button"
                    onClick={() => {
                      setIsSearchOpen(false);
                      setSearchQuery("");
                    }}
                    className="absolute right-2 text-slate-400 hover:text-slate-600 p-0.5 rounded-full cursor-pointer"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </form>
              ) : (
                <button
                  type="button"
                  onClick={() => setIsSearchOpen(true)}
                  className="p-2 rounded-xl text-slate-600 hover:text-orange-600 hover:bg-orange-50 transition-colors cursor-pointer flex items-center justify-center"
                  title="Search deals"
                  aria-label="Search deals"
                >
                  <Search className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
                </button>
              )}
            </div>

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

          {/* Mobile Location Header Button */}
          {onDetectLocation && (
            <div className="flex md:hidden items-center">
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
                <span className="max-w-[110px] truncate">
                  {isLocating ? "Locating..." : userAreaLabel ? userAreaLabel : "Location"}
                </span>
              </button>
            </div>
          )}
        </div>
        {children}
      </div>
    </header>
  );
}
