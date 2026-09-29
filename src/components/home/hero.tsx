import { ButtonLink } from "../button-link";
import { FlowDiagram } from "../flow-diagram";

export function Hero() {
  return (
    <section aria-labelledby="hero-title" className="relative overflow-hidden">
      <div aria-hidden="true" className="bg-grid pointer-events-none absolute inset-0" />
      <div className="relative mx-auto grid max-w-[1240px] gap-16 px-5 pb-20 pt-14 sm:px-8 md:pb-28 md:pt-24 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-7 lg:pr-8">
          <p className="label rise text-fg-subtle">Distribution infrastructure for AI software — in development</p>
          <h1
            id="hero-title"
            className="rise font-display mt-7 text-[3.25rem] leading-[0.98] [--delay:80ms] sm:text-7xl lg:text-[5.5rem]"
          >
            The distribution layer <em className="italic text-fg-muted">for AI.</em>
          </h1>
          <div className="rise mt-9 max-w-[40ch] space-y-1 text-lg leading-relaxed text-fg-muted [--delay:160ms] sm:text-xl">
            <p>AI is getting easier to build.</p>
            <p>Getting it in front of the right people is still hard.</p>
            <p className="text-fg">AGENYRA is being built to change that.</p>
          </div>
          <div className="rise mt-11 flex flex-col gap-3 [--delay:240ms] sm:flex-row sm:items-center sm:gap-4">
            <ButtonLink href="/waitlist">Join the waitlist</ButtonLink>
            <ButtonLink href="/product" variant="secondary">
              Explore the product
            </ButtonLink>
          </div>
        </div>
        <div className="lg:col-span-5 lg:pt-4">
          <FlowDiagram />
        </div>
      </div>
    </section>
  );
}
