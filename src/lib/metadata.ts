import type { Metadata } from "next";
import { SITE_NAME } from "@/content/site";

export const SHARED_OPEN_GRAPH = { type: "website", siteName: SITE_NAME, locale: "en_US" } as const;

const SHARE_IMAGE = { width: 1200, height: 630, alt: "AGENYRA — The distribution layer for AI", type: "image/png" };

/**
 * Page segments replace `openGraph` and `twitter` wholesale, and the root file-based
 * share images stop applying once they do, so each page sets the full objects.
 */
export function pageMetadata({ title, description, path }: { title: string; description: string; path: string }): Metadata {
  const fullTitle = `${title} — ${SITE_NAME}`;
  return {
    title,
    description,
    alternates: { canonical: path, types: { "text/markdown": `${path}.md` } },
    openGraph: {
      ...SHARED_OPEN_GRAPH,
      url: path,
      title: fullTitle,
      description,
      images: [{ url: "/opengraph-image", ...SHARE_IMAGE }],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [{ url: "/twitter-image", ...SHARE_IMAGE }],
    },
  };
}
