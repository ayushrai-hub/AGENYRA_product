import { FEATURES } from "@/content/features";
import { ButtonLink } from "../button-link";
import { Section } from "../section";
import { StageTag } from "../stage";

export function Capabilities() {
  const items = FEATURES.filter((f) => f.homeOrder !== undefined).sort(
    (a, b) => (a.homeOrder ?? 0) - (b.homeOrder ?? 0),
  );

  return (
    <Section
      id="building"
      index="03"
      label="What we’re building"
      title="Six parts of one system."
      lede={
        <p>
          Two are under construction. One exists as an internal experiment. The rest are directions. Each is marked
          with where it actually stands.
        </p>
      }
    >
      <ul className="grid gap-px border border-line bg-line sm:grid-cols-2 xl:grid-cols-3">
        {items.map((f, i) => (
          <li key={f.id} className="reveal flex flex-col bg-ink p-6 sm:p-7">
            <div className="flex items-center justify-between gap-4">
              <span className="label text-fg-subtle">{String(i + 1).padStart(2, "0")}</span>
              <StageTag stage={f.stage} />
            </div>
            <h3 className="font-display mt-10 text-[1.75rem] leading-tight">{f.name}</h3>
            <p className="mt-3 text-[15px] leading-relaxed text-fg-muted">{f.summary}</p>
          </li>
        ))}
      </ul>
      <div className="mt-10">
        <ButtonLink href="/features" variant="text">
          All features, grouped by stage
        </ButtonLink>
      </div>
    </Section>
  );
}
