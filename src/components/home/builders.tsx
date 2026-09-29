import { BUILDER_CAPABILITIES } from "@/content/builders";
import { ButtonLink } from "../button-link";
import { Section } from "../section";
import { StageTag } from "../stage";

export function Builders() {
  return (
    <Section
      id="builders"
      index="04"
      label="For builders"
      title="Build the product. We help it travel."
      lede={
        <p>
          Many AI products get a launch spike, then silence. The product did not get worse; it just stopped being
          seen. AGENYRA gives a product a structured representation and a path to the people who need it.
        </p>
      }
    >
      <ul className="border-t border-line">
        {BUILDER_CAPABILITIES.map((c) => (
          <li key={c.name} className="reveal grid gap-2 border-b border-line py-5 sm:grid-cols-12 sm:items-baseline sm:gap-6">
            <p className="text-fg sm:col-span-4">{c.name}</p>
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
