import type { Metadata } from "next";
import { GetInEarly } from "@/components/get-in-early";
import { PageHeader } from "@/components/page-header";
import { Section } from "@/components/section";
import { StageTag } from "@/components/stage";
import type { Stage } from "@/content/status";

export const metadata: Metadata = {
  title: "Product",
  description:
    "How AGENYRA is designed: a six-stage system that discovers, understands, classifies, matches, distributes and measures AI products.",
  alternates: { canonical: "/product" },
};

const PIPELINE: { name: string; does: string; produces: string; stage: Stage }[] = [
  {
    name: "Discover",
    does: "Find AI products worth representing. Today, builders submit them. Later, the system also finds them.",
    produces: "A candidate product",
    stage: "building",
  },
  {
    name: "Understand",
    does: "Work out what the product actually does: the task, its inputs and outputs, where it runs, what it costs, and which claims are verified.",
    produces: "A structured profile",
    stage: "building",
  },
  {
    name: "Classify",
    does: "Place the product in a shared taxonomy of tasks and product types, so it can be compared with real alternatives.",
    produces: "A position in the taxonomy",
    stage: "building",
  },
  {
    name: "Match",
    does: "Connect a need to the products that fit it. Today that means search over structured data. Matching on described intent is an experiment.",
    produces: "A relevant set of products",
    stage: "experimental",
  },
  {
    name: "Distribute",
    does: "Put matched products in front of people where the need comes up: profiles, placements in other surfaces, endpoints agents can read.",
    produces: "Placements",
    stage: "exploring",
  },
  {
    name: "Measure",
    does: "Record what happens after discovery: what was viewed, tried, adopted or skipped. Those signals feed back into understanding and matching.",
    produces: "Signals",
    stage: "exploring",
  },
];

const EXISTS_TODAY = [
  "A catalog schema with structured product profiles, pricing and claim provenance.",
  "Search across listings, including full-text and fuzzy matching, and side-by-side comparison.",
  "Builder onboarding, organization accounts and a listing review workflow.",
];

const NOT_THIS = [
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

export default function ProductPage() {
  return (
    <>
      <PageHeader eyebrow="Product" title="A distribution system for AI software.">
        <p>
          AGENYRA is designed as six stages. Each one turns something loose, like a product website or a
          person&rsquo;s problem, into something the next stage can act on.
        </p>
        <p>Here is the model, and where each stage actually stands.</p>
      </PageHeader>

      <Section
        id="model"
        index="01"
        label="The model"
        title="Six stages, one direction of flow."
        lede={<p>Products enter at the top. Measurement at the bottom feeds back into the stages above it.</p>}
      >
        <ol className="grid gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
          {PIPELINE.map((s, i) => (
            <li key={s.name} className="reveal flex flex-col bg-ink p-6 sm:p-7">
              <div className="flex items-center justify-between">
                <span className="label text-signal">{String(i + 1).padStart(2, "0")}</span>
                <StageTag stage={s.stage} />
              </div>
              <h3 className="mt-8 font-mono text-base tracking-[0.16em] uppercase">{s.name}</h3>
              <p className="mt-3 flex-1 text-[15px] leading-relaxed text-fg-muted">{s.does}</p>
              <p className="mt-6 border-t border-dashed border-line pt-4 text-[14px] text-fg">
                <span className="label mr-3 text-fg-subtle">Produces</span>
                {s.produces}
              </p>
            </li>
          ))}
        </ol>
        <p className="label mt-5 flex items-center gap-3 text-fg-subtle">
          <svg viewBox="0 0 24 12" aria-hidden="true" className="h-3 w-6 text-signal">
            <path d="M22 6H3M7 2L3 6l4 4" stroke="currentColor" strokeWidth="1.25" fill="none" />
          </svg>
          Measure feeds back into Understand and Match
        </p>
      </Section>

      <Section
        id="today"
        index="02"
        label="What exists"
        title="What exists today."
        lede={
          <p>
            A private build covers the first three stages and part of the fourth. It is not public, and there are no
            open signups. That is what the waitlist is for.
          </p>
        }
      >
        <ul className="border-t border-line">
          {EXISTS_TODAY.map((item) => (
            <li key={item} className="reveal flex gap-5 border-b border-line py-5">
              <span aria-hidden="true" className="mt-2 inline-block size-2 shrink-0 bg-signal" />
              <span className="text-[17px] leading-relaxed text-fg">{item}</span>
            </li>
          ))}
        </ul>
      </Section>

      <Section id="not" index="03" label="Boundaries" title="What AGENYRA is not.">
        <dl className="grid gap-x-10 gap-y-10 sm:grid-cols-2">
          {NOT_THIS.map((n) => (
            <div key={n.name} className="reveal border-t border-line pt-5">
              <dt className="font-display text-2xl">{n.name}</dt>
              <dd className="mt-3 text-[15px] leading-relaxed text-fg-muted">{n.body}</dd>
            </div>
          ))}
        </dl>
      </Section>

      <GetInEarly />
    </>
  );
}
