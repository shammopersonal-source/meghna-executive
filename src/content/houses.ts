import { media, type Media, type Video, videos } from "./media";

/**
 * The fifteen houses of Meghna Executive Holdings.
 * Every fact below is taken from the house's own page on meghna-executive.com
 * (crawled Oct 2026). Copy is tightened; no figures are invented.
 * Where the live site contradicts itself, the house page wins here and the
 * conflict is listed in CLIENT_QUESTIONS.md.
 */

export type Sector = "trading" | "apparel" | "industrial" | "service";

export const sectors: { id: Sector; label: string; line: string }[] = [
  { id: "trading", label: "Trading", line: "Exclusive partners to global marques." },
  { id: "apparel", label: "Apparel", line: "Knitwear made in Gazipur, worn across Europe." },
  { id: "industrial", label: "Industrial", line: "White cement, furniture and bearings." },
  { id: "service", label: "Service", line: "Hospitality, the newest current." },
];

export type Material = "graphite" | "aluminium" | "porcelain" | "walnut" | "cotton" | "limestone" | "olive";

export type Stat = { value: string; label: string };
export type Fact = { term: string; detail: string };
export type Offering = {
  name: string;
  tag?: string;
  note?: string;
  href?: string;
  image?: Media;
};
export type Location = {
  label: string;
  address: string;
  phone?: string;
  email?: string;
  mapUrl?: string;
};

export type House = {
  slug: string;
  legacySlug: string;
  name: string;
  /** Name split for the headline treatment; `italic` is the single PP Migra word. */
  title: { before?: string; italic: string; after?: string };
  sector: Sector;
  founded?: number;
  partner?: string;
  material: Material;
  positioning: string;
  intro: string[];
  stats: Stat[];
  facts?: Fact[];
  capacities?: Stat[];
  offeringsTitle?: string;
  offerings?: Offering[];
  hero: Media;
  card: Media;
  gallery: Media[];
  video?: Video;
  locations: Location[];
  website?: { href: string; label: string };
  documents?: { href: string; label: string }[];
  /** Shown in place of copy the client still has to supply. */
  placeholder?: string;
};

const P = { partner: true } as const;

