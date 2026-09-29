import { Section } from "../section";

const DECOMPOSITION = [
  { k: "Task", v: "Extract content, then restructure it" },
  { k: "Input", v: "PDF and Word documents" },
  { k: "Output", v: "A structured report" },
  { k: "Constraints", v: "Private data. Exportable format." },
];

export function Users() {
  return (
    <Section
      id="users"
      index="05"
      label="For users"
      title="Stop searching for tools. Start finding what solves the problem."
      lede={
        <p>
          Nobody needs a list of AI tools. They need a specific job done. Discovery should start from the job.
        </p>
      }
    >
      <div className="grid gap-px border border-line bg-line lg:grid-cols-2">
        <div className="bg-ink p-6 sm:p-8">
          <p className="label text-fg-subtle">Today</p>
          <p className="font-display mt-8 text-2xl leading-snug text-fg-muted sm:text-3xl">
            &ldquo;What AI tools exist for this?&rdquo;
          </p>
          <div className="mt-10 border-t border-dashed border-line pt-6">
            <p className="label text-fg-subtle">Returns</p>
            <p className="mt-3 text-[15px] leading-relaxed text-fg-muted">
              A list, sorted by popularity, sponsorship or recency. You read every page and do the matching yourself.
            </p>
          </div>
        </div>
        <div className="bg-ink p-6 sm:p-8">
          <p className="label text-signal">The direction</p>
          <p className="font-display mt-8 text-2xl leading-snug sm:text-3xl">
            &ldquo;I need to turn these documents into a structured report.&rdquo;
          </p>
          <div className="mt-10 border-t border-dashed border-line pt-6">
            <p className="label text-fg-subtle">Understood as</p>
            <dl className="mt-3 divide-y divide-line">
              {DECOMPOSITION.map((d) => (
                <div key={d.k} className="grid grid-cols-[7.5rem_1fr] gap-4 py-2.5">
                  <dt className="label pt-0.5 text-fg-subtle">{d.k}</dt>
                  <dd className="text-[15px] text-fg">{d.v}</dd>
                </div>
              ))}
            </dl>
            <p className="mt-5 text-[15px] leading-relaxed text-fg-muted">
              Then matched against structured product profiles, not against keywords.
            </p>
          </div>
        </div>
      </div>
      <p className="mt-4 text-[13px] text-fg-subtle">
        An illustration of the intended behavior. Intent matching is experimental and not publicly available.
      </p>
    </Section>
  );
}
