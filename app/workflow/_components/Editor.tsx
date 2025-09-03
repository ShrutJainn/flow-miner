"use client";

import { IWorkflow } from "@/types/workflow";
import React from "react";
import { ReactFlowProvider } from "@xyflow/react";
import FlowEditor from "./FlowEditor";
import Topbar from "./topbar/Topbar";
import TaskMenu from "./TaskMenu";
import { FlowValidationContextProvider } from "@/components/context/FlowValidationContext";
import { WorkflowStatus } from "@/enums/workflow";
function Editor({ workflow }: { workflow: IWorkflow }) {
  return (
    <FlowValidationContextProvider>
      <ReactFlowProvider>
        <div className=" flex flex-col h-full w-full overflow-hidden">
          <Topbar
            workflowId={workflow.id}
            title="Workflow Editor"
            subtitle="Test"
            isPublished={workflow.status === WorkflowStatus.PUBLISHED}
          />
          <section className=" flex h-full overflow-auto">
            <TaskMenu />
            <FlowEditor workflow={workflow} />
          </section>
        </div>
      </ReactFlowProvider>
    </FlowValidationContextProvider>
  );
}

export default Editor;
