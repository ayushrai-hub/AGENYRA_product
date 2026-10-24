import { BUILDER_CAPABILITIES } from "@/content/builders";
import { ButtonLink } from "../button-link";
import { Icon } from "../icons";
import { Section } from "../section";
import { StageTag } from "../stage";

export function Builders() {
  return (
    <Section
      id="builders"
      index="04"
      label="For builders"
      title="Describe your product once, as data."
      lede={
        <p>
          Most AI products get a launch spike, then a quiet month. The product is the same; the attention moved on.
          A structured profile keeps describing the product to every surface that can read it, long after launch day.
        </p>
      }
    >
      <ul className="border-t border-line">
        {BUILDER_CAPABILITIES.map((c) => (
          <li key={c.name} className="reveal grid gap-2 border-b border-line py-5 sm:grid-cols-12 sm:items-baseline sm:gap-6">
            <p className="flex items-center gap-3 text-fg sm:col-span-4">
              <Icon name={c.icon} className="size-5 shrink-0 text-fg-muted" />
              {c.name}
            </p>
            <p className="text-[15px] leading-relaxed text-fg-muted sm:col-span-6">{c.note}</p>
            <div className="sm:col-span-2 sm:text-right">
              <StageTag stage={c.stage} />
            </div>
          </li>
        ))}
      </ul>
      <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-6">
        <ButtonLink href="/waitlist?as=builder">Join as a builder</ButtonLink>
        <ButtonLink href="/builders" variant="text">
          Why builders should care
        </ButtonLink>
      </div>
    </Section>
  );
}
