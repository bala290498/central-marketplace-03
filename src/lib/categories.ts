import {
  Sparkles,
  UtensilsCrossed,
  Scissors,
  ShoppingCart,
  ShoppingBag,
  Shirt,
  Smartphone,
  Dumbbell,
  Pill,
  Film,
  Car,
  Home as HomeIcon,
  Briefcase,
  UserCheck,
  Building,
  Package,
  Store,
  Compass,
  Wrench,
  Cpu,
  LucideIcon,
} from "lucide-react";

export interface CategoryMeta {
  name: string;
  value: string;
  icon: LucideIcon;
  theme: {
    bg: string;
    border: string;
    iconBg: string;
    textColor: string;
    badgeBg: string;
  };
}

export const WHITE_CATEGORY_THEME = {
  bg: "bg-white",
  border: "border-slate-200",
  iconBg: "bg-[#F97316]",
  textColor: "text-slate-800",
  badgeBg: "bg-orange-50",
};

export const CATEGORY_THEME_PALETTE = [WHITE_CATEGORY_THEME];

export function getCategoryIcon(categoryName: string = "", title: string = ""): LucideIcon {
  const catLower = (categoryName || "").toLowerCase().trim();
  const titleLower = (title || "").toLowerCase().trim();

  if (catLower === "all" || catLower === "all deals") return Sparkles;
  if (catLower.includes("food") || catLower.includes("dining") || catLower.includes("cafe") || titleLower.includes("restaurant") || titleLower.includes("dinner") || titleLower.includes("food")) {
    return UtensilsCrossed;
  }
  if (catLower.includes("salon") || catLower.includes("spa") || catLower.includes("hair") || titleLower.includes("haircut") || titleLower.includes("beauty")) {
    return Scissors;
  }
  if (catLower.includes("grocery") || catLower.includes("daily") || catLower.includes("supermarket")) {
    return ShoppingCart;
  }
  if (catLower.includes("fashion") || catLower.includes("apparel") || catLower.includes("clothing")) {
    return Shirt;
  }
  if (catLower.includes("electronic service") || catLower.includes("repair")) {
    return Wrench;
  }
  if (catLower.includes("electronics") || catLower.includes("mobile") || titleLower.includes("phone")) {
    return Cpu;
  }
  if (catLower.includes("fitness") || catLower.includes("gym")) {
    return Dumbbell;
  }
  if (catLower.includes("pharmacy") || catLower.includes("medical") || catLower.includes("health")) {
    return Pill;
  }
  if (catLower.includes("entertainment") || catLower.includes("movie") || catLower.includes("cinema")) {
    return Film;
  }
  if (catLower.includes("vehicle") || catLower.includes("auto") || catLower.includes("car")) {
    return Car;
  }
  if (catLower.includes("home service") || catLower.includes("home") || catLower.includes("living")) {
    return HomeIcon;
  }
  if (catLower.includes("recruitment") || catLower.includes("job") || catLower.includes("work")) {
    return Briefcase;
  }
  if (catLower.includes("professional") || catLower.includes("doctor") || catLower.includes("lawyer")) {
    return UserCheck;
  }
  if (catLower.includes("property") || catLower.includes("real estate")) {
    return Building;
  }
  if (catLower.includes("product")) {
    return Package;
  }
  if (catLower.includes("wholesale")) {
    return Store;
  }

  return Compass;
}

