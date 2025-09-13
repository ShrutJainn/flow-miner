"use server";

import { auth } from "@clerk/nextjs/server";
import axios from "axios";
import { revalidatePath } from "next/cache";

export async function deleteCredential(name: string) {
  const { userId } = auth();
  if (!userId) throw new Error("unauthorized");

  await axios.delete(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/credentials/delete`,
    {
      params: {
        userId,
        name,
      },
    }
  );
  revalidatePath("/credentials");
}
