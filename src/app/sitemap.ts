import type { MetadataRoute } from "next";
import { SITE_URL } from "@/content/site";

const ROUTES = ["", "/product", "/features", "/builders", "/roadmap", "/about", "/waitlist"];

export default function sitemap(): MetadataRoute.Sitemap {
  return ROUTES.map((path) => ({
    url: `${SITE_URL}${path}`,
    changeFrequency: "weekly",
    priority: path === "" ? 1 : path === "/waitlist" ? 0.8 : 0.6,
  }));
}
