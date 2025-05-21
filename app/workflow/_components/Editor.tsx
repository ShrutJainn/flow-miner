"use client";

import { IWorkflow } from "@/types/workflow";
import React from "react";
import { ReactFlowProvider } from "@xyflow/react";
import FlowEditor from "./FlowEditor";
function Editor({ workflow }: { workflow: IWorkflow }) {
  return (
    <ReactFlowProvider>
      <div className=" flex flex-col h-full w-full overflow-hidden">
        <section className=" flex h-full overflow-auto">
          <FlowEditor workflow={workflow} />
        </section>
      </div>
    </ReactFlowProvider>
  );
}

export default Editor;
