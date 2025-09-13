import { TaskParamType, TaskType } from "@/enums/task";
import { TWorkflowTask } from "@/enums/workflow";
import type { LucideProps } from "lucide-react";
import { CodeIcon, GlobeIcon } from "lucide-react";

export const PageToHtmlTask = {
  type: TaskType.PAGE_TO_HTML,
  label: "Get html from page",
  icon: (props: LucideProps) => (
    <CodeIcon className="stroke-rose-400" {...props} />
  ),
  isEntryPoint: false,
  credits: 2,
  inputs: [
    {
      name: "Web page",
      type: TaskParamType.BROWSER_INSTANCE,
      required: true,
    },
  ],
  outputs: [
    {
      name: "Html",
      type: TaskParamType.STRING,
    },
  ],
} satisfies TWorkflowTask;
