import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/page-header";

export const metadata: Metadata = {
  title: "About",
  description: "AGENYRA is an independent attempt to rethink how AI software gets distributed.",
  alternates: { canonical: "/about" },
};

const BLOCKS = [
  {
    label: "What we’re building",
    body: [
      "A distribution layer for AI software, agents and products. It describes products as structured data, matches them to the problems people actually have, places them where those problems come up, and learns from what happens next.",
    ],
  },
  {
    label: "Why it matters",
    body: [
      "The cost of building AI software keeps falling. The number of products keeps rising. The ways people find them have barely changed: search, social feeds, lists and word of mouth.",
      "When discovery does not keep up, good products go unused and people keep solving problems by hand that software already solves.",
    ],
  },
  {
    label: "Current status",
    body: [
      "Early. A private build covers structured product representation, a taxonomy, search and builder onboarding. Distribution and intent-based matching are still being explored. Nothing is publicly available yet.",
    ],
  },
];

const PRINCIPLES = [
  { name: "Say what is real.", body: "Label everything else as planned, experimental or research." },
  { name: "Structure beats adjectives.", body: "A product is what it does, not how it is described." },
  { name: "Distribution should reward fit.", body: "The right product for the task should be the easiest one to find." },
  { name: "Build with the people who will use it.", body: "Early builders and users shape what gets built next." },
];

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="About"
        title="An independent attempt to rethink how AI software gets distributed."
      />

      <div className="border-t border-line">
        <div className="mx-auto max-w-[1240px] px-5 sm:px-8">
          {BLOCKS.map((b) => (
            <section
              key={b.label}
              aria-label={b.label}
              className="reveal grid gap-4 border-b border-line py-12 last:border-b-0 md:grid-cols-12 md:gap-8 md:py-16"
            >
              <h2 className="label text-fg-subtle md:col-span-3 md:pt-1.5">{b.label}</h2>
              <div className="max-w-[62ch] space-y-4 text-lg leading-relaxed text-fg md:col-span-9">
                {b.body.map((p) => (
                  <p key={p}>{p}</p>
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>

      <section aria-labelledby="philosophy-title" className="border-t border-line">
        <div className="mx-auto grid max-w-[1240px] gap-8 px-5 py-16 sm:px-8 md:grid-cols-12 md:py-24">
          <h2 id="philosophy-title" className="label text-fg-subtle md:col-span-3 md:pt-2">
            Philosophy
          </h2>
          <ol className="md:col-span-9">
            {PRINCIPLES.map((p, i) => (
              <li key={p.name} className="reveal grid grid-cols-[2.5rem_1fr] gap-x-4 border-t border-line py-6">
                <span className="label pt-2 text-signal">{String(i + 1).padStart(2, "0")}</span>
                <div>
                  <p className="font-display text-2xl sm:text-3xl">{p.name}</p>
                  <p className="mt-2 text-[15px] text-fg-muted">{p.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section aria-labelledby="contact-title" className="border-t border-line">
        <div className="mx-auto grid max-w-[1240px] gap-8 px-5 py-16 sm:px-8 md:grid-cols-12 md:py-24">
          <h2 id="contact-title" className="label text-fg-subtle md:col-span-3 md:pt-1.5">
            Contact
          </h2>
          <p className="max-w-[56ch] text-lg leading-relaxed text-fg md:col-span-9">
            The best way to reach us right now is the{" "}
            <Link href="/waitlist" className="underline decoration-line-strong underline-offset-4 hover:decoration-signal">
              waitlist form
            </Link>
            . It goes directly to the people building AGENYRA, and you can tell us what you want it to do.
          </p>
        </div>
      </section>
    </>
  );
}
