import { TaskParamType, TaskType } from "@/enums/task";
import { Node } from "@xyflow/react";

export interface IAppNodeData {
  type: TaskType;
  inputs: Record<string, string>;
  [key: string]: any;
}
export interface IAppNode extends Node {
  data: IAppNodeData;
}

export interface ITaskParam {
  name: string;
  type: TaskParamType;
  helperText?: string;
  required?: boolean;
  hideHandle?: boolean;
  value?: string;
  [key: string]: any;
}

export interface IParamProps {
  param: ITaskParam;
  value: string;
  updateNodeParamValue: (newValue: string) => void;
  disabled?: boolean;
}
