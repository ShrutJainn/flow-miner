"use server";

import { auth } from "@clerk/nextjs/server";
import axios from "axios";
import { revalidatePath } from "next/cache";

export async function updateWorkflow({
  id,
  definition,
}: {
  id: string;
  definition: string;
}) {
  const { userId } = auth();
  if (!userId) throw new Error("Unauthenticated");

  const workflow = await axios.post(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/workflow/update/${id}`,
    {
      userId,
      definition,
    }
  );

  revalidatePath("/workflows");
}
