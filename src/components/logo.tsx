export function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true" className={className}>
      <rect x="1.5" y="8.5" width="3" height="3" fill="currentColor" />
      <path d="M4.5 10 H9 M9 10 L15 3.5 M9 10 H15 M9 10 L15 16.5" stroke="currentColor" strokeWidth="1.25" />
      <rect x="15" y="2" width="3" height="3" fill="var(--color-signal)" />
      <rect x="15" y="8.5" width="3" height="3" fill="currentColor" />
      <rect x="15" y="15" width="3" height="3" fill="currentColor" />
    </svg>
  );
}

export function Wordmark({ className }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className ?? ""}`}>
      <LogoMark className="size-[18px] text-fg" />
      <span className="font-mono text-[13px] font-medium tracking-[0.22em] text-fg">AGENYRA</span>
    </span>
  );
}
