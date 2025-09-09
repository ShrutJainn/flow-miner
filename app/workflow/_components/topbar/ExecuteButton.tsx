"use client";

import { RunWorkflow } from "@/actions/workflows/runWorkflow";
import useExecutionPlan from "@/components/hooks/useExecutionPlan";
import { Button } from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";
import { useReactFlow } from "@xyflow/react";
import { PlayIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";
import { toast } from "sonner";

function ExecuteButton({ workflowId }: { workflowId: string }) {
  const generate = useExecutionPlan();
  const { toObject } = useReactFlow();
  const router = useRouter();
  const mutation = useMutation({
    mutationFn: RunWorkflow,
    onSuccess: (data) => {
      toast.success("Execution started", { id: "flow-execution" });

      router.push(`/workflow/runs/${workflowId}/${data.workflowExecutionId}`);
    },
    onError: (error: any) => {
      toast.error(error.message, { id: "flow-execution" });
    },
  });

  return (
    <Button
      disabled={mutation.isPending}
      variant={"outline"}
      className=" flex items-center gap-2"
      onClick={() => {
        const plan = generate();

        if (!plan) {
          // Client side validation
          return;
        }
        console.log("flow definition : ", toObject());
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
