export const site = {
  name: "Meghna Executive Holdings",
  short: "MEH",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://meghna-executive.com",
  description:
    "Meghna Executive Holdings: fifteen houses across trading, apparel, industry and hospitality. BMW, Apple and KOHLER in Bangladesh, and garments made for the world. Since 1965.",
  founded: 1965,
  hotline: "16765",
  hotlineHref: "tel:16765",
  email: "info@meghna-executive.com",
  address: {
    lines: ["Le Meridien (Level 6)", "Plot 79/A, Nikunja-2", "Dhaka 1229, Bangladesh"],
    street: "Le Meridien (Level 6), Plot 79/A, Nikunja-2",
    locality: "Dhaka",
    postalCode: "1229",
    country: "BD",
    mapUrl: "https://www.google.com/maps/search/?api=1&query=Le+Meridien+Dhaka+Nikunja-2",
  },
  timeZone: "Asia/Dhaka",
} as const;

export type NavItem = { href: string; label: string };

export const primaryNav: NavItem[] = [
  { href: "/houses", label: "Houses" },
  { href: "/group", label: "The Group" },
  { href: "/sustainability", label: "Sustainability" },
  { href: "/responsibility", label: "Responsibility" },
  { href: "/journal", label: "Journal" },
  { href: "/careers", label: "Careers" },
  { href: "/contact", label: "Contact" },
];
