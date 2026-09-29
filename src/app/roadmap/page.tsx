import type { Metadata } from "next";
import { GetInEarly } from "@/components/get-in-early";
import { PageHeader } from "@/components/page-header";
import { StageLegend, StageTag } from "@/components/stage";
import { PHASES } from "@/content/roadmap";
import { STATUS_AS_OF } from "@/content/site";

export const metadata: Metadata = {
  title: "Roadmap",
  description:
    "AGENYRA's roadmap in four phases: foundation, distribution, network and intelligence. Each phase is marked with its real stage.",
  alternates: { canonical: "/roadmap" },
};

export default function RoadmapPage() {
  return (
    <>
      <PageHeader eyebrow="Roadmap" title="Four phases. No dates yet.">
        <p>
          Dates will appear when they are real. Until then, every phase and every item is marked with the stage it is
          actually in.
        </p>
      </PageHeader>

      <section aria-label="Phases" className="border-t border-line">
        <div className="mx-auto max-w-[1240px] px-5 py-16 sm:px-8 md:py-24">
          <div className="label mb-10 flex justify-between text-fg-subtle">
            <span>Phases 01 — 04</span>
            <span>As of {STATUS_AS_OF}</span>
          </div>
          <ol className="relative grid gap-0 lg:grid-cols-4">
            <span aria-hidden="true" className="absolute left-[5px] top-0 h-full w-px bg-line-strong lg:left-0 lg:top-[5px] lg:h-px lg:w-full" />
            {PHASES.map((phase) => {
              const current = phase.stage === "building";
              return (
                <li key={phase.number} className="reveal relative pb-14 pl-10 last:pb-0 lg:pb-0 lg:pl-0 lg:pr-8 lg:pt-12">
                  <span
                    aria-hidden="true"
                    className={`absolute left-0 top-1 size-[11px] border lg:top-0 ${
                      current ? "border-signal bg-signal" : "border-fg-subtle bg-ink"
                    }`}
                  />
                  <p className="font-mono text-sm text-fg-subtle">{phase.number}</p>
                  <h2 className="font-display mt-2 text-4xl">{phase.name}</h2>
                  <StageTag stage={phase.stage} className="mt-4 text-fg" />
                  <p className="mt-5 text-[15px] leading-relaxed text-fg-muted">{phase.intent}</p>
                  <ul className="mt-6 border-t border-line">
                    {phase.items.map((item) => (
                      <li key={item.name} className="flex items-baseline justify-between gap-4 border-b border-line py-3">
                        <span className="text-[15px] text-fg">{item.name}</span>
                        <StageTag stage={item.stage} />
                      </li>
                    ))}
                  </ul>
                </li>
              );
            })}
          </ol>
        </div>
      </section>

      <section id="stages" aria-labelledby="stages-title" className="border-t border-line">
        <div className="mx-auto grid max-w-[1240px] gap-8 px-5 py-16 sm:px-8 md:grid-cols-12 md:py-24">
          <div className="md:col-span-3">
            <h2 id="stages-title" className="label text-fg-subtle">
              What the stages mean
            </h2>
          </div>
          <div className="md:col-span-9">
            <StageLegend />
            <p className="mt-12 max-w-[60ch] border-t border-line pt-6 text-[15px] leading-relaxed text-fg-muted">
              This roadmap will change as we learn. When it does, this page changes with it. Items move between stages
              only when the work has actually moved.
            </p>
          </div>
        </div>
      </section>

      <GetInEarly />
    </>
  );
}
