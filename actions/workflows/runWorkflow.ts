"use server";

import { TWorkflowExecutionPlan } from "@/enums/workflow";
import { TaskRegistry } from "@/lib/workflow/task/registry";
import { auth } from "@clerk/nextjs/server";
import axios from "axios";
import { redirect } from "next/navigation";

export async function RunWorkflow(form: {
  workflowId: string;
  flowDefinition?: string;
}) {
  const { workflowId, flowDefinition } = form;
  const { userId } = auth();
  if (!userId) throw new Error("Unauthorized");

  let executionPlan: TWorkflowExecutionPlan;

  const { data } = await axios.post(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/workflow/generate-plan`,
    {
      workflowId,
      userId,
      flowDefinition,
    }
  );

  if (data.error) throw new Error("Flow definition not valid");
  // if (!data.executionPlan) throw new Error("No execution plan generated");

  // executionPlan = data.executionPlan;
  // console.log("execution plan : ", executionPlan);
  if (!data) throw new Error("Workflow Execution not created");
  const { workflowExecutionId, phases } = data;
  redirect(`/workflow/runs/${workflowId}/${workflowExecutionId}`);
}
