import type { Metadata } from "next";
import ConfluenceHero from "@/components/home/ConfluenceHero";
import Intro from "@/components/home/Intro";
import Ledger from "@/components/home/Ledger";
import HousesSection from "@/components/home/HousesSection";
import Spreads from "@/components/home/Spreads";
import MadeIn from "@/components/home/MadeIn";
import Timeline from "@/components/home/Timeline";
import SustainTeaser from "@/components/home/SustainTeaser";
import JournalTeaser from "@/components/home/JournalTeaser";
import { getArticles } from "@/lib/cms";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: { absolute: `${site.name}: Bangladesh, curated. Since 1965.` },
  description: site.description,
  alternates: { canonical: "/" },
};

export default async function HomePage() {
  const articles = await getArticles();
  return (
    <main id="main" data-mat-bg="#191d1c">
      <ConfluenceHero />
      <Intro />
      <Ledger />
      <HousesSection />
      <Spreads />
      <MadeIn />
      <Timeline />
      <SustainTeaser />
      <JournalTeaser articles={articles} />
    </main>
  );
}
