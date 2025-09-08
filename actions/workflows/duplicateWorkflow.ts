"use server";

import {
  duplicateWorkflowSchema,
  TDuplicateWorkflowSchema,
} from "@/types/workflow";
import { auth } from "@clerk/nextjs/server";
import axios from "axios";
import { revalidatePath } from "next/cache";

export async function duplicateWorkflow(form: TDuplicateWorkflowSchema) {
  const { success, data } = duplicateWorkflowSchema.safeParse(form);

  if (!success) throw new Error("Invalid form data");

  const { userId } = auth();
  if (!userId) throw new Error("Unauthorized");

  await axios.post(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/workflow/duplicate`,
    {
      userId,
      ...data,
    }
  );
  revalidatePath("/workflows");
}
