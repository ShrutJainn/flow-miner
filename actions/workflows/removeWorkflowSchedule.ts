"use server";

import { auth } from "@clerk/nextjs/server";
import axios from "axios";
import { revalidatePath } from "next/cache";

export async function removeWorkflowSchedule(id: string) {
  const { userId } = auth();
  if (!userId) throw new Error("unauthenticated");

  await axios.post(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/workflow/remove-schedule`,
    {
      workflowId: id,
      userId,
    }
  );
  revalidatePath("/workflows");
}
