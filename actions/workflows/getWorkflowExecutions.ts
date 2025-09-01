import { auth } from "@clerk/nextjs/server";
import axios from "axios";

export async function GetWorkflowExecutions(workflowId: string) {
  const { userId } = auth();
  if (!userId) throw new Error("Unauthorized");

  const { data } = await axios.get(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/workflow-execution/`,
    {
      params: {
        workflowId,
        userId,
      },
    }
  );

  return data;
}
