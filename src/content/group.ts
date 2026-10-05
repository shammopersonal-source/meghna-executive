import { media, type Media } from "./media";

/** The four confluence panels that open the home page: one per trading house. */
export const confluencePanels: { house: string; label: string; partner: string; image: Media }[] = [
  {
    house: "executive-motors",
    label: "Executive Motors",
    partner: "BMW",
    image: media("17331329886L6sQ", "The illuminated kidney grille of a BMW 7 Series in a dark showroom.", {
      partner: true,
      focus: "18% 50%",
    }),
  },
  {
    house: "executive-lifestyles",
    label: "Executive Lifestyles",
    partner: "KOHLER",
    image: media("1733229778NCTMz", "A KOHLER bathroom at night with the city glowing through tall windows.", {
      partner: true,
      focus: "40% 50%",
    }),
  },
  {
    house: "executive-machines",
    label: "Executive Machines",
    partner: "Apple",
    image: media("1730192104HC7i6", "An iPhone camera plateau lit from the side against black.", {
      partner: true,
      focus: "45% 50%",
    }),
  },
  {
    house: "penthouse-livings",
    label: "Penthouse Livings",
    partner: "50+ furniture houses",
    image: media("1730192732MG7WR", "A warm-lit living room with ivory sofas and backlit shelving.", {
      focus: "55% 50%",
    }),
  },
];

export const manifesto =
  "Rivers don’t compete. They converge. Since 1965, Meghna Executive Holdings has brought BMW, Apple and KOHLER to Bangladesh, and taken Bangladeshi craft to the world. Fifteen houses. Four sectors. One current.";

export type LedgerStat = {
  value: number;
  /** How the final value is written, e.g. "680,000" or "1.5M". */
  display: string;
  label: string;
  source: string;
};

export const ledger: LedgerStat[] = [
  { value: 1965, display: "1965", label: "Founded", source: "The Group" },
  { value: 15, display: "15", label: "Houses", source: "Across four sectors" },
  { value: 680000, display: "680,000", label: "Sq ft under one roof", source: "Executive Woodworks" },
  { value: 1.5, display: "1.5M", label: "Garments a month", source: "Executive Greentex" },
  { value: 17, display: "17", label: "Global apparel buyers", source: "M&S, H&M, Primark and more" },
  { value: 5, display: "5", label: "40-ft containers shipped a day", source: "Executive Woodworks" },
];

export type Milestone = { year: number; title: string; text: string; image: Media; house?: string };

