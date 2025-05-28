"use client";

import { GetWorkflowExecutionWithPhases } from "@/actions/workflows/getWorkflowExecutionWithPhases";
import { Separator } from "@/components/ui/separator";
import { WorkflowExecutionStatus } from "@/enums/workflow";
import { useQuery } from "@tanstack/react-query";
import { formatDistanceToNow } from "date-fns";
import {
  CalendarIcon,
  CircleDashedIcon,
  ClockIcon,
  CoinsIcon,
  LucideIcon,
  LucideProps,
  WorkflowIcon,
} from "lucide-react";
import React, { ReactNode } from "react";

type ExecutionData = Awaited<ReturnType<typeof GetWorkflowExecutionWithPhases>>;

// type ExecutionData = {
//   workflowExecution: any;
//   phases: any;
// };
function ExecutionViewer({ initialData }: { initialData: ExecutionData }) {
  const query = useQuery({
    queryKey: ["execution", initialData.workflowExecution?.id],
    initialData,
    queryFn: () =>
      GetWorkflowExecutionWithPhases(initialData!.workflowExecution.id),
    refetchInterval: (q) =>
      q.state.data?.workflowExecution.status === WorkflowExecutionStatus.RUNNING
        ? 1000
        : false,
  });
  return (
    <div className=" flex w-full h-full">
      <aside className=" w-[440px] min-w-[440px] max-w-[440px] border-r-2 border-separate flex flex-grow flex-col overflow-hidden">
        <div className=" py-4 px-2">
          <ExecutionLabel
            icon={CircleDashedIcon}
            label="Status"
            value={query.data?.workflowExecution.status}
          />

          <ExecutionLabel
            icon={CalendarIcon}
            label="Started At"
            // value={query.data?.workflowExecution.status}
            value={
              <span className=" lowercase">
                {query.data?.workflowExecution.startedAt
                  ? formatDistanceToNow(
                      new Date(query.data?.workflowExecution.startedAt),
                      {
                        addSuffix: true,
                      }
                    )
                  : "-"}
              </span>
            }
          />
          <ExecutionLabel icon={ClockIcon} label="Duration" value="todo" />
          <ExecutionLabel
            icon={CoinsIcon}
            label="Credits consumed"
            value="todo"
          />
        </div>
        <Separator />
        <div className=" flex justify-center items-center py-2 px-4">
          <div className=" text-muted-foreground flex items-center gap-2">
            <WorkflowIcon size={20} className=" stroke-muted-foreground/80" />
            <span className=" font-semibold">Phases</span>
          </div>
        </div>
        <Separator />
      </aside>
    </div>
  );
}

function ExecutionLabel({
  icon,
  label,
  value,
}: {
  icon: LucideIcon;
  label: ReactNode;
  value: ReactNode;
}) {
  const Icon = icon;
  return (
    <div className=" flex justify-between items-center py-2 px-4 text-sm">
      <div className=" text-muted-foreground flex items-center gap-2 ">
        <Icon size={20} className=" stroke-muted-foreground/80" />
        <span>{label}</span>
      </div>
      <div className=" font-semibold capitalize flex gap-2 items-center">
        {/* {query.data?.workflowExecution.status} */}
        {value}
      </div>
    </div>
  );
}
export default ExecutionViewer;
