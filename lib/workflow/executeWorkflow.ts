import axios from "axios";
import "server-only";

export async function ExecuteWorkflow(
  executionId: string,
  workflowId: string,
  userId: string,
  flowDefinition: string | undefined
) {
  const { data } = await axios.post(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/workflow-execution/execute/${executionId}`,
    {
      workflowId,
      userId,
      flowDefinition,
    }
  );
}
