// Markdown citations: write {{src:<source-id>}} or {{src:<source-id>:<page>}} after a claim. This plugin turns each
// one into a superscript link to the source (with #page=N for PDFs), using src/data/sources.json. An unknown id fails
// the build, so a citation can never point nowhere. No dependencies: walks the mdast tree by hand.
import { readFileSync } from "node:fs";

const sources = JSON.parse(readFileSync(new URL("../data/sources.json", import.meta.url), "utf8"));
const RX = /\{\{src:([a-z0-9-]+)(?::(\d+))?\}\}/g;
const esc = (s) => s.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");

function walk(node) {
  if (!node.children) return;
  const out = [];
  for (const child of node.children) {
    if (child.type === "text" && RX.test(child.value)) {
      RX.lastIndex = 0;
      let last = 0, m;
      while ((m = RX.exec(child.value))) {
        if (m.index > last) out.push({ type: "text", value: child.value.slice(last, m.index) });
        const s = sources[m[1]];
        if (!s) throw new Error(`remark-cite: unknown source "${m[1]}"`);
        const page = m[2] ? Number(m[2]) : undefined;
        const href = page && /\.pdf/i.test(s.url) ? `${s.url}#page=${page}` : s.url;
        const label = page ? `p.${page}` : "↗";
        out.push({ type: "html", value: `<sup class="cite"><a href="${esc(href)}" target="_blank" rel="noopener" title="${esc(s.title + " — " + s.publisher)}">${label}</a></sup>` });
        last = RX.lastIndex;
      }
      if (last < child.value.length) out.push({ type: "text", value: child.value.slice(last) });
    } else {
      walk(child);
      out.push(child);
    }
  }
  node.children = out;
}
export default function remarkCite() {
  return (tree) => walk(tree);
}
