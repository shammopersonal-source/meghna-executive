import { site } from "@/content/site";
import type { House } from "@/content/houses";
import type { Article } from "@/content/journal";

export const abs = (path: string) => new URL(path, site.url).toString();

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": abs("/#organization"),
    name: site.name,
    alternateName: site.short,
    url: site.url,
    logo: abs("/brand/fav.png"),
    foundingDate: String(site.founded),
    email: site.email,
    telephone: site.hotline,
    sameAs: site.social.map((s) => s.href),
    address: {
      "@type": "PostalAddress",
      streetAddress: site.address.street,
      addressLocality: site.address.locality,
      postalCode: site.address.postalCode,
      addressCountry: site.address.country,
    },
  };
}

export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: abs(it.path),
    })),
  };
}

export function houseSchema(h: House) {
  const type =
    h.sector === "service"
      ? "Restaurant"
      : h.sector === "trading"
        ? h.slug === "executive-motors"
          ? "AutoDealer"
          : "Store"
        : "Organization";
  return {
    "@context": "https://schema.org",
    "@type": type,
    name: h.name,
    description: h.positioning,
    url: abs(`/houses/${h.slug}`),
    image: h.hero.src,
    parentOrganization: { "@id": abs("/#organization") },
    ...(h.founded ? { foundingDate: String(h.founded) } : {}),
    ...(h.website ? { sameAs: [h.website.href] } : {}),
    location: h.locations.map((l) => ({
      "@type": "Place",
      name: l.label,
      address: { "@type": "PostalAddress", streetAddress: l.address, addressCountry: "BD" },
      ...(l.phone ? { telephone: l.phone } : {}),
      ...(l.email ? { email: l.email } : {}),
    })),
  };
}

export function articleSchema(a: Article) {
  return {
    "@context": "https://schema.org",
    "@type": a.youtube ? "VideoObject" : "Article",
    headline: a.title,
    ...(a.youtube
      ? {
          name: a.title,
          uploadDate: a.date,
          thumbnailUrl: a.cover.src,
          embedUrl: `https://www.youtube-nocookie.com/embed/${a.youtube}`,
          description: a.title,
        }
      : { datePublished: a.date, image: a.cover.src }),
    publisher: { "@id": abs("/#organization") },
    mainEntityOfPage: abs(`/journal/${a.slug}`),
  };
}
