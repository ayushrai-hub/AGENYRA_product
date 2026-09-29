import { ButtonLink } from "./button-link";

export function GetInEarly({
  title = "Get in early.",
  body = (
    <>
      AGENYRA is being built from the ground up. Join the early network and help shape what it becomes.
    </>
  ),
  cta = "Join the waitlist",
  href = "/waitlist",
}: {
  title?: string;
  body?: React.ReactNode;
  cta?: string;
  href?: string;
}) {
  return (
    <section aria-labelledby="get-in-early-title" className="relative overflow-hidden border-t border-line">
      <div aria-hidden="true" className="bg-grid pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_70%_90%_at_20%_100%,#000_20%,transparent_70%)]" />
      <div className="relative mx-auto grid max-w-[1240px] gap-10 px-5 py-24 sm:px-8 md:grid-cols-12 md:gap-8 md:py-36">
        <div className="md:col-span-8">
          <h2 id="get-in-early-title" className="reveal font-display text-5xl leading-[1] sm:text-7xl lg:text-8xl">
            {title}
          </h2>
          <p className="reveal mt-8 max-w-[46ch] text-lg leading-relaxed text-fg-muted sm:text-xl">{body}</p>
        </div>
        <div className="flex items-end md:col-span-4 md:justify-end">
          <ButtonLink href={href} className="w-full sm:w-auto">
            {cta}
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
