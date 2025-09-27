"use server";

import { auth } from "@clerk/nextjs/server";
import axios from "axios";
import { redirect } from "next/navigation";

export async function setupUser() {
  const { userId } = auth();
  if (!userId) throw new Error("unauthorized");

  await axios.post(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/userBalance/setup/${userId}`
  );

  redirect("/");
}
