import type { APIRoute } from "astro";
import { LINES, SOURCES, MAKERS, PROPS, pageOf, citeUrl } from "../../lib/fluids";

const q = (v: unknown) => {
  const s = v === undefined || v === null ? "" : String(v);
  return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
};
export const GET: APIRoute = () => {
  const head = ["product", "line", "maker", "family", "status", "pfas_status", "property", "value", "qualifier", "none", "unit", "condition", "method", "as_printed", "source_title", "source_url", "page", "checked"];
  const rows = [head.join(",")];
  for (const l of LINES) for (const g of l.grades) for (const [k, p] of Object.entries(g.props)) {
    const sid = p.src || l.source;
    const page = pageOf(l, p);
    rows.push([g.name, l.line, MAKERS[l.maker].short, l.family, l.status, l.pfas.status, k, p.v, p.q, p.none ? "yes" : "", PROPS[k].unit, p.at, p.method, p.pub, SOURCES[sid].title, citeUrl(sid, page), page, SOURCES[sid].checked].map(q).join(","));
  }
  return new Response(rows.join("\n") + "\n", { headers: { "content-type": "text/csv; charset=utf-8" } });
};
