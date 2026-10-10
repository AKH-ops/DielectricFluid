---
title: "How to choose a dielectric fluid: a six-step screen"
h1: "How to choose a dielectric fluid"
description: "A six-step screen for choosing an immersion, transformer or replacement dielectric fluid: architecture, PFAS position, fire safety, thermal and electrical numbers, materials and supply."
path: choose
eyebrow: "How to choose"
answer: "Start from your system, not from a brand. Decide single-phase or two-phase. Set your PFAS position. Then screen candidates on the numbers your design is sensitive to: flash or boiling point, viscosity, thermal properties and dielectric strength at a stated gap. Check materials and warranty. Compare supply last."
order: 4
updated: 2026-10-11
related: [single-vs-two-phase, fluid-types, applications/data-center-immersion]
---

## 1. Fix the architecture

Single-phase systems pump liquid to a heat exchanger. Two-phase systems boil the fluid and condense it. The choice decides which fluids can work at all. In our register, every two-phase-capable fluid is fluorinated, and every PFAS-free fluid is single-phase. Read [single-phase vs two-phase](/single-vs-two-phase/) first.

## 2. Set your PFAS position

If you sell into the EU, or expect a fluid to stay in service for many years, the EU's universal PFAS restriction matters. Its risk committee adopted an opinion in March 2026. The socio-economic committee's final opinion was expected by the end of 2026, followed by a Commission draft and a vote. {{src:lexis-rac-2026}} Decide early whether a fluorinated fluid is acceptable to you. The [PFAS tracker](/pfas/) shows the status of every fluid in the register.

## 3. Screen for fire safety

For liquids that stay liquid, the flash and fire points are the fire-safety numbers. In our register they range from a 157 °C flash point (ElectroCool EC-122) to 325 °C flash and 355 °C fire (NatureCool 2000). {{src:ef-electrocool-tds:2}} {{src:cargill-naturecool-2000-tds:2}} Engineered Fluids offers higher-flash grades "for an extra safety margin". {{src:ef-electrocool-tds:2}} The fluorinated fluids here state no flash point. {{src:syensqo-galden-ht:2}} {{src:chemours-2p50-pis:1}}

## 4. Screen the thermal and hydraulic numbers

- **Specific heat and thermal conductivity:** how much heat the fluid carries and how readily it conducts it. Compare like for like, at a stated temperature.
- **Viscosity:** it drives pumping power and flow through narrow channels. Engineered Fluids positions its lowest-viscosity grade, EC-122 (5.02 cSt at 40 °C), for microchannels. {{src:ef-electrocool-tds:2}}
- **Density:** tank weight and floor loading. The fluorinated fluids in our register are about twice as dense as the hydrocarbons. See [fluid types](/fluid-types/).

## 5. Screen the electrical numbers

Compare dielectric strength only at the same test method and gap. Makers in the register use a 2 mm gap (ASTM D1816), a 2.5 mm gap (IEC 60156) and a 0.1 in gap. {{src:ef-electrocool-tds:2}} {{src:chemours-2p50-pis:1}} {{src:3m-fc72-tds:2}} If signal integrity matters, ask for the dielectric constant across your frequency range.

## 6. Check materials, warranty and supply

- **Materials:** ask each maker for compatibility data on your seals, plastics, coatings and adhesives.
- **Warranty:** an operator quoted by The Register said some hardware makers will not honour warranties on equipment immersed in dielectric fluid. Confirm coverage in writing before you immerse anything. {{src:register-2025}}
- **Supply:** the same article reports one operator's view that two suppliers dominate dielectric liquid and know their pricing power, and another's that supply was not a problem for them. {{src:register-2025}} Get lead times and minimum orders from more than one source. The [desk](/desk/) can do this for you.

## By application

**Data-centre and AI immersion.** See the [data-centre guide](/applications/data-center-immersion/).

**Replacing a 3M fluid.** Use the [Novec & Fluorinert replacement finder](/novec-replacement/).

**Transformers.** The register holds Envirotemp FR3, a natural ester with flash and fire points of about 330 °C and 360 °C. {{src:cargill-fr3-tds:1}} More transformer fluids are being verified.

**EV batteries.** We do not yet hold a verified datasheet for a fluid whose maker targets EV battery immersion. We will not describe that market until we can cite it. If you are specifying one now, the six steps above still apply, and the [desk](/desk/) can source datasheets for you.
