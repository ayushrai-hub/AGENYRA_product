import type { Metadata } from "next";
import { GetInEarly } from "@/components/get-in-early";
import { PageHeader } from "@/components/page-header";
import { Section } from "@/components/section";
import { StageTag } from "@/components/stage";
import { BUILDER_CAPABILITIES } from "@/content/builders";

export const metadata: Metadata = {
  title: "Builders",
  description:
    "For AI builders: structured product representation, discovery and distribution beyond a launch. Join the AGENYRA builder waitlist.",
  alternates: { canonical: "/builders" },
};

const PROBLEMS = [
  {
    name: "The spike",
    body: "Launch day brings attention. A week later it is gone, and many of the people who needed the product were never there to see it.",
  },
  {
    name: "Borrowed channels",
    body: "Reach depends on platforms optimized for engagement, not fit. When their algorithms change, your distribution changes with them.",
  },
  {
    name: "Unreadable products",
    body: "Your product is described in marketing copy. Nothing downstream can reliably read what it does, so nothing can match it to a need.",
  },
];

const PRINCIPLES = [
  {
    name: "Claims carry provenance.",
    body: "What you report about your product is shown as self-reported until it is verified. Users can always tell the difference.",
  },
  {
    name: "Structure over promotion.",
    body: "Profiles describe tasks, inputs, outputs and limits. That is what gets matched, so that is what matters.",
  },
  {
    name: "Fit over spend.",
    body: "Matching is being designed around relevance. How paid placement fits in, if at all, is an open question, and we will say so when it is answered.",
  },
  {
    name: "No pricing yet.",
    body: "There is nothing to buy today. Early builders will hear about pricing before anyone else.",
  },
];

const WHO = ["AI applications", "Agents", "APIs and models", "MCP servers", "Developer tools", "Vertical AI products"];

export default function BuildersPage() {
  return (
    <>
      <PageHeader eyebrow="For builders" title="Build the product. We help it travel.">
        <p>
          Building an AI product has never been easier. Being found by the people who need it has not kept up.
          AGENYRA is being built to close that gap.
        </p>
      </PageHeader>

      <Section id="problem" index="01" label="The problem" title="A launch is not a distribution strategy.">
        <ol className="grid gap-10 md:grid-cols-3 md:gap-8">
          {PROBLEMS.map((p, i) => (
            <li key={p.name} className="reveal border-t border-line pt-5">
              <p className="label text-fg-subtle">
                <span className="text-signal">{String(i + 1).padStart(2, "0")}</span>
              </p>
              <h3 className="font-display mt-4 text-2xl">{p.name}</h3>
              <p className="mt-3 text-[15px] leading-relaxed text-fg-muted">{p.body}</p>
            </li>
          ))}
        </ol>
      </Section>

      <Section
        id="capabilities"
        index="02"
        label="What you get"
        title="What AGENYRA is building for builders."
        lede={<p>Each item is marked with its real stage. Two are being built. The rest are not available yet.</p>}
      >
        <ul className="border-t border-line">
          {BUILDER_CAPABILITIES.map((c) => (
            <li key={c.name} className="reveal grid gap-2 border-b border-line py-5 sm:grid-cols-12 sm:items-baseline sm:gap-6">
              <p className="text-fg sm:col-span-4">{c.name}</p>
              <p className="text-[15px] leading-relaxed text-fg-muted sm:col-span-6">{c.note}</p>
              <div className="sm:col-span-2 sm:text-right">
                <StageTag stage={c.stage} />
              </div>
            </li>
          ))}
        </ul>
      </Section>

      <Section id="principles" index="03" label="Principles" title="How your product will be treated.">
        <dl className="grid gap-x-10 gap-y-10 sm:grid-cols-2">
          {PRINCIPLES.map((p) => (
            <div key={p.name} className="reveal border-t border-line pt-5">
              <dt className="font-display text-2xl">{p.name}</dt>
              <dd className="mt-3 text-[15px] leading-relaxed text-fg-muted">{p.body}</dd>
            </div>
          ))}
        </dl>
      </Section>

      <Section
        id="who"
        index="04"
        label="Who"
        title="Who we want to hear from."
        lede={<p>If you build software where AI does the core work, the early builder network is for you.</p>}
      >
        <ul className="flex flex-wrap gap-2">
          {WHO.map((w) => (
            <li key={w} className="border border-line-strong px-3 py-2 font-mono text-[13px] text-fg-muted">
              {w}
            </li>
          ))}
        </ul>
      </Section>

      <GetInEarly
        title="Join the builder waitlist."
        body="Tell us what you are building. Early builders will shape how products are represented and distributed."
        cta="Join the builder waitlist"
        href="/waitlist?as=builder"
      />
    </>
  );
}
