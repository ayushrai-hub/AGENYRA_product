import type { IconName } from "@/components/icons";
import type { Stage } from "./status";

export const BUILDER_CAPABILITIES: { name: string; note: string; stage: Stage; icon: IconName }[] = [
  {
    name: "Product profiles",
    icon: "profile",
    note: "One structured description of what your product does, for whom, and how.",
    stage: "building",
  },
  {
    name: "Structured metadata",
    icon: "fields",
    note: "Tasks, inputs, outputs, deployment and pricing as fields, not paragraphs.",
    stage: "building",
  },
  {
    name: "Discovery",
    icon: "search",
    note: "Found by the task someone needs done, not only by the keyword they typed.",
    stage: "experimental",
  },
  {
    name: "Distribution surfaces",
    icon: "distribute",
    note: "Your product represented beyond a single website.",
    stage: "exploring",
  },
  {
    name: "Analytics",
    icon: "measure",
    note: "Where you were found, by whom, and whether it led to use.",
    stage: "exploring",
  },
  {
    name: "APIs and integrations",
    icon: "api",
    note: "Keep your profile in sync and let other systems query it.",
    stage: "planned",
  },
  {
    name: "Launch infrastructure",
    icon: "launch",
    note: "Reach relevant users at launch, and keep reaching them after.",
    stage: "planned",
  },
];

export const BUILDER_PROBLEMS = [
  {
    name: "The spike",
    body: "Launch day brings attention. A week later it is gone, and many of the people who needed the product were never there to see it.",
  },
  {
    name: "Borrowed channels",
    body: "Reach depends on feeds ranked for engagement. When their ranking changes, your distribution changes with it.",
  },
  {
    name: "Unreadable products",
    body: "Your product is described in marketing copy. Nothing downstream can reliably read what it does, so nothing can match it to a need.",
  },
];

export const BUILDER_PRINCIPLES = [
  {
    name: "Claims carry provenance.",
    body: "What you report about your product is shown as self-reported until it is verified. Users can always tell the difference.",
  },
  {
    name: "Fields get matched, adjectives don't.",
    body: "Profiles describe tasks, inputs, outputs and limits. Matching reads those fields, so a precise profile beats a persuasive one.",
  },
  {
    name: "Relevance decides placement.",
    body: "Matching is being designed around fit. Whether paid placement has any role is undecided, and this page will say so when it is.",
  },
  {
    name: "No pricing yet.",
    body: "There is nothing to buy today. Builders on the waitlist will hear about pricing before it is published.",
  },
];

export const BUILDER_KINDS = [
  "AI applications",
  "Agents",
  "APIs and models",
  "MCP servers",
  "Developer tools",
  "Vertical AI products",
];
