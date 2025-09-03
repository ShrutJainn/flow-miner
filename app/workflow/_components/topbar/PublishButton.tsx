"use client";

import { publishWorkflow } from "@/actions/workflows/publishWorkflow";
import { RunWorkflow } from "@/actions/workflows/runWorkflow";
import useExecutionPlan from "@/components/hooks/useExecutionPlan";
import { Button } from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";
import { useReactFlow } from "@xyflow/react";
import { PlayIcon, UploadIcon } from "lucide-react";
import { revalidatePath } from "next/cache";
import { useRouter } from "next/navigation";
import React from "react";
import { toast } from "sonner";

function PublishButton({ workflowId }: { workflowId: string }) {
  const generate = useExecutionPlan();
  const { toObject } = useReactFlow();
  const router = useRouter();
  const mutation = useMutation({
    mutationFn: publishWorkflow,
    onSuccess: (data) => {
      toast.success("Published Successfully", { id: workflowId });
      console.log("data inside mutation : ", data);
    },
    onError: (error: any) => {
      toast.error(error.message, { id: workflowId });
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
        toast.loading("Publishing workflow...", { id: workflowId });
        mutation.mutate({
          id: workflowId,
          flowDefinition: JSON.stringify(toObject()),
        });
      }}
    >
      <UploadIcon size={16} className=" stroke-green-400" />
      Publish
    </Button>
  );
}

export default PublishButton;
