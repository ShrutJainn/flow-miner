"use client";

import { GetWorkflowExecutionWithPhases } from "@/actions/workflows/getWorkflowExecutionWithPhases";
import { GetWorkflowPhaseDetails } from "@/actions/workflows/getWorkflowPhaseDetails";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { WorkflowExecutionStatus } from "@/enums/workflow";
import { DatesToDurationString } from "@/lib/helper/dates";
import { GetPhasesTotalCost } from "@/lib/helper/phases";
import { useQuery } from "@tanstack/react-query";
import { formatDistanceToNow } from "date-fns";
import {
  CalendarIcon,
  CircleDashedIcon,
  ClockIcon,
  CoinsIcon,
  Loader2Icon,
  LucideIcon,
  LucideProps,
  WorkflowIcon,
} from "lucide-react";
import React, { ReactNode, useState } from "react";

type ExecutionData = Awaited<ReturnType<typeof GetWorkflowExecutionWithPhases>>;

// type ExecutionData = {
//   workflowExecution: any;
//   phases: any;
// };
function ExecutionViewer({ initialData }: { initialData: ExecutionData }) {
  const [selectedPhase, setSelectedPhase] = useState<string | null>(null);
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

  const phaseDetails = useQuery({
    queryKey: ["phaseDetails", selectedPhase],
    enabled: selectedPhase !== null,
    queryFn: () => GetWorkflowPhaseDetails(selectedPhase),
  });

  console.log("phase id : ", selectedPhase);

  const isRunning =
    query.data?.workflowExecution.status === WorkflowExecutionStatus.RUNNING;

  const duration = DatesToDurationString(
    query.data?.workflowExecution.completedAt,
    query.data?.workflowExecution.startedAt
  );

  const creditsConsumed = GetPhasesTotalCost(query.data?.phases || []);
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
          <ExecutionLabel
            icon={ClockIcon}
            label="Duration"
            value={
              duration ? (
                duration
              ) : (
                <Loader2Icon className=" animate-spin" size={20} />
              )
            }
          />
          <ExecutionLabel
            icon={CoinsIcon}
            label="Credits consumed"
            value={creditsConsumed}
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
        <div className=" overflow-auto h-full px-2 py-4">
          {query.data?.phases.map((phase: any, index: any) => (
            <Button
              variant={selectedPhase === phase.id ? "secondary" : "ghost"}
              key={phase.id}
              className=" w-full justify-between flex"
              onClick={() => {
                if (isRunning) return;
                setSelectedPhase(phase.id);
              }}
            >
              <div className=" flex items-center gap-2">
                <Badge variant={"outline"}>{index + 1}</Badge>
                <p className=" font-semibold">{phase.name}</p>
              </div>
              <p className=" text-xs text-muted-foreground">{phase.status}</p>
            </Button>
          ))}
        </div>
      </aside>
      <div className=" flex w-full h-full">
        <pre>{JSON.stringify(phaseDetails.data, null, 4)}</pre>
      </div>
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
