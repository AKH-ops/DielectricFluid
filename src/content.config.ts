import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

/* Guides and site pages. `path` is the public URL path (no slashes at the ends). Every guide needs a brief in the ops
   repo before it is drafted (guardrail 2.2), and cites with {{src:id[:page]}} — see src/lib/remark-cite.mjs. */
const guides = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/guides" }),
  schema: z.object({
    title: z.string(),
    h1: z.string().optional(),
    description: z.string().min(80).max(200),
    path: z.string().regex(/^[a-z0-9-]+(\/[a-z0-9-]+)*$/),
    kind: z.enum(["guide", "page"]).default("guide"),
    eyebrow: z.string().optional(),
    answer: z.string().optional(),
    order: z.number().default(50),
    updated: z.coerce.date(),
    related: z.array(z.string()).default([]),
  }),
});

export const collections = { guides };
