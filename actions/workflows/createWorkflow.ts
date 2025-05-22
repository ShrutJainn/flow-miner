"use server";

import { TaskType } from "@/enums/task";
import { WorkflowStatus } from "@/enums/workflow";
import { CreateFlowNode } from "@/lib/workflow/createFlowNode";
import { IAppNode } from "@/types/appNode";
import { createWorkflowSchema, TCreateWorkflow } from "@/types/workflow";
import { auth } from "@clerk/nextjs/server";
import { Edge } from "@xyflow/react";
import axios from "axios";
import { redirect } from "next/navigation";
import { z } from "zod";
export async function createWorkflow(form: TCreateWorkflow) {
  const { success, data } = createWorkflowSchema.safeParse(form);
  if (!success) throw new Error("Invalid form data");

  const { userId } = auth();
  if (!userId) throw new Error("Unauthorized");

  const initialFlow: { nodes: IAppNode[]; edges: Edge[] } = {
    nodes: [],
    edges: [],
  };

  initialFlow.nodes.push(CreateFlowNode(TaskType.LAUNCH_BROWSER));
  const res = await axios.post(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/workflow/create`,
    {
      userId,
      status: WorkflowStatus.DRAFT,
      definition: JSON.stringify(initialFlow),
      ...data,
    }
  );

  if (!res) throw new Error("Failed to create workflow");
  redirect(`/workflow/editor/${res.data.id}`);
}
