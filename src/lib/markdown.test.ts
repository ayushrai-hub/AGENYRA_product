import { describe, expect, it } from "vitest";
import { PAGES } from "@/content/pages";
import { isPagePath, llmsFullTxt, llmsTxt, notFoundMarkdown, pageMarkdown } from "./markdown";

describe("pageMarkdown", () => {
  it.each(PAGES.map((p) => p.path))("renders %s with one H1 and no unresolved values", (path) => {
    const md = pageMarkdown(path);
    expect(md.match(/^# /gm)).toHaveLength(1);
    expect(md).not.toMatch(/undefined|\[object Object\]/);
    expect(md.length).toBeGreaterThan(300);
  });
});

describe("isPagePath", () => {
  it("accepts known pages and rejects everything else", () => {
    expect(isPagePath("/product")).toBe(true);
    expect(isPagePath("/")).toBe(true);
    expect(isPagePath("/nope")).toBe(false);
    expect(isPagePath("/product/")).toBe(false);
  });
});

describe("notFoundMarkdown", () => {
  it("names the missing path and links every page", () => {
    const md = notFoundMarkdown("/missing");
    expect(md).toContain("`/missing`");
    for (const p of PAGES) expect(md).toContain(`[${p.title}](`);
  });
});

describe("llms.txt", () => {
  it("follows the llms.txt shape and tells agents when to use the site", () => {
    const txt = llmsTxt();
    expect(txt.startsWith("# AGENYRA\n\n> ")).toBe(true);
    expect(txt).toContain("## When to use this site");
    expect(txt).toContain("## When not to use it");
    for (const p of PAGES.filter((p) => p.path !== "/")) expect(txt).toContain(`${p.path}.md)`);
  });

  it("includes every page in the full text", () => {
    const full = llmsFullTxt();
    expect(full.match(/^# /gm)).toHaveLength(PAGES.length);
  });
});
