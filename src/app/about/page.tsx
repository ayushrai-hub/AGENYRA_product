import Link from "next/link";
import { PageHeader } from "@/components/page-header";
import { ABOUT_BLOCKS, ABOUT_PRINCIPLES } from "@/content/about";
import { CONTACT_EMAIL } from "@/content/site";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "About",
  description: "AGENYRA is an independent attempt to rethink how AI software gets distributed.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="About"
        title="An independent attempt to rethink how AI software gets distributed."
      />

      <div className="border-t border-line">
        <div className="mx-auto max-w-[1240px] px-5 sm:px-8">
          {ABOUT_BLOCKS.map((b) => (
            <section
              key={b.label}
              aria-label={b.label}
              className="reveal grid gap-4 border-b border-line py-12 last:border-b-0 md:grid-cols-12 md:gap-8 md:py-16"
            >
              <h2 className="label text-fg-subtle md:col-span-3 md:pt-1.5">{b.label}</h2>
              <div className="max-w-[62ch] space-y-4 text-lg leading-relaxed text-fg md:col-span-9">
                {b.body.map((p) => (
                  <p key={p}>{p}</p>
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>

      <section aria-labelledby="philosophy-title" className="border-t border-line">
        <div className="mx-auto grid max-w-[1240px] gap-8 px-5 py-16 sm:px-8 md:grid-cols-12 md:py-24">
          <h2 id="philosophy-title" className="label text-fg-subtle md:col-span-3 md:pt-2">
            Philosophy
          </h2>
          <ol className="md:col-span-9">
            {ABOUT_PRINCIPLES.map((p, i) => (
              <li key={p.name} className="reveal grid grid-cols-[2.5rem_1fr] gap-x-4 border-t border-line py-6">
                <span className="label pt-2 text-signal">{String(i + 1).padStart(2, "0")}</span>
                <div>
                  <p className="font-display text-2xl sm:text-3xl">{p.name}</p>
                  <p className="mt-2 text-[15px] text-fg-muted">{p.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section aria-labelledby="contact-title" className="border-t border-line">
        <div className="mx-auto grid max-w-[1240px] gap-8 px-5 py-16 sm:px-8 md:grid-cols-12 md:py-24">
          <h2 id="contact-title" className="label text-fg-subtle md:col-span-3 md:pt-1.5">
            Contact
          </h2>
          <p className="max-w-[56ch] text-lg leading-relaxed text-fg md:col-span-9">
            Email{" "}
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="underline decoration-line-strong underline-offset-4 hover:decoration-signal"
            >
              {CONTACT_EMAIL}
            </a>
            . To get access when AGENYRA opens, use the{" "}
            <Link href="/waitlist" className="underline decoration-line-strong underline-offset-4 hover:decoration-signal">
              waitlist
            </Link>
            . More on the{" "}
            <Link href="/contact" className="underline decoration-line-strong underline-offset-4 hover:decoration-signal">
              contact page
            </Link>
            .
          </p>
        </div>
      </section>
    </>
  );
}
