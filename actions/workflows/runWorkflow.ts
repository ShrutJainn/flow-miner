"use server";

import { TWorkflowExecutionPlan } from "@/enums/workflow";
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
  try {
    const { data } = await axios.post(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/workflow-execution/execute`,
      {
        workflowId,
        userId,
        flowDefinition,
      }
    );

    const workflowExecutionId = data;
    console.log("data : ", data);

    return { workflowExecutionId: data };
  } catch (err: any) {
    console.log("error : ", err);
    const errorMessage =
      JSON.parse(err.response?.data?.error)?.error ||
      err.message ||
      "Something went wrong";

    throw new Error(errorMessage);
  }
}
