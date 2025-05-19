"use server";

import { auth } from "@clerk/nextjs/server";
import axios from "axios";
import { revalidatePath } from "next/cache";

export async function deleteWorkflow(id: string) {
  const { userId } = auth();
  if (!userId) throw new Error("Unauthorized");

  await axios.delete(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/workflow/delete`,
    {
      params: { id, userId },
    }
  );

  revalidatePath("/workflows");
}
