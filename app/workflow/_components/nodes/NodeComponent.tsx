import { NodeProps } from "@xyflow/react";
import { memo } from "react";
import NodeCard from "./NodeCard";
import NodeHeader from "./NodeHeader";
import { IAppNodeData } from "@/types/appNode";

const NodeComponent = memo((props: NodeProps) => {
  const nodeData = props.data as IAppNodeData;
  return (
    <NodeCard nodeId={props.id} isSelected={!!props.selected}>
      <NodeHeader taskType={nodeData.type} />
    </NodeCard>
  );
});

NodeComponent.displayName = "NodeComponent";

export default NodeComponent;
