// The register: loads every datasheet file in src/data/fluids, and defines the property vocabulary, labels,
// completeness rule and formatting used by every page. One file = one maker document = one product line.
import sourcesJson from "../data/sources.json";
import makersJson from "../data/makers.json";

export type Prop = { v?: number; q?: string; none?: boolean; at?: string; method?: string; pub?: string; src?: string; p?: number; label?: string };
export type Grade = { slug: string; name: string; use?: string; props: Record<string, Prop> };
export type Line = {
  line: string; name: string; maker: string; family: string; phase?: "single" | "two"; status: "active" | "developmental" | "discontinued";
  applications: string[]; source: string; page: number; summary: string;
  pfas: { status: "free" | "nonfluorinated" | "pfas" | "undetermined"; basis: string; quote: string; page: number; note?: string };
  status_source?: { src: string; page: number };
  published_on: string | null; grades: Grade[];
};
export type Source = { title: string; publisher: string; kind: string; url: string; checked: string; host?: string };
export type Maker = { name: string; short: string; where: string; url: string; note?: string };

export const SOURCES = sourcesJson as Record<string, Source>;
export const MAKERS = makersJson as Record<string, Maker>;

const files = import.meta.glob<{ default: Line }>("../data/fluids/*.json", { eager: true });
export const LINES: Line[] = Object.values(files).map((m) => m.default).sort((a, b) => a.name.localeCompare(b.name));

/** Property vocabulary. Values in the data files are stored in these canonical units; `pub` keeps the as-published
 *  value whenever a unit was converted, so a reader can always see what the maker printed. */
export const PROPS: Record<string, { label: string; short: string; unit: string; dp?: number }> = {
  boiling_point: { label: "Boiling point", short: "Boil", unit: "°C" },
  flash_point: { label: "Flash point", short: "Flash", unit: "°C" },
  fire_point: { label: "Fire point", short: "Fire", unit: "°C" },
  pour_point: { label: "Pour point", short: "Pour", unit: "°C" },
  density: { label: "Density", short: "Density", unit: "g/cm³" },
  viscosity_kin: { label: "Kinematic viscosity", short: "Visc.", unit: "cSt" },
  viscosity_dyn: { label: "Dynamic viscosity", short: "Visc. (dyn)", unit: "cP" },
  thermal_conductivity: { label: "Thermal conductivity", short: "k", unit: "W/m·K" },
  specific_heat: { label: "Specific heat", short: "cp", unit: "kJ/kg·K" },
  latent_heat: { label: "Heat of vaporisation", short: "Latent", unit: "kJ/kg" },
  vapor_pressure: { label: "Vapour pressure", short: "Vap. p.", unit: "kPa" },
  dielectric_strength: { label: "Dielectric strength", short: "Diel. str.", unit: "kV" },
  dielectric_constant: { label: "Dielectric constant", short: "εr", unit: "" },
  gwp: { label: "Global warming potential", short: "GWP", unit: "" },
  odp: { label: "Ozone depletion potential", short: "ODP", unit: "" },
};

/** A line earns its own page only when every grade carries these, each cited (CEO D5, 2026-10-11). */
export const CORE = ["density", "thermal_conductivity", "specific_heat", "dielectric_strength"] as const;
const hasAny = (g: Grade, keys: string[]) => keys.some((k) => g.props[k] && (g.props[k].v !== undefined || g.props[k].none));
export function isComplete(l: Line): boolean {
  return l.grades.every((g) => CORE.every((k) => g.props[k]?.v !== undefined) && hasAny(g, ["viscosity_kin", "viscosity_dyn"]) && hasAny(g, ["boiling_point", "flash_point"]));
}
export const isPublished = (l: Line) => !!l.published_on && isComplete(l);
/** Labels of the page-qualifying properties a line is still missing (any grade). */
export function missing(l: Line): string[] {
  const out = new Set<string>();
  for (const g of l.grades) {
    for (const k of CORE) if (g.props[k]?.v === undefined) out.add(PROPS[k].label.toLowerCase());
    if (!hasAny(g, ["viscosity_kin", "viscosity_dyn"])) out.add("viscosity");
    if (!hasAny(g, ["boiling_point", "flash_point"])) out.add("boiling or flash point");
  }
  return [...out];
}

/** Closest non-discontinued fluids by boiling point (for replacement screening). Lines without a boiling point
 *  (single-phase oils) are not ranked here; they are offered separately as PFAS-free architecture changes. */
export function nearestByBoil(bp: number, exclude: string[] = [], n = 5) {
  return ROWS.filter((r) => r.line.status !== "discontinued" && !exclude.includes(r.line.line) && r.props.boiling_point?.v !== undefined)
    .map((r) => ({ r, d: (r.props.boiling_point!.v as number) - bp }))
    .sort((a, b) => Math.abs(a.d) - Math.abs(b.d))
    .slice(0, n);
}
export const PAGED = LINES.filter(isPublished);

