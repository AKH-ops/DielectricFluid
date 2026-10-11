// Build gate for the register and the guides. Runs before `astro build`; any error fails the build.
//  - every data file parses, names a known maker and source, and uses only known property keys;
//  - every value is a number (or an explicit "none") and every page reference is a positive integer;
//  - PFAS status and basis are from the allowed vocabulary, with the maker's own words quoted;
//  - product pages respect the cap: at most 5 lines may share a published_on date, except the CEO-authorised
//    launch release (policies/domains/dielectricfluid.com.md, D5 2026-10-11);
//  - guide markdown has title + description and no placeholder text.
import fs from "node:fs";
import path from "node:path";

const root = path.resolve(path.dirname(new URL(import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, "$1")), "..");
const read = (p) => JSON.parse(fs.readFileSync(path.join(root, p), "utf8"));
const errors = [];
const err = (f, m) => errors.push(`${f}: ${m}`);

const sources = read("src/data/sources.json");
const makers = read("src/data/makers.json");
const PROPS = ["boiling_point", "flash_point", "fire_point", "pour_point", "density", "viscosity_kin", "viscosity_dyn", "thermal_conductivity", "specific_heat", "latent_heat", "vapor_pressure", "dielectric_strength", "dielectric_constant", "gwp", "odp"];
const PFAS = { free: ["maker"], nonfluorinated: ["composition"], pfas: ["structure", "maker"], undetermined: ["structure-undisclosed"] };
const LAUNCH = "2026-10-11";
const MAX_PER_DAY = 5;

for (const [k, s] of Object.entries(sources)) {
  if (!/^https?:\/\//.test(s.url || "")) err("sources.json", `${k} has no URL`);
  if (!s.title || !s.publisher || !s.checked) err("sources.json", `${k} missing title/publisher/checked`);
}

const dir = path.join(root, "src/data/fluids");
const perDay = {};
const slugs = new Set();
for (const f of fs.readdirSync(dir).filter((x) => x.endsWith(".json"))) {
  let l;
  try { l = JSON.parse(fs.readFileSync(path.join(dir, f), "utf8")); } catch (e) { err(f, "invalid JSON: " + e.message); continue; }
  if (l.line + ".json" !== f) err(f, `line "${l.line}" does not match file name`);
  if (!makers[l.maker]) err(f, `unknown maker ${l.maker}`);
  if (!sources[l.source]) err(f, `unknown source ${l.source}`);
  if (!Number.isInteger(l.page) || l.page < 1) err(f, "page must be a positive integer");
  if (!["active", "developmental", "discontinued"].includes(l.status)) err(f, `bad status ${l.status}`);
  if (!l.summary || l.summary.length < 60) err(f, "summary too short");
  const pf = l.pfas || {};
  if (!PFAS[pf.status]) err(f, `bad pfas.status ${pf.status}`);
  else if (!PFAS[pf.status].includes(pf.basis)) err(f, `pfas.basis ${pf.basis} not allowed for ${pf.status}`);
  if (!pf.quote || !Number.isInteger(pf.page)) err(f, "pfas needs the maker's words (quote) and a page");
  if (l.status_source && !sources[l.status_source.src]) err(f, `unknown status source ${l.status_source.src}`);
  if (l.status === "discontinued" && !l.status_source) err(f, "discontinued needs status_source");
  if (l.published_on) perDay[l.published_on] = (perDay[l.published_on] || 0) + 1;
  for (const g of l.grades || []) {
    if (slugs.has(g.slug)) err(f, `duplicate grade slug ${g.slug}`);
    slugs.add(g.slug);
    for (const [k, p] of Object.entries(g.props || {})) {
      if (!PROPS.includes(k)) err(f, `${g.slug}: unknown property ${k}`);
      if (!p.none && typeof p.v !== "number") err(f, `${g.slug}.${k}: value must be a number or none`);
      if (p.src && !sources[p.src]) err(f, `${g.slug}.${k}: unknown source ${p.src}`);
      if (p.p !== undefined && (!Number.isInteger(p.p) || p.p < 1)) err(f, `${g.slug}.${k}: bad page`);
      if (p.q && !["<", ">", "≈", "≤", "≥"].includes(p.q)) err(f, `${g.slug}.${k}: bad qualifier ${p.q}`);
    }
  }
}
for (const [day, n] of Object.entries(perDay)) if (day !== LAUNCH && n > MAX_PER_DAY) err("register", `${n} product pages share published_on ${day} (cap ${MAX_PER_DAY}/day)`);

const disc = read("src/data/discontinued.json");
for (const g of disc.grades) if (g.line && !fs.existsSync(path.join(dir, g.line + ".json"))) err("discontinued.json", `${g.id} links missing line ${g.line}`);

const gdir = path.join(root, "src/content/guides");
if (fs.existsSync(gdir)) for (const f of fs.readdirSync(gdir).filter((x) => x.endsWith(".md"))) {
  const t = fs.readFileSync(path.join(gdir, f), "utf8");
  const fm = t.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!fm) { err(f, "no frontmatter"); continue; }
  if (!/^title:\s*\S/m.test(fm[1])) err(f, "no title");
  if (!/^description:\s*\S/m.test(fm[1])) err(f, "no description");
  if (/(TODO|TBD|lorem ipsum|\[citation needed\]|PLACEHOLDER)/i.test(t)) err(f, "placeholder text");
  for (const m of t.matchAll(/\{\{src:([a-z0-9-]+)/g)) if (!sources[m[1]]) err(f, `unknown source ${m[1]}`);
}

// The desk form must not ship half-configured: no Turnstile site key means every request is refused, and a
// placeholder D1 id fails the deploy after the pages are already built. Local tests set DESK_LOCAL=1.
if (!process.env.DESK_LOCAL) {
  const site = fs.readFileSync(path.join(root, "src/lib/site.ts"), "utf8");
  if (!process.env.PUBLIC_TURNSTILE_SITE_KEY && /turnstileSiteKey:\s*""/.test(site)) err("src/lib/site.ts", "turnstileSiteKey is empty");
  const wr = fs.readFileSync(path.join(root, "wrangler.jsonc"), "utf8");
  if (/REPLACE_WITH/.test(wr)) err("wrangler.jsonc", "placeholder left in (D1 database_id?)");
}

if (errors.length) { console.error("audit FAILED\n - " + errors.join("\n - ")); process.exit(1); }
console.log(`audit ok: ${slugs.size} grades, ${Object.keys(sources).length} sources, pages per day ${JSON.stringify(perDay)}`);
