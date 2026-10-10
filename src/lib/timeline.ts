// The PFAS clock for dielectric fluids. Every entry carries the source it was checked against.
export type Event = { when: string; title: string; text: string; src: string; future?: boolean };

export const TIMELINE: Event[] = [
  {
    when: "20 Dec 2022",
    title: "3M announces its exit from PFAS manufacturing",
    text: "3M says it will discontinue manufacturing all fluoropolymers, fluorinated fluids and PFAS-based additive products, and exit all PFAS manufacturing by the end of 2025.",
    src: "3m-exit-release",
  },
  {
    when: "20 Dec 2022",
    title: "Novec and Fluorinert named in the impacted-product list",
    text: "3M's customer letter lists Novec 649, 7000, 7100, 7200, 7300, 7500 and 7700, Fluorinert FC-40, FC-43, FC-72, FC-770 and FC-3283, and other grades.",
    src: "3m-exit-letter",
  },
  {
    when: "Jan–Feb 2023",
    title: "EU universal PFAS restriction proposed",
    text: "Denmark, Germany, the Netherlands, Norway and Sweden submit a proposal to restrict PFAS under REACH. ECHA publishes it on 7 February 2023, and a six-month consultation starts on 22 March 2023.",
    src: "kh-2023-proposal",
  },
  {
    when: "Q3 2025",
    title: "3M: \"progressing toward the exit\"",
    text: "3M's 10-Q for the quarter to 30 September 2025 says it is progressing toward the exit of all PFAS manufacturing by the end of 2025.",
    src: "3m-10q-q3-2025",
  },
  {
    when: "End 2025",
    title: "3M's manufacturing exit date",
    text: "The date 3M set for ending all PFAS manufacturing. Buyers still running Novec or Fluorinert need a qualified replacement.",
    src: "3m-exit-release",
  },
  {
    when: "Mar 2026",
    title: "ECHA's risk committee adopts its opinion",
    text: "RAC adopts its opinion on the universal restriction. SEAC's draft opinion follows and is put to a 60-day consultation.",
    src: "lexis-rac-2026",
  },
  {
    when: "By end 2026",
    title: "SEAC final opinion expected",
    text: "Once both committees have adopted their opinions, ECHA sends them to the European Commission.",
    src: "lexis-rac-2026",
    future: true,
  },
  {
    when: "Next",
    title: "Commission draft and REACH Committee vote",
    text: "The Commission prepares a draft restriction for discussion and a vote in the REACH Committee. No final scope, exemptions or dates exist until then.",
    src: "lexis-rac-2026",
    future: true,
  },
];
