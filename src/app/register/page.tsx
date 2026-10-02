import { Metadata } from "next";
import { ListYourBusinessClient } from "@/components/ListYourBusinessClient";

export const metadata: Metadata = {
  title: "Register Your Business | Central Marketplace",
  description:
    "Register your shop, restaurant, salon, clinic, or service for a free posting on Central Marketplace.",
};

export default function RegisterPage() {
  return <ListYourBusinessClient />;
}
