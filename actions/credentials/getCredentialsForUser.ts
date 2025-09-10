"use server";

import { auth } from "@clerk/nextjs/server";
import axios from "axios";

export async function getCredentialsForUser() {
  const { userId } = auth();

  if (!userId) throw new Error("Unauthorized");

  const { data } = await axios.get(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/credentials/${userId}`
  );

  console.log("credentials of user :", data);
  return data;
}
