import { Offer } from "@/types/offer";

export type ValidityCategoryKey =
  | "limited-slots"
  | "expires-soon"
  | "until-filled"
  | "until-found"
  | "available"
  | "valid-all-days";

export interface ValidityCategoryConfig {
  key: ValidityCategoryKey;
  label: string;
  shortLabel: string;
  badge: string;
  description: string;
  iconName: string;
  theme: {
    bg: string;
    border: string;
    text: string;
    badgeBg: string;
    badgeText: string;
    gradient: string;
    accentBg: string;
    ringColor: string;
  };
}

export const VALIDITY_CATEGORIES: ValidityCategoryConfig[] = [
  {
    key: "limited-slots",
    label: "Limited",
    shortLabel: "Limited",
    badge: "🔥 Limited",
    description: "Exclusive offers with limited spots or slots available",
    iconName: "Flame",
    theme: {
      bg: "bg-red-50/70",
      border: "border-red-200/80",
      text: "text-red-700",
      badgeBg: "bg-red-100 text-red-700",
      badgeText: "text-red-700",
      gradient: "from-red-500 to-amber-600",
      accentBg: "bg-red-500",
      ringColor: "ring-red-400",
    },
  },
  {
    key: "expires-soon",
    label: "Expires Soon",
    shortLabel: "Expires Soon",
    badge: "⏳ Expires Soon",
    description: "Time-sensitive deals ending soon or expiring shortly",
    iconName: "Hourglass",
    theme: {
      bg: "bg-amber-50/70",
      border: "border-amber-200/80",
      text: "text-amber-800",
      badgeBg: "bg-amber-100 text-amber-800",
      badgeText: "text-amber-800",
      gradient: "from-amber-500 to-orange-600",
      accentBg: "bg-amber-500",
      ringColor: "ring-amber-400",
    },
  },
  {
    key: "until-filled",
    label: "Until Filled",
    shortLabel: "Until Filled",
    badge: "🎯 Until Filled",
    description: "Job vacancies & recruitment requests open until position is filled",
    iconName: "UserCheck",
    theme: {
      bg: "bg-emerald-50/70",
      border: "border-emerald-200/80",
      text: "text-emerald-800",
      badgeBg: "bg-emerald-100 text-emerald-800",
      badgeText: "text-emerald-800",
      gradient: "from-emerald-500 to-teal-600",
      accentBg: "bg-emerald-500",
      ringColor: "ring-emerald-400",
    },
  },
  {
    key: "until-found",
    label: "Until Found",
    shortLabel: "Until Found",
    badge: "🔍 Until Found",
    description: "Property & item requests open until requirement is found",
    iconName: "Search",
    theme: {
      bg: "bg-violet-50/70",
      border: "border-violet-200/80",
      text: "text-violet-800",
      badgeBg: "bg-violet-100 text-violet-800",
      badgeText: "text-violet-800",
      gradient: "from-violet-500 to-purple-600",
      accentBg: "bg-violet-500",
      ringColor: "ring-violet-400",
    },
  },
  {
    key: "available",
    label: "Available",
    shortLabel: "Available",
    badge: "✅ Available",
    description: "Active local listings, products & services available anytime",
    iconName: "CheckCircle2",
    theme: {
      bg: "bg-blue-50/70",
      border: "border-blue-200/80",
      text: "text-blue-800",
      badgeBg: "bg-blue-100 text-blue-800",
      badgeText: "text-blue-800",
      gradient: "from-blue-500 to-indigo-600",
      accentBg: "bg-blue-500",
      ringColor: "ring-blue-400",
    },
  },
  {
    key: "valid-all-days",
    label: "Valid All Days",
    shortLabel: "Valid All Days",
    badge: "📅 Valid All Days",
    description: "Ongoing store discounts & promotional packages valid all month",
    iconName: "Calendar",
    theme: {
      bg: "bg-sky-50/70",
      border: "border-sky-200/80",
      text: "text-sky-800",
      badgeBg: "bg-sky-100 text-sky-800",
      badgeText: "text-sky-800",
      gradient: "from-sky-500 to-cyan-600",
      accentBg: "bg-sky-500",
      ringColor: "ring-sky-400",
    },
  },
];

export function getOfferValidityCategory(offer: Offer): ValidityCategoryKey {
  const text = (offer.validity || offer.ends || offer.expiry || "").toLowerCase().trim();

  if (text.includes("slot") || text.includes("limited")) {
    return "limited-slots";
  }
  if (
    text.includes("expire") ||
    text.includes("expires") ||
    text.includes("soon") ||
    text.includes("ends") ||
    text.includes("tonight")
  ) {
    return "expires-soon";
  }
  if (text.includes("filled")) {
    return "until-filled";
  }
  if (text.includes("found")) {
    return "until-found";
  }
  if (text.includes("valid") || text.includes("day") || text.includes("days") || text.includes("month")) {
    return "valid-all-days";
  }
  return "available";
}

export function filterOffersByValidityCategory(
  offers: Offer[],
  categoryKey: ValidityCategoryKey | "all" | string
): Offer[] {
  if (!categoryKey || categoryKey === "all") return offers;
  return offers.filter((offer) => {
    const valText = (offer.validity || offer.ends || offer.expiry || "").toLowerCase().trim();
    const catKey = getOfferValidityCategory(offer);
    const keyLower = categoryKey.toLowerCase().trim();
    if (keyLower === "limited" || keyLower === "limited-slots") {
      return catKey === "limited-slots" || valText.includes("limited");
    }
    return catKey === keyLower || valText === keyLower;
  });
}
