"use client";

import { TaskParamType } from "@/enums/task";
import { IAppNode, ITaskParam } from "@/types/appNode";
import React, { useCallback } from "react";
import StringParam from "./param/StringParam";
import { useReactFlow } from "@xyflow/react";
import BrowserInstanceParam from "./param/BrowserInstanceParam";
import CredentialsParam from "./param/CredentialsParam";

function NodeParamField({
  param,
  nodeId,
  disabled,
}: {
  param: ITaskParam;
  nodeId: string;
  disabled: boolean;
}) {
  const { updateNodeData, getNode } = useReactFlow();
  const node = getNode(nodeId) as IAppNode;
  const value = node.data.inputs[param.name];

  const updateNodeParamValue = useCallback(
    (newValue: string) => {
      updateNodeData(nodeId, {
        inputs: {
          ...node?.data.inputs,
          [param.name]: newValue,
        },
      });
    },
    [nodeId, updateNodeData, param.name, node.data.inputs]
  );
  switch (param.type) {
    case TaskParamType.STRING:
      return (
        <StringParam
          param={param}
          value={value}
          disabled={disabled}
          updateNodeParamValue={updateNodeParamValue}
        />
      );
    case TaskParamType.BROWSER_INSTANCE:
      return (
        <BrowserInstanceParam
          param={param}
          value={""}
          updateNodeParamValue={updateNodeParamValue}
        />
      );
    case TaskParamType.CREDENTIALS:
      return (
        <CredentialsParam
          param={param}
          value={""}
          updateNodeParamValue={updateNodeParamValue}
        />
      );
    default:
      return (
        <div className=" w-full">
          <p className=" text-xs text-muted-foreground">Not implemented</p>
        </div>
      );
  }
}

export default NodeParamField;
