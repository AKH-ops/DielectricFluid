# DielectricFluid

Source of https://dielectricfluid.com — the independent register of dielectric fluids, every value cited to the
maker's datasheet. Astro static site, deployed as a Cloudflare Worker (static assets) by Workers Builds on push to `main`.

```
npm ci
npm run build        # audit + astro build -> dist/
npm run linkcheck
npx wrangler dev     # serve dist/ in the Workers runtime on :8787
```

Conventions: `CLAUDE.md`. Data licence: register data CC BY 4.0.
