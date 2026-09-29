import type { Stage } from "./status";

export type Horizon = "now" | "exploring" | "later";

export type Feature = {
  id: string;
  name: string;
  summary: string;
  detail: string;
  specifics: string[];
  stage: Stage;
  horizon: Horizon;
  /** Shown on the home page when set; lower comes first. */
  homeOrder?: number;
};

export const FEATURES: Feature[] = [
  {
    id: "product-intelligence",
    name: "Product Intelligence",
    summary: "Understand what an AI product actually does.",
    detail:
      "Each product is described as structured data rather than marketing copy: the task it performs, what it takes in, what it produces, where it runs and what it costs.",
    specifics: [
      "A shared taxonomy of tasks and product types",
      "Structured profiles with inputs, outputs and deployment model",
      "Every claim labelled with its source: self-reported or verified",
    ],
    stage: "building",
    horizon: "now",
    homeOrder: 1,
  },
  {
    id: "builder-infrastructure",
    name: "Builder Infrastructure",
    summary: "A structured way for builders to represent their product.",
    detail:
      "Builders describe their product once, in a format the rest of the system can read. The same representation later feeds distribution surfaces and APIs.",
    specifics: [
      "Builder onboarding and organization accounts",
      "Listing lifecycle from draft to review to published",
      "Moderation so listings meet a consistent standard",
    ],
    stage: "building",
    horizon: "now",
    homeOrder: 4,
  },
  {
    id: "contextual-discovery",
    name: "Contextual Discovery",
    summary: "From keyword lists toward task and intent.",
    detail:
      "Search over structured product data works in the private build. The harder step, matching a described problem to the products that solve it, is still an experiment.",
    specifics: [
      "Full-text and fuzzy search across structured listings",
      "Side-by-side comparison on the same fields",
      "Intent-based matching: experimental, not public",
    ],
    stage: "experimental",
    horizon: "now",
    homeOrder: 3,
  },
  {
    id: "distribution",
    name: "Distribution",
    summary: "Place AI products where relevant users already are.",
    detail:
      "A product page on one website is a single surface. Distribution means representing a product wherever relevant demand shows up, including inside other tools and agents.",
    specifics: [
      "Public product profiles",
      "Distribution surfaces beyond a single site",
      "Placement driven by relevance, not by who shouts loudest",
    ],
    stage: "exploring",
    horizon: "exploring",
    homeOrder: 2,
  },
  {
    id: "analytics",
    name: "Analytics",
    summary: "Show builders where discovery and adoption happen.",
    detail:
      "Builders currently see traffic, not context. The goal is to show which tasks, surfaces and audiences lead to a product actually being used.",
    specifics: [
      "Discovery by surface and by task",
      "Drop-off between being found and being used",
      "Signals that feed back into better matching",
    ],
    stage: "exploring",
    horizon: "exploring",
    homeOrder: 5,
  },
  {
    id: "integrations",
    name: "Integrations",
    summary: "Connect AGENYRA to the tools builders already use.",
    detail:
      "Product data should not be re-entered by hand. Integrations would keep profiles in sync with the product itself.",
    specifics: [
      "Sync product metadata from existing sources",
      "Launch and changelog updates flowing into profiles",
    ],
    stage: "planned",
    horizon: "later",
  },
  {
    id: "apis",
    name: "APIs",
    summary: "Programmatic access to the product graph.",
    detail:
      "Once representation and discovery are stable, other applications and agents should be able to query them directly instead of scraping websites.",
    specifics: [
      "Read access to structured product data",
      "Discovery endpoints for agents and applications",
      "Write access for builders managing their listings",
    ],
    stage: "planned",
    horizon: "later",
  },
  {
    id: "network-effects",
    name: "Network Effects",
    summary: "More products and users make every match better.",
    detail:
      "Each product added improves coverage. Each use improves matching. Whether that loop can be built without degrading into a ranking game is an open question.",
    specifics: [
      "Coverage that improves as builders join",
      "Matching that improves from real outcomes",
      "Guardrails against pay-to-rank dynamics",
    ],
    stage: "research",
    horizon: "later",
    homeOrder: 6,
  },
];

export const HORIZONS: { id: Horizon; title: string; description: string }[] = [
  {
    id: "now",
    title: "Building now",
    description: "Work in progress in the private build.",
  },
  {
    id: "exploring",
    title: "Exploring",
    description: "Being scoped and prototyped. Nothing here is available yet.",
  },
  {
    id: "later",
    title: "Later",
    description: "Directions we intend to take once the foundation holds.",
  },
];
