import { GetInEarly } from "@/components/get-in-early";
import { Icon } from "@/components/icons";
import { PageHeader } from "@/components/page-header";
import { Section } from "@/components/section";
import { StageTag } from "@/components/stage";
import { BUILDER_CAPABILITIES, BUILDER_KINDS, BUILDER_PRINCIPLES, BUILDER_PROBLEMS } from "@/content/builders";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Builders",
  description:
    "For AI builders: structured product representation, discovery and distribution beyond a launch. Join the AGENYRA builder waitlist.",
  path: "/builders",
});

export default function BuildersPage() {
  return (
    <>
      <PageHeader eyebrow="For builders" title="Describe your product once, as data.">
        <p>
          You record what your product does: the task, what it takes in, what it returns, where it runs and what it
          costs. AGENYRA uses that profile for search and comparison today, and for placement outside this site later.
        </p>
      </PageHeader>

      <Section id="problem" index="01" label="The problem" title="A launch is not a distribution strategy.">
        <ol className="grid gap-10 md:grid-cols-3 md:gap-8">
          {BUILDER_PROBLEMS.map((p, i) => (
            <li key={p.name} className="reveal border-t border-line pt-5">
              <p className="label text-fg-subtle">
                <span className="text-signal">{String(i + 1).padStart(2, "0")}</span>
              </p>
              <h3 className="font-display mt-4 text-2xl">{p.name}</h3>
              <p className="mt-3 text-[15px] leading-relaxed text-fg-muted">{p.body}</p>
            </li>
          ))}
        </ol>
      </Section>

      <Section
        id="capabilities"
        index="02"
        label="What you get"
        title="What AGENYRA is building for builders."
        lede={<p>Each item is marked with its real stage. Two are being built. The rest are not available yet.</p>}
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
      </Section>

      <Section id="principles" index="03" label="Principles" title="How your product will be treated.">
        <dl className="grid gap-x-10 gap-y-10 sm:grid-cols-2">
          {BUILDER_PRINCIPLES.map((p) => (
            <div key={p.name} className="reveal border-t border-line pt-5">
              <dt className="font-display text-2xl">{p.name}</dt>
              <dd className="mt-3 text-[15px] leading-relaxed text-fg-muted">{p.body}</dd>
            </div>
          ))}
        </dl>
      </Section>

      <Section
        id="who"
        index="04"
        label="Who"
        title="Who we want to hear from."
        lede={<p>If you build software where AI does the core work, the early builder network is for you.</p>}
      >
        <ul className="flex flex-wrap gap-2">
          {BUILDER_KINDS.map((w) => (
            <li key={w} className="border border-line-strong px-3 py-2 font-mono text-[13px] text-fg-muted">
              {w}
            </li>
          ))}
        </ul>
      </Section>

      <GetInEarly
        title="Join the builder waitlist."
        body="Tell us what you are building. Early builders will shape how products are represented and distributed."
        cta="Join the builder waitlist"
        href="/waitlist?as=builder"
      />
    </>
  );
}
