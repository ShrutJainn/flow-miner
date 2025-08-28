"use server";

import { auth } from "@clerk/nextjs/server";
import axios from "axios";

export async function GetAvailableCredits() {
  const { userId } = auth();

  if (!userId) throw new Error("Unauthorized");

  //   const { data } = await axios.get(
  //     `${process.env.NEXT_PUBLIC_API_BASE_URL}/userBalance/${userId}`
  //   );

  //   console.log("data of user balance : ", data);
  return 10000;
}
