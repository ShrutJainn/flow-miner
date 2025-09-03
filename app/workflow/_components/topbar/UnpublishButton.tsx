"use client";

import { unpublishWorkflow } from "@/actions/workflows/unpublishWorkflow";
import { Button } from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";
import { DownloadIcon, UploadIcon } from "lucide-react";
import React from "react";
import { toast } from "sonner";

function UnpublishButton({ workflowId }: { workflowId: string }) {
  const mutation = useMutation({
    mutationFn: unpublishWorkflow,
    onSuccess: (data) => {
      toast.success("Workflow Unpublished", { id: workflowId });
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
        toast.loading("Unpublishing workflow...", { id: workflowId });
        mutation.mutate(workflowId);
      }}
    >
      <DownloadIcon size={16} className=" stroke-orange-500" />
      Unpublish
    </Button>
  );
}

export default UnpublishButton;
