"use server";

import { WorkflowExecutionStatus } from "@/enums/workflow";
import { PeriodToDateRange } from "@/lib/helper/dates";
import { TPeriod } from "@/types/analytics";
import { auth } from "@clerk/nextjs/server";
import axios from "axios";
import { eachDayOfInterval, format } from "date-fns";

export async function getWorkflowExecutionStats(period: TPeriod) {
  const { userId } = auth();
  if (!userId) throw new Error("Unauthorized");

  const dateRange = PeriodToDateRange(period);

  const { data } = await axios.post(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/stats/executions`,
    dateRange,
    {
      params: {
        userId,
      },
    }
  );

  return data;
}
