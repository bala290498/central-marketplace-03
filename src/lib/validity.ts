import { Offer } from "@/types/offer";

export type ValidityCategoryKey =
  | "limited-slots"
  | "expires-in-days"
  | "until-filled"
  | "available";

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
    label: "Limited Slots",
    shortLabel: "Limited Slots",
    badge: "🔥 Limited Slots",
    description: "Exclusive offers with only a few spots or slots left",
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
    key: "expires-in-days",
    label: "Expires in Days",
    shortLabel: "Expires Soon",
    badge: "⏳ Expires Soon",
    description: "Time-sensitive deals ending tonight or within a few days",
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
    description: "Jobs, requests & listings open until candidate or spot is filled",
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
    key: "available",
    label: "Available",
    shortLabel: "Available",
    badge: "✅ Available",
    description: "Ongoing local offers and services available anytime",
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
];

export function getOfferValidityCategory(offer: Offer): ValidityCategoryKey {
  const text = (offer.validity || offer.ends || offer.expiry || "").toLowerCase();

  if (text.includes("slot") || text.includes("limited") || text.includes("left")) {
    return "limited-slots";
  }
  if (
    text.includes("expire") ||
    text.includes("expires") ||
    text.includes("ends") ||
    text.includes("tonight") ||
    /\b\d+d\b/.test(text)
  ) {
    return "expires-in-days";
  }
  if (text.includes("filled") || text.includes("found") || text.includes("until")) {
    return "until-filled";
  }
  return "available";
}

export function filterOffersByValidityCategory(
  offers: Offer[],
  categoryKey: ValidityCategoryKey | "all" | string
): Offer[] {
  if (!categoryKey || categoryKey === "all") return offers;
  return offers.filter((offer) => getOfferValidityCategory(offer) === categoryKey);
}
