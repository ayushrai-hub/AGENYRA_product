import type { ReactNode } from "react";

export type IconName =
  | "profile"
  | "fields"
  | "search"
  | "distribute"
  | "measure"
  | "sync"
  | "api"
  | "network"
  | "intake"
  | "taxonomy"
  | "launch"
  | "mail";

const S = "var(--color-signal)";

/**
 * Drawn on a 24px grid with a 1.25 stroke and square nodes, to match the logo mark.
 * One element per icon carries the signal colour.
 */
const PATHS: Record<IconName, ReactNode> = {
  profile: (
    <>
      <rect x="4.5" y="3.5" width="15" height="17" />
      <path d="M8 8h8M8 11.5h8M8 15h4.5" />
      <rect x="14.5" y="14" width="2.5" height="2.5" fill={S} stroke="none" />
    </>
  ),
  fields: (
    <>
      <rect x="3.5" y="4.5" width="17" height="15" />
      <path d="M3.5 9.5h17M3.5 14.5h17M9.5 4.5v15" />
      <rect x="5.25" y="11" width="2.5" height="2" fill={S} stroke="none" />
    </>
  ),
  search: (
    <>
      <rect x="4.5" y="4.5" width="11" height="11" />
      <path d="M15.5 15.5l4.5 4.5" />
      <rect x="8.75" y="8.75" width="2.5" height="2.5" fill={S} stroke="none" />
    </>
  ),
  distribute: (
    <>
      <rect x="2.5" y="10.5" width="3" height="3" fill="currentColor" stroke="none" />
      <path d="M5.5 12H10M10 12l7-6.5M10 12h7M10 12l7 6.5" />
      <rect x="17" y="4" width="3" height="3" fill={S} stroke="none" />
      <rect x="17" y="10.5" width="3" height="3" fill="currentColor" stroke="none" />
      <rect x="17" y="17" width="3" height="3" fill="currentColor" stroke="none" />
    </>
  ),
  measure: (
    <>
      <path d="M3.5 20.5h17" />
      <rect x="5.5" y="12.5" width="3" height="8" />
      <rect x="10.5" y="8.5" width="3" height="12" />
      <rect x="15.5" y="4.5" width="3" height="16" fill={S} stroke="none" />
    </>
  ),
  sync: (
    <>
      <rect x="2.5" y="7.5" width="6" height="9" />
      <rect x="15.5" y="7.5" width="6" height="9" />
      <path d="M8.5 10h6.5M13 8l2 2-2 2M15.5 14H9M11 12l-2 2 2 2" />
      <rect x="4.25" y="12.5" width="2.5" height="2.5" fill={S} stroke="none" />
    </>
  ),
  api: (
    <>
      <path d="M8.5 4H6.5v5.5L4 12l2.5 2.5V20h2M15.5 4h2v5.5L20 12l-2.5 2.5V20h-2" />
      <rect x="10.75" y="10.75" width="2.5" height="2.5" fill={S} stroke="none" />
    </>
  ),
  network: (
    <>
      <path d="M5.5 5.5l13 13M5.5 18.5l13-13M5.5 5.5h13M5.5 18.5h13" />
      <rect x="3.5" y="3.5" width="4" height="4" fill="currentColor" stroke="none" />
      <rect x="16.5" y="3.5" width="4" height="4" fill="currentColor" stroke="none" />
      <rect x="3.5" y="16.5" width="4" height="4" fill="currentColor" stroke="none" />
      <rect x="16.5" y="16.5" width="4" height="4" fill="currentColor" stroke="none" />
      <rect x="10.25" y="10.25" width="3.5" height="3.5" fill={S} stroke="none" />
    </>
  ),
  intake: (
    <>
      <path d="M3.5 13.5h5l1.5 3h4l1.5-3h5M3.5 13.5V20.5h17v-7" />
      <path d="M12 3.5v8M8.5 8l3.5 3.5L15.5 8" />
      <rect x="10.75" y="2.5" width="2.5" height="2.5" fill={S} stroke="none" />
    </>
  ),
  taxonomy: (
    <>
      <rect x="9.5" y="3" width="5" height="4" />
      <path d="M12 7v4M5.5 11h13M5.5 11v3M12 11v3M18.5 11v3" />
      <rect x="3.5" y="14" width="4" height="4" />
      <rect x="10" y="14" width="4" height="4" fill={S} stroke="none" />
      <rect x="16.5" y="14" width="4" height="4" />
    </>
  ),
  launch: (
    <>
      <path d="M4 20.5h16M12 17V5M7 10l5-5 5 5" />
      <rect x="10.75" y="2" width="2.5" height="2.5" fill={S} stroke="none" />
    </>
  ),
  mail: (
    <>
      <rect x="3.5" y="5.5" width="17" height="13" />
      <path d="M3.5 5.5l8.5 7 8.5-7" />
      <rect x="15.5" y="14" width="2.5" height="2.5" fill={S} stroke="none" />
    </>
  ),
};

export function Icon({ name, className }: { name: IconName; className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.25"
      strokeLinecap="square"
      aria-hidden="true"
      className={className ?? "size-6"}
    >
      {PATHS[name]}
    </svg>
  );
}
