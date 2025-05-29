import { ExecutionPhaseStatus } from "@/enums/workflow";

type ExecutionPhase = {
  id: string;
  userId: string;
  status: ExecutionPhaseStatus;
  number: number;
  node: string;
  name: string;
  startedAt: string;
  completedAt: string;
  inputs: string;
  outputs: string;
  creditsCost: number;
  workflowExecutionId: string;
};

type Phase = Pick<ExecutionPhase, "creditsCost">;

export function GetPhasesTotalCost(phases: Phase[]) {
  return phases.reduce((acc, phase) => acc + (phase.creditsCost || 0), 0);
}