/** From the timeline on meghna-executive.com/about, plus Retail.Next (2023) from the Executive Motors page. */
export const timeline: Milestone[] = [
  {
    year: 1965,
    title: "The group is founded",
    text: "Meghna Executive Holdings begins, and grows into one of Bangladesh’s most diversified business groups.",
    image: media("1729596289Iz5If", "The group’s head-office tower lit at dusk."),
  },
  {
    year: 2002,
    title: "BMW arrives",
    text: "Executive Motors becomes the sole distributor of BMW vehicles and services in Bangladesh.",
    image: media("1737634148oXgvx", "An illuminated BMW roundel inside the showroom.", { partner: true }),
    house: "executive-motors",
  },
  {
    year: 2004,
    title: "White cement",
    text: "Siam Bangla Industries is established: one of the largest white cement plants in Bangladesh.",
    image: media("1729596208nDgeX", "Aerial view of the Siam Bangla cement plant."),
    house: "siam-bangla-industries",
  },
  {
    year: 2007,
    title: "Into garments",
    text: "Meghna Knit Composite takes the group into Bangladesh’s ready-made garment industry.",
    image: media("17295961851FX3A", "The Meghna Knit Composite factory facade."),
    house: "meghna-knit-composite",
  },
  {
    year: 2009,
    title: "Apple",
    text: "Executive Machines introduces Apple’s products to Bangladesh as authorised reseller and service provider.",
    image: media("1729596160HrdPZ", "An Executive Machines store with wooden display tables.", { partner: true }),
    house: "executive-machines",
  },
  {
    year: 2014,
    title: "A second apparel house",
    text: "Meghna Dresses launches, expanding the group’s manufacturing capability.",
    image: media("1733314441EFAAv", "A long sewing line at Meghna Dresses."),
    house: "meghna-dresses",
  },
  {
    year: 2015,
    title: "KOHLER",
    text: "Executive Lifestyles brings KOHLER, the global leader in kitchen and bath, to Bangladesh.",
    image: media("1729596112gQE1t", "The KOHLER showroom at Executive Lifestyles.", { partner: true }),
    house: "executive-lifestyles",
  },
  {
    year: 2017,
    title: "LEED Gold",
    text: "Sublime Greentex launches as a LEED Gold-certified factory.",
    image: media("17295961379VCFz", "The glass-fronted Sublime Greentex factory."),
    house: "sublime-greentex",
  },
  {
    year: 2019,
    title: "Penthouse Livings",
    text: "Michael Aram, Cornelio Cappellini, Christopher Guy and Turri arrive: Bangladesh’s first luxury lifestyle houseware.",
    image: media("1729596068UByaf", "The Penthouse Livings showroom with red velvet chairs."),
    house: "penthouse-livings",
  },
  {
    year: 2023,
    title: "BMW Retail.Next",
    text: "A customer-first BMW showroom opens at Meghna Tower, Tejgaon.",
    image: media("17376645482MKBG", "The BMW Retail.Next lounge with sculptural yellow chairs.", { partner: true }),
    house: "executive-motors",
  },
  {
    year: 2025,
    title: "To the table",
    text: "Executive Gourmet opens Slaw Bistro, the group’s entry into dining.",
    image: media("1786963381acIsT", "The Slaw Bistro dining room."),
    house: "executive-gourmet",
  },
];

export const mission =
  "To raise the standard of every industry we touch. We bring world-class products and services to Bangladesh, build long partnerships with global brands, and hold ourselves to trust, integrity and sustainability in all of it.";

export const vision =
  "To shape the future of luxury and industry in Bangladesh and beyond, and to be the most trusted name in every field we serve, for generations.";

export const groupStory = [
  "Meghna Executive Holdings began in 1965. Six decades on, it spans luxury automobiles, consumer technology, bath and kitchen, furniture and interiors, knitwear manufacturing, white cement, export furniture, precision bearings and, most recently, dining.",
  "Each house is run to its own partner’s or buyer’s standard, whether that is BMW, Apple, KOHLER, M&S or H&M, and to the group’s standard of trust.",
];

/* ------------------------------------------------------------ Sustainability */

export const sustainabilityPillars = [
  {
    n: "01",
    title: "Eco-friendly manufacturing",
    text: "Modern technology and sustainable materials that cut waste and energy use, in facilities built to the highest environmental standards.",
  },
  {
    n: "02",
    title: "Sustainable sourcing",
    text: "Raw materials and components from suppliers who share our ethical and environmental commitments, so the whole supply chain supports the planet and its people.",
  },
  {
    n: "03",
    title: "Community development",
    text: "Education, health and economic programmes with the communities around our sites, building a culture of sustainability for the next generation.",
  },
];

export const initiatives: { date: string; title: string; image: Media }[] = [
  {
    date: "2024-11-12",
    title: "Solar power in our manufacturing units",
    image: media("1730724700sLxre", "An engineer with a tablet walking between rows of solar panels."),
  },
  {
    date: "2024-11-08",
    title: "Cutting the carbon footprint of transportation",
    image: media("173072483093ZPR", "A lorry on a forest road seen from above at dusk."),
  },
  {
    date: "2024-10-10",
    title: "A green supply chain for Bangladesh",
    image: media("1730725145w67HY", "Aerial view of a factory surrounded by green fields."),
  },
  {
    date: "2024-10-04",
    title: "Local water conservation and harvesting",
    image: media("1730725506c8MxK", "Hands cupping clean water under a running tap."),
  },
  {
    date: "2024-09-12",
    title: "Zero-waste garment production",
    image: media("1730522664dKB0O", "A cotton tote printed with the recycling symbol."),
  },
];

