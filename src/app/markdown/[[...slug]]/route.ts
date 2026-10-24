import { SITE_URL } from "@/content/site";
import { isPagePath, notFoundMarkdown, pageMarkdown } from "@/lib/markdown";

/**
 * Markdown versions of every page. Reached through rewrites in next.config.ts when a request
 * sends `Accept: text/markdown` or asks for `/<page>.md`, so the public URL stays the page URL.
 */
export async function GET(_request: Request, ctx: RouteContext<"/markdown/[[...slug]]">) {
  const { slug } = await ctx.params;
  const path = `/${(slug ?? []).join("/")}`.replace(/^\/index$/, "/");
  const found = isPagePath(path);

  return new Response(found ? pageMarkdown(path) : notFoundMarkdown(path), {
    status: found ? 200 : 404,
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      Vary: "Accept",
      "Cache-Control": "public, max-age=0, must-revalidate",
      ...(found ? { Link: `<${SITE_URL}${path === "/" ? "" : path}>; rel="canonical"` } : {}),
      "X-Robots-Tag": "noindex",
    },
  });
}
