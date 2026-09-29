const STEPS = [
  { name: "Build", note: "A team ships an AI product." },
  { name: "Distribute", note: "It is represented where relevant demand appears." },
  { name: "Discover", note: "Someone with the problem finds it." },
  { name: "Use", note: "The product does the job, or it doesn’t." },
  { name: "Learn", note: "The outcome informs the next match." },
];

export function FlowDiagram() {
  return (
    <figure className="relative">
      <div className="relative border border-line bg-ink/60 p-6 sm:p-8">
        <div className="label mb-8 flex items-center justify-between text-fg-subtle">
          <span>Fig. 01</span>
          <span>Concept</span>
        </div>
        <ol className="relative">
          <span aria-hidden="true" className="absolute bottom-[14px] left-[5px] top-[14px] w-px bg-line-strong">
            <span className="travel absolute left-[-2px] size-[5px] bg-signal" />
          </span>
          {STEPS.map((step, i) => (
            <li
              key={step.name}
              className="rise relative grid grid-cols-[11px_1fr] items-baseline gap-x-5 py-3"
              style={{ ["--delay" as string]: `${240 + i * 90}ms` }}
            >
              <span
                aria-hidden="true"
                className={`relative top-[1px] size-[11px] border ${
                  i === 0 ? "border-fg bg-fg" : "border-fg-muted bg-ink"
                }`}
              />
              <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
                <span className="font-mono text-sm tracking-[0.14em] text-fg uppercase">{step.name}</span>
                <span className="text-sm text-fg-muted sm:text-right">{step.note}</span>
              </div>
            </li>
          ))}
        </ol>
        <div className="mt-6 flex items-center gap-3 border-t border-dashed border-line pt-5">
          <svg viewBox="0 0 24 12" aria-hidden="true" className="h-3 w-6 text-signal">
            <path d="M22 6H3M7 2L3 6l4 4" stroke="currentColor" strokeWidth="1.25" fill="none" />
          </svg>
          <span className="label text-fg-subtle">Learn feeds back into distribution</span>
        </div>
      </div>
      <figcaption className="mt-3 text-[13px] text-fg-subtle">
        The loop AGENYRA is being built around. A diagram of intent, not a live system.
      </figcaption>
    </figure>
  );
}
