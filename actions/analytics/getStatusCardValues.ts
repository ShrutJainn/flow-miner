"use server";

import { TPeriod } from "@/types/analytics";
import { auth } from "@clerk/nextjs/server";
import axios from "axios";

export async function getStatusCardValues(period: TPeriod) {
  const { userId } = auth();

  if (!userId) throw new Error("Unauthorized");

  const { data } = await axios.get(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/workflow/periods/${userId}`
  );
  return data;
}
