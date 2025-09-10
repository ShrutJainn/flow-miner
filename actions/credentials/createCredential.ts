"use server";

import {
  createCredentialSchema,
  TCreateCredentialSchema,
} from "@/types/credential";
import { auth } from "@clerk/nextjs/server";
import axios from "axios";
import { revalidatePath } from "next/cache";

export async function createCredential(form: TCreateCredentialSchema) {
  const { userId } = auth();

  if (!userId) throw new Error("Unauthorized");

  try {
    const { success, data } = createCredentialSchema.safeParse(form);
    if (!success) throw new Error("Invalid form data");

    await axios.post(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/credentials/create`,
      {
        userId,
        name: data.name,
        value: data.value,
      }
    );
    revalidatePath("/credentials");
  } catch (err: any) {
    const errorMessage =
      err.response?.data?.error || err.message || "Something went wrong";

    console.log("error message : ", errorMessage);

    throw new Error(errorMessage);
  }
}
