"use client";

import { deleteCredential } from "@/actions/credentials/deleteCredential";
import { deleteWorkflow } from "@/actions/workflows/deleteWorkflow";
import { AlertTitle } from "@/components/ui/alert";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useMutation } from "@tanstack/react-query";
import { XIcon } from "lucide-react";
import React, { useState } from "react";
import { toast } from "sonner";

interface IDeleteWorkflowDialogProps {
  name: string;
}

function DeleteCredentialDialog({ name }: IDeleteWorkflowDialogProps) {
  const [confirmText, setConfirmText] = useState("");
  const [open, setOpen] = useState(false);

  const deleteMutation = useMutation({
    mutationFn: deleteCredential,
    onSuccess: () => {
      toast.success("Credential deleted successfully", { id: name });
      setConfirmText("");
    },
    onError: () => {
      toast.error("Something went wrong", { id: name });
    },
  });
  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button variant={"destructive"} size={"icon"}>
          <XIcon size={18} />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertTitle>Are you absolutely sure?</AlertTitle>
          <AlertDialogDescription>
            If you delete this credential, you will not be able to recover this.
            <div className=" flex flex-col py-4 gap-2">
              <p>
                If you are sure, enter <b>{name} to confirm:</b>
              </p>
              <Input
                value={confirmText}
                onChange={(e) => setConfirmText(e.target.value)}
              />
            </div>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={() => setConfirmText("")}>
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            disabled={confirmText !== name || deleteMutation.isPending}
            className=" bg-destructive text-destructive-foreground hover:bg-destructive/90"
            onClick={(e) => {
              toast.loading("Deleting credential...", { id: name });
              deleteMutation.mutate(name);
            }}
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default DeleteCredentialDialog;
