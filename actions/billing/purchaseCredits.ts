"use server";

import { PackId } from "@/types/billing";
import { auth } from "@clerk/nextjs/server";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import { redirect } from "next/navigation";
const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

export async function purchaseCredits(packId: PackId) {
  const { userId } = auth();
  if (!userId) throw new Error("unauthorized");

  try {
    const { data } = await axios.post(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/billing/create-checkout-session`,
      {
        packId,
        userId,
      }
    );
    if (!data.sessionUrl) throw new Error("Cannot create stripe session");
    return data;
  } catch (error) {
    console.error(error);
  }
}
