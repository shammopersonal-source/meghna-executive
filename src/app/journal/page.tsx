import type { Metadata } from "next";
import PageHero from "@/components/page/PageHero";
import JournalCard from "@/components/journal/JournalCard";
import JsonLd from "@/components/seo/JsonLd";
import { getArticles } from "@/lib/cms";
import { breadcrumbSchema } from "@/lib/schema";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Journal",
  description: "News, stories and films from the houses of Meghna Executive Holdings.",
  alternates: { canonical: "/journal" },
};

const cats = ["All", "Blog", "Video", "News", "Initiative"] as const;

export default async function JournalPage() {
  const articles = await getArticles();
  return (
    <main id="main" data-mat-bg="#f1f0ee">
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Journal", path: "/journal" },
        ])}
      />
      <PageHero
        kicker="Journal"
        lines={["News from", "the houses."]}
        lead="A resource for journalists, partners and anyone following the group: our portfolio, our practices and our people."
      />
      <section className="theme-bone" aria-label="Articles">
        <div className={`container ${styles.wrap}`}>
          <fieldset className={styles.filters}>
            <legend className="visually-hidden">Filter by type</legend>
            {cats.map((c) => (
              <label key={c} className={styles.filter}>
                <input type="radio" name="journal-cat" value={c} defaultChecked={c === "All"} />
                <span>{c === "Initiative" ? "Sustainability" : c}</span>
              </label>
            ))}
          </fieldset>
          <h2 className="visually-hidden">All articles</h2>
          <ul className={styles.grid} role="list">
            {articles.map((a, i) => (
              <li key={a.slug} data-cat={a.category} className={i === 0 ? styles.lead : undefined}>
                <JournalCard article={a} priority={i < 2} />
              </li>
            ))}
          </ul>
        </div>
      </section>
    </main>
  );
}
