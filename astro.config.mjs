// @ts-check
import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import remarkCite from "./src/lib/remark-cite.mjs";
import { readFileSync, writeFileSync, existsSync } from "node:fs";

/**
 * Emit a real 301 for the no-trailing-slash form of every built route.
 *
 * Cloudflare's `html_handling: "auto-trailing-slash"` redirects `/fluids` to `/fluids/` with a 307 (temporary),
 * which Google treats as a weak canonical signal. `_redirects` is honoured by Workers static assets and wins over
 * html_handling, so writing the rules there turns those 307s into 301s. Generated from the routes actually built,
 * so it cannot loop (no source ends in a slash) and cannot go stale. Same mechanism as marathonstay.com.
 */
function trailingSlash301s() {
  return {
    name: "trailing-slash-301s",
    hooks: {
      "astro:build:done": ({ dir, pages, logger }) => {
        const file = new URL("_redirects", dir);
        const existing = existsSync(file) ? readFileSync(file, "utf8") : "";
        const claimed = new Set(
          existing.split("\n").map((l) => l.trim()).filter((l) => l && !l.startsWith("#")).map((l) => l.split(/\s+/)[0].replace(/\/$/, ""))
        );
        const lines = [];
        for (const p of pages) {
          const path = "/" + String(p.pathname).replace(/^\/+|\/+$/g, "");
          if (path === "/" || path === "/404" || claimed.has(path)) continue;
          if (/\.[a-z0-9]+$/i.test(path)) continue; // files such as /data/fluids.json have no slashed form
          lines.push(`${path}    ${path}/    301`);
        }
        lines.sort();
        const block = "\n# --- generated: no-trailing-slash -> canonical, 301 (astro.config.mjs) ---\n" + lines.join("\n") + "\n";
        writeFileSync(file, existing.replace(/\s*$/, "\n") + block, "utf8");
        logger.info(`wrote ${lines.length} trailing-slash 301s to _redirects`);
      },
    },
  };
}

export default defineConfig({
  site: "https://dielectricfluid.com",
  trailingSlash: "always",
  integrations: [
    trailingSlash301s(),
    sitemap({
      filter: (page) => !/\/404\/?$/.test(page),
    }),
  ],
  build: {
    format: "directory",
  },
  markdown: {
    remarkPlugins: [remarkCite],
  },
});
