"use server";

import { auth } from "@clerk/nextjs/server";
import axios from "axios";

export async function GetWorkflowExecutionWithPhases(executionId: string) {
  const { userId } = auth();
  if (!userId) throw new Error("unauthenticated");

  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/workflow/execution/${executionId}`
  );
  return response.data;
}
