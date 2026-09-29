import { Section } from "../section";

const RIGHTS = [
  { k: "Product", v: "The right one, among many that claim to do the same thing." },
  { k: "Task", v: "Described by what it does, not by the category it was filed under." },
  { k: "Moment", v: "When the problem exists, not when a launch happens to trend." },
  { k: "Context", v: "Inside the tools and workflows people already use." },
];

const CHANNELS = [
  { name: "Search engines", good: "Matching keywords", misses: "What you are actually trying to do" },
  { name: "Social platforms", good: "Reach and novelty", misses: "Whether a product fits your problem" },
  { name: "Product directories", good: "Breadth", misses: "Context. Lists go stale quickly" },
  { name: "Communities", good: "Trust", misses: "Scale. Answers are scattered across threads" },
  { name: "Newsletters", good: "Curation", misses: "Timing. They arrive when they arrive" },
  { name: "Marketplaces", good: "Transactions", misses: "Anything outside one ecosystem" },
  { name: "Word of mouth", good: "The highest trust", misses: "Anyone outside your circle" },
];

export function Problem() {
  return (
    <Section
      id="problem"
      index="01"
      label="Problem"
      title="AI has a distribution problem."
      lede={
        <>
          <p>
            Thousands of AI products are being built. The problem is no longer knowing that AI exists. It is finding
            the right product, for the right task, at the right moment, in the right context.
          </p>
        </>
      }
    >
      <ol className="grid border-t border-line sm:grid-cols-2 lg:grid-cols-4">
        {RIGHTS.map((r, i) => (
          <li key={r.k} className="reveal border-b border-line py-6 sm:pr-6 lg:border-b-0 lg:border-r lg:py-2 lg:pl-5 lg:first:pl-0 lg:last:border-r-0">
            <p className="label text-fg-subtle">
              <span className="text-signal">{String(i + 1).padStart(2, "0")}</span> · Right {r.k.toLowerCase()}
            </p>
            <p className="mt-3 text-[15px] leading-relaxed text-fg-muted">{r.v}</p>
          </li>
        ))}
      </ol>

      <div className="mt-20">
        <h3 className="label text-fg-subtle">Where discovery happens today</h3>
        <ul className="mt-5 border-t border-line">
          <li aria-hidden="true" className="label hidden grid-cols-12 gap-6 border-b border-line py-3 text-fg-subtle md:grid">
            <span className="col-span-4">Channel</span>
            <span className="col-span-3">Good at</span>
            <span className="col-span-5">Misses</span>
          </li>
          {CHANNELS.map((c) => (
            <li key={c.name} className="reveal grid gap-1 border-b border-line py-4 md:grid-cols-12 md:gap-6">
              <p className="text-fg md:col-span-4">{c.name}</p>
              <p className="text-[15px] text-fg-muted md:col-span-3">
                <span className="label mr-2 text-fg-subtle md:sr-only">Good at</span>
                {c.good}
              </p>
              <p className="text-[15px] text-fg-muted md:col-span-5">
                <span className="label mr-2 text-fg-subtle md:sr-only">Misses</span>
                {c.misses}
              </p>
            </li>
          ))}
        </ul>
        <p className="reveal font-display mt-12 max-w-[34ch] text-2xl leading-snug sm:text-3xl">
          AGENYRA is built on the idea that AI distribution should be infrastructure, not an afterthought left to
          whichever channel happens to notice.
        </p>
      </div>
    </Section>
  );
}
