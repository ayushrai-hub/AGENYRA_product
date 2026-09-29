import { STATUS_AS_OF } from "@/content/site";
import { BUILD_TRACKS, STAGE_INFO } from "@/content/status";
import { ButtonLink } from "../button-link";
import { Section } from "../section";
import { StageScale, StageTag } from "../stage";

export function InPublic() {
  return (
    <Section
      id="status"
      index="06"
      label="Status"
      title="We’re building this in public."
      lede={
        <>
          <p>
            AGENYRA is still being built. The product, the infrastructure and the distribution model are all evolving.
            Early users and builders will help shape what comes next.
          </p>
        </>
      }
    >
      <div className="border border-line">
        <div className="label flex flex-wrap items-center justify-between gap-3 border-b border-line px-5 py-3 text-fg-subtle sm:px-6">
          <span>Build status</span>
          <span>As of {STATUS_AS_OF}</span>
        </div>
        <ul>
          {BUILD_TRACKS.map((t) => (
            <li
              key={t.name}
              className="reveal grid gap-3 border-b border-line px-5 py-5 last:border-b-0 sm:px-6 md:grid-cols-12 md:items-center md:gap-6"
            >
              <p className="font-mono text-sm tracking-[0.14em] text-fg uppercase md:col-span-3">{t.name}</p>
              <div className="flex items-center gap-4 md:col-span-4">
                <StageScale stage={t.stage} />
                <StageTag stage={t.stage} className="text-fg" />
              </div>
              <p className="text-[15px] leading-relaxed text-fg-muted md:col-span-5">
                <span className="sr-only">{STAGE_INFO[t.stage].label}: </span>
                {t.note}
              </p>
            </li>
          ))}
        </ul>
      </div>
      <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-[13px] text-fg-subtle">
          Stages, not percentages. Five of them, from Research to Building.
        </p>
        <ButtonLink href="/roadmap" variant="text">
          Roadmap and stage definitions
        </ButtonLink>
      </div>
    </Section>
  );
}
