"use client";

import { GetWorkflowExecutionWithPhases } from "@/actions/workflows/getWorkflowExecutionWithPhases";
import { GetWorkflowPhaseDetails } from "@/actions/workflows/getWorkflowPhaseDetails";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
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
import PhaseStatusBadge from "./PhaseStatusBadge";
import { TaskRegistry } from "@/lib/workflow/task/registry";

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
  console.log("phase details : ", phaseDetails);

  const creditsConsumed = GetPhasesTotalCost(query.data?.phases || []);
  console.log("total credits consumed : ", creditsConsumed);
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
              {/* <p className=" text-xs text-muted-foreground">{phase.status}</p> */}
              <PhaseStatusBadge status={phase.status} />
            </Button>
          ))}
        </div>
      </aside>

      <div className="flex w-full h-full">
        {!selectedPhase && (
          <div className=" flex items-center flex-col gap-2 justify-center h-full w-full">
            <div className=" flex flex-col gap-1 text-center">
              <p className=" font-bold">No phase selected</p>
              <p className=" text-sm text-muted-foreground">
                Select a phase to view details
              </p>
            </div>
          </div>
        )}

        {!isRunning && selectedPhase && phaseDetails.data && (
          <div className="flex flex-col py-4 container gap-4 overflow-auto">
            <div className=" flex gap-2 items-center">
              <Badge variant={"outline"} className="space-x-4">
                <div className=" flex gap-1 items-center">
                  <CoinsIcon size={18} className=" stroke-muted-foreground" />
                  <span>Credits</span>
                </div>
                <span>{phaseDetails.data.creditsCost}</span>
              </Badge>
              <Badge variant={"outline"} className="space-x-4">
                <div className=" flex gap-1 items-center">
                  <ClockIcon size={18} className=" stroke-muted-foreground" />
                  <span>Duration</span>
                </div>
                <span>
                  {DatesToDurationString(
                    phaseDetails.data.completedAt,
                    phaseDetails.data.startedAt
                  ) || "-"}
                </span>
              </Badge>
            </div>

            <ParameterViewer
              title="Inputs"
              subtitle="Inputs used for this phase"
              paramsJSON={phaseDetails.data.inputs}
            />
            <ParameterViewer
              title="Outputs"
              subtitle="Outputs generated by this phase"
              paramsJSON={phaseDetails.data.outputs}
            />
          </div>
        )}
      </div>
    </div>
  );
}

function ParameterViewer({
  title,
  subtitle,
  paramsJSON,
}: {
  title: string;
  subtitle: string;
  paramsJSON: string | null;
}) {
  // const params = paramsJSON ? JSON.parse(paramsJSON) : undefined;
  let params: Record<string, any> | null = null;

  if (paramsJSON) {
    try {
      const parsed = JSON.parse(paramsJSON);

      // Case 1: it's already an object → use as-is
      if (parsed && typeof parsed === "object" && !Array.isArray(parsed)) {
        params = parsed;
      }
      // Case 2: it's a string (like the HTML output) → wrap in object
      else if (typeof parsed === "string") {
        params = { result: parsed };
      }
    } catch {
      // Fallback: treat raw string as output
      params = { result: paramsJSON };
    }
  }
  return (
    <Card>
      <CardHeader className=" rounded-lg rounded-b-none border-b py-4 bg-gray-50 dark:bg-background">
        <CardTitle className=" text-base">{title}</CardTitle>
        <CardDescription className=" text-muted-foreground text-sm">
          {subtitle}
        </CardDescription>
      </CardHeader>
      <CardContent className=" py-4">
        <div className=" flex flex-col gap-2">
          {(!params || Object.keys(params).length === 0) && (
            <p className=" text-sm">No parameters generated by this phase</p>
          )}
          {params &&
            Object.entries(params).map(([key, value]) => (
              <div
                key={key}
                className=" flex justify-between items-center space-y-1"
              >
                <p className=" text-sm text-muted-foreground flex-1 basis-1/3">
                  {key}
                </p>
                {/* <Input
                  readOnly
                  className=" flex-1 basis-2/3"
                  value={value as string}
                /> */}
                <Input
                  readOnly
                  className=" flex-1 basis-2/3"
                  value={
                    typeof value === "string"
                      ? value
                      : JSON.stringify(value, null, 2)
                  }
                />
              </div>
            ))}
        </div>
      </CardContent>
    </Card>
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
