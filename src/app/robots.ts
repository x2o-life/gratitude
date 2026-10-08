import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";

/** Open to all crawlers, including AI search assistants. */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/" }],
    sitemap: `${SITE.url}/sitemap.xml`,
    host: SITE.url,
  };
}
