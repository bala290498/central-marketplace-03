import { Metadata } from "next";
import { ListYourBusinessClient } from "@/components/ListYourBusinessClient";

export const metadata: Metadata = {
  title: "List your business | Central Marketplace",
  description:
    "Promote your shop, restaurant, salon, clinic, or service to nearby customers on Central Marketplace.",
};

export default function ListYourBusinessPage() {
  return <ListYourBusinessClient />;
}