export const houses: House[] = [
  /* ------------------------------------------------------------------ TRADING */
  {
    slug: "executive-motors",
    legacySlug: "executive-motors-ltd",
    name: "Executive Motors Ltd.",
    title: { before: "Executive", italic: "Motors" },
    sector: "trading",
    founded: 2002,
    partner: "BMW",
    material: "graphite",
    positioning: "The exclusive home of BMW in Bangladesh since 2002.",
    intro: [
      "Executive Motors has been Bangladesh’s exclusive BMW importer since 2002: sales, service and the full BMW ownership experience under one roof.",
      "In 2023 it opened the BMW Retail.Next showroom at Meghna Tower, Tejgaon. It has dedicated delivery bays, configuration technology and furniture designed for the space.",
    ],
    stats: [
      { value: "2002", label: "Exclusive BMW importer since" },
      { value: "2023", label: "BMW Retail.Next showroom opens, Tejgaon" },
      { value: "8", label: "Models in the current line-up" },
    ],
    offeringsTitle: "The line-up",
    offerings: [
      {
        name: "BMW 3 Series Sedan",
        tag: "Plug-in Hybrid",
        href: "https://www.bmw.com.bd/models/bmw-3-series-sedan-overview/",
        image: media("1733137510F6FTP", "BMW 3 Series Sedan, front view, under a concrete canopy.", P),
      },
      {
        name: "BMW i5",
        tag: "Full-Electric",
        href: "https://www.bmw.com.bd/models/bmw-i5/",
        image: media("1737635962USJWM", "BMW i5 in blue, parked on a stone quay by the sea.", P),
      },
      {
        name: "BMW 7 Series Sedan",
        tag: "Petrol",
        href: "https://www.bmw.com.bd/models/bmw-7-series-sedan-highlights/",
        image: media("173313865615vSO", "BMW 7 Series Sedan, side profile.", P),
      },
      {
        name: "BMW i7",
        tag: "Full-Electric",
        href: "https://www.bmw.com.bd/models/the-new-i7",
        image: media("1737636756N1yHm", "BMW i7 in silver, three-quarter front view.", P),
      },
      {
        name: "BMW X1",
        tag: "Petrol",
        href: "https://www.bmw.com.bd/models/the-new-x1/",
        image: media("1737637221VtbM1", "BMW X1 in copper orange.", P),
      },
      {
        name: "BMW iX3",
        tag: "Full-Electric",
        href: "https://www.bmw.com.bd/models/bmw-ix3-highlights/",
        image: media("1737636411ONnAn", "BMW iX3 on a mountain road.", P),
      },
      {
        name: "BMW XM",
        tag: "Plug-in Hybrid",
        href: "https://www.bmw.com.bd/models/bmw-xm-overview/",
        image: media("1737636335gGQRj", "BMW XM, front three-quarter view.", P),
      },
      {
        name: "BMW i5 M60 xDrive",
        tag: "Full-Electric",
        href: "https://www.bmw.com.bd/models/i5-m60/",
        image: media("1737636210PROur", "BMW i5 M60 xDrive in red on a coastal road.", P),
      },
    ],
    hero: media("17331329886L6sQ", "The illuminated kidney grille of a BMW 7 Series in a dark showroom.", {
      ...P,
      focus: "22% 50%",
    }),
    card: media("1733136390tEtHV", "A BMW i7 parked on a curved stone plaza beside a modern pavilion.", P),
    gallery: [
      media("1733131433gfHur", "A BMW SUV on the floor of the Retail.Next showroom.", P),
      media("17331314830Sv8T", "The customer lounge at BMW Retail.Next with sculptural yellow armchairs.", P),
      media("1733986324rGmtY", "The cockpit of a BMW, seen from the driver’s seat.", P),
      media("1733131530b0Zel", "Detail of the rear light and i7 badge on a BMW.", P),
      media("17331315101CU2E", "An Executive Motors technician at work in the service bay.", P),
      media("1733131461mjQHS", "A BMW body on the assembly line, surrounded by robotics.", P),
    ],
    video: videos["executive-motors"],
    locations: [
      {
        label: "BMW Retail.Next, Meghna Tower",
        address: "187-188 B, Forum Meghna Tower, Bir Uttam Mir Shawkat Sarak, Tejgaon-Gulshan Link Road, Dhaka",
        phone: "16765",
        email: "info@bmw.com.bd",
        mapUrl: "https://maps.app.goo.gl/xsGHqEbfsC2ZHdVo8",
      },
    ],
    website: { href: "https://www.bmw.com.bd/", label: "bmw.com.bd" },
  },
  {
    slug: "executive-machines",
    legacySlug: "executive-machines-ltd",
    name: "Executive Machines Ltd.",
    title: { before: "Executive", italic: "Machines" },
    sector: "trading",
    founded: 2009,
    partner: "Apple",
    material: "aluminium",
    positioning: "Apple in Bangladesh, sold and serviced since 2009.",
    intro: [
      "Executive Machines brought Apple’s products to Bangladesh in 2009. It is one of the country’s longest-standing authorised resellers, and an authorised service provider.",
      "Individuals and businesses get genuine products, expert repairs and after-sales care across three showrooms in Dhaka.",
    ],
    stats: [
      { value: "2009", label: "Apple partner since" },
      { value: "3", label: "Showrooms in Dhaka" },
      { value: "Sales + Service", label: "Authorised reseller and service provider" },
    ],
    offeringsTitle: "Now in store",
    offerings: [
      {
        name: "iPhone 16",
        note: "Hello, Apple Intelligence.",
        href: "https://executivemachines.com/iphone-price-in-bangladesh/",
        image: media("17301901370lbsx", "iPhone 16 in ultramarine, side view.", P),
      },
      {
        name: "Apple Watch Series 10",
        note: "Designed for a healthier life.",
        href: "https://executivemachines.com/watch/",
        image: media("1730190203fkoM3", "Apple Watch Series 10 with a large-numeral watch face.", P),
      },
      {
        name: "iPad Pro",
        note: "Its most powerful chip yet.",
        href: "https://executivemachines.com/ipad/",
        image: media("1730191602kBiNb", "iPad Pro showing a colourful drawing of a sunflower.", P),
      },
    ],
    hero: media("1730192104HC7i6", "The camera plateau of an iPhone, lit from the side against black.", P),
    card: media("1733302366tYWZ5", "Two iPhones against a black background.", P),
    gallery: [
      media("1733301788FlLls", "The Executive Machines showroom with wooden display tables.", P),
      media("1733986529P61KE", "A MacBook Air opening, seen from above.", P),
      media("1733302062tweMA", "A man reading his iPhone in a softly lit space.", P),
      media("1733301762lvvXG", "A woman in profile wearing AirPods, a blue ring of light around her ear.", P),
      media("1733302398IE1aT", "A glowing Apple logo outline against black.", P),
    ],
    video: videos["executive-machines"],
    locations: [
      {
        label: "Gulshan",
        address: "Ground Floor, Concord Bilkis Tower (40/6), North Avenue, Gulshan-2, Dhaka 1212",
        phone: "01977727753",
        mapUrl: "https://maps.app.goo.gl/KFRddMFgmk6Z5Q1W8",
      },
      {
        label: "IDB",
        address: "SGR 32, Ground Floor, BCS Computer City, E-8/A Begum Rokeya Sarani, Dhaka 1207",
        phone: "01977727753",
        mapUrl: "https://maps.app.goo.gl/zUez9M7gFVUMsNqj9",
      },
      { label: "Uttara", address: "Shop A-07-09, Ground Floor, Centrepoint, Uttara, Dhaka 1230", phone: "01973827753" },
    ],
    website: { href: "https://executivemachines.com/", label: "executivemachines.com" },
  },
  {
    slug: "executive-lifestyles",
    legacySlug: "executive-lifestyles-ltd",
    name: "Executive Lifestyles Ltd.",
    title: { before: "Executive", italic: "Lifestyles" },
    sector: "trading",
    founded: 2015,
    partner: "KOHLER",
    material: "porcelain",
    positioning: "KOHLER’s exclusive home in Bangladesh since 2015.",
    intro: [
      "Executive Lifestyles is the sole importer of KOHLER, the ultra-luxury bath and kitchen brand: faucets, showering, bathtubs and intelligent toilets.",
      "Every project starts with a one-to-one design consultation, and you can see the products in person at three showrooms across Dhaka.",
    ],
    stats: [
      { value: "2015", label: "Exclusive KOHLER importer since" },
      { value: "3", label: "Showrooms: Banani, Uttara, Hatirpool" },
      { value: "1:1", label: "Design consultation on every project" },
    ],
    offeringsTitle: "Bath and kitchen",
    offerings: [
      {
        name: "Faucets",
        image: media("1733228274rZ3wy", "Brushed-gold KOHLER faucets over vessel basins in the showroom.", P),
      },
      {
        name: "Showering",
        image: media("1733228274S2zuF", "A freestanding bath and rain shower beside louvred windows.", P),
      },
      {
        name: "Bathtubs",
        image: media("1733228606kOskA", "A dark bathroom with a freestanding tub and pendant lights.", P),
      },
      {
        name: "Intelligent toilets",
        image: media("1733228274alkfx", "A wall-hung KOHLER intelligent toilet against dark timber.", P),
      },
    ],
    hero: media("1733229778NCTMz", "A KOHLER bathroom at night, the city skyline glowing through tall windows.", P),
    card: media("1733225262fRl8Y", "The Executive Lifestyles showroom reception under ‘The Bold Look of KOHLER’.", P),
    gallery: [
      media("1733228274mZ7O6", "An iridescent KOHLER vessel basin beside candles.", P),
      media("1733986425PGQkM", "A round lit mirror over a timber vanity and brass tap.", P),
      media("1730176893gSFoW", "A claw-foot bath in aubergine beside a window.", P),
      media("1730176884T7aNT", "A backlit round mirror over a basin in a warm timber bathroom.", P),
    ],
    video: videos["executive-lifestyles"],
    locations: [
      {
        label: "Banani (office)",
        address: "Tanim Square, 158/E Kamal Ataturk Avenue, Banani, Dhaka 1213",
        phone: "+880 1709 674474",
        email: "banani@ell.executivebd.com",
        mapUrl: "https://maps.app.goo.gl/LDRkg8rHtkzoSkJT9",
      },
      {
        label: "Uttara",
        address: "Shoptoborna (2nd Floor), Plot 11, Sector 12, Sonargaon Janapath, Uttara, Dhaka 1230",
        phone: "+880 1709 674481",
        email: "uttara@ell.executivebd.com",
        mapUrl: "https://maps.app.goo.gl/LjCdYMoM6Y8Rtw7U9",
      },
      {
        label: "Hatirpool",
        address: "Navana Zohura Square (3rd Floor), 28 Kazi Nazrul Islam Avenue, Dhaka 1000",
        phone: "+880 1709 674475",
        email: "hatirpool@ell.executivebd.com",
        mapUrl: "https://maps.app.goo.gl/X7EdxYbu9g6Fkc3SA",
      },
    ],
    website: { href: "https://bdkohlercampaign.com/", label: "KOHLER Bangladesh" },
  },
  {
    slug: "penthouse-livings",
    legacySlug: "penthouse-livings-limited",
    name: "Penthouse Livings Ltd.",
    title: { before: "Penthouse", italic: "Livings" },
    sector: "trading",
    founded: 2019,
    material: "walnut",
    positioning: "Bangladesh’s first luxury lifestyle houseware.",
    intro: [
      "Penthouse Livings brings international furniture and home accessories from Italy, the USA and Germany to Bangladesh.",
      "The Banani flagship covers more than 20,000 square feet. Bespoke design services and large-project solutions sit alongside the collection.",
    ],
    stats: [
      { value: "2019", label: "Established" },
      { value: "50+", label: "International furniture brands" },
      { value: "20,000", label: "Sq ft flagship, Kamal Ataturk Avenue" },
    ],
    offeringsTitle: "The houses we carry",
    offerings: [
      { name: "Poliform" },
      { name: "Boca do Lobo" },
      { name: "Calia Italia" },
      { name: "Cornelio Cappellini" },
      { name: "Eichholtz" },
      { name: "Michael Aram" },
      { name: "Christopher Guy" },
      { name: "Turri" },
    ],
    hero: media("1730192732MG7WR", "A warm-lit living room with ivory sofas, dark coffee tables and backlit shelving."),
    card: media("1730192157Ap81V", "A double-height living room with a chandelier and charcoal sofas."),
    gallery: [
      media("1730192575F4vZd", "A long living room with a sectional sofa, round brass table and walnut panelling."),
      media("1733987197TQXo2", "A tan leather sofa and low dark table in a stone-clad room."),
      media("1730192339uH6uy", "A sculptural pendant light over a living room with tall windows."),
      media("1730192389yyhy4", "A dark entrance hall with a walnut door and bronze wall art."),
    ],
    video: videos["penthouse-livings"],
    locations: [
      {
        label: "Banani flagship",
        address: "Suvastu Suraiya Trade Center, Plot 57, Block B, Kamal Ataturk Avenue, Banani, Dhaka 1213",
        phone: "01313404804",
        email: "info@penthouselivings.com",
        mapUrl: "https://maps.app.goo.gl/LYSpEN62w6hHqvEcA",
      },
    ],
    website: { href: "https://www.penthouselivings.com/", label: "penthouselivings.com" },
  },
  {
    slug: "penthouse-interior",
    legacySlug: "penthouse-interior",
    name: "Penthouse Interior",
    title: { before: "Penthouse", italic: "Interior" },
    sector: "trading",
    material: "walnut",
    positioning: "Do everything once, do it right.",
    intro: [
      "Penthouse Interior designs and builds residential, office and commercial interiors. The team includes designers from Dubai and international consultants.",
      "Through its partnership with Penthouse Livings and its own eco-friendly city-centre factory, it delivers custom interiors from first sketch to final finish.",
    ],
    stats: [
      { value: "50+", label: "Furniture brands via Penthouse Livings" },
      { value: "Dubai", label: "Designers and international consultants" },
      { value: "1", label: "City-centre factory for custom work" },
    ],
    offeringsTitle: "Service portfolio",
    offerings: [
      { name: "Interior design & visualisation", note: "Immersive concepts before anything is built." },
      { name: "Project management", note: "One team from brief to handover." },
      { name: "Execution & joinery", note: "Artisans combining traditional craft with modern technique." },
    ],
    hero: media("1730288481cB36U", "A calm stone-coloured room with a single armchair and a potted olive tree.", {
      focus: "70% 50%",
    }),
    card: media("1730289238RMRZC", "A double-height living room with a stone wall and sculptural pendant."),
    gallery: [
      media("17339871478GVEN", "A hand finishing the edge of a timber panel."),
      media("173029014319Lzy", "A bedroom with a padded headboard and a branch chandelier."),
      media("17302901832vIuf", "A living room with dark velvet sofas facing the sea."),
      media("1730290199iKLRU", "A copper bowl on a ledge against a terracotta wall."),
    ],
    locations: [
      {
        label: "Showroom",
        address: "Suvastu Suraiya Trade Center, Plot 57, Block B, Kamal Ataturk Avenue, Banani, Dhaka 1213",
        phone: "01313798340",
      },
    ],
    website: { href: "https://www.penthouselivings.com/design-interior", label: "Penthouse Interior" },
  },

  /* ------------------------------------------------------------------ APPAREL */
  {
    slug: "meghna-knit-composite",
    legacySlug: "meghna-knit-composite-ltd",
    name: "Meghna Knit Composite Ltd.",
    title: { before: "Meghna Knit", italic: "Composite" },
    sector: "apparel",
    founded: 2005,
    material: "cotton",
    positioning: "Vertically integrated knitwear, from yarn to finished garment.",
    intro: [
      "Meghna Knit Composite knits, dyes, cuts, prints, embroiders and stitches under one roof, with advanced equipment and a highly skilled workforce.",
      "It makes for M&S, H&M, Tesco and other global buyers, certified to ACCORD, GOTS and OEKO-TEX.",
    ],
    stats: [
      { value: "40", label: "Tons knitted per day" },
      { value: "90,000", label: "Pieces sewn per day" },
      { value: "6", label: "Processes under one roof" },
    ],
    facts: [
      { term: "Facilities", detail: "Knitting, dyeing, cutting, printing, embroidery, stitching" },
      {
        term: "Product lines",
        detail:
          "All circular knits: tees, polos, vests, Henleys, sweats, hoodies, joggers, ladies’ dresses, nightwear, kids’ wear, lightweight wovens, leggings. Jersey, rib, terry, fleece, interlock and piqué, with or without elastane.",
      },
      { term: "Buyers", detail: "M&S, H&M, Varner, Tesco, Matalan, Stanley & Stella, P&C" },
      { term: "Certificates", detail: "ACCORD, GOTS, OCS, OEKO-TEX, RCS, WRAP, Better Work, BSCI, SEDEX, Fair Trade" },
    ],
    capacities: [
      { value: "40 t/day", label: "Knitting" },
      { value: "35 t/day", label: "Dyeing" },
      { value: "45 t/day", label: "Fabric finishing" },
      { value: "90,000 pcs/day", label: "Sewing" },
      { value: "250 units/day", label: "Sampling" },
    ],
    hero: media("17333062260s6Fl", "Aerial view of the Meghna Knit Composite factory with its striped facade."),
    card: media("1733310844QUtpb", "A technician at a digital control desk on the factory floor."),
    gallery: [
      media("1733310566ecnJt", "Rows of sewing stations on the Meghna Knit Composite floor."),
      media("1733310622Pv0qL", "A gloved hand loading dye cones into a dyeing vessel."),
      media("17339870742shc6", "A quality inspector checking fabric on a light table."),
      media("1737545398kflCe", "A pale-blue dress being measured on a mannequin."),
      media("1733310883c4qsC", "Aerial view of the factory’s effluent treatment ponds."),
    ],
    locations: [
      {
        label: "Factory",
        address: "40 km north of Dhaka Airport, Gilarchala, Sreepur, Gazipur",
        phone: "16765",
        email: "info@meghna-executive.com",
        mapUrl: "https://maps.app.goo.gl/wF6JDGjdBVEoeLHv6",
      },
    ],
    documents: [
      { href: "https://cms.meghna-executive.com/admin/uploads/17890236638Ov2t.pdf", label: "ESG report (PDF)" },
    ],
  },
  {
    slug: "meghna-dresses",
    legacySlug: "meghna-dresses-ltd",
    name: "Meghna Dresses Ltd.",
    title: { before: "Meghna", italic: "Dresses" },
    sector: "apparel",
    founded: 2014,
    material: "cotton",
    positioning: "Circular knits for H&M and Next.",
    intro: [
      "Meghna Dresses cuts, prints and stitches circular knits (tees, joggers and kids’ wear) for H&M and Next.",
      "Production follows ACCORD and SEDEX standards for labour, safety and environmental practice.",
    ],
    stats: [
      { value: "0.5M", label: "Pieces per month" },
      { value: "4.5M", label: "Production minutes per month" },
      { value: "52", label: "Machines across 10 sewing lines" },
    ],
    facts: [
      { term: "Facilities", detail: "Cutting, printing, stitching" },
      { term: "Product lines", detail: "Circular knits: tees, vests, Henleys, sweats, joggers, kids’ wear" },
      { term: "Buyers", detail: "H&M, Next" },
      { term: "Certificates", detail: "ACCORD, SEDEX" },
    ],
    hero: media("1733314137mbqfz", "Garments on mannequins and rails in the Meghna Dresses sample room."),
    card: media("1733314441EFAAv", "A long sewing line with a yellow walkway down the centre."),
    gallery: [
      media("1733314633zgHZE", "A cutter in a chain-mail glove guiding fabric through a cutting machine."),
      media("1733987287iAq71", "A machinist at work among rows of sewing stations."),
    ],
    locations: [
      { label: "Factory", address: "Kewa, Sreepur, Gazipur", phone: "16765", email: "info@meghna-executive.com" },
    ],
  },
  {
    slug: "executive-intimates",
    legacySlug: "executive-intimates",
    name: "Executive Intimates Ltd.",
    title: { before: "Executive", italic: "Intimates" },
    sector: "apparel",
    founded: 2015,
    material: "cotton",
    positioning: "Intimate apparel, made in a LEED Gold factory.",
    intro: [
      "Executive Intimates makes bras, briefs, maternity wear and soft basics for M&S, Primark, Lidl and Perry Ellis.",
      "Its facility was certified LEED Gold in November 2017, with energy-efficient systems throughout.",
    ],
    stats: [
      { value: "2.2M", label: "Pieces per month" },
      { value: "613", label: "Sewing machines" },
      { value: "LEED Gold", label: "Certified November 2017" },
    ],
    facts: [
      { term: "Facilities", detail: "Cutting, stitching" },
      {
        term: "Product lines",
        detail:
          "Soft, foam-cup, maternity and nursing bras; briefs, bikinis, thongs, camis, trunks, hipsters, boxers, slips; plus tees, polos, sweats, leggings and nightwear",
      },
      { term: "Buyers", detail: "M&S, Gina Tricot, Celio, Primark, Lidl, Nayomi, Perry Ellis, La Halle" },
      { term: "Certificates", detail: "ACCORD, GOTS, OCS, SEDEX, OEKO-TEX, BSCI, Better Work" },
    ],
    hero: media("1733815470BY8e5", "A long, bright production hall with machinists on both sides of the aisle."),
    card: media("1733815575drFvW", "A machinist in an orange headscarf sewing at her station."),
    gallery: [
      media("1733815741NijId", "Close-up of an overlock machine stitching blush fabric."),
      media("1733987899o35Bg", "A machinist in a pink headscarf working on a garment."),
    ],
    locations: [
      {
        label: "Factory",
        address: "Gilarchala Road, Sreepur, Gazipur",
        phone: "16765",
        email: "info@meghna-executive.com",
      },
    ],
  },
  {
    slug: "executive-hi-fashions",
    legacySlug: "executive-hi-fashions",
    name: "Executive Hi Fashions Ltd.",
    title: { before: "Executive Hi", italic: "Fashions" },
    sector: "apparel",
    founded: 2016,
    material: "cotton",
    positioning: "Circular knits, cut by Gerber and Lectra.",
    intro: [
      "Executive Hi Fashions knits, cuts and stitches tees, hoodies, joggers and ladies’ wear for M&S, P&C, Tesco, Mayoral and Matalan.",
      "Gerber CAD and Lectra auto-cutters keep fabric use to a minimum.",
    ],
    stats: [
      { value: "0.8M", label: "Pieces per month" },
      { value: "18", label: "Knitting machines" },
      { value: "21", label: "Sewing lines" },
    ],
    facts: [
      { term: "Facilities", detail: "Knitting, cutting, stitching" },
      {
        term: "Product lines",
        detail:
          "Tees, polos, Henleys, sweats, hoodies, joggers, ladies’ dresses, robes, nightwear, kids’ wear, lightweight wovens, leggings",
      },
      { term: "Buyers", detail: "M&S, P&C, Tesco, Mayoral, Matalan" },
      { term: "Certificates", detail: "ACCORD, BSCI, GOTS, OCS, OEKO-TEX, SEDEX, WRAP" },
    ],
    hero: media("1733818115c1cFj", "Aerial view of the Executive Hi Fashions campus surrounded by trees."),
    card: media("1733818304igDl6", "A technician reaching into a circular knitting machine."),
    gallery: [
      media("1733818182UQfqm", "Machinists at work along a busy sewing line."),
      media("1733987377oWFnG", "Hands guiding navy fabric through an overlock machine."),
    ],
    locations: [
      {
        label: "Factory",
        address: "Shirirchala, Bhabanipur, Gazipur",
        phone: "16765",
        email: "info@meghna-executive.com",
      },
    ],
  },
  {
    slug: "sublime-greentex",
    legacySlug: "sublime-greentex",
    name: "Sublime Greentex Ltd.",
    title: { before: "Sublime", italic: "Greentex" },
    sector: "apparel",
    founded: 2015,
    material: "cotton",
    positioning: "Sustainable knitwear from a LEED Gold factory.",
    intro: [
      "Sublime Greentex cuts and stitches tees, polos, hoodies, joggers and kids’ wear for M&S, Gina Tricot, Primark and Lidl.",
      "The factory was certified LEED Gold in November 2017, cutting both energy use and operating cost.",
    ],
    stats: [
      { value: "80,000", label: "Pieces cut per day" },
      { value: "75,000", label: "Pieces sewn per day" },
      { value: "LEED Gold", label: "Certified November 2017" },
    ],
    facts: [
      { term: "Facilities", detail: "Cutting, stitching" },
      {
        term: "Product lines",
        detail:
          "Tees, polos, Henleys, sweats, hoodies, joggers, ladies’ dresses, nightwear, leggings, lightweight wovens, and a full intimates range",
      },
      { term: "Buyers", detail: "M&S, Gina Tricot, Celio, Primark, Lidl, Nayomi, Perry Ellis, La Halle" },
      { term: "Certificates", detail: "ACCORD, GOTS, OCS, SEDEX, BSCI, OEKO-TEX, Better Work" },
    ],
    hero: media("1733818701kHPOv", "The glass-fronted Sublime Greentex building beside a blue-roofed hall."),
    card: media("1737611666LBRco", "Hands guiding denim-blue fabric under a JUKI overlock foot."),
    gallery: [
      media("1733818763d1JnU", "A technician working at an automated cutting table."),
      media("17339874450GIkJ", "A worker in a pink cap handling dark fabric at a spreading table."),
    ],
    locations: [
      { label: "Factory", address: "Gilarchala, Sreepur, Gazipur", phone: "16765", email: "info@meghna-executive.com" },
    ],
  },
  {
    slug: "executive-greentex",
    legacySlug: "executive-greentex",
    name: "Executive Greentex Ltd.",
    title: { before: "Executive", italic: "Greentex" },
    sector: "apparel",
    founded: 2005,
    material: "cotton",
    positioning: "Eco-friendly garments from a LEED Platinum facility.",
    intro: [
      "Executive Greentex knits, dyes, cuts, embroiders and stitches polos, nightwear, hoodies, skirts and knitted bottoms for M&S, H&M, Decathlon, Varner, Tesco and Stanley & Stella.",
      "Its facility holds LEED Platinum certification, along with ACCORD, GOTS, OEKO-TEX, BSCI and SEDEX.",
    ],
    stats: [
      { value: "1.5M", label: "Pieces per month" },
      { value: "60,000", label: "Pieces cut per day" },
      { value: "LEED Platinum", label: "Certified facility" },
    ],
    facts: [
      { term: "Facilities", detail: "Knitting, dyeing, cutting, embroidery, stitching" },
      {
        term: "Product lines",
        detail: "Polos, vests, nightwear, dresses, hoodies, tees, skirts, lightweight woven and knitted bottoms",
      },
      { term: "Buyers", detail: "M&S, H&M, Decathlon, Varner, Tesco, Stanley & Stella" },
      { term: "Certificates", detail: "ACCORD, GOTS, OCS, OEKO-TEX, RCS, WRAP, Better Work, BSCI, SEDEX, Fair Trade" },
    ],
    hero: media("1733818981sG0hv", "Aerial view of the Executive Greentex building among green fields."),
    card: media("1733819170mXHgb", "Machinists in blue caps working along a sewing line."),
    gallery: [
      media("1733819025hzgJy", "Hands tagging a dark garment with a swing ticket."),
      media("1733987456LsLoa", "Close-up of a tagging gun attaching a label to black fabric."),
    ],
    locations: [
      {
        label: "Factory",
        address: "Molaed, M C Bazar, Sreepur, Gazipur",
        phone: "16765",
        email: "info@meghna-executive.com",
      },
    ],
  },

  /* --------------------------------------------------------------- INDUSTRIAL */
  {
    slug: "siam-bangla-industries",
    legacySlug: "siam-bangla-industries-ltd",
    name: "Siam Bangla Industries Ltd.",
    title: { before: "Siam Bangla", italic: "Industries" },
    sector: "industrial",
    founded: 2003,
    material: "limestone",
    positioning: "White Elephant and White Tiger, Bangladesh’s white cement.",
    intro: [
      "With technology and support from Thailand’s Siam Cement Group, Siam Bangla produces premium white cement under the White Elephant and White Tiger brands.",
      "Chemical engineers from Thailand test every batch hourly. Quality is controlled to ASTM, whiteness is measured by the Hunter Lab method, and BUET verifies regularly.",
    ],
    stats: [
      { value: "Hourly", label: "Testing by chemical engineers from Thailand" },
      { value: "ASTM", label: "Quality control standard" },
      { value: "ISO 14001", label: "Environmental management" },
    ],
    facts: [
      { term: "Brands", detail: "White Elephant, White Tiger" },
      {
        term: "Applications",
        detail:
          "Terrazzo, paver, grit-wash and mosaic tiles; fair-face buildings; texture plaster, cement paint and stucco; ornamental work; marble flooring; stonecrete plaster; Tyrolean; cement wash; white-cement grout; flooring overlays",
      },
      {
        term: "Quality",
        detail:
          "ASTM standards, Hunter Lab whiteness testing, O-Separator fineness technology, regular BUET verification, ISO 9002",
      },
    ],
    hero: media("1730193949WZr9D", "An engineer in a hard hat and high-visibility vest beside a cement mixer at dusk."),
    card: media("1730194136HT8cd", "A bag of Elephant brand white cement on a conveyor."),
    gallery: [
      media("1729663352OM1f5", "Gloved hands sifting a pile of grey cement clinker."),
      media("1730194389NdUNm", "Aerial view of the Siam Bangla plant and its silos."),
    ],
    locations: [
      {
        label: "Head office",
        address: "Le Meridien (Commercial Space, Level 6), Plot 79/A, Nikunja-2, Dhaka",
        phone: "01714118014",
        email: "info@meghna-executive.com",
        mapUrl: "https://maps.app.goo.gl/gNivPutoL6wKJSDXA",
      },
    ],
  },
  {
    slug: "executive-woodworks",
    legacySlug: "executive-woodworks",
    name: "Executive Woodworks Ltd.",
    title: { before: "Executive", italic: "Woodworks" },
    sector: "industrial",
    founded: 2021,
    material: "limestone",
    positioning: "Furniture for the West, made in Gazipur.",
    intro: [
      "Executive Woodworks is a 100% export-oriented furniture maker. Its 680,000 sq ft facility ships five 40-ft HC containers a day, mainly to the USA, against an annual export target of US$70 million.",
      "It sources FSC-certified timber and natural materials like hogla, seagrass, bamboo and jute. It uses 6-axis CNC machining, and is Fair Trade USA certified, with daycare and breastfeeding rooms for the women who work there.",
    ],
    stats: [
      { value: "680,000", label: "Sq ft facility" },
      { value: "5 × 40-ft", label: "HC containers shipped a day" },
      { value: "US$70M", label: "Annual export target" },
    ],
    facts: [
      { term: "Categories", detail: "Bedroom, living room, dining, outdoor, kids’, storage and accent furniture" },
      {
        term: "Certificates",
        detail: "ISO 9001:2015, ISO 14000:2015 (EMS), UL Greenguard, FSC-certified timber, Fair Trade USA",
      },
      { term: "Practices", detail: "Rainwater harvesting, solar lighting, wastewater recycling" },
    ],
    hero: media("17338192563CqnO", "A worker guiding a timber frame through an overhead finishing line."),
    card: media("1733819599ZDSgH", "Hands sanding the edge of a solid-wood table frame."),
    gallery: [
      media("1733819538nC8Kd", "Stacks of seasoned timber planks in the yard."),
      media("1733819515LS5D5", "A craftsman in a hairnet sanding a chair frame."),
      media("1733819599fF3vb", "Workers hanging finished chair parts on a moving line."),
      media("1733819599cQTVt", "Timber stacked inside a blue kiln for drying."),
      media("1733819538lvaHx", "Rows of cut chair backs standing on the factory floor."),
      media("1733819515d682u", "Two craftsmen assembling chairs at their benches."),
    ],
    locations: [
      { label: "Factory", address: "Dhanua, Sreepur, Gazipur", phone: "16765", email: "info@meghna-executive.com" },
    ],
    website: { href: "https://executivewoodworks.com/", label: "executivewoodworks.com" },
  },
  {
    slug: "meghna-bearing-industries",
    legacySlug: "meghna-bearing-industries-limited",
    name: "Meghna Bearing Industries Ltd.",
    title: { before: "Meghna", italic: "Bearing", after: "Industries" },
    sector: "industrial",
    founded: 1997,
    material: "limestone",
    positioning: "Precision bearings for the machinery that runs Bangladesh.",
    intro: [
      "Meghna Bearing Industries makes and supplies precision bearings for heavy manufacturing, automotive, construction, textiles, agriculture, energy, ports, and steel and cement plants.",
      "Every batch is checked from raw-material inspection through dimensional, load and hardness testing to a final audit before dispatch.",
    ],
    stats: [
      { value: "1997", label: "Founded" },
      { value: "10", label: "Industries served" },
      { value: "5", label: "Quality gates before dispatch" },
    ],
    facts: [
      {
        term: "Applications",
        detail:
          "Heavy machinery, automotive assembly, construction and infrastructure, textile and garment machinery, agricultural equipment, pumps and compressors, power generation, conveyors, marine and port equipment, steel and cement plant machinery",
      },
      {
        term: "Quality gates",
        detail:
          "Raw-material inspection, dimensional accuracy, load and durability, surface finish and hardness, final audit before dispatch",
      },
    ],
    hero: media("17851375978OmCd", "The long, bright assembly hall of Meghna Bearing Industries."),
    card: media("1786622230OUIG6", "Gloved hands inspecting a tapered roller bearing."),
    gallery: [media("1785138147CEBRY", "Ball and roller bearings stacked together.")],
    locations: [{ label: "Works", address: "373 Tejgaon Industrial Area, Dhaka 1215", phone: "01681-748404" }],
  },

  /* ------------------------------------------------------------------ SERVICE */
  {
    slug: "executive-gourmet",
    legacySlug: "executive-gourmet-limited",
    name: "Executive Gourmet Ltd.",
    title: { before: "Executive", italic: "Gourmet" },
    sector: "service",
    founded: 2025,
    material: "olive",
    positioning: "Slaw Bistro: the group’s first table.",
    intro: [
      "Executive Gourmet is the group’s move into dining. Its flagship, Slaw Bistro, is a contemporary bistro built on three things in equal measure: cuisine, ambience and hospitality.",
      "Lunch, a business dinner or a celebration: a considered menu of fresh, quality ingredients, prepared with precision.",
    ],
    stats: [
      { value: "2025", label: "Established" },
      { value: "Slaw", label: "Flagship bistro" },
      { value: "Private", label: "And corporate dining" },
    ],
    offeringsTitle: "At Slaw Bistro",
    offerings: [
      {
        name: "A thoughtfully curated menu",
        image: media("1785142409kFAXA", "A slice of Basque-style cheesecake with dark sauce."),
      },
      {
        name: "Contemporary bistro ambience",
        image: media("1785142555oo1SG", "Arched windows and wooden chairs in the Slaw Bistro dining room."),
      },
      {
        name: "Consistent culinary standards",
        image: media("1785142608jv724", "A shared table of pizza, grilled dishes and dips."),
      },
      {
        name: "Private & corporate dining",
        image: media("1785142756eQh47", "A quiet terrace with lounge chairs beside a planted wall."),
      },
    ],
    hero: media("1785140168rqczE", "The Slaw Bistro dining room with a planted wall and warm timber chairs."),
    card: media("1785142689yTxyb", "A Slaw Bistro chef setting down a plate at a guest’s table."),
    gallery: [
      media("1786613424JcURj", "Rows of tables under arched white panelling."),
      media("1786622661Y3RaH", "A takeaway coffee cup in the sun on a café table."),
    ],
    locations: [
      {
        label: "Slaw Bistro",
        address: "187-188 B, Tejgaon Link Road, Meghna Tower Forum (Ground Floor), Dhaka 1215",
        phone: "01886-032265",
      },
    ],
    website: { href: "https://menu.apetitomenu.com/slawbistro/en/menu", label: "Online menu" },
  },
];

