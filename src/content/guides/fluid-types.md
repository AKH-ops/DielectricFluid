---
title: "Dielectric fluid types compared: hydrocarbons, esters and fluorinated fluids"
h1: "The dielectric fluid families, compared on datasheet values"
description: "Hydrocarbons, esters, perfluorocarbons, PFPEs, hydrofluoroethers and HFOs compared on density, thermal conductivity, specific heat, flash and boiling point, and PFAS status."
path: fluid-types
eyebrow: "Fluid families"
answer: "Dielectric coolants split into non-fluorinated fluids (synthetic hydrocarbons and esters) and fluorinated fluids (perfluorocarbons, perfluoropolyethers, hydrofluoroethers and hydrofluoroolefins). On the datasheets in our register, the non-fluorinated fluids carry about twice the heat per kilogram, conduct heat about twice as well and weigh about half as much per litre. The fluorinated fluids have no flash point and boil low enough for two-phase use. Most of them are PFAS."
order: 2
updated: 2026-10-11
related: [what-is-dielectric-fluid, single-vs-two-phase, choose]
---

## One example from each family

All values are the maker's typical figures, cited to the page they appear on.

| Family | Example | Density g/cm³ | Thermal cond. W/m·K | Specific heat kJ/kg·K | Flash point | Boiling point | PFAS |
|---|---|---|---|---|---|---|---|
| Synthetic hydrocarbon | [ElectroCool EC-110](/fluids/electrocool/) | 0.82 | 0.1374 (40 °C) | 2.2338 (40 °C) | 203 °C | — | Free (maker states "No PFAS") |
| Natural ester | [NatureCool 2000](/fluids/naturecool-2000/) | 0.9206 | 0.1644 (20 °C) | 2.3076 (60 °C) | 325 °C | — | Non-fluorinated base |
| Perfluoropolyether | [Galden HT55](/fluids/galden-ht/) | 1.65 | 0.065 | 0.962* | none | 55 °C | PFAS |
| Perfluorocarbon | [Fluorinert FC-72](/fluids/fluorinert-fc-72/) | 1.68 | 0.057 | 1.1 | none | 56 °C | PFAS · discontinued |
| Hydrofluoroether | [Novec 7000](/fluids/novec-7000/) | 1.40 | 0.075 | 1.3 | — | 34 °C | PFAS · discontinued |
| Hydrofluoroolefin | [Opteon 2P50](/fluids/opteon-2p50/) | 1.456 | 0.073 | 1.09 | none | 48.9 °C | Undetermined · developmental |

Sources: ElectroCool {{src:ef-electrocool-tds:2}}, NatureCool {{src:cargill-naturecool-2000-tds:2}}, Galden {{src:syensqo-galden-ht:2}}, FC-72 {{src:3m-fc72-tds:1}}, Novec 7000 {{src:3m-novec7000-tds:2}}, Opteon 2P50 {{src:chemours-2p50-pis:1}}. \*Converted from 0.23 cal/g·°C. Fluorinated-fluid values are at 25 °C unless shown.

## What the numbers say

**Heat per kilogram.** The non-fluorinated fluids list specific heats of 2.19–2.31 kJ/kg·K. {{src:ef-electrocool-tds:2}} {{src:cargill-naturecool-2000-tds:2}} The fluorinated fluids list 0.96–1.30. {{src:syensqo-galden-ht:2}} {{src:3m-novec7000-tds:2}}

**Heat conduction.** Thermal conductivity runs 0.136–0.164 W/m·K for the non-fluorinated fluids and 0.057–0.075 W/m·K for the fluorinated ones. {{src:ef-electrocool-tds:2}} {{src:3m-fc72-tds:1}}

**Weight.** Fluorinated fluids are denser, 1.40–1.85 g/cm³ against 0.81–0.92 g/cm³. {{src:syensqo-galden-ht:2}} {{src:ef-electrocool-tds:2}} {{src:cargill-naturecool-2000-tds:2}} A full tank weighs about twice as much.

**Per litre, the gap narrows.** Multiply density by specific heat and the difference shrinks: about 1.6 MJ/m³·K for Galden HT55 (1.65 × 0.962) against about 1.8 MJ/m³·K for ElectroCool EC-110 (0.82 × 2.2338). This is our arithmetic on the makers' values, at different temperatures, so read it as an order of magnitude.

**Fire.** Every non-fluorinated fluid here has a flash point, from 157 °C to about 330 °C. {{src:ef-electrocool-tds:2}} {{src:cargill-fr3-tds:1}} Galden, Fluorinert and Opteon 2P50 state none. {{src:syensqo-galden-ht:2}} {{src:3m-fc72-tds:1}} {{src:chemours-2p50-pis:1}} 3M describes Novec 7000 as non-flammable. {{src:3m-novec7000-tds:1}}

**Boiling.** The fluorinated fluids boil between 34 °C (Novec 7000) and 270 °C (Galden HT270). {{src:3m-novec7000-tds:2}} {{src:syensqo-galden-ht:2}} That range is what makes two-phase and vapour-phase systems possible. See [single-phase vs two-phase](/single-vs-two-phase/).

## The families, one by one

### Synthetic hydrocarbons
Engineered base oils for single-phase immersion. Engineered Fluids makes ElectroCool from synthetic hydrocarbons, offers grades from 5.02 to 67.1 cSt at 40 °C, and states a GWP of 0 and "No PFAS". {{src:ef-electrocool-tds:1}} {{src:ef-electrocool-tds:2}}

### Natural esters
Derived from vegetable oils. Cargill says NatureCool 2000 is derived from 95% vegetable oil and lists a 325 °C flash point. {{src:cargill-naturecool-2000-tds:1}} Its transformer fluid, Envirotemp FR3, is stated to contain no petroleum, halogens, silicones or corrosive sulfur. {{src:cargill-fr3-tds:1}}

### Perfluoropolyethers (PFPE)
Fully fluorinated: Syensqo states its Galden HT fluids contain no hydrogen in their chemical structure. Nine grades boil between 55 °C and 270 °C, all with no flash or fire point. {{src:syensqo-galden-ht:2}}

### Perfluorocarbons (PFC)
Fully fluorinated liquids such as 3M's Fluorinert range. 3M notes that, as perfluorocarbons, they have a high global warming potential and a long atmospheric lifetime. {{src:3m-fc72-tds:3}} The range is listed in 3M's PFAS exit. {{src:3m-exit-letter:2}}

### Hydrofluoroethers (HFE)
Partly fluorinated ethers such as Novec 7000 (C₃F₇OCH₃) and Novec 7100 (C₄F₉OCH₃). {{src:3m-novec7000-tds:1}} {{src:3m-novec7100-pi:2}} 3M lists Novec 7100 at a 100-year GWP of 320. {{src:3m-novec7100-pi:2}} Both are listed in 3M's PFAS exit. {{src:3m-exit-letter:2}}

### Hydrofluoroolefins (HFO)
Newer fluorinated fluids with low GWP. Chemours lists a GWP of 10 (AR6) for its developmental Opteon 2P50, but does not disclose its structure. {{src:chemours-2p50-pis:1}}

## Which are PFAS?

Fluids whose disclosed structure contains a fully fluorinated –CF₃ or –CF₂– carbon meet the OECD's structural definition of PFAS. {{src:oecd-2021-terminology}} That covers the perfluoropolyethers, perfluorocarbons and hydrofluoroethers above. The [PFAS tracker](/pfas/) shows the evidence for every fluid in the register.
