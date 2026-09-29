import Link from "next/link";
import type { ComponentProps } from "react";

type Variant = "primary" | "secondary" | "text";

const VARIANTS: Record<Variant, string> = {
  primary: "bg-fg text-ink hover:bg-white border border-fg px-5 h-11",
  secondary: "border border-line-strong text-fg hover:border-fg-muted hover:bg-ink-raised px-5 h-11",
  text: "text-fg underline decoration-line-strong underline-offset-[6px] hover:decoration-signal",
};

export function ButtonLink({
  variant = "primary",
  className,
  children,
  ...props
}: ComponentProps<typeof Link> & { variant?: Variant }) {
  return (
    <Link
      {...props}
      className={`group inline-flex items-center justify-center gap-3 text-[15px] font-medium transition-colors duration-200 ${VARIANTS[variant]} ${className ?? ""}`}
    >
      {children}
      <Arrow />
    </Link>
  );
}

export function Arrow() {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
      className="size-3.5 transition-transform duration-200 group-hover:translate-x-0.5"
    >
      <path d="M2 8h11M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}
