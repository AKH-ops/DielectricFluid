export const SITE = {
  name: "DielectricFluid",
  domain: "dielectricfluid.com",
  url: "https://dielectricfluid.com",
  tagline: "The independent register of dielectric fluids — every value checked against its datasheet.",
  description:
    "An independent register of immersion-cooling, transformer and Novec-replacement fluids. Every value is cited to the maker's datasheet, alongside a Novec/Fluorinert replacement finder, a PFAS tracker and a sourcing desk.",
  author: "Ahmad Hassan, PhD",
  email: "hello@dielectricfluid.com",
  // Cloudflare Turnstile site key for the desk form (public by design). Optional: empty = no widget; set it together
  // with the TURNSTILE_SECRET Worker secret. PUBLIC_TURNSTILE_SITE_KEY overrides it (local tests use the test key).
  turnstileSiteKey: "",
  launched: "2026-10-11",
};

export const NAV = [
  { href: "/fluids/", label: "Register" },
  { href: "/novec-replacement/", label: "Novec replacement" },
  { href: "/pfas/", label: "PFAS tracker" },
  { href: "/guides/", label: "Guides" },
  { href: "/makers/", label: "Makers" },
];
