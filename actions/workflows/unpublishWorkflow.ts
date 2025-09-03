"use server";

import { auth } from "@clerk/nextjs/server";
import axios from "axios";
import { revalidatePath } from "next/cache";

export async function unpublishWorkflow(workflowId: string) {
  const { userId } = auth();
  if (!userId) throw new Error("unauthorized");

  const { data } = await axios.post(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/workflow/unpublish`,
    {
      workflowId,
      userId,
      flowDefinition: "",
    }
  );
  revalidatePath(`/workflow/editor/${data}`);
}
