import { WorkflowStatus } from "@/enums/workflow";
import { z } from "zod";

export const createWorkflowSchema = z.object({
  name: z.string().max(50),
  description: z.string().max(80).optional(),
});

export type TCreateWorkflow = z.infer<typeof createWorkflowSchema>;

export interface IWorkflow {
  id: string;
  name: string;
  description: string;
  definition: string;
  userId: string;
  status: WorkflowStatus;
  createdAt: string;
  updatedAt: string;
}
