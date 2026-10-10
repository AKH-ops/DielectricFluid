---
title: "What is a dielectric fluid? Properties, numbers and uses"
h1: "What is a dielectric fluid?"
description: "A dielectric fluid is an electrically insulating liquid that can touch live components and carry their heat away. The six numbers that describe one, with real datasheet values."
path: what-is-dielectric-fluid
eyebrow: "What is a dielectric fluid?"
answer: "A dielectric fluid is a liquid that does not conduct electricity, so it can sit in direct contact with energised components and carry their heat away. Six numbers describe one: dielectric strength, thermal conductivity, specific heat, viscosity, flash or boiling point, and global warming potential. The maker publishes each one, and our register cites the page it is printed on."
order: 1
updated: 2026-10-11
related: [fluid-types, single-vs-two-phase, choose]
---

## What "dielectric" means

"Dielectric" means electrically insulating. A dielectric fluid resists the flow of current, which is what lets it touch a powered circuit board, a battery cell or a transformer winding without causing a short circuit.

Water-based coolants move heat very well, but they conduct electricity once they carry dissolved ions. That is why they stay inside sealed cold plates and pipes, away from live parts. A dielectric fluid removes that wall: the liquid can flow over the components themselves.

## The number that matters first: dielectric strength

Dielectric strength is the voltage at which a sample breaks down across a standard gap between two electrodes. Makers always publish it with a test method and a gap, and both change the result:

- Engineered Fluids lists more than 60 kV for its ElectroCool coolants, measured by ASTM D1816 with a 2 mm gap. {{src:ef-electrocool-tds:2}}
- 3M listed 38 kV for Fluorinert FC-72 across a 0.1 in (2.54 mm) gap. {{src:3m-fc72-tds:2}}
- Chemours lists 59 kV for Opteon 2P50 by IEC 60156 with a 2.5 mm gap, and 41.3 kV per 0.1 in by ASTM D877. {{src:chemours-2p50-pis:1}}

The same fluid gives two different numbers under two different methods, so **compare dielectric strengths only at the same gap and method.** Our [register](/fluids/) shows the condition next to every value.

## Six numbers that describe a cooling fluid

| Property | Why it matters | Range in our register |
|---|---|---|
| Dielectric strength | Electrical safety margin | > 25 kV (Novec 7000, 0.1 in gap) to > 60 kV (ElectroCool, 2 mm gap) |
| Thermal conductivity | How readily heat moves through the liquid | 0.057 W/m·K (FC-72) to 0.1644 W/m·K (NatureCool 2000) |
| Specific heat | How much heat each kilogram carries per degree | 0.962 kJ/kg·K (Galden HT) to 2.3076 kJ/kg·K (NatureCool 2000, at 60 °C) |
| Viscosity | Pumping power, and flow through tight channels | 0.32 cSt (Novec 7000, 25 °C) to 67.1 cSt (ElectroCool EC-140, 40 °C) |
| Flash or boiling point | Fire safety for liquids that stay liquid; the operating point for liquids that boil | Flash 157 °C (EC-122) to about 330 °C (Envirotemp FR3); fluorinated fluids have none |
| Global warming potential | Climate impact if vapour escapes | 0 (ElectroCool) to 320 (Novec 7100, 100-year) |

Sources for the table: ElectroCool {{src:ef-electrocool-tds:2}}, NatureCool 2000 {{src:cargill-naturecool-2000-tds:2}}, Galden HT {{src:syensqo-galden-ht:2}}, Fluorinert FC-72 {{src:3m-fc72-tds:1}}, Novec 7000 {{src:3m-novec7000-tds:2}}, Novec 7100 {{src:3m-novec7100-pi:2}}, Envirotemp FR3 {{src:cargill-fr3-tds:1}}. The Galden specific heat is converted from the 0.23 cal/g·°C the brochure prints.

## Where dielectric fluids are used

- **Electronics and IT immersion.** Engineered Fluids lists servers, GPUs, FPGAs, ASICs and routers among the devices cooled in ElectroCool. {{src:ef-electrocool-tds:1}} Chemours developed Opteon 2P50 for two-phase immersion cooling. {{src:chemours-2p50-pis:1}} See [data-centre immersion](/applications/data-center-immersion/).
- **Semiconductor tools.** 3M marketed Fluorinert FC-770 for ion implanters, dry etchers and CVD machines {{src:3m-fc770-tds:1}}, and Novec 7000 for semiconductor heat transfer. {{src:3m-novec7000-tds:1}}
- **Transformers.** Cargill sells Envirotemp FR3 as a natural-ester dielectric coolant for transformers. {{src:cargill-fr3-tds:1}} 3M also listed high-voltage transformers among FC-770's uses. {{src:3m-fc770-tds:1}}
- **Electronics testing.** 3M described FC-72 as suited to quality and reliability testing, including gross leak testing. {{src:3m-fc72-tds:1}}

## The two big choices

Dielectric coolants divide into **non-fluorinated** fluids (hydrocarbons and esters) and **fluorinated** fluids (perfluorocarbons, perfluoropolyethers, hydrofluoroethers and hydrofluoroolefins). They behave very differently: see [the fluid families compared](/fluid-types/). They also suit different system designs: see [single-phase or two-phase](/single-vs-two-phase/).

## Frequently asked

**Is dielectric fluid the same as coolant?** It is a coolant with one extra requirement: it must insulate. A water-glycol coolant cools well but has to be kept away from live parts. A dielectric fluid can touch them.

**Is transformer oil a dielectric fluid?** Yes. Transformers were the original use: the liquid insulates the windings and carries heat to the tank walls. Natural-ester fluids such as Envirotemp FR3 are sold for this purpose. {{src:cargill-fr3-tds:1}}

**Where do these numbers come from?** From each maker's own datasheet, linked to the page. They are typical values. The certificate of analysis that ships with a batch is the binding document.
