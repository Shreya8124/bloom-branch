import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";
import { herbs } from "@/data/mock";

const BASE_URL = "";

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const staticPaths = ["/", "/browse-herbs", "/nurseries", "/plant-care", "/about", "/contact", "/become-a-supplier", "/faqs", "/privacy", "/login", "/signup"];
        const paths = [...staticPaths, ...herbs.map((h) => `/browse-herbs/${h.slug}`)];
        const urls = paths.map((p) => `  <url><loc>${BASE_URL}${p}</loc><changefreq>weekly</changefreq></url>`).join("\n");
        const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>`;
        return new Response(xml, { headers: { "Content-Type": "application/xml", "Cache-Control": "public, max-age=3600" } });
      },
    },
  },
});