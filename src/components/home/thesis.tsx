import { Section } from "../section";

const TRADITIONAL = ["Build", "Website", "Hope people find it"];

const LOOP = [
  { name: "Build", note: "The builder ships the product." },
  { name: "Understand", note: "What it actually does, for whom, with which inputs and outputs." },
  { name: "Distribute", note: "Placed on surfaces where relevant demand exists." },
  { name: "Discover", note: "Found by someone with a matching task." },
  { name: "Use", note: "Tried on a real problem." },
  { name: "Measure", note: "Where discovery and adoption actually happened." },
  { name: "Improve", note: "Understanding and matching get better." },
];

export function Thesis() {
  return (
    <Section
      id="thesis"
      index="02"
      label="Thesis"
      title="From software discovery to contextual distribution."
      lede={
        <p>
          Most AI products follow the same path: build it, put up a website, hope. Distribution is whatever the builder
          can manage alone. We think it should be a system, and a system needs feedback.
        </p>
      }
    >
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-4">
          <p className="label text-fg-subtle">Traditional</p>
          <ol className="mt-6 flex flex-col">
            {TRADITIONAL.map((step, i) => {
              const last = i === TRADITIONAL.length - 1;
              return (
                <li key={step} className="flex flex-col">
                  <span
                    className={`border px-4 py-3 font-mono text-sm ${
                      last ? "border-dashed border-line-strong text-fg-subtle" : "border-line-strong text-fg-muted"
                    }`}
                  >
                    {step}
                  </span>
                  {!last ? <span aria-hidden="true" className="ml-5 h-6 w-px bg-line-strong" /> : null}
                </li>
              );
            })}
          </ol>
          <div aria-hidden="true" className="ml-5 flex flex-col items-start">
            <span className="h-10 w-px border-l border-dashed border-line-strong" />
            <span className="label -ml-[3px] text-fg-subtle">?</span>
          </div>
          <p className="mt-6 max-w-[32ch] text-[15px] leading-relaxed text-fg-subtle">
            No feedback. Nothing learned about who the product was for, or where they were.
          </p>
        </div>

        <div className="lg:col-span-8">
          <p className="label text-signal">AGENYRA</p>
          <ol className="mt-6 border-t border-line">
            {LOOP.map((step, i) => {
              const inLoop = i >= 1;
              return (
                <li
                  key={step.name}
                  className={`reveal relative grid grid-cols-[2.5rem_1fr] items-baseline gap-x-4 border-b border-line py-4 pr-10 sm:grid-cols-[3rem_10rem_1fr] sm:pr-14 ${
                    inLoop ? "border-r border-r-signal/40" : ""
                  }`}
                >
                  <span className="label text-fg-subtle">{String(i + 1).padStart(2, "0")}</span>
                  <span className="font-display text-2xl leading-none sm:text-[1.75rem]">{step.name}</span>
                  <span className="col-start-2 mt-1 text-[15px] leading-relaxed text-fg-muted sm:col-start-3 sm:mt-0">
                    {step.note}
                  </span>
                  {i === 1 ? (
                    <svg
                      viewBox="0 0 24 12"
                      aria-hidden="true"
                      className="absolute -top-[6px] right-0 h-3 w-6 text-signal"
                    >
                      <path d="M24 6H4M8 2L4 6l4 4" stroke="currentColor" strokeWidth="1.25" fill="none" />
                    </svg>
                  ) : null}
                </li>
              );
            })}
          </ol>
          <p className="label mt-4 flex justify-end text-fg-subtle">
            <span>Measure → Improve → Understand: the loop closes</span>
          </p>
        </div>
      </div>
    </Section>
  );
}