export const houseBySlug = (slug: string) => houses.find((h) => h.slug === slug);

export const housesBySector = (s: Sector) => houses.filter((h) => h.sector === s);

export function nextHouse(slug: string) {
  const i = houses.findIndex((h) => h.slug === slug);
  return houses[(i + 1) % houses.length];
}

export const sectorLabel = (s: Sector) => sectors.find((x) => x.id === s)!.label;

/** All global buyers named across the apparel houses, de-duplicated. */
export const buyers = [
  "M&S",
  "H&M",
  "Primark",
  "Tesco",
  "Lidl",
  "Decathlon",
  "Matalan",
  "Next",
  "Perry Ellis",
  "Gina Tricot",
  "Varner",
  "Stanley & Stella",
  "P&C",
  "Mayoral",
  "Celio",
  "La Halle",
  "Nayomi",
];

/**
 * Material palettes, sampled from each house's own photography. Applied as
 * quiet background tints; never loud colour.
 */
export const materials: Record<
  Material,
  { bg: string; fg: string; muted: string; accent: string; dark: boolean; name: string }
> = {
  graphite: { name: "Graphite", bg: "#1e2122", fg: "#eceae6", muted: "#a3a7a6", accent: "#b9a37c", dark: true },
  aluminium: { name: "Aluminium", bg: "#dfe0df", fg: "#191d1c", muted: "#555a58", accent: "#4f5355", dark: false },
  porcelain: {
    name: "Porcelain & brass",
    bg: "#efebe4",
    fg: "#191d1c",
    muted: "#5f5a50",
    accent: "#735f3e",
    dark: false,
  },
  walnut: { name: "Walnut & velvet", bg: "#2a211b", fg: "#efe7dc", muted: "#b5a796", accent: "#c4a27a", dark: true },
  cotton: { name: "Cotton & indigo", bg: "#e9eaec", fg: "#17213a", muted: "#4d566b", accent: "#2f3f6b", dark: false },
  limestone: {
    name: "White cement & limestone",
    bg: "#e6e3dc",
    fg: "#1d1f1c",
    muted: "#5a5c55",
    accent: "#735f3e",
    dark: false,
  },
  olive: { name: "Olive & terracotta", bg: "#2b2e22", fg: "#efe9dd", muted: "#b5b39d", accent: "#c97f5a", dark: true },
};
