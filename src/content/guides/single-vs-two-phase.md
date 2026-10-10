---
title: "Single-phase vs two-phase immersion cooling: how they differ and which fluids fit"
h1: "Single-phase or two-phase immersion cooling?"
description: "How single-phase and two-phase immersion cooling work, what each asks of the fluid, and why the choice decides whether you can use a PFAS-free fluid. With datasheet numbers."
path: single-vs-two-phase
eyebrow: "Single vs two-phase"
answer: "In single-phase immersion the fluid stays liquid and is pumped to a heat exchanger. In two-phase immersion it boils on the hot components and condenses on a coil above the bath. That choice decides your fluid: every two-phase-capable fluid in our register is fluorinated, and every PFAS-free fluid in it is a single-phase coolant."
order: 3
updated: 2026-10-11
related: [fluid-types, choose, applications/data-center-immersion]
---

## How each one moves heat

**Single-phase.** The liquid warms as it flows past the components. A pump carries it to a heat exchanger and back. How much heat it removes depends on flow rate, the allowed temperature rise, and the fluid's specific heat and thermal conductivity. Engineered Fluids says its ElectroCool coolants have extremely low vapour pressure and suit open or closed loops without evaporation or off-gassing. {{src:ef-electrocool-tds:1}}

**Two-phase.** The liquid boils where the components are hottest. Vapour rises, condenses on a cooled coil, and drips back. Chemours describes this for Opteon 2P50: the system is closed, and the vapour is condensed and returned to the bath. {{src:chemours-2p50-page}}

## Why boiling is powerful

Turning liquid into vapour absorbs latent heat at an almost constant temperature. 3M lists 88 J/g as FC-72's heat of vaporisation at its boiling point, against a liquid specific heat of 1.1 J/g·K. {{src:3m-fc72-tds:1}} So boiling one gram absorbs about as much heat as warming the liquid by 80 °C. For Opteon 2P50, Chemours lists 115 kJ/kg and 1.09 kJ/kg·K: about 105 °C of equivalent warming. {{src:chemours-2p50-pis:1}} (Our arithmetic on the makers' values.)

The trade-off is that the fluid must boil in the right place. Its boiling point sets the temperature the components run at, so two-phase fluids are chosen by boiling point first.

## Side by side

| | Single-phase | Two-phase |
|---|---|---|
| Fluid state | Stays liquid | Boils, condenses, returns |
| What sets component temperature | Flow rate and allowed temperature rise | The fluid's boiling point |
| Key fluid numbers | Specific heat, thermal conductivity, viscosity, flash point | Boiling point, latent heat, vapour pressure, dielectric strength |
| Tank | Open or closed loop; low-vapour-pressure fluids do not evaporate {{src:ef-electrocool-tds:1}} | Closed; vapour has to be condensed and contained {{src:chemours-2p50-page}} |
| Fire | Fluids have flash points: 157 °C to about 330 °C in our register | Fluorinated fluids here state no flash point, or are described as non-flammable |
| Fluids in our register | Synthetic hydrocarbons and esters | Perfluoropolyethers, perfluorocarbons, hydrofluoroethers and one hydrofluoroolefin |
| PFAS | All PFAS-free or non-fluorinated | Mostly PFAS; one undetermined |

Flash and boiling points: ElectroCool {{src:ef-electrocool-tds:2}}, Envirotemp FR3 {{src:cargill-fr3-tds:1}}, Galden {{src:syensqo-galden-ht:2}}, Opteon 2P50 {{src:chemours-2p50-pis:1}}.

## The fluid question decides the architecture

The two-phase fluids that were most widely used came from 3M. Novec and Fluorinert are on the impacted-product list of 3M's exit from PFAS manufacturing by the end of 2025. {{src:3m-exit-letter:2}} {{src:3m-exit-release}} The close-boiling alternatives in our register are themselves fluorinated. The perfluoropolyethers meet the OECD structural definition of PFAS, and the one hydrofluoroolefin has an undisclosed structure. See the [PFAS tracker](/pfas/).

Two consequences follow:

- **Committing to two-phase today** means securing a fluid that is available and acceptable under your regulatory exposure for the life of the system. Ask makers for their PFAS position in writing.
- **Choosing single-phase** opens the PFAS-free fluids. Engineered Fluids, for example, states "No PFAS" for ElectroCool. {{src:ef-electrocool-tds:1}}

## Can you switch later?

Rarely without redesign. A two-phase tank is built around vapour containment and a condenser. A single-phase system is built around pumps and heat exchangers. Treat the phase choice as an architectural decision, made before you pick a fluid.

## Next steps

- Replacing a 3M two-phase fluid: the [Novec & Fluorinert replacement finder](/novec-replacement/).
- Comparing candidate fluids: the [register](/fluids/), with every value cited.
- Need supply or quotes: [ask the desk](/desk/).
