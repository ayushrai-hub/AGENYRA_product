import { GetInEarly } from "@/components/get-in-early";
import { Icon } from "@/components/icons";
import { ProfileExample } from "@/components/profile-example";
import { PageHeader } from "@/components/page-header";
import { Section } from "@/components/section";
import { StageTag } from "@/components/stage";
import { EXISTS_TODAY, NOT_THIS, PIPELINE } from "@/content/product";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Product",
  description:
    "How AGENYRA is designed: a six-stage system that discovers, understands, classifies, matches, distributes and measures AI products.",
  path: "/product",
});

export default function ProductPage() {
  return (
    <>
      <PageHeader eyebrow="Product" title="A distribution system for AI software.">
        <p>
          AGENYRA is designed as six stages. Each one turns something loose, like a product website or a
          person&rsquo;s problem, into something the next stage can act on.
        </p>
        <p>Here is the model, and where each stage actually stands.</p>
      </PageHeader>

      <Section
        id="model"
        index="01"
        label="The model"
        title="Six stages, one direction of flow."
        lede={<p>Products enter at the top. Measurement at the bottom feeds back into the stages above it.</p>}
      >
        <ol className="grid gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
          {PIPELINE.map((s, i) => (
            <li key={s.name} className="reveal flex flex-col bg-ink p-6 sm:p-7">
              <div className="flex items-center justify-between">
                <span className="label text-signal">{String(i + 1).padStart(2, "0")}</span>
                <StageTag stage={s.stage} />
              </div>
              <Icon name={s.icon} className="mt-8 size-7 text-fg" />
              <h3 className="mt-4 font-mono text-base tracking-[0.16em] uppercase">{s.name}</h3>
              <p className="mt-3 flex-1 text-[15px] leading-relaxed text-fg-muted">{s.does}</p>
              <p className="mt-6 border-t border-dashed border-line pt-4 text-[14px] text-fg">
                <span className="label mr-3 text-fg-subtle">Produces</span>
                {s.produces}
              </p>
            </li>
          ))}
        </ol>
        <p className="label mt-5 flex items-center gap-3 text-fg-subtle">
          <svg viewBox="0 0 24 12" aria-hidden="true" className="h-3 w-6 text-signal">
            <path d="M22 6H3M7 2L3 6l4 4" stroke="currentColor" strokeWidth="1.25" fill="none" />
          </svg>
          Measure feeds back into Understand and Match
        </p>
      </Section>

      <Section
        id="today"
        index="02"
        label="What exists"
        title="What exists today."
        lede={
          <p>
            A private build covers the first three stages and part of the fourth. It is not public, and there are no
            open signups. That is what the waitlist is for.
          </p>
        }
      >
        <ul className="border-t border-line">
          {EXISTS_TODAY.map((item) => (
            <li key={item} className="reveal flex gap-5 border-b border-line py-5">
              <span aria-hidden="true" className="mt-2 inline-block size-2 shrink-0 bg-signal" />
              <span className="text-[17px] leading-relaxed text-fg">{item}</span>
            </li>
          ))}
        </ul>
        <ProfileExample className="mt-14" />
      </Section>

      <Section id="not" index="03" label="Boundaries" title="What AGENYRA is not.">
        <dl className="grid gap-x-10 gap-y-10 sm:grid-cols-2">
          {NOT_THIS.map((n) => (
            <div key={n.name} className="reveal border-t border-line pt-5">
              <dt className="font-display text-2xl">{n.name}</dt>
              <dd className="mt-3 text-[15px] leading-relaxed text-fg-muted">{n.body}</dd>
            </div>
          ))}
        </dl>
      </Section>

      <GetInEarly />
    </>
  );
}
