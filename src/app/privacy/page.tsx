import { PageHeader } from "@/components/page-header";
import { PRIVACY_SECTIONS, PRIVACY_UPDATED } from "@/content/legal";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Privacy",
  description:
    "What the AGENYRA website collects, where it is stored, how long it is kept, and how to have it removed.",
  path: "/privacy",
});

export default function PrivacyPage() {
  return (
    <>
      <PageHeader eyebrow="Privacy" title="What this site collects, and nothing else.">
        <p>
          Three things: what you type into the waitlist form, one cookie set after you join, and page view counts
          that use no cookies. Each is described in full below. Last updated {PRIVACY_UPDATED}.
        </p>
      </PageHeader>

      <div className="border-t border-line">
        <div className="mx-auto max-w-[1240px] px-5 sm:px-8">
          {PRIVACY_SECTIONS.map((s) => (
            <section
              key={s.heading}
              aria-label={s.heading}
              className="reveal grid gap-4 border-b border-line py-10 last:border-b-0 md:grid-cols-12 md:gap-8 md:py-14"
            >
              <h2 className="label text-fg-subtle md:col-span-3 md:pt-1.5">
                {s.heading}
              </h2>
              <div className="max-w-[62ch] space-y-4 text-[17px] leading-relaxed text-fg md:col-span-9">
                {s.paragraphs.map((p) => (
                  <p key={p}>{p}</p>
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </>
  );
}
