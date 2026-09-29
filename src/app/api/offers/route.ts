import { NextResponse } from "next/server";
import { getOffers } from "@/lib/offers";

export async function GET() {
  const offers = getOffers();
  return NextResponse.json(offers, {
    headers: {
      "Cache-Control": "public, max-age=60, s-maxage=300",
    },
  });
}
