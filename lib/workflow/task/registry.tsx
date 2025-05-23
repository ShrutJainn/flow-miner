import { TaskType } from "@/enums/task";
import { ExtractTextFromElementTask } from "./ExtractTextFromElement";
import { LaunchBrowserTask } from "./LaunchBrowser";
import { PageToHtmlTask } from "./PageToHtml";
import { TWorkflowTask } from "@/enums/workflow";

type TRegistry = {
  [K in TaskType]: TWorkflowTask & { type: K };
};
export const TaskRegistry: TRegistry = {
  LAUNCH_BROWSER: LaunchBrowserTask,
  PAGE_TO_HTML: PageToHtmlTask,
  EXTRACT_TEXT_FROM_ELEMENT: ExtractTextFromElementTask,
};
