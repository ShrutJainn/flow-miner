"use server";

import { auth } from "@clerk/nextjs/server";
import axios from "axios";
import { revalidatePath } from "next/cache";

export async function updateWorkflowCron({
  id,
  cron,
}: {
  id: string;
  cron: string;
}) {
  const { userId } = auth();
  if (!userId) throw new Error("unauthenticated");

  const { data } = await axios.post(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/workflow/update-cron`,
    {
      workflowId: id,
      userId,
      cron,
    }
  );
  revalidatePath(`/workflows`);
  console.log("data returned after cron : ", data);
}
