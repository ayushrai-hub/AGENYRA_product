import type { Metadata } from "next";
import { cookies } from "next/headers";
import { JOINED_COOKIE, type WaitlistValues } from "@/lib/waitlist/fields";
import { normalizeSource } from "@/lib/waitlist/validate";
import { WaitlistForm } from "./waitlist-form";

export const metadata: Metadata = {
  title: "Join the waitlist",
  description:
    "Join the AGENYRA early network as a builder, user, researcher or partner, and help shape how AI products get distributed.",
  alternates: { canonical: "/waitlist" },
};

const PRESETS: Record<string, WaitlistValues> = {
  builder: { role: "ai_builder", interest: ["distribute"] },
  user: { role: "ai_user", interest: ["discover"] },
};

const NEXT_STEPS = [
  "You’re added to the early network. Nothing is sent automatically.",
  "When there is something worth showing, we reach out. Builders and users hear about different things.",
  "Early members help decide what gets built next.",
];

function first(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}

export default async function WaitlistPage({ searchParams }: PageProps<"/waitlist">) {
  const params = await searchParams;
  const as = first(params.as);
  const preset = (as && PRESETS[as]) || {};
  const source = normalizeSource(
    first(params.utm_source) ?? first(params.ref) ?? (as && PRESETS[as] ? `${as}-cta` : "website"),
  );
  const alreadyJoined = (await cookies()).get(JOINED_COOKIE)?.value === "1";

  return (
    <div className="relative">
      <div aria-hidden="true" className="bg-grid pointer-events-none absolute inset-x-0 top-0 h-[520px]" />
      <div className="relative mx-auto grid max-w-[1240px] gap-14 px-5 pb-24 pt-14 sm:px-8 md:pt-24 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-5 lg:pr-10">
          <div className="lg:sticky lg:top-28">
            <p className="label rise text-fg-subtle">Waitlist</p>
            <h1 className="rise font-display mt-6 text-[2.75rem] leading-[1.02] [--delay:80ms] sm:text-6xl">
              Join the early network.
            </h1>
            <p className="rise mt-6 max-w-[40ch] text-lg leading-relaxed text-fg-muted [--delay:160ms]">
              AGENYRA is in a private build. The waitlist is how builders, users and partners get in before it opens,
              and how we decide what to build first.
            </p>
            <ol className="rise mt-12 border-t border-line [--delay:240ms]">
              {NEXT_STEPS.map((step, i) => (
                <li key={step} className="grid grid-cols-[2.25rem_1fr] gap-x-3 border-b border-line py-4">
                  <span className="label pt-1 text-signal">{String(i + 1).padStart(2, "0")}</span>
                  <span className="text-[15px] leading-relaxed text-fg-muted">{step}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>
        <div className="lg:col-span-7">
          <WaitlistForm alreadyJoined={alreadyJoined} defaults={preset} source={source} />
        </div>
      </div>
    </div>
  );
}
