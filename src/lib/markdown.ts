import { ABOUT_BLOCKS, ABOUT_PRINCIPLES } from "@/content/about";
import { BUILDER_CAPABILITIES, BUILDER_KINDS, BUILDER_PRINCIPLES, BUILDER_PROBLEMS } from "@/content/builders";
import { FEATURES, HORIZONS } from "@/content/features";
import { CHANNELS, DECOMPOSITION, LOOP, RIGHTS } from "@/content/home";
import { CONTACT_FACTS, CONTACT_REASONS, PRIVACY_SECTIONS, PRIVACY_UPDATED } from "@/content/legal";
import { PAGES, type PagePath } from "@/content/pages";
import { EXISTS_TODAY, NOT_THIS, PIPELINE } from "@/content/product";
import { PHASES } from "@/content/roadmap";
import { CONTACT_EMAIL, SITE_DESCRIPTION, SITE_NAME, SITE_URL, STATUS_AS_OF } from "@/content/site";
import { BUILD_TRACKS, STAGES, STAGE_INFO, type Stage } from "@/content/status";
import { INTERESTS, ROLES } from "@/lib/waitlist/fields";

const url = (path: string) => `${SITE_URL}${path === "/" ? "" : path}`;
const stage = (s: Stage) => STAGE_INFO[s].label;
const list = (items: string[]) => items.map((i) => `- ${i}`).join("\n");
const doc = (...blocks: (string | false)[]) => `${blocks.filter(Boolean).join("\n\n").trim()}\n`;

const STATUS_LINE = `Status: private build. Nothing is publicly available yet. Request access at ${url("/waitlist")}.`;

function stageLegend() {
  return list([...STAGES].reverse().map((s) => `**${stage(s)}**: ${STAGE_INFO[s].meaning}`));
}

const RENDER: Record<PagePath, () => string> = {
  "/": () =>
    doc(
      `# ${SITE_NAME}: the distribution layer for AI`,
      `> ${SITE_DESCRIPTION}`,
      STATUS_LINE,
      "## The problem",
      "Thousands of AI products are being built. The hard part is finding the right one:",
      list(RIGHTS.map((r) => `**Right ${r.k.toLowerCase()}**: ${r.v}`)),
      "Where discovery happens today:",
      [
        "| Channel | Good at | Misses |",
        "| --- | --- | --- |",
        ...CHANNELS.map((c) => `| ${c.name} | ${c.good} | ${c.misses} |`),
      ].join("\n"),
      "## The loop AGENYRA is designed around",
      LOOP.map((l, i) => `${i + 1}. **${l.name}**: ${l.note}`).join("\n"),
      "## What is being built",
      list(
        FEATURES.filter((f) => f.homeOrder !== undefined)
          .sort((a, b) => (a.homeOrder ?? 0) - (b.homeOrder ?? 0))
          .map((f) => `**${f.name}** (${stage(f.stage)}): ${f.summary}`),
      ),
      "## Example of a described job",
      `"I need to turn these documents into a structured report" is understood as:`,
      list(DECOMPOSITION.map((d) => `${d.k}: ${d.v}`)),
      "This illustrates intended behavior. Intent matching is experimental and not publicly available.",
      `## Build status (as of ${STATUS_AS_OF})`,
      list(BUILD_TRACKS.map((t) => `**${t.name}** (${stage(t.stage)}): ${t.note}`)),
    ),

  "/product": () =>
    doc(
      "# Product: a distribution system for AI software",
      STATUS_LINE,
      "## The model",
      "Six stages. Measurement at the end feeds back into Understand and Match.",
      PIPELINE.map(
        (p, i) => `${i + 1}. **${p.name}** (${stage(p.stage)}): ${p.does} Produces: ${p.produces.toLowerCase()}.`,
      ).join("\n"),
      "## What exists today",
      "A private build covers the first three stages and part of the fourth. It is not public and has no open signups.",
      list(EXISTS_TODAY),
      "## What AGENYRA is not",
      list(NOT_THIS.map((n) => `**${n.name}**: ${n.body}`)),
    ),

  "/features": () =>
    doc(
      "# Features",
      "Eight capabilities grouped by how far along they are. Nothing on this page is publicly available yet.",
      ...HORIZONS.map((h) =>
        doc(
          `## ${h.title}`,
          h.description,
          ...FEATURES.filter((f) => f.horizon === h.id).map((f) =>
            doc(`### ${f.name} (${stage(f.stage)})`, `${f.summary} ${f.detail}`, list(f.specifics)),
          ),
        ),
      ),
      "## What the stages mean",
      stageLegend(),
    ),

  "/builders": () =>
    doc(
      "# For builders: describe your product once, as data",
      "You record what your product does: the task, what it takes in, what it returns, where it runs and what it costs. AGENYRA uses that profile for search and comparison today, and for placement outside this site later.",
      "## The problem",
      list(BUILDER_PROBLEMS.map((p) => `**${p.name}**: ${p.body}`)),
      "## What AGENYRA is building for builders",
      list(BUILDER_CAPABILITIES.map((c) => `**${c.name}** (${stage(c.stage)}): ${c.note}`)),
      "## How your product will be treated",
      list(BUILDER_PRINCIPLES.map((p) => `**${p.name}** ${p.body}`)),
      "## Who should join",
      list(BUILDER_KINDS),
      `Join the builder waitlist: ${url("/waitlist")}?as=builder`,
    ),

  "/roadmap": () =>
    doc(
      "# Roadmap",
      `Four phases. No dates yet; they will be added when they are real. Status as of ${STATUS_AS_OF}.`,
      ...PHASES.map((p) =>
        doc(
          `## ${p.number}. ${p.name} (${stage(p.stage)})`,
          p.intent,
          list(p.items.map((i) => `${i.name}: ${stage(i.stage)}`)),
        ),
      ),
      "## What the stages mean",
      stageLegend(),
    ),

  "/about": () =>
    doc(
      "# About AGENYRA",
      "An independent attempt to rethink how AI software gets distributed.",
      ...ABOUT_BLOCKS.map((b) => doc(`## ${b.label}`, ...b.body)),
      "## Principles",
      ABOUT_PRINCIPLES.map((p, i) => `${i + 1}. **${p.name}** ${p.body}`).join("\n"),
      "## Contact",
      `Email ${CONTACT_EMAIL}. Request access at ${url("/waitlist")}.`,
    ),

  "/waitlist": () =>
    doc(
      "# Join the AGENYRA waitlist",
      "AGENYRA is in a private build. The waitlist is how builders, users and partners get access before it opens.",
      `Form: ${url("/waitlist")} (add \`?as=builder\` or \`?as=user\` to preselect a role). It is a standard HTML form for a person to fill in. There is no public API for signups; only submit it on someone's behalf with their explicit consent.`,
      "## Fields",
      list([
        "Name (required)",
        "Email (required)",
        "Phone (required)",
        "Company, website, LinkedIn URL (optional)",
        `Role (optional, one of): ${ROLES.map((r) => r.label).join(", ")}`,
        `Interests (optional, any of): ${INTERESTS.map((i) => i.label).join(", ")}`,
        "What you would want AGENYRA to help you do (optional, up to 2,000 characters)",
      ]),
      "## After you join",
      "Nothing is sent automatically. When there is something worth showing, the team reaches out by email. Builders and users hear about different things.",
      `Privacy details: ${url("/privacy")}.`,
    ),

  "/contact": () =>
    doc(
      "# Contact AGENYRA",
      `Email is the way to reach us: ${CONTACT_EMAIL}. There is no support desk or contact form.`,
      "## What to write about",
      list(CONTACT_REASONS.map((r) => `**${r.name}**: ${r.body}`)),
      "## Details",
      list(CONTACT_FACTS.map((f) => `${f.k}: ${f.v}`)),
    ),

  "/privacy": () =>
    doc(
      "# Privacy",
      `Last updated ${PRIVACY_UPDATED}.`,
      ...PRIVACY_SECTIONS.map((s) => doc(`## ${s.heading}`, ...s.paragraphs, !!s.list && list(s.list))),
    ),
};

