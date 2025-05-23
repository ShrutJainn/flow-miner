import { LucideProps } from "lucide-react";
import React from "react";
import { TaskType } from "./task";
import { IAppNode, ITaskParam } from "@/types/appNode";

export enum WorkflowStatus {
  DRAFT = "DRAFT",
  PUBLISHED = "PUBLISHED",
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

export type TWorkflowExecutionPlan = {
  phase: number;
  nodes: IAppNode[];
};
