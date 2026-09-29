import type { ReactNode } from "react";

type SectionProps = {
  id: string;
  index: string;
  label: string;
  title: ReactNode;
  lede?: ReactNode;
  children?: ReactNode;
  className?: string;
};

/**
 * A numbered document section: a label rail on the left, content on the right.
 * On small screens the rail collapses into a line above the heading.
 */
export function Section({ id, index, label, title, lede, children, className }: SectionProps) {
  const headingId = `${id}-title`;
  return (
    <section id={id} aria-labelledby={headingId} className={`border-t border-line ${className ?? ""}`}>
      <div className="mx-auto grid max-w-[1240px] gap-y-8 px-5 py-20 sm:px-8 md:grid-cols-12 md:gap-x-8 md:py-28">
        <p className="label flex items-center gap-3 text-fg-subtle md:col-span-3 md:items-start md:pt-3">
          <span className="text-signal">{index}</span>
          <span aria-hidden="true" className="h-px w-6 bg-line-strong md:mt-2" />
          <span>{label}</span>
        </p>
        <div className="md:col-span-9">
          <h2 id={headingId} className="reveal font-display max-w-[22ch] text-[2.25rem] leading-[1.05] sm:text-5xl lg:text-[3.5rem]">
            {title}
          </h2>
          {lede ? (
            <div className="reveal mt-6 max-w-[60ch] space-y-4 text-lg leading-relaxed text-fg-muted">{lede}</div>
          ) : null}
          {children ? <div className="mt-14 md:mt-16">{children}</div> : null}
        </div>
      </div>
    </section>
  );
}
