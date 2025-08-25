"use client";

import { RunWorkflow } from "@/actions/workflows/runWorkflow";
import useExecutionPlan from "@/components/hooks/useExecutionPlan";
import { Button } from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";
import { useReactFlow } from "@xyflow/react";
import { PlayIcon } from "lucide-react";
import React from "react";
import { toast } from "sonner";

function ExecuteButton({ workflowId }: { workflowId: string }) {
  const generate = useExecutionPlan();
  const { toObject } = useReactFlow();
  const mutation = useMutation({
    mutationFn: RunWorkflow,
    onSuccess: (data) => {
      // console.log("data from backend : ", data);
      toast.success("Execution started", { id: "flow-execution" });
    },
    onError: () => {
      toast.error("Something went wrong", { id: "flow-execution" });
    },
  });

  return (
    <Button
      disabled={mutation.isPending}
      variant={"outline"}
      className=" flex items-center gap-2"
      onClick={() => {
        const plan = generate();

        console.log("Plan from frontend : ", plan);

        if (!plan) {
          // Client side validation
          return;
        }
        const data = mutation.mutate({
          workflowId,
          flowDefinition: JSON.stringify(toObject()),
        });
      }}
    >
      <PlayIcon size={16} className=" stroke-orange-400" />
      Execute
    </Button>
  );
}

export default ExecuteButton;