export function getCategoryColors(name: string = "") {
  const catLower = (name || "").toLowerCase().trim();

  if (catLower === "all" || catLower === "all deals") {
    return { iconBg: "bg-orange-500", iconColor: "text-orange-500", activeText: "text-orange-600 border-orange-500" };
  }
  if (catLower.includes("dining") || catLower.includes("food") || catLower.includes("cafe")) {
    return { iconBg: "bg-amber-500", iconColor: "text-amber-500", activeText: "text-amber-600 border-amber-500" };
  }
  if (catLower.includes("salon") || catLower.includes("spa")) {
    return { iconBg: "bg-pink-500", iconColor: "text-pink-500", activeText: "text-pink-600 border-pink-500" };
  }
  if (catLower.includes("grocery") || catLower.includes("daily")) {
    return { iconBg: "bg-emerald-500", iconColor: "text-emerald-500", activeText: "text-emerald-600 border-emerald-500" };
  }
  if (catLower.includes("fashion") || catLower.includes("product")) {
    return { iconBg: "bg-purple-500", iconColor: "text-purple-500", activeText: "text-purple-600 border-purple-500" };
  }
  if (catLower.includes("electronic service") || catLower.includes("repair")) {
    return { iconBg: "bg-blue-500", iconColor: "text-blue-500", activeText: "text-blue-600 border-blue-500" };
  }
  if (catLower.includes("electronics")) {
    return { iconBg: "bg-blue-500", iconColor: "text-blue-500", activeText: "text-blue-600 border-blue-500" };
  }
  if (catLower.includes("fitness") || catLower.includes("gym")) {
    return { iconBg: "bg-red-500", iconColor: "text-red-500", activeText: "text-red-600 border-red-500" };
  }
  if (catLower.includes("pharmacy") || catLower.includes("medical")) {
    return { iconBg: "bg-teal-500", iconColor: "text-teal-500", activeText: "text-teal-600 border-teal-500" };
  }
  if (catLower.includes("entertainment") || catLower.includes("movie")) {
    return { iconBg: "bg-indigo-500", iconColor: "text-indigo-500", activeText: "text-indigo-600 border-indigo-500" };
  }
  if (catLower.includes("auto") || catLower.includes("vehicle") || catLower.includes("car")) {
    return { iconBg: "bg-cyan-500", iconColor: "text-cyan-500", activeText: "text-cyan-600 border-cyan-500" };
  }
  if (catLower.includes("home") || catLower.includes("service") || catLower.includes("living")) {
    return { iconBg: "bg-sky-500", iconColor: "text-sky-500", activeText: "text-sky-600 border-sky-500" };
  }
  if (catLower.includes("recruitment") || catLower.includes("job")) {
    return { iconBg: "bg-violet-500", iconColor: "text-violet-500", activeText: "text-violet-600 border-violet-500" };
  }
  if (catLower.includes("professional")) {
    return { iconBg: "bg-fuchsia-500", iconColor: "text-fuchsia-500", activeText: "text-fuchsia-600 border-fuchsia-500" };
  }
  if (catLower.includes("property")) {
    return { iconBg: "bg-orange-500", iconColor: "text-orange-500", activeText: "text-orange-600 border-orange-500" };
  }
  if (catLower.includes("wholesale")) {
    return { iconBg: "bg-rose-500", iconColor: "text-rose-500", activeText: "text-rose-600 border-rose-500" };
  }

  return { iconBg: "bg-orange-500", iconColor: "text-orange-500", activeText: "text-orange-600 border-orange-500" };
}

export function getCategoryMeta(categoryName: string, index: number = 0): CategoryMeta {
  const icon = getCategoryIcon(categoryName);
  const colors = getCategoryColors(categoryName);

  return {
    name: categoryName,
    value: categoryName,
    icon,
    theme: {
      bg: "bg-white",
      border: "border-slate-200",
      iconBg: colors.iconBg,
      textColor: "text-slate-800",
      badgeBg: "bg-orange-50",
    },
  };
}

export function formatCategoryLabel(name: string): string {
  if (!name) return "";
  const parts = name.trim().split(/\s+/);
  if (parts.length === 2) {
    return `${parts[0]}\n${parts[1]}`;
  }
  if (parts.length === 3 && (parts[1] === "&" || parts[1] === "and")) {
    return `${parts[0]} &\n${parts[2]}`;
  }
  return name;
}
