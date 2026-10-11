// The desk form handler for dielectricfluid.com. The site itself stays static: wrangler.jsonc sends only /api/* here
// (assets.run_worker_first), so every page is served straight from ./dist without running this code.
//
// POST /api/desk: check origin, size, honeypot, time on page and (once switched on) Turnstile; store the request in
// D1 (binding DB); email it to the desk through this zone's Cloudflare Email Routing (binding DESK_MAIL). Nothing
// leaves Cloudflare except the email itself, which goes only to the verified address in the NOTIFY_TO secret.
//
// Secrets (dashboard only, never in the repo, which is public): NOTIFY_TO; TURNSTILE_SECRET (optional).
// Vars: MAIL_FROM, ALLOWED_ORIGINS.
import { EmailMessage } from "cloudflare:email";

// Field → max length. Anything longer is cut, never rejected: a buyer should not lose a long message to a limit.
const LIMITS = {
  name: 120, email: 200, company: 160, country: 80, application: 40, replacing: 160, volume: 120,
  pfas: 40, timeline: 40, message: 4000, fluid: 80, source: 80, phase: 20,
};
const MULTILINE = new Set(["message"]);

// The same schema as migrations/0001_desk_requests.sql (keep them in step). It is created on first use, so a new
// D1 database needs no manual migration. One statement per entry: D1 prepares each separately.
const SCHEMA = [
  `CREATE TABLE IF NOT EXISTS desk_requests (id TEXT PRIMARY KEY, created_at TEXT NOT NULL, name TEXT NOT NULL,
    email TEXT NOT NULL, company TEXT, country TEXT, application TEXT NOT NULL, replacing TEXT, volume TEXT, pfas TEXT,
    timeline TEXT, share_ok INTEGER NOT NULL, message TEXT, fluid TEXT, source TEXT, phase TEXT, visitor_country TEXT,
    email_status TEXT NOT NULL DEFAULT 'pending', status TEXT NOT NULL DEFAULT 'new')`,
  "CREATE INDEX IF NOT EXISTS desk_requests_created ON desk_requests (created_at)",
];

// Select values the form offers, with the labels used in the notification email.
const CHOICES = {
  application: {
    "data-centre-single-phase": "Data centre: single-phase immersion",
    "data-centre-two-phase": "Data centre: two-phase immersion",
    "ev-battery": "EV battery or e-drive",
    transformer: "Transformer",
    "power-electronics": "Power electronics",
    semiconductor: "Semiconductor tools",
    "test-cleaning": "Test, cleaning or heat transfer",
    other: "Other",
  },
  pfas: {
    "must-be-free": "Must be PFAS-free",
    "prefer-free": "Prefer PFAS-free",
    "no-constraint": "No constraint",
    "not-sure": "Not sure",
  },
  timeline: {
    now: "Needed now",
    "1-3-months": "1–3 months",
    "3-12-months": "3–12 months",
    researching: "Researching",
  },
  share: {
    yes: "YES: may share the request with suppliers that fit",
    no: "NO: answer only, do not contact suppliers",
  },
};

export default {
  async fetch(request, env, ctx) {
    const { pathname } = new URL(request.url);
    if (pathname === "/api/desk" || pathname === "/api/desk/") {
      if (request.method !== "POST") return new Response("Use POST.\n", { status: 405, headers: { allow: "POST" } });
      try {
        return await desk(request, env, ctx);
      } catch (e) {
        console.error("desk: unhandled", e && e.stack ? e.stack : String(e));
        return reply(request, 500, { ok: false, error: "server" });
      }
    }
    if (pathname.startsWith("/api/")) return new Response("Not found.\n", { status: 404 });
    return env.ASSETS.fetch(request);
  },
};

