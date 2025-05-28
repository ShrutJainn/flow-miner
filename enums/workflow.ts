import { LucideProps } from "lucide-react";
import React from "react";
import { TaskType } from "./task";
import { IAppNode, ITaskParam } from "@/types/appNode";

export enum WorkflowStatus {
  DRAFT = "DRAFT",
  PUBLISHED = "PUBLISHED",
}

export enum WorkflowExecutionStatus {
  PENDING = "PENDING",
  RUNNING = "RUNNING",
  COMPLETE = "COMPLETED",
  FAILED = "FAILED",
}

export enum ExecutionPhaseStatus {
  CREATED = "CREATED",
  PENDING = "PENDING",
  RUNNING = "RUNNING",
  COMPLETE = "COMPLETED",
  FAILED = "FAILED",
}

export type TWorkflowTask = {
  label: string;
  icon: React.FC<LucideProps>;
  type: TaskType;
  isEntryPoint?: boolean;
  inputs: ITaskParam[];
  outputs: ITaskParam[];
  credits: number;
};

export type TWorkflowExecutionPlanPhase = {
  phase: number;
  nodes: IAppNode[];
};

export type TWorkflowExecutionPlan = TWorkflowExecutionPlanPhase[];
