import type { ReactNode } from "react";

export function PageHeader({
  eyebrow,
  title,
  children,
}: {
  eyebrow: string;
  title: ReactNode;
  children?: ReactNode;
}) {
  return (
    <header className="relative overflow-hidden">
      <div aria-hidden="true" className="bg-grid pointer-events-none absolute inset-0" />
      <div className="relative mx-auto max-w-[1240px] px-5 pb-16 pt-16 sm:px-8 md:pb-24 md:pt-28">
        <p className="label rise text-fg-subtle">{eyebrow}</p>
        <h1 className="rise font-display mt-6 max-w-[18ch] text-[2.75rem] leading-[1.02] [--delay:80ms] sm:text-6xl lg:text-7xl">
          {title}
        </h1>
        {children ? (
          <div className="rise mt-8 max-w-[58ch] space-y-4 text-lg leading-relaxed text-fg-muted [--delay:160ms] sm:text-xl">
            {children}
          </div>
        ) : null}
      </div>
    </header>
  );
}
