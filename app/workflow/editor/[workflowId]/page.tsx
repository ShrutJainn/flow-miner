import { auth } from "@clerk/nextjs/server";
import axios from "axios";
import React, { useState } from "react";
import Editor from "../../_components/Editor";

async function Page({ params }: { params: { workflowId: string } }) {
  const { workflowId } = params;
  const { userId } = auth();
  if (!userId) return <div>unauthenticated</div>;

  const { data: workflow } = await axios.get(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/workflow/${workflowId}`
  );
  return <Editor workflow={workflow} />;
}

export default Page;