async function desk(request, env, ctx) {
  // Only our own pages may post. Browsers always send Origin on a cross-site or same-site POST.
  const allowed = String(env.ALLOWED_ORIGINS || "").split(",").map((s) => s.trim()).filter(Boolean);
  if (!allowed.includes(request.headers.get("origin") || "")) return reply(request, 403, { ok: false, error: "origin" });
  if (Number(request.headers.get("content-length") || 0) > 32768) return reply(request, 413, { ok: false, error: "size" });
  const type = request.headers.get("content-type") || "";
  if (!type.startsWith("multipart/form-data") && !type.startsWith("application/x-www-form-urlencoded")) {
    return reply(request, 415, { ok: false, error: "type" });
  }
  const form = await request.formData();

  // Honeypot: a field people never see. Bots fill it; answer as if it worked and store nothing.
  if (String(form.get("website") || "").trim()) return reply(request, 200, { ok: true });

  // Time on the page, measured by the page's own script at submit. Bots that post without running it send nothing,
  // and no person fills this form in under two seconds. Refused with a message, so a person can simply resend.
  if (!(Number(form.get("elapsed")) >= 2000)) return reply(request, 400, { ok: false, error: "check" });

  // Turnstile, only once it is switched on: TURNSTILE_SECRET in the dashboard plus turnstileSiteKey in src/lib/site.ts.
  if (env.TURNSTILE_SECRET) {
    const check = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      body: new URLSearchParams({
        secret: env.TURNSTILE_SECRET,
        response: String(form.get("cf-turnstile-response") || ""),
        remoteip: request.headers.get("cf-connecting-ip") || "",
      }),
    }).then((r) => r.json()).catch(() => ({ success: false }));
    if (!check.success) return reply(request, 400, { ok: false, error: "check" });
  }

  const v = {};
  for (const [k, max] of Object.entries(LIMITS)) v[k] = clean(form.get(k), max, MULTILINE.has(k));
  const share = clean(form.get("share"), 3, false);
  const bad = [];
  if (!v.name) bad.push("name");
  if (!/^[^\s@<>()",;:]+@[^\s@<>()",;:]+\.[^\s@<>()",;:]{2,}$/.test(v.email)) bad.push("email");
  if (!(v.application in CHOICES.application)) bad.push("application");
  if (v.pfas && !(v.pfas in CHOICES.pfas)) bad.push("pfas");
  if (v.timeline && !(v.timeline in CHOICES.timeline)) bad.push("timeline");
  if (!(share in CHOICES.share)) bad.push("share");
  if (form.get("privacy") !== "yes") bad.push("privacy");
  if (!v.message && !v.replacing) bad.push("message");
  if (bad.length) return reply(request, 422, { ok: false, error: "fields", fields: bad });

  const id = crypto.randomUUID();
  const at = new Date().toISOString();
  const visitorCountry = (request.cf && request.cf.country) || "";

  let stored = false;
  const insert = () => env.DB.prepare(
    `INSERT INTO desk_requests (id, created_at, name, email, company, country, application, replacing, volume, pfas,
      timeline, share_ok, message, fluid, source, phase, visitor_country) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
  ).bind(id, at, v.name, v.email, v.company, v.country, v.application, v.replacing, v.volume, v.pfas, v.timeline,
    share === "yes" ? 1 : 0, v.message, v.fluid, v.source, v.phase, visitorCountry).run();
  try {
    try {
      await insert();
    } catch (e) {
      if (!/no such table/i.test(String(e && e.message ? e.message : e))) throw e;
      await env.DB.batch(SCHEMA.map((s) => env.DB.prepare(s)));
      await insert();
    }
    stored = true;
  } catch (e) {
    console.error("desk: d1 insert failed", String(e && e.message ? e.message : e));
  }

  let mailStatus = "sent";
  try {
    if (!env.NOTIFY_TO) throw new Error("NOTIFY_TO is not set");
    await env.DESK_MAIL.send(new EmailMessage(env.MAIL_FROM, env.NOTIFY_TO, mime({ id, at, v, share, stored, env })));
  } catch (e) {
    mailStatus = "failed: " + String(e && e.message ? e.message : e).slice(0, 300);
    console.error("desk: email failed", mailStatus);
  }
  if (stored) {
    ctx.waitUntil(env.DB.prepare("UPDATE desk_requests SET email_status = ? WHERE id = ?").bind(mailStatus, id).run()
      .catch((e) => console.error("desk: status update failed", String(e))));
  }
  // The request is safe if either copy exists. Only when both failed does the buyer see an error.
  if (!stored && mailStatus !== "sent") return reply(request, 502, { ok: false, error: "server" });
  return reply(request, 200, { ok: true, id });
}

// JSON for the page's own fetch(); a 303 back to the desk page for a plain form post.
function reply(request, status, body) {
  if ((request.headers.get("accept") || "").includes("application/json")) {
    return new Response(JSON.stringify(body), {
      status, headers: { "content-type": "application/json; charset=utf-8", "cache-control": "no-store" },
    });
  }
  const q = body.ok ? "sent=1" : "error=" + encodeURIComponent(body.error || "server");
  return new Response(null, { status: 303, headers: { location: "/desk/?" + q + "#desk-form", "cache-control": "no-store" } });
}

// Strip control characters (and line breaks, unless the field is multi-line), trim, cap the length.
function clean(x, max, multiline) {
  let s = String(x == null ? "" : x).replace(/\r\n?/g, "\n");
  s = s.replace(/[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f]/g, "");
  if (!multiline) s = s.replace(/\s+/g, " ");
  return s.trim().slice(0, max);
}

function mime({ id, at, v, share, stored, env }) {
  const label = (k, val) => (val ? (CHOICES[k] && CHOICES[k][val]) || val : "—");
  const row = (k, val) => (k + ":").padEnd(14) + (val || "—");
  const text = [
    "New request from the sourcing desk at dielectricfluid.com/desk/",
    "",
    row("Name", v.name),
    row("Email", v.email),
    row("Company", v.company),
    row("Country", v.country),
    row("Application", label("application", v.application)),
    row("Replacing", v.replacing),
    row("Volume", v.volume),
    row("PFAS", label("pfas", v.pfas)),
    row("Timeline", label("timeline", v.timeline)),
    row("Suppliers", label("share", share)),
    "",
    "Message:",
    v.message || "—",
    "",
    "Context: " + ([v.fluid && "fluid " + v.fluid, v.source && "from " + v.source, v.phase && "phase " + v.phase]
      .filter(Boolean).join(", ") || "—"),
    "",
    "Reply to this email to answer the buyer: Reply-To is their address.",
    "Request " + id + ", received " + at + (stored ? ", stored in D1 desk_requests." : ". NOT stored in D1: keep this email."),
  ].join("\r\n");
  const subject = "Desk: " + label("application", v.application) + " — " + (v.replacing || v.company || v.name);
  const headers = [
    "From: DielectricFluid desk <" + env.MAIL_FROM + ">",
    "To: <" + env.NOTIFY_TO + ">",
    "Reply-To: " + displayName(v.name) + " <" + v.email + ">",
    "Subject: " + word(subject.slice(0, 140)),
    "Date: " + new Date().toUTCString(),
    "Message-ID: <" + id + "@dielectricfluid.com>",
    "MIME-Version: 1.0",
    "Content-Type: text/plain; charset=UTF-8",
    "Content-Transfer-Encoding: base64",
  ];
  return headers.join("\r\n") + "\r\n\r\n" + b64(text).replace(/.{1,76}/g, "$&\r\n");
}

// RFC 2047 encoded-word for non-ASCII header text; plain ASCII passes through.
const word = (s) => (/^[\x20-\x7e]*$/.test(s) ? s : "=?UTF-8?B?" + b64(s) + "?=");
// A display name: quoted when ASCII (specials removed), encoded-word otherwise.
const displayName = (s) => (/^[\x20-\x7e]*$/.test(s) ? '"' + s.replace(/["\\]/g, "") + '"' : word(s));

function b64(s) {
  const bytes = new TextEncoder().encode(s);
  let bin = "";
  for (let i = 0; i < bytes.length; i += 0x8000) bin += String.fromCharCode(...bytes.subarray(i, i + 0x8000));
  return btoa(bin);
}
