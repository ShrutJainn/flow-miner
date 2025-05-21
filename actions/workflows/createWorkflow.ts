"use server";

import { WorkflowStatus } from "@/enums/workflow";
import { createWorkflowSchema, TCreateWorkflow } from "@/types/workflow";
import { auth } from "@clerk/nextjs/server";
import axios from "axios";
import { redirect } from "next/navigation";
import { z } from "zod";
export async function createWorkflow(form: TCreateWorkflow) {
  const { success, data } = createWorkflowSchema.safeParse(form);
  if (!success) throw new Error("Invalid form data");

  const { userId } = auth();
  if (!userId) throw new Error("Unauthorized");

  const res = await axios.post(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/workflow/create`,
    {
      userId,
      status: WorkflowStatus.DRAFT,
      definition: "todo",
      ...data,
    }
  );

  if (!res) throw new Error("Failed to create workflow");
  redirect(`/workflow/editor/${res.data.id}`);
}
