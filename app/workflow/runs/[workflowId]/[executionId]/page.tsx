import { GetWorkflowExecutionWithPhases } from "@/actions/workflows/getWorkflowExecutionWithPhases";
import Topbar from "@/app/workflow/_components/topbar/Topbar";
import { auth } from "@clerk/nextjs/server";
import { Loader2Icon } from "lucide-react";
import { Suspense } from "react";
import ExecutionViewer from "./_components/ExecutionViewer";

export default function ExecutionViewerPage({
  params,
}: {
  params: {
    executionId: string;
    workflowId: string;
  };
}) {
  const { workflowId, executionId } = params;
  return (
    <div className=" flex flex-col h-screen w-full overflow-hidden">
      <Topbar
        workflowId={workflowId}
        title="Workflow run details"
        subtitle={`Run ID : ${executionId}`}
        hideButtons
      />
      <section className=" flex h-full overflow-auto">
        <Suspense
          fallback={
            <div className=" flex w-full items-center justify-center">
              <Loader2Icon className=" h-10 w-10 animate-spin stroke-primary" />
            </div>
          }
        >
          <ExecutionViewerWrapper executionId={executionId} />
        </Suspense>
      </section>
    </div>
  );
}

async function ExecutionViewerWrapper({
  executionId,
}: {
  executionId: string;
}) {
  const { userId } = auth();
  if (!userId) return <div>unauthenticated</div>;
  const data = await GetWorkflowExecutionWithPhases(executionId); //data -> {workflowExecution : {....}, phases : {....}}
  if (!data) return <div>Not found</div>;

  return <ExecutionViewer initialData={data} />;
}
