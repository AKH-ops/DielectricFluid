-- Sourcing-desk requests from /desk/ (worker/index.js). One row per submission.
-- Apply: npx wrangler d1 migrations apply dielectricfluid-desk --remote  (or paste into the D1 console once).
CREATE TABLE IF NOT EXISTS desk_requests (
  id              TEXT PRIMARY KEY,
  created_at      TEXT NOT NULL,              -- ISO 8601, UTC
  name            TEXT NOT NULL,
  email           TEXT NOT NULL,
  company         TEXT,
  country         TEXT,                       -- where the fluid is needed, as typed
  application     TEXT NOT NULL,
  replacing       TEXT,
  volume          TEXT,
  pfas            TEXT,
  timeline        TEXT,
  share_ok        INTEGER NOT NULL,           -- 1 = may share with suppliers that fit; 0 = answer only
  message         TEXT,
  fluid           TEXT,                       -- context passed from a register page
  source          TEXT,                       -- which page sent the buyer (novec-finder, register, …)
  phase           TEXT,
  visitor_country TEXT,                       -- Cloudflare's country code for the request; no IP is stored
  email_status    TEXT NOT NULL DEFAULT 'pending',
  status          TEXT NOT NULL DEFAULT 'new' -- new → answered → quoted → closed (the desk updates it)
);
CREATE INDEX IF NOT EXISTS desk_requests_created ON desk_requests (created_at);