export const certifications = [
  { name: "LEED Platinum", where: "Executive Greentex" },
  { name: "LEED Gold", where: "Sublime Greentex, Executive Intimates (Nov 2017)" },
  { name: "GOTS · OEKO-TEX · OCS", where: "Across the apparel houses" },
  { name: "FSC timber · Fair Trade USA", where: "Executive Woodworks" },
  { name: "ISO 14001", where: "Siam Bangla Industries" },
];

/* ------------------------------------------------------------ Responsibility */

export const responsibilities: { n: string; kicker: string; title: string; text: string[]; image: Media }[] = [
  {
    n: "01",
    kicker: "Since 2015",
    title: "The Marks & Start training centre",
    text: [
      "Marks & Start is Marks & Spencer’s programme in Bangladesh with the Centre for the Rehabilitation of the Paralysed (CRP). Since 2006 it has trained more than 1,200 people with physical disabilities and helped them into the garment industry.",
      "Meghna Knit Composite joined in 2015, donating two sewing machines to expand the training centre at Gonokbari, Savar.",
    ],
    image: media("1733310566ecnJt", "Machinists at their stations on the Meghna Knit Composite floor."),
  },
  {
    n: "02",
    kicker: "Inclusive hiring",
    title: "Recruiting from CRP-Bangladesh",
    text: [
      "Meghna Knit Composite recruits directly through CRP under Marks & Start. The programme also reaches people with health conditions, young parents and those at risk of homelessness.",
      "The aim is simple: work that brings dignity and independence.",
    ],
    image: media("1733815575drFvW", "A machinist in an orange headscarf at her sewing station."),
  },
  {
    n: "03",
    kicker: "2007",
    title: "Flood relief in the north",
    text: [
      "When floods swept Bangladesh in 2007, the group sent food and medical supplies to families in Paikchora, Vungmorara and Kurigram.",
    ],
    image: media("1736248207TH4jC", "Volunteers handing out food parcels to children."),
  },
];

/* ------------------------------------------------------------------- Careers */

export const careers = {
  intro:
    "Our people are how a 1965 company stays modern. We look for people who value growth, craft and responsibility, and give them room to make a real impact.",
  philosophy: [
    "Our HR philosophy is built on nurturing talent, investing in professional development and keeping an inclusive culture.",
    "We give people the tools and support to excel, and we take work-life balance, diversity and career progression seriously.",
  ],
  images: [
    media("17331315101CU2E", "An Executive Motors technician in the service bay."),
    media("1733818304igDl6", "A technician working inside a circular knitting machine."),
    media("1785142689yTxyb", "A Slaw Bistro chef serving a guest."),
    media("1733310844QUtpb", "An engineer at a control desk on the factory floor."),
  ],
  applyEmail: "info@meghna-executive.com",
};

/* --------------------------------------------------- Made in Bangladesh */

export const madeInBangladesh: Media[] = [
  media("1733815470BY8e5", "A long, bright production hall at Executive Intimates."),
  media("17338192563CqnO", "A worker guiding a timber frame through Executive Woodworks’ finishing line."),
  media("1733818304igDl6", "A technician working inside a circular knitting machine."),
  media("17851375978OmCd", "The assembly hall at Meghna Bearing Industries."),
  media("1737611666LBRco", "Hands guiding fabric under an overlock foot."),
  media("1733818981sG0hv", "Aerial view of Executive Greentex among green fields."),
];

export const riverImage = media("1729597227WvUNI", "Aerial view of a river winding through dense green forest.");
export const saplingImage = media("1729597630pQfiq", "Hands holding a sapling in soil above a green valley.");
export const contactMapImage = media("1737663666wpS2I", "Street map of Nikunja-2, Dhaka, showing the head office.");
