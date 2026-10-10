---
title: "Immersion cooling fluids for AI and data centres: what to compare"
h1: "Immersion cooling fluids for AI and data centres"
description: "Single-phase and two-phase fluids for data-centre immersion cooling, compared on cited datasheet values, with the questions to put to every supplier before you fill a tank."
path: applications/data-center-immersion
eyebrow: "Data-centre immersion"
answer: "Data-centre immersion uses either single-phase fluids (synthetic hydrocarbons, esters) pumped through a heat exchanger, or two-phase fluorinated fluids that boil on the chips. Our register holds verified datasheets for both. The decision usually turns on PFAS exposure, fire safety, tank weight and hardware warranty more than on any single property."
order: 5
updated: 2026-10-11
related: [single-vs-two-phase, choose, fluid-types]
---

## The candidates in our register

| Fluid | Mode | Flash / boiling | Density g/cm³ | Thermal cond. W/m·K | Dielectric strength | PFAS |
|---|---|---|---|---|---|---|
| [ElectroCool EC-110](/fluids/electrocool/) | Single-phase | Flash 203 °C | 0.82 | 0.1374 (40 °C) | > 60 kV (2 mm) | Free (maker) |
| [NatureCool 2000](/fluids/naturecool-2000/) | Single-phase | Flash 325 °C | 0.9206 | 0.1644 (20 °C) | > 35 kV (2.5 mm) | Non-fluorinated |
| [Opteon 2P50](/fluids/opteon-2p50/) | Two-phase | Boils 48.9 °C | 1.456 | 0.073 | 59 kV (2.5 mm) | Undetermined · developmental |
| [Galden HT55](/fluids/galden-ht/) | Low-boiling PFPE | Boils 55 °C | 1.65 | 0.065 | 40 kV (2.54 mm) | PFAS |

Sources: ElectroCool {{src:ef-electrocool-tds:2}}, NatureCool {{src:cargill-naturecool-2000-tds:2}}, Opteon 2P50 {{src:chemours-2p50-pis:1}}, Galden {{src:syensqo-galden-ht:2}}.

Engineered Fluids lists computer servers, GPUs, FPGAs, ASICs and routers among the data-centre equipment cooled in ElectroCool. {{src:ef-electrocool-tds:1}} Chemours developed Opteon 2P50 specifically for two-phase immersion cooling, but it is a developmental product. {{src:chemours-2p50-pis:1}} Syensqo lists "transformer and super computer cooling" among Galden's uses. {{src:syensqo-galden-ht:2}}

## Single-phase or two-phase for an AI build

The full comparison is in [single-phase vs two-phase](/single-vs-two-phase/). For a data hall, the practical differences are:

- **Fluid supply and PFAS.** The two-phase fluids most widely used came from 3M, which has exited PFAS manufacturing. {{src:3m-exit-release}} The close alternatives in our register are fluorinated. The PFAS-free options are single-phase.
- **Fire.** Single-phase fluids have flash points (157–325 °C across the register's immersion coolants). The fluorinated fluids here state none. {{src:ef-electrocool-tds:2}} {{src:cargill-naturecool-2000-tds:2}} {{src:chemours-2p50-pis:1}}
- **Weight.** The fluorinated candidates are much denser: 1.456 g/cm³ (Opteon 2P50) and 1.65 g/cm³ (Galden HT55), against 0.82–0.92 g/cm³ for the single-phase fluids. A filled tank's floor loading changes accordingly. {{src:syensqo-galden-ht:2}} {{src:chemours-2p50-pis:1}} {{src:ef-electrocool-tds:2}}
- **Containment.** Two-phase tanks are closed systems that condense the vapour and return it to the bath. {{src:chemours-2p50-page}} Low-vapour-pressure single-phase fluids can run in open baths without evaporation, according to Engineered Fluids. {{src:ef-electrocool-tds:1}}

## Ask every supplier these questions

1. **The current datasheet and SDS,** with the test method and gap behind the dielectric strength.
2. **Material compatibility** for your server components, cables, seals and labels.
3. **Hardware warranty.** An operator quoted in The Register said some hardware makers will not honour warranties on immersed equipment. Get the OEM's position in writing. {{src:register-2025}}
4. **Service life and fluid maintenance:** testing, filtration, top-up and end-of-life take-back. Engineered Fluids, for example, describes a collection and reprocessing programme. {{src:ef-electrocool-tds:1}}
5. **PFAS position** in writing, and any EU exemption the maker expects to rely on.
6. **Lead time, minimum order and price** for your fill volume. Supply is concentrated, though that view is contested. {{src:register-2025}}

## Get quotes without the legwork

Tell the [desk](/desk/) your rack count, fill volume, single- or two-phase preference and PFAS constraint. We shortlist from the register and come back with options.
