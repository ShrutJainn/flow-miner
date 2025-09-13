import { TaskParamType, TaskType } from "@/enums/task";
import { TWorkflowTask } from "@/enums/workflow";
import { BrainIcon, MousePointerClick, TextIcon } from "lucide-react";

export const ExtractDataWithAITask = {
  type: TaskType.EXTRACT_DATA_WITH_AI,
  label: "Extract Data With AI",
  icon: (props) => <BrainIcon className="stroke-rose-400" {...props} />,
  isEntryPoint: false,
  credits: 5,
  inputs: [
    {
      name: "Content",
      type: TaskParamType.STRING,
      required: true,
    },
    {
      name: "Credentials",
      type: TaskParamType.CREDENTIALS,
      required: true,
    },
    {
      name: "Prompt",
      type: TaskParamType.STRING,
      required: true,
      variant: "textarea",
    },
  ],
  outputs: [
    {
      name: "Extracted data",
      type: TaskParamType.STRING,
    },
  ],
} satisfies TWorkflowTask;
