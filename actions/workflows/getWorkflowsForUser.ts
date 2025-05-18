"use server";

import { auth } from "@clerk/nextjs/server";
import axios from "axios";

export async function getWorkflowsForUser() {
  const { userId } = auth();
  if (!userId) throw new Error("Not authenticated");

  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  try {
    const { data } = await axios.get(`${baseUrl}/workflow?userId=${userId}`);
    return data;
  } catch (error) {
    console.log(error);
  }
}
