import type { Stage } from "./status";

export const BUILDER_CAPABILITIES: { name: string; note: string; stage: Stage }[] = [
  {
    name: "Product profiles",
    note: "One structured description of what your product does, for whom, and how.",
    stage: "building",
  },
  {
    name: "Structured metadata",
    note: "Tasks, inputs, outputs, deployment and pricing as fields, not paragraphs.",
    stage: "building",
  },
  {
    name: "Discovery",
    note: "Found by the task someone needs done, not only by the keyword they typed.",
    stage: "experimental",
  },
  {
    name: "Distribution surfaces",
    note: "Your product represented beyond a single website.",
    stage: "exploring",
  },
  {
    name: "Analytics",
    note: "Where you were found, by whom, and whether it led to use.",
    stage: "exploring",
  },
  {
    name: "APIs and integrations",
    note: "Keep your profile in sync and let other systems query it.",
    stage: "planned",
  },
  {
    name: "Launch infrastructure",
    note: "Reach relevant users at launch, and keep reaching them after.",
    stage: "planned",
  },
];
