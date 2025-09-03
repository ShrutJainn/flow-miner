"use server";

import { auth } from "@clerk/nextjs/server";
import axios from "axios";
import { revalidatePath } from "next/cache";

export async function publishWorkflow({
  id,
  flowDefinition,
}: {
  id: string;
  flowDefinition: string;
}) {
  const { userId } = auth();
  if (!userId) throw new Error("unauthenticated");

  const { data } = await axios.post(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/workflow/publish`,
    {
      workflowId: id,
      userId,
      flowDefinition,
    }
  );
  console.log("data from backend after publish :", data);
  revalidatePath(`/workflow/editor/${data.workflowId}`);
  return { workflowId: data };
}
