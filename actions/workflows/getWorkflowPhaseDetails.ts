"use server";

import { auth } from "@clerk/nextjs/server";
import axios from "axios";

export async function GetWorkflowPhaseDetails(phaseId: string | null) {
  const { userId } = auth();
  if (!userId) throw new Error("unauthenticated");

  if (!phaseId) return;

  const { data } = await axios.get(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/execution/phaseDetails/${phaseId}`
  );

  return data;
}
