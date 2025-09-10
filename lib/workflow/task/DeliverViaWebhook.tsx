import { TaskParamType, TaskType } from "@/enums/task";
import { TWorkflowTask } from "@/enums/workflow";
import { MousePointerClick, SendIcon, TextIcon } from "lucide-react";

export const DeliverViaWebhookTask = {
  type: TaskType.DELIVER_VIA_WEBHOOK,
  label: "Deliver via Webhook",
  icon: (props) => <SendIcon className="stroke-blue-400" {...props} />,
  isEntryPoint: false,
  credits: 1,
  inputs: [
    {
      name: "Target URL",
      type: TaskParamType.STRING,
      required: true,
    },
    {
      name: "Body",
      type: TaskParamType.STRING,
      required: true,
    },
  ],
  outputs: [],
} satisfies TWorkflowTask;
