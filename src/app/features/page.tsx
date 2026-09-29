import type { Metadata } from "next";
import { GetInEarly } from "@/components/get-in-early";
import { PageHeader } from "@/components/page-header";
import { StageLegend, StageTag } from "@/components/stage";
import { FEATURES, HORIZONS } from "@/content/features";

export const metadata: Metadata = {
  title: "Features",
  description:
    "The capabilities that make up AGENYRA, grouped by stage: what is being built now, what is being explored, and what comes later.",
  alternates: { canonical: "/features" },
};

export default function FeaturesPage() {
  return (
    <>
      <PageHeader eyebrow="Features" title="What the system is made of.">
        <p>
          Eight capabilities, grouped by how far along they are. &ldquo;Building now&rdquo; means work is underway in
          the private build. Nothing on this page is publicly available yet.
        </p>
      </PageHeader>

      {HORIZONS.map((h, hi) => {
        const items = FEATURES.filter((f) => f.horizon === h.id);
        return (
          <section key={h.id} aria-labelledby={`${h.id}-title`} className="border-t border-line">
            <div className="mx-auto max-w-[1240px] px-5 py-16 sm:px-8 md:py-24">
              <div className="grid gap-4 md:grid-cols-12 md:gap-8">
                <p className="label text-fg-subtle md:col-span-3 md:pt-2">
                  <span className="text-signal">{String(hi + 1).padStart(2, "0")}</span> · {items.length}{" "}
                  {items.length === 1 ? "capability" : "capabilities"}
                </p>
                <div className="md:col-span-9">
                  <h2 id={`${h.id}-title`} className="font-display text-4xl sm:text-5xl">
                    {h.title}
                  </h2>
                  <p className="mt-3 text-lg text-fg-muted">{h.description}</p>
                </div>
              </div>

              <div className="mt-12 md:grid md:grid-cols-12 md:gap-8">
              <ul className="border-t border-line md:col-span-9 md:col-start-4">
                {items.map((f) => (
                  <li key={f.id} id={f.id} className="reveal grid gap-6 border-b border-line py-8 lg:grid-cols-12 lg:gap-8">
                    <div className="lg:col-span-4">
                      <h3 className="font-display text-[1.75rem] leading-tight">{f.name}</h3>
                      <StageTag stage={f.stage} className="mt-3" />
                    </div>
                    <div className="lg:col-span-8">
                      <p className="text-lg text-fg">{f.summary}</p>
                      <p className="mt-3 text-[15px] leading-relaxed text-fg-muted">{f.detail}</p>
                      <ul className="mt-5 space-y-2">
                        {f.specifics.map((s) => (
                          <li key={s} className="flex gap-3 text-[15px] text-fg-muted">
                            <span aria-hidden="true" className="font-mono text-fg-subtle">
                              —
                            </span>
                            {s}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </li>
                ))}
              </ul>
              </div>
            </div>
          </section>
        );
      })}

      <section aria-labelledby="stages-title" className="border-t border-line">
        <div className="mx-auto grid max-w-[1240px] gap-8 px-5 py-16 sm:px-8 md:grid-cols-12 md:py-24">
          <h2 id="stages-title" className="label text-fg-subtle md:col-span-3 md:pt-1">
            What the stages mean
          </h2>
          <div className="md:col-span-9">
            <StageLegend />
          </div>
        </div>
      </section>

      <GetInEarly />
    </>
  );
}
