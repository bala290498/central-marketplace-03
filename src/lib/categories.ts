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

export const CATEGORY_THEME_PALETTE = [
  {
    bg: "bg-[#FFF4F6]",
    border: "border-[#FDE2E7]",
    iconBg: "bg-[#E63956]",
    textColor: "text-[#D81B43]",
    badgeBg: "bg-[#FDE2E8]",
  },
  {
    bg: "bg-[#F0F6FF]",
    border: "border-[#DCE8FE]",
    iconBg: "bg-[#1E75EB]",
    textColor: "text-[#1D4ED8]",
    badgeBg: "bg-[#DBEAFE]",
  },
  {
    bg: "bg-[#FFF8EE]",
    border: "border-[#FDEBD0]",
    iconBg: "bg-[#F97316]",
    textColor: "text-[#C2410C]",
    badgeBg: "bg-[#FFEDD5]",
  },
  {
    bg: "bg-[#F0FDF4]",
    border: "border-[#DCFCE7]",
    iconBg: "bg-[#10B981]",
    textColor: "text-[#15803D]",
    badgeBg: "bg-[#DCFCE7]",
  },
  {
    bg: "bg-[#FAF5FF]",
    border: "border-[#F3E8FF]",
    iconBg: "bg-[#A855F7]",
    textColor: "text-[#7E22CE]",
    badgeBg: "bg-[#F3E8FF]",
  },
  {
    bg: "bg-[#F0FDFA]",
    border: "border-[#CCFBF1]",
    iconBg: "bg-[#14B8A6]",
    textColor: "text-[#0F766E]",
    badgeBg: "bg-[#CCFBF1]",
  },
];

export function getCategoryMeta(categoryName: string, index: number = 0): CategoryMeta {
  const catLower = categoryName.toLowerCase().trim();
  const theme = CATEGORY_THEME_PALETTE[index % CATEGORY_THEME_PALETTE.length];

  let icon: LucideIcon = Compass;

  if (catLower.includes("food") || catLower.includes("dining") || catLower.includes("cafe")) {
    icon = UtensilsCrossed;
  } else if (catLower.includes("salon") || catLower.includes("spa")) {
    icon = Scissors;
  } else if (catLower.includes("grocery")) {
    icon = ShoppingCart;
  } else if (catLower.includes("fashion")) {
    icon = Shirt;
  } else if (catLower.includes("electronic service") || catLower.includes("repair")) {
    icon = Wrench;
  } else if (catLower.includes("electronics")) {
    icon = Cpu;
  } else if (catLower.includes("fitness") || catLower.includes("gym")) {
    icon = Dumbbell;
  } else if (catLower.includes("pharmacy") || catLower.includes("medical")) {
    icon = Pill;
  } else if (catLower.includes("entertainment") || catLower.includes("movie")) {
    icon = Film;
  } else if (catLower.includes("vehicle") || catLower.includes("auto") || catLower.includes("car")) {
    icon = Car;
  } else if (catLower.includes("home service") || catLower.includes("home") || catLower.includes("living")) {
    icon = HomeIcon;
  } else if (catLower.includes("recruitment") || catLower.includes("job")) {
    icon = Briefcase;
  } else if (catLower.includes("professional")) {
    icon = UserCheck;
  } else if (catLower.includes("property")) {
    icon = Building;
  } else if (catLower.includes("product")) {
    icon = Package;
  } else if (catLower.includes("wholesale")) {
    icon = Store;
  } else if (catLower.includes("daily")) {
    icon = ShoppingCart;
  }

  return {
    name: categoryName,
    value: categoryName,
    icon,
    theme,
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
