import { TaskType } from "@/enums/task";
import { IAppNode } from "@/types/appNode";

export function CreateFlowNode(
  nodeType: TaskType,
  position?: { x: number; y: number }
): IAppNode {
  return {
    id: crypto.randomUUID(),
    type: "FlowMinerNode",
    dragHandle: ".drag-handle",
    data: {
      type: nodeType,
      inputs: {},
    },
    position: position ?? { x: 0, y: 0 },
  };
}
