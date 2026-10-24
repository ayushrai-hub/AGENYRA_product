import Link from "next/link";
import { Icon } from "@/components/icons";
import { PageHeader } from "@/components/page-header";
import { CONTACT_FACTS, CONTACT_REASONS } from "@/content/legal";
import { CONTACT_EMAIL } from "@/content/site";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Contact",
  description: `Contact AGENYRA by email at ${CONTACT_EMAIL}. Builders, users, partners and data requests.`,
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <PageHeader eyebrow="Contact" title="Email is the way to reach us.">
        <p>
          AGENYRA is a small private build, so there is no support desk or contact form. Write to{" "}
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="text-fg underline decoration-line-strong underline-offset-4 hover:decoration-signal"
          >
            {CONTACT_EMAIL}
          </a>
          .
        </p>
      </PageHeader>

      <section aria-labelledby="reasons-title" className="border-t border-line">
        <div className="mx-auto grid max-w-[1240px] gap-8 px-5 py-16 sm:px-8 md:grid-cols-12 md:py-24">
          <h2 id="reasons-title" className="label text-fg-subtle md:col-span-3 md:pt-1.5">
            What to write about
          </h2>
          <dl className="grid gap-x-10 gap-y-10 sm:grid-cols-2 md:col-span-9">
            {CONTACT_REASONS.map((r) => (
              <div key={r.name} className="reveal border-t border-line pt-5">
                <dt className="font-display text-2xl">{r.name}</dt>
                <dd className="mt-3 text-[15px] leading-relaxed text-fg-muted">{r.body}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section aria-labelledby="details-title" className="border-t border-line">
        <div className="mx-auto grid max-w-[1240px] gap-8 px-5 py-16 sm:px-8 md:grid-cols-12 md:py-24">
          <h2 id="details-title" className="label text-fg-subtle md:col-span-3 md:pt-1.5">
            Details
          </h2>
          <div className="md:col-span-9">
            <dl className="border-t border-line">
              {CONTACT_FACTS.map((f) => (
                <div key={f.k} className="grid gap-1 border-b border-line py-4 sm:grid-cols-[10rem_1fr] sm:gap-6">
                  <dt className="label pt-1 text-fg-subtle">{f.k}</dt>
                  <dd className="text-[17px] text-fg">
                    {f.k === "Email" ? (
                      <a
                        href={`mailto:${CONTACT_EMAIL}`}
                        className="inline-flex items-center gap-3 underline decoration-line-strong underline-offset-4 hover:decoration-signal"
                      >
                        <Icon name="mail" className="size-5 text-fg-muted" />
                        {f.v}
                      </a>
                    ) : (
                      f.v
                    )}
                  </dd>
                </div>
              ))}
            </dl>
            <p className="mt-8 max-w-[60ch] text-[15px] leading-relaxed text-fg-muted">
              Want access when AGENYRA opens? The{" "}
              <Link href="/waitlist" className="text-fg underline decoration-line-strong underline-offset-4 hover:decoration-signal">
                waitlist
              </Link>{" "}
              is the way in. How we handle what you send is on the{" "}
              <Link href="/privacy" className="text-fg underline decoration-line-strong underline-offset-4 hover:decoration-signal">
                privacy page
              </Link>
              .
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
