"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useState } from "react";
import { NAV_LINKS } from "@/content/site";

function isActive(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function NavMenu() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const panelId = useId();

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      <nav aria-label="Primary" className="hidden md:block">
        <ul className="flex items-center gap-7">
          {NAV_LINKS.map((link) => {
            const active = isActive(pathname, link.href);
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  aria-current={active ? "page" : undefined}
                  className={`relative py-2 text-[14px] transition-colors duration-200 hover:text-fg ${
                    active ? "text-fg" : "text-fg-muted"
                  }`}
                >
                  {link.label}
                  {active ? <span aria-hidden="true" className="absolute inset-x-0 -bottom-px h-px bg-signal" /> : null}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <button
        type="button"
        className="label -mr-2 flex h-10 items-center gap-2 px-2 text-fg md:hidden"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((v) => !v)}
      >
        <span>{open ? "Close" : "Menu"}</span>
        <span aria-hidden="true" className="relative block h-2.5 w-4">
          <span
            className={`absolute left-0 block h-px w-4 bg-current transition-transform duration-200 ${
              open ? "top-1 rotate-45" : "top-0"
            }`}
          />
          <span
            className={`absolute left-0 block h-px w-4 bg-current transition-transform duration-200 ${
              open ? "top-1 -rotate-45" : "top-2"
            }`}
          />
        </span>
      </button>

      <div
        id={panelId}
        hidden={!open}
        className="absolute inset-x-0 top-full border-b border-line bg-ink md:hidden"
      >
        <nav aria-label="Mobile" className="px-5 pb-8 pt-2">
          <ul className="divide-y divide-line border-y border-line">
            {[...NAV_LINKS, { href: "/waitlist", label: "Waitlist" }].map((link, i) => {
              const active = isActive(pathname, link.href);
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={() => setOpen(false)}
                    aria-current={active ? "page" : undefined}
                    className="flex items-baseline justify-between py-4"
                  >
                    <span className={`font-display text-3xl ${active ? "text-fg" : "text-fg-muted"}`}>{link.label}</span>
                    <span className="label text-fg-subtle">{String(i + 1).padStart(2, "0")}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
          <p className="label mt-6 flex items-center gap-2 text-fg-subtle">
            <span aria-hidden="true" className="blink inline-block size-1.5 rounded-full bg-signal" />
            Private build
          </p>
        </nav>
      </div>
    </>
  );
}
