import { STAGES, STAGE_INFO, type Stage } from "@/content/status";

const MARKER: Record<Stage, string> = {
  building: "bg-signal border-signal",
  experimental: "border-signal bg-[linear-gradient(135deg,var(--color-signal)_50%,transparent_50%)]",
  exploring: "border-fg-muted",
  planned: "border-fg-subtle border-dashed",
  research: "border-fg-subtle border-dotted",
};

export function StageTag({ stage, className }: { stage: Stage; className?: string }) {
  return (
    <span className={`label inline-flex items-center gap-2 whitespace-nowrap text-fg-muted ${className ?? ""}`}>
      <span aria-hidden="true" className={`inline-block size-2 border ${MARKER[stage]}`} />
      {STAGE_INFO[stage].label}
    </span>
  );
}

/** A five-step maturity scale. Deliberately categorical: it shows which stage, not how much. */
export function StageScale({ stage }: { stage: Stage }) {
  const position = STAGES.indexOf(stage);
  return (
    <span aria-hidden="true" className="flex gap-1">
      {STAGES.map((s, i) => (
        <span
          key={s}
          className={`h-2.5 w-5 sm:w-7 ${i === position ? "bg-signal" : "border border-line-strong"}`}
        />
      ))}
    </span>
  );
}

export function StageLegend() {
  return (
    <dl className="grid gap-x-8 gap-y-4 sm:grid-cols-2 lg:grid-cols-3">
      {[...STAGES].reverse().map((s) => (
        <div key={s} className="flex flex-col gap-1.5">
          <dt>
            <StageTag stage={s} className="text-fg" />
          </dt>
          <dd className="text-sm leading-relaxed text-fg-muted">{STAGE_INFO[s].meaning}</dd>
        </div>
      ))}
    </dl>
  );
}
