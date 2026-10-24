import type { IconName } from "@/components/icons";
import type { Stage } from "./status";

export const PIPELINE: { name: string; does: string; produces: string; stage: Stage; icon: IconName }[] = [
  {
    name: "Discover",
    icon: "intake",
    does: "Find AI products worth representing. Today, builders submit them. Later, the system also finds them.",
    produces: "A candidate product",
    stage: "building",
  },
  {
    name: "Understand",
    icon: "profile",
    does: "Work out what the product actually does: the task, its inputs and outputs, where it runs, what it costs, and which claims are verified.",
    produces: "A structured profile",
    stage: "building",
  },
  {
    name: "Classify",
    icon: "taxonomy",
    does: "Place the product in a shared taxonomy of tasks and product types, so it can be compared with real alternatives.",
    produces: "A position in the taxonomy",
    stage: "building",
  },
  {
    name: "Match",
    icon: "search",
    does: "Connect a need to the products that fit it. Today that means search over structured data. Matching on described intent is an experiment.",
    produces: "A relevant set of products",
    stage: "experimental",
  },
  {
    name: "Distribute",
    icon: "distribute",
    does: "Put matched products in front of people where the need comes up: profiles, placements in other surfaces, endpoints agents can read.",
    produces: "Placements",
    stage: "exploring",
  },
  {
    name: "Measure",
    icon: "measure",
    does: "Record what happens after discovery: what was viewed, tried, adopted or skipped. Those signals feed back into understanding and matching.",
    produces: "Signals",
    stage: "exploring",
  },
];

export const EXISTS_TODAY = [
  "A catalog schema with structured product profiles, pricing and claim provenance.",
  "Search across listings, including full-text and fuzzy matching, and side-by-side comparison.",
  "Builder onboarding, organization accounts and a listing review workflow.",
];

export const NOT_THIS = [
  {
    name: "Not a directory",
    body: "A directory lists products and leaves the matching to you. AGENYRA is meant to match, place and measure.",
  },
  {
    name: "Not a chatbot",
    body: "Conversation may become one way in. Underneath, the system is structured product data and matching.",
  },
  {
    name: "Not another AI wrapper",
    body: "It does not resell a model. It connects people to products that other teams built.",
  },
  {
    name: "Not just a marketplace",
    body: "A marketplace is one surface. Distribution has to reach past a single website, into other tools and agents.",
  },
];
