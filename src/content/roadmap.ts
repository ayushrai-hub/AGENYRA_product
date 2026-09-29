import type { Stage } from "./status";

export type Phase = {
  number: string;
  name: string;
  stage: Stage;
  intent: string;
  items: { name: string; stage: Stage }[];
};

export const PHASES: Phase[] = [
  {
    number: "01",
    name: "Foundation",
    stage: "building",
    intent: "Describe AI products precisely enough that they can be compared and matched.",
    items: [
      { name: "Taxonomy", stage: "building" },
      { name: "Product representation", stage: "building" },
      { name: "Discovery infrastructure", stage: "building" },
      { name: "Builder onboarding", stage: "building" },
    ],
  },
  {
    number: "02",
    name: "Distribution",
    stage: "exploring",
    intent: "Put that representation in front of people, beyond a single website.",
    items: [
      { name: "Product profiles", stage: "experimental" },
      { name: "Distribution surfaces", stage: "exploring" },
      { name: "Analytics", stage: "exploring" },
    ],
  },
  {
    number: "03",
    name: "Network",
    stage: "planned",
    intent: "Open the system up to other applications, agents and builders.",
    items: [
      { name: "Personalization", stage: "planned" },
      { name: "Agent discovery", stage: "planned" },
      { name: "APIs", stage: "planned" },
      { name: "Integrations", stage: "planned" },
    ],
  },
  {
    number: "04",
    name: "Intelligence",
    stage: "research",
    intent: "Distribute by understanding the problem, not by matching the query.",
    items: [
      { name: "Contextual distribution", stage: "research" },
      { name: "Intent understanding", stage: "research" },
      { name: "Automated distribution", stage: "research" },
      { name: "AI-native discovery", stage: "research" },
    ],
  },
];
