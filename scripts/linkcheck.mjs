// Link check over the built site (run after `astro build`).
//  - internal: every href/src starting with "/" must resolve to a file in dist/ or match a rule in dist/_redirects;
//  - external (--external): every distinct http(s) link is fetched once. 404/410/DNS failures are errors; 401/403/429
//    are reported as "blocked" (many makers' sites refuse automated requests) and must be checked by hand.
import fs from "node:fs";
import path from "node:path";

const root = path.resolve(path.dirname(new URL(import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, "$1")), "..");
const dist = path.join(root, "dist");
const external = process.argv.includes("--external");
const walk = (d, acc = []) => { for (const e of fs.readdirSync(d, { withFileTypes: true })) { const f = path.join(d, e.name); e.isDirectory() ? walk(f, acc) : f.endsWith(".html") && acc.push(f); } return acc; };
const redirects = fs.readFileSync(path.join(dist, "_redirects"), "utf8").split("\n").map((l) => l.trim()).filter((l) => l && !l.startsWith("#")).map((l) => l.split(/\s+/)[0]);
const redirected = (p) => redirects.some((r) => (r.endsWith("*") ? p.startsWith(r.slice(0, -1)) : r === p || r === p.replace(/\/$/, "")));
const exists = (p) => {
  const clean = decodeURIComponent(p.replace(/[#?].*$/, ""));
  const f = path.join(dist, clean);
  return clean === "/" || fs.existsSync(f) && fs.statSync(f).isFile() || fs.existsSync(path.join(f, "index.html"));
};

const problems = [];
const ext = new Map();
for (const file of walk(dist)) {
  const rel = "/" + path.relative(dist, file).replace(/\\/g, "/").replace(/index\.html$/, "");
  const html = fs.readFileSync(file, "utf8");
  for (const m of html.matchAll(/(?:href|src)="([^"]+)"/g)) {
    const u = m[1].replace(/&amp;/g, "&");
    if (u.startsWith("/") && !u.startsWith("//")) { if (!exists(u) && !redirected(u.replace(/[#?].*$/, ""))) problems.push(`${rel}: broken internal ${u}`); }
    else if (/^https?:\/\//.test(u)) { const k = u.replace(/#.*$/, ""); if (!ext.has(k)) ext.set(k, rel); }
  }
}
console.log(`internal: ${problems.length} problems across ${walk(dist).length} pages`);

let blocked = [];
if (external) {
  const UA = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0 Safari/537.36";
  const skip = /^https:\/\/(dielectricfluid\.com|tally\.so\/embed|creativecommons\.org)/;
  for (const [u, page] of ext) {
    if (skip.test(u)) continue;
    let status;
    try {
      const r = await fetch(u, { method: "GET", redirect: "follow", headers: { "user-agent": UA, accept: "text/html,application/pdf,*/*" }, signal: AbortSignal.timeout(30000) });
      status = r.status;
      await r.body?.cancel();
    } catch (e) { status = "ERR " + (e.cause?.code || e.name); }
    if (status === 404 || status === 410 || String(status).startsWith("ERR")) problems.push(`${page}: external ${status} ${u}`);
    else if ([401, 403, 429, 503].includes(status)) blocked.push(`${status} ${u}`);
    console.log(String(status).padEnd(10), u.slice(0, 110));
  }
}
if (blocked.length) console.log(`\nblocked to automated checks (verify by hand):\n - ${blocked.join("\n - ")}`);
if (problems.length) { console.error("\nlinkcheck FAILED\n - " + problems.join("\n - ")); process.exit(1); }
console.log("\nlinkcheck ok");
