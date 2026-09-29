import Link from "next/link";
import { Wordmark } from "./logo";
import { NavMenu } from "./nav-menu";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-ink/90 backdrop-blur-md">
      <a
        href="#main"
        className="label sr-only z-50 bg-fg px-3 py-2 text-ink focus:not-sr-only focus:absolute focus:left-4 focus:top-3"
      >
        Skip to content
      </a>
      <div className="relative mx-auto flex h-16 max-w-[1240px] items-center gap-10 px-5 sm:px-8">
        <Link href="/" aria-label="AGENYRA home" className="shrink-0">
          <Wordmark />
        </Link>
        <div className="flex flex-1 items-center justify-end md:justify-between">
          <NavMenu />
          <div className="hidden items-center gap-6 md:flex">
            <p
              className="label hidden items-center gap-2 text-fg-subtle lg:flex"
              title="AGENYRA is not publicly available yet."
            >
              <span aria-hidden="true" className="blink inline-block size-1.5 rounded-full bg-signal" />
              Private build
            </p>
            <Link
              href="/waitlist"
              className="inline-flex h-9 items-center border border-fg bg-fg px-4 text-[14px] font-medium text-ink transition-colors duration-200 hover:bg-white"
            >
              Join the waitlist
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
