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
    partner: "50+ furniture brands",
    image: media("1730192732MG7WR", "A warm-lit living room with ivory sofas and backlit shelving.", {
      focus: "55% 50%",
    }),
  },
];

export type Milestone = { year: number; title: string; text: string; image: Media; house?: string };

/** From the timeline on meghna-executive.com/about, plus Retail.Next (2023) from the Executive Motors page. */
export const timeline: Milestone[] = [
  {
    year: 1965,
    title: "The group is founded",
    text: "Meghna Executive Holdings is founded, and becomes a significant force in Bangladesh’s business landscape, across diverse industries.",
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
    title: "Meghna Dresses",
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
    text: "Sublime Greentex’s factory is certified LEED Gold, awarded in November 2017.",
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
  "To elevate the standards of luxury and innovation across every industry we touch: world-class products and services, long-term relationships with global brands, and the values of trust, excellence and sustainability.";

export const vision =
  "To lead in shaping the future of luxury and innovation in Bangladesh and beyond, and to become the most trusted name in the industries we serve.";

export const groupStory = [
  "Meghna Executive Holdings was founded in 1965. With a legacy of more than 50 years, it spans luxury automobiles, consumer technology, bath and kitchen, furniture and interiors, knitwear manufacturing, white cement, export furniture, precision bearings and, most recently, dining.",
  "Each business adheres to the highest standards of craftsmanship and service, guided by a timeless legacy of trust.",
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

/** Each initiative links to its article in the journal (migrated from /media-center). */
export const initiatives: { date: string; title: string; slug: string; image: Media }[] = [
  {
    date: "2024-11-12",
    title: "Solar power implementation in manufacturing units",
    slug: "solar-power-implementation-in-manufacturing-units",
    image: media("1730724700sLxre", "An engineer with a tablet walking between rows of solar panels."),
  },
  {
    date: "2024-11-08",
    title: "Carbon footprint reduction in transportation",
    slug: "carbon-footprint-reduction-in-transportation",
    image: media("173072483093ZPR", "A lorry on a forest road seen from above at dusk."),
  },
  {
    date: "2024-10-10",
    title: "Green supply chain development in Bangladesh",
    slug: "green-supply-chain-development-in-bangladesh",
    image: media("1730725145w67HY", "Aerial view of a factory surrounded by green fields."),
  },
  {
    date: "2024-10-04",
    title: "Local water conservation and harvesting project",
    slug: "local-water-conservation-and-harvesting-project",
    image: media("1730725506c8MxK", "Hands cupping clean water under a running tap."),
  },
  {
    date: "2024-09-12",
    title: "Zero-waste garment production initiative",
    slug: "zero-waste-garment-production-initiative",
    image: media("1730522664dKB0O", "A cotton tote printed with the recycling symbol."),
  },
];

export const certifications = [
  { name: "LEED Platinum", where: "Executive Greentex" },
  { name: "LEED Gold", where: "Sublime Greentex, Executive Intimates (Nov 2017)" },
  { name: "GOTS · OEKO-TEX · OCS", where: "Meghna Knit Composite, Executive Intimates, Executive Hi Fashions, Sublime Greentex, Executive Greentex" },
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
      "Marks & Start is Marks & Spencer’s programme in Bangladesh with the Centre for the Rehabilitation of the Paralysed (CRP). Since its inception in 2006, the programme has trained and integrated over 1,200 individuals into the workforce.",
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
    title: "Flood relief, 2007",
    text: [
      "When floods swept Bangladesh in 2007, the group sent food and medical supplies to families in Paikchora, Vungmorara and Kurigram.",
    ],
    image: media("1736248207TH4jC", "Volunteers handing out food parcels to children."),
  },
];

/* ------------------------------------------------------------------- Careers */

export const careers = {
  intro:
    "Join a team that values growth, innovation and excellence. We are committed to empowering talent and fostering a collaborative environment where you can thrive and make a real impact.",
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

/* ===================================================================== Monograph (home) */

export const homeChapters = [
  { id: "origins", numeral: "I", title: "Our story" },
  { id: "houses", numeral: "II", title: "Our companies" },
  { id: "made", numeral: "III", title: "Made in Bangladesh" },
  { id: "correspondence", numeral: "IV", title: "News" },
] as const;

export const openingStatement =
  "Founded in 1965, the group has grown into fifteen companies: the exclusive distributor of BMW and KOHLER in Bangladesh, an authorised Apple reseller, a maker of knitwear for global buyers such as M&S and H&M, and a leading producer of white cement.";

export const chapterLines: Record<string, string> = {
  origins: "Founded in 1965, built one company at a time.",
  houses: "Fifteen companies across trading, apparel, industry and service.",
  made: "Knit, dyed, cut and sewn in Gazipur for global buyers.",
  correspondence: "News from our companies.",
};

/** Calm figures: set, not counted. All from the live site. */
export const figures: { value: string; label: string; note: string }[] = [
  { value: "1965", label: "Founded", note: "More than 50 years of excellence" },
  { value: "15", label: "Companies", note: "Across four sectors" },
  { value: "2002", label: "BMW in Bangladesh", note: "Executive Motors" },
  { value: "680,000", label: "Square feet", note: "Executive Woodworks, Gazipur" },
];

export type Plate = {
  slug: string;
  name: string;
  meta: string;
  line: string;
  href: string;
  image: Media;
};

/** Chapter II plates: the four trading houses, then one plate per remaining sector. */
export const housePlates: Plate[] = [
  {
    slug: "executive-motors",
    name: "Executive Motors",
    meta: "Trading · BMW · Since 2002",
    line: "The exclusive home of BMW in Bangladesh, and since 2023 the BMW Retail.Next showroom at Meghna Tower.",
    href: "/houses/executive-motors",
    image: media("17331329886L6sQ", "The illuminated kidney grille of a BMW 7 Series in a dark showroom.", {
      partner: true,
      focus: "30% 50%",
    }),
  },
  {
    slug: "executive-lifestyles",
    name: "Executive Lifestyles",
    meta: "Trading · KOHLER",
    line: "The authorised KOHLER distributor in Bangladesh, in Banani, Uttara and Hatirpool.",
    href: "/houses/executive-lifestyles",
    image: media("1733229778NCTMz", "A KOHLER bathroom at night, the city glowing through tall windows.", {
      partner: true,
    }),
  },
  {
    slug: "executive-machines",
    name: "Executive Machines",
    meta: "Trading · Apple · Since 2009",
    line: "Apple in Bangladesh, sold and serviced as an authorised reseller and service provider.",
    href: "/houses/executive-machines",
    image: media("1730192104HC7i6", "The camera plateau of an iPhone, lit from the side against black.", {
      partner: true,
    }),
  },
  {
    slug: "penthouse-livings",
    name: "Penthouse Livings",
    meta: "Trading · Since 2019",
    line: "Bangladesh’s first luxury lifestyle houseware, with over 50 world-famous furniture brands.",
    href: "/houses/penthouse-livings",
    image: media("1730192732MG7WR", "A warm-lit living room with ivory sofas and backlit shelving."),
  },
  {
    slug: "apparel",
    name: "Six apparel companies",
    meta: "Apparel · Gazipur",
    line: "Knitwear made for M&S, H&M, Primark, Tesco and Lidl, in factories certified LEED Gold and Platinum.",
    href: "/houses#apparel",
    image: media("17333062260s6Fl", "Aerial view of the Meghna Knit Composite factory with its striped facade."),
  },
  {
    slug: "industrial",
    name: "Industry",
    meta: "Industrial · Since 1997",
    line: "White Elephant and White Tiger white cement, export furniture for the USA, and precision bearings.",
    href: "/houses#industrial",
    image: media(
      "17338192563CqnO",
      "A craftsman guiding a timber frame through the finishing line at Executive Woodworks.",
    ),
  },
  {
    slug: "executive-gourmet",
    name: "Slaw Bistro",
    meta: "Service · Executive Gourmet · Since 2025",
    line: "The group’s first table: a contemporary bistro at Meghna Tower Forum.",
    href: "/houses/executive-gourmet",
    image: media("1785140168rqczE", "The Slaw Bistro dining room with a planted wall and warm timber chairs."),
  },
];
