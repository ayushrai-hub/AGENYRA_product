import Link from "next/link";
import { NAV_LINKS } from "@/content/site";
import { Wordmark } from "./logo";

export function SiteFooter() {
  const links = [...NAV_LINKS, { href: "/waitlist", label: "Waitlist" }];
  return (
    <footer className="border-t border-line">
      <div className="mx-auto grid max-w-[1240px] gap-12 px-5 py-16 sm:px-8 md:grid-cols-12 md:gap-8">
        <div className="md:col-span-6">
          <Wordmark />
          <p className="font-display mt-6 text-2xl text-fg-muted">The distribution layer for AI.</p>
        </div>
        <nav aria-label="Footer" className="md:col-span-6">
          <ul className="grid grid-cols-2 gap-x-8 gap-y-3 sm:grid-cols-3">
            {links.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="text-[15px] text-fg-muted transition-colors hover:text-fg">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <div className="border-t border-line">
        <div className="label mx-auto flex max-w-[1240px] flex-col gap-2 px-5 py-6 text-fg-subtle sm:flex-row sm:justify-between sm:px-8">
          <p>© 2026 AGENYRA</p>
          <p>Built in progress.</p>
        </div>
      </div>
    </footer>
  );
}
