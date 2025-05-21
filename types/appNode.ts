import { TaskType } from "@/enums/task";
import { Node } from "@xyflow/react";

export interface IAppNodeData {
  type: TaskType;
  inputs: Record<string, string>;
  [key: string]: any;
}
export interface IAppNode extends Node {
  data: IAppNodeData;
}