export const FAMILY: Record<string, { label: string; fluorinated: boolean }> = {
  "synthetic-hydrocarbon": { label: "Synthetic hydrocarbon", fluorinated: false },
  "mineral-hydrocarbon": { label: "Mineral oil", fluorinated: false },
  "natural-ester": { label: "Natural ester", fluorinated: false },
  "synthetic-ester": { label: "Synthetic ester", fluorinated: false },
  pfpe: { label: "Perfluoropolyether (PFPE)", fluorinated: true },
  pfc: { label: "Perfluorocarbon (PFC)", fluorinated: true },
  hfe: { label: "Hydrofluoroether (HFE)", fluorinated: true },
  hfo: { label: "Hydrofluoroolefin (HFO)", fluorinated: true },
  fk: { label: "Fluoroketone (FK)", fluorinated: true },
};
export const APPS: Record<string, string> = {
  "electronics-cooling": "Electronics & IT cooling",
  semiconductor: "Semiconductor tools",
  transformer: "Transformers",
  "test-cleaning": "Test & cleaning",
  "vapour-phase": "Vapour-phase heating",
};
export const STATUS: Record<string, { label: string; chip: string }> = {
  active: { label: "In production", chip: "chip-plain" },
  developmental: { label: "Developmental", chip: "chip-dev" },
  discontinued: { label: "Discontinued", chip: "chip-gone" },
};
export const PFAS: Record<string, { label: string; chip: string; long: string }> = {
  free: { label: "PFAS-free", chip: "chip-free", long: "PFAS-free — stated by the maker" },
  nonfluorinated: { label: "Non-fluorinated", chip: "chip-free", long: "Non-fluorinated base chemistry — no maker PFAS statement" },
  pfas: { label: "PFAS", chip: "chip-pfas", long: "PFAS under the OECD (2021) structural definition" },
  undetermined: { label: "PFAS: undetermined", chip: "chip-dev", long: "Undetermined — structure not disclosed" },
};
export const PHASE: Record<string, string> = { single: "Single-phase", two: "Two-phase" };

export type Row = Grade & { line: Line; href: string; paged: boolean };
const ORDER: Record<string, number> = { active: 0, developmental: 1, discontinued: 2 };
export const ROWS: Row[] = LINES.flatMap((l) =>
  l.grades.map((g) => {
    const paged = isPublished(l);
    return { ...g, line: l, paged, href: paged ? (l.grades.length > 1 ? `/fluids/${l.line}/#${g.slug}` : `/fluids/${l.line}/`) : `/fluids/#${g.slug}` };
  })
).sort((a, b) => ORDER[a.line.status] - ORDER[b.line.status] || a.name.localeCompare(b.name, "en", { numeric: true }));

// Print the value exactly as stored (= as the maker printed it, or as converted and flagged). Never round:
// rounding a published value is changing it. toPrecision(12) only strips binary float noise.
const trim = (n: number) => String(Number(n.toPrecision(12))).replace("-", "−");
/** "> 60", "≈ 330", "none" — neither adds nor removes precision. */
export function fmt(p?: Prop): string {
  if (!p) return "";
  if (p.none) return "none";
  if (p.v === undefined) return "";
  return (p.q ? p.q + " " : "") + trim(p.v);
}
export function fmtUnit(key: string, p?: Prop): string {
  const s = fmt(p);
  if (!s || s === "none") return s;
  const u = PROPS[key]?.unit;
  return u ? `${s} ${u}` : s;
}
export const srcOf = (l: Line, p?: Prop) => SOURCES[p?.src || l.source];
export const pageOf = (l: Line, p?: Prop) => p?.p ?? l.page;
export function citeUrl(srcId: string, page?: number) {
  const s = SOURCES[srcId];
  if (!s) throw new Error("unknown source " + srcId);
  return page && /\.pdf/i.test(s.url) ? `${s.url}#page=${page}` : s.url;
}
export const lineSourceIds = (l: Line) => {
  const ids = new Set<string>([l.source]);
  for (const g of l.grades) for (const p of Object.values(g.props)) if (p.src) ids.add(p.src);
  if (l.status_source) ids.add(l.status_source.src);
  if (l.pfas.basis === "structure") ids.add("oecd-2021-terminology");
  return [...ids];
};

export const counts = () => ({
  products: ROWS.length,
  lines: LINES.length,
  makers: new Set(LINES.map((l) => l.maker)).size,
  values: ROWS.reduce((n, r) => n + Object.values(r.props).filter((p) => p.v !== undefined || p.none).length, 0),
  sources: new Set(LINES.flatMap(lineSourceIds)).size,
});
