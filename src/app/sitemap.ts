import type { MetadataRoute } from "next";
import { PAGES } from "@/content/pages";
import { SITE_URL } from "@/content/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return PAGES.map(({ path }) => ({
    url: `${SITE_URL}${path === "/" ? "" : path}`,
    changeFrequency: "weekly",
    priority: path === "/" ? 1 : path === "/waitlist" ? 0.8 : path === "/privacy" ? 0.3 : 0.6,
  }));
}
