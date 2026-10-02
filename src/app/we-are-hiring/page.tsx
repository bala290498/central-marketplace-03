import { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { WeAreHiringClient } from "@/components/WeAreHiringClient";

export const metadata: Metadata = {
  title: "We're hiring | Central Marketplace",
  description:
    "Join the Central Marketplace team to help bring neighborhood deals to local communities in Chennai.",
};

export default function WeAreHiringPage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col">
      <Navbar />
      <WeAreHiringClient />
      <Footer />
    </div>
  );
}
