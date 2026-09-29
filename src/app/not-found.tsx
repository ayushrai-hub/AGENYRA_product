import { ButtonLink } from "@/components/button-link";

export default function NotFound() {
  return (
    <section className="relative overflow-hidden">
      <div aria-hidden="true" className="bg-grid pointer-events-none absolute inset-0" />
      <div className="relative mx-auto max-w-[1240px] px-5 py-28 sm:px-8 md:py-40">
        <p className="label text-fg-subtle">
          <span className="text-signal">404</span> · Not found
        </p>
        <h1 className="font-display mt-6 max-w-[16ch] text-5xl leading-[1.02] sm:text-7xl">Nothing here yet.</h1>
        <p className="mt-6 max-w-[44ch] text-lg leading-relaxed text-fg-muted">
          Parts of AGENYRA don&rsquo;t exist yet. This page is one of them, or the link is wrong.
        </p>
        <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:gap-4">
          <ButtonLink href="/">Back to the start</ButtonLink>
          <ButtonLink href="/roadmap" variant="secondary">
            See the roadmap
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