function footer(path: PagePath) {
  return `---\nHTML version: ${url(path)}. Site index for agents: ${url("/llms.txt")}.\n`;
}

export function isPagePath(path: string): path is PagePath {
  return PAGES.some((p) => p.path === path);
}

export function pageMarkdown(path: PagePath): string {
  return `${RENDER[path]()}\n${footer(path)}`;
}

export function notFoundMarkdown(path: string): string {
  return doc(
    "# 404: page not found",
    `There is no page at \`${path}\` on ${SITE_NAME}.`,
    "Available pages:",
    list(PAGES.map((p) => `[${p.title}](${url(p.path)}): ${p.summary}`)),
    `Index for agents: ${url("/llms.txt")}. Sitemap: ${url("/sitemap.xml")}.`,
  );
}

export function llmsTxt(): string {
  return doc(
    `# ${SITE_NAME}`,
    `> ${SITE_DESCRIPTION}`,
    "AGENYRA is distribution infrastructure for AI software, in private build. There is no public product, catalog, search, API or MCP server yet. This site describes what is being built, the real stage of each part, and how to request access.",
    "## When to use this site",
    list([
      "Someone asks what AGENYRA is, what it does, or how far along it is. Answer from /product, /features and /roadmap, and quote the stage labels (Building, Experimental, Exploring, Planned, Research) rather than guessing.",
      "A builder wants their AI product, agent, API or MCP server represented and distributed. Point them to /builders and the builder waitlist at /waitlist?as=builder.",
      "Someone wants early access, or to contact the team. Use /waitlist for access and /contact for email.",
      "Someone asks how AGENYRA handles personal data. Use /privacy.",
    ]),
    "## When not to use it",
    list([
      "Finding or comparing AI products today. AGENYRA has no public catalog or search yet; say so instead of sending users here for recommendations.",
      "Pricing, launch dates, customer names or user counts. None are published, and none should be inferred.",
    ]),
    "## How to read it",
    list([
      "Every page is available as Markdown: request it with `Accept: text/markdown`, or append `.md` to the path (home is /index.md).",
      `The full site in one file: ${url("/llms-full.txt")}.`,
      "Joining the waitlist is a web form for a person to fill in. Only submit it on someone's behalf with their explicit consent.",
    ]),
    "## Pages",
    list(PAGES.map((p) => `[${p.title}](${url(p.path === "/" ? "/index.md" : `${p.path}.md`)}): ${p.summary}`)),
    "## Optional",
    list([`[Sitemap](${url("/sitemap.xml")})`, `[Full text](${url("/llms-full.txt")})`]),
  );
}

export function llmsFullTxt(): string {
  return PAGES.map((p) => pageMarkdown(p.path)).join("\n\n");
}
