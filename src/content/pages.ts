export type PagePath =
  | "/"
  | "/product"
  | "/features"
  | "/builders"
  | "/roadmap"
  | "/about"
  | "/waitlist"
  | "/contact"
  | "/privacy";

/** Every public page, in the order agents and the sitemap should list them. */
export const PAGES: { path: PagePath; title: string; summary: string }[] = [
  { path: "/", title: "Home", summary: "What AGENYRA is, the problem it addresses, and where each part stands." },
  { path: "/product", title: "Product", summary: "The six-stage model, what exists in the private build today, and what AGENYRA is not." },
  { path: "/features", title: "Features", summary: "Eight capabilities grouped by stage: building now, exploring, later." },
  { path: "/builders", title: "Builders", summary: "What AGENYRA offers people who build AI products, and how their products will be treated." },
  { path: "/roadmap", title: "Roadmap", summary: "Four phases with the real stage of every item. No dates yet." },
  { path: "/about", title: "About", summary: "Why AGENYRA exists, its current status, and its principles." },
  { path: "/waitlist", title: "Waitlist", summary: "The form to request access. The only way in while AGENYRA is in private build." },
  { path: "/contact", title: "Contact", summary: "How to reach the team by email." },
  { path: "/privacy", title: "Privacy", summary: "What the site collects, where it is stored, and how to have it removed." },
];
