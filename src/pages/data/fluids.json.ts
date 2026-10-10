import type { APIRoute } from "astro";
import { LINES, SOURCES, MAKERS } from "../../lib/fluids";
import { SITE } from "../../lib/site";

export const GET: APIRoute = () =>
  new Response(
    JSON.stringify({ name: "DielectricFluid register", url: SITE.url + "/fluids/", license: "CC BY 4.0", generated: SITE.launched, makers: MAKERS, sources: SOURCES, lines: LINES }, null, 1),
    { headers: { "content-type": "application/json; charset=utf-8" } }
  );
