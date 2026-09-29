export type Stage = "research" | "planned" | "exploring" | "experimental" | "building";

/** Ordered from least to most mature. Used for the stage scale, never as a percentage. */
export const STAGES: readonly Stage[] = [
  "research",
  "planned",
  "exploring",
  "experimental",
  "building",
];

export const STAGE_INFO: Record<Stage, { label: string; meaning: string }> = {
  building: {
    label: "Building",
    meaning: "In active construction in the private build.",
  },
  experimental: {
    label: "Experimental",
    meaning: "A working internal version exists. Expect it to change.",
  },
  exploring: {
    label: "Exploring",
    meaning: "Being scoped and prototyped. The approach is not settled.",
  },
  planned: {
    label: "Planned",
    meaning: "A committed direction. Work has not started.",
  },
  research: {
    label: "Research",
    meaning: "Open questions we are still working through.",
  },
};

export const BUILD_TRACKS: { name: string; stage: Stage; note: string }[] = [
  {
    name: "Foundation",
    stage: "building",
    note: "Taxonomy, structured product representation and builder onboarding, in a private build.",
  },
  {
    name: "Discovery",
    stage: "experimental",
    note: "Search over structured product data works internally. Matching on intent does not exist yet.",
  },
  {
    name: "Distribution",
    stage: "exploring",
    note: "Distribution surfaces and the placement model are being scoped.",
  },
  {
    name: "Network",
    stage: "planned",
    note: "Personalization, APIs and integrations. After the foundation holds.",
  },
  {
    name: "Intelligence",
    stage: "research",
    note: "Contextual, intent-aware distribution. Still a set of open questions.",
  },
];
