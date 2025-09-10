"use client";

import CustomDialogHeader from "@/components/CustomDialogHeader";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { createWorkflowSchema, TCreateWorkflow } from "@/types/workflow";
import { Layers2Icon, Loader2, ShieldEllipsis } from "lucide-react";
import React, { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormField,
  FormControl,
  FormDescription,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useMutation } from "@tanstack/react-query";
import { createWorkflow } from "@/actions/workflows/createWorkflow";
import { toast } from "sonner";
import {
  createCredentialSchema,
  TCreateCredentialSchema,
} from "@/types/credential";
import { createCredential } from "@/actions/credentials/createCredential";
function CreateCredentialDialog({ triggerText }: { triggerText?: string }) {
  const [open, setOpen] = useState(false);
  const form = useForm<TCreateCredentialSchema>({
    resolver: zodResolver(createCredentialSchema),
  });

  const { mutate, isPending } = useMutation({
    mutationFn: createCredential,
    onSuccess: () => {
      toast.success("Credential created", { id: "create-credential" });
      setOpen((prev) => !prev);
    },
    onError: (err: any) => {
      console.log("err : ", err);
      toast.error(err.message, { id: "create-credential" });
    },
  });

  const onSubmit = useCallback(
    (values: TCreateCredentialSchema) => {
      toast.loading("Creating credential...", { id: "create-credential" });
      mutate(values);
    },
    [mutate]
  );
  return (
    <Dialog
      open={open}
      onOpenChange={(open) => {
        form.reset();
        setOpen(open);
      }}
    >
      <DialogTrigger asChild>
        <Button>{triggerText ?? "Create"}</Button>
      </DialogTrigger>
      <DialogContent className=" px-0">
        <CustomDialogHeader icon={ShieldEllipsis} title="Create credential" />
        <div className=" p-6">
          <Form {...form}>
            <form
              className=" space-y-8 w-full"
              onSubmit={form.handleSubmit(onSubmit)}
            >
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className=" flex gap-1 items-center">
                      Name
                      <p className=" text-xs text-primary">(required)</p>
                    </FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormDescription>
                      Enter a unique and descriptive name of the credential
                      <br />
                      This name will be used to identify the credential
                    </FormDescription>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="value"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className=" flex gap-1 items-center">
                      Value
                      <p className=" text-xs text-primary">(required)</p>
                    </FormLabel>
                    <FormControl>
                      <Textarea className=" resize-none" {...field} />
                    </FormControl>
                    <FormDescription>
                      Enter the value associated with this credential
                      <br />
                      This value will be securely encrypted and stored.
                    </FormDescription>
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={isPending} className=" w-full">
                {!isPending ? (
                  "Proceed"
                ) : (
                  <Loader2 className="animation-spin" />
                )}
              </Button>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default CreateCredentialDialog;
