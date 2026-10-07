import type { Metadata, Viewport } from "next";
import "./globals.css";
import { banana, migra } from "./fonts";
import Header from "@/components/shell/Header";
import Footer from "@/components/shell/Footer";
import MotionRoot from "@/components/motion/MotionRoot";
import JsonLd from "@/components/seo/JsonLd";
import { houses } from "@/content/houses";
import { site } from "@/content/site";
import { organizationSchema } from "@/lib/schema";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: `${site.name}: Bangladesh, curated. Since 1965.`, template: `%s · ${site.name}` },
  description: site.description,
  applicationName: site.name,
  openGraph: { type: "website", siteName: site.name, locale: "en_GB" },
  twitter: { card: "summary_large_image" },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: "#191d1c",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

/**
 * Arms entrance animations before first paint (no flash of un-animated
 * content). If the motion bundle hasn't booted within 4s, it disarms so
 * slow connections always see the content.
 */
const motionBoot = `(function(){try{var d=document.documentElement;if(!matchMedia('(prefers-reduced-motion: reduce)').matches){d.classList.add('motion');setTimeout(function(){if(!window.__mehMotion){d.classList.remove('motion')}},4000)}}catch(e){}})();`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const menuHouses = houses.map((h) => ({
    slug: h.slug,
    name: h.name,
    sector: h.sector,
    partner: h.partner,
    image: { src: h.card.src, alt: h.card.alt },
  }));

  return (
    <html lang="en-GB" className={`${banana.variable} ${migra.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: motionBoot }} />
        <JsonLd data={organizationSchema()} />
      </head>
      <body>
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <Header houses={menuHouses} />
        {children}
        <Footer />
        <MotionRoot />
      </body>
    </html>
  );
}
