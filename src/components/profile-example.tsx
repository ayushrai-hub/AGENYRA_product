import { Icon } from "./icons";

const FIELDS: { k: string; v: string }[] = [
  { k: "Task", v: "Extract content from documents and restructure it into a report" },
  { k: "Type", v: "Web application, API" },
  { k: "Inputs", v: "PDF, DOCX" },
  { k: "Outputs", v: "Markdown report, JSON" },
  { k: "Deployment", v: "Hosted (EU region) or self-hosted container" },
  { k: "Pricing", v: "Free tier: 20 documents a month. Paid: per document" },
];

const CLAIMS: { text: string; source: "self-reported" | "verified" }[] = [
  { text: "Documents are not used for model training", source: "self-reported" },
  { text: "Handles scanned PDFs", source: "verified" },
];

export function ProfileExample({ className }: { className?: string }) {
  return (
    <figure className={className}>
      <div className="border border-line bg-ink-raised/40">
        <div className="label flex items-center justify-between gap-4 border-b border-line px-5 py-3 text-fg-subtle sm:px-6">
          <span className="flex items-center gap-2.5">
            <Icon name="profile" className="size-4 text-fg-muted" />
            Product profile
          </span>
          <span>Example</span>
        </div>
        <div className="px-5 py-5 sm:px-6">
          <p className="font-display text-2xl">Acme Reports</p>
          <dl className="mt-4 divide-y divide-line border-t border-line">
            {FIELDS.map((f) => (
              <div key={f.k} className="grid gap-1 py-2.5 sm:grid-cols-[8rem_1fr] sm:gap-4">
                <dt className="label pt-0.5 text-fg-subtle">{f.k}</dt>
                <dd className="font-mono text-[13px] leading-relaxed text-fg">{f.v}</dd>
              </div>
            ))}
            <div className="grid gap-1 py-2.5 sm:grid-cols-[8rem_1fr] sm:gap-4">
              <dt className="label pt-0.5 text-fg-subtle">Claims</dt>
              <dd>
                <ul className="space-y-2">
                  {CLAIMS.map((c) => (
                    <li key={c.text} className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                      <span className="font-mono text-[13px] text-fg">{c.text}</span>
                      <span
                        className={`label border px-1.5 py-0.5 ${
                          c.source === "verified" ? "border-signal/60 text-signal" : "border-line-strong text-fg-subtle"
                        }`}
                      >
                        {c.source}
                      </span>
                    </li>
                  ))}
                </ul>
              </dd>
            </div>
          </dl>
        </div>
      </div>
      <figcaption className="mt-3 text-[13px] text-fg-subtle">
        FIG. 02. What a structured profile records. Acme Reports is an invented product, and field names are simplified.
      </figcaption>
    </figure>
  );
}
