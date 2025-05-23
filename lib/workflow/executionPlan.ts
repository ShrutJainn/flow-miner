import {
  TWorkflowExecutionPlan,
  TWorkflowExecutionPlanPhase,
} from "@/enums/workflow";
import { IAppNode, TAppNodeMissingInputs } from "@/types/appNode";
import { Edge, getIncomers } from "@xyflow/react";
import { TaskRegistry } from "./task/registry";

export enum TFlowToExecutionPlanValidationError {
  "NO_ENTRY_POINT",
  "INVALID_INPUTS",
}
type TFlowToExecutionPlan = {
  executionPlan?: TWorkflowExecutionPlan;
  error?: {
    type: TFlowToExecutionPlanValidationError;
    invalidElements?: TAppNodeMissingInputs[];
  };
};
export function FlowToExecutionPlan(
  nodes: IAppNode[],
  edges: Edge[]
): TFlowToExecutionPlan {
  const entryPoint = nodes.find(
    (node) => TaskRegistry[node.data.type].isEntryPoint
  );

  if (!entryPoint) {
    return {
      error: {
        type: TFlowToExecutionPlanValidationError.NO_ENTRY_POINT,
      },
    };
  }

  const inputWithErrors: TAppNodeMissingInputs[] = [];
  const planned = new Set<string>(); // this set will contain all the nodes that are visited/added to executionPlan
  const invalidInputs = getInvalidInputs(entryPoint, edges, planned);
  if (invalidInputs.length > 0) {
    inputWithErrors.push({
      nodeId: entryPoint.id,
      inputs: invalidInputs,
    });
  }
  const executionPlan: TWorkflowExecutionPlan = [
    {
      phase: 1,
      nodes: [entryPoint],
    },
  ];

  planned.add(entryPoint.id);

  for (
    let phase = 2;
    phase <= nodes.length && planned.size < nodes.length;
    phase++
  ) {
    const nextPhase: TWorkflowExecutionPlanPhase = { phase, nodes: [] };
    //visit all unvisited nodes
    for (const currentNode of nodes) {
      if (planned.has(currentNode.id)) {
        continue;
      }

      //validate the input of node
      const invalidInputs = getInvalidInputs(currentNode, edges, planned);
      if (invalidInputs?.length > 0) {
        const indegreeOfNode = getIncomers(currentNode, nodes, edges);
        if (indegreeOfNode.every((incomer) => planned.has(incomer.id))) {
          console.error("Inalid inputs", currentNode.id, invalidInputs);

          inputWithErrors.push({
            nodeId: currentNode.id,
            inputs: invalidInputs,
          });
        } else {
          continue;
        }
      }

      nextPhase.nodes.push(currentNode);
    }
    for (const node of nextPhase.nodes) planned.add(node.id);
    executionPlan.push(nextPhase);
  }

  if (inputWithErrors.length > 0) {
    return {
      error: {
        type: TFlowToExecutionPlanValidationError.INVALID_INPUTS,
        invalidElements: inputWithErrors,
      },
    };
  }
  return { executionPlan };
}

function getInvalidInputs(node: IAppNode, edges: Edge[], planned: Set<string>) {
  const invalidInputs = [];
  const inputs = TaskRegistry[node.data.type].inputs;
  for (const input of inputs) {
    const inputValue = node.data.inputs[input.name];
    const inputValueProvided = inputValue?.length > 0;
    if (inputValueProvided) {
      continue;
    }

    //if a value is not provided by the user, then check if there is an output linked to the current input
    const incomingEdges = edges.filter((edge) => edge.target === node.id);
    const inputLinkedToOutput = incomingEdges.find(
      (edge) => edge.targetHandle === input.name
    );

    const requiredInputProvidedByVisitedOutput =
      input.required &&
      inputLinkedToOutput &&
      planned.has(inputLinkedToOutput.source);

    if (requiredInputProvidedByVisitedOutput) {
      continue;
    } else if (!input.required) {
      if (!inputLinkedToOutput) continue;
      if (inputLinkedToOutput && planned.has(inputLinkedToOutput.source)) {
        continue;
      }
    }
    invalidInputs.push(input.name);
  }
  return invalidInputs;
}
