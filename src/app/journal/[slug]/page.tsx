import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Img from "@/components/ui/Img";
import Lines from "@/components/ui/Lines";
import JournalCard from "@/components/journal/JournalCard";
import YouTubeFacade from "@/components/journal/YouTubeFacade";
import JsonLd from "@/components/seo/JsonLd";
import { articles, excerpt } from "@/content/journal";
import { houseBySlug } from "@/content/houses";
import { getArticle, getArticles } from "@/lib/cms";
import { articleSchema, breadcrumbSchema } from "@/lib/schema";
import styles from "./page.module.css";

export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}
export const dynamicParams = false;

export async function generateMetadata({ params }: PageProps<"/journal/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const a = await getArticle(slug);
  if (!a) return {};
  return {
    title: a.title,
    description: excerpt(a, 160),
    alternates: { canonical: `/journal/${a.slug}` },
    openGraph: { type: "article", title: a.title, description: excerpt(a, 160), publishedTime: a.date },
  };
}

const fmt = new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "long", year: "numeric" });

export default async function ArticlePage({ params }: PageProps<"/journal/[slug]">) {
  const { slug } = await params;
  const a = await getArticle(slug);
  if (!a) notFound();
  const house = a.house ? houseBySlug(a.house) : undefined;
  const more = (await getArticles()).filter((x) => x.slug !== a.slug).slice(0, 2);

  return (
    <main id="main" data-mat-bg="#f1f0ee" className="theme-bone">
      <JsonLd
        data={[
          articleSchema(a),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Journal", path: "/journal" },
            { name: a.title, path: `/journal/${a.slug}` },
          ]),
        ]}
      />
      <article>
        <header className={`container ${styles.head}`}>
          <p className={`label muted ${styles.meta}`}>
            <Link href="/journal">Journal</Link>
            <span aria-hidden="true">·</span>
            <span>{a.category}</span>
            <span aria-hidden="true">·</span>
            <time dateTime={a.date}>{fmt.format(new Date(a.date))}</time>
          </p>
          <Lines as="h1" className={`h1 ${styles.title}`} lines={[a.title]} immediate />
        </header>

        <div className={`container ${styles.cover}`}>
          {a.youtube ? (
            <YouTubeFacade id={a.youtube} title={a.title} poster={a.cover} />
          ) : (
            <div
              className={styles.coverFrame}
              data-reveal="window"
              style={{ aspectRatio: `${a.cover.width} / ${a.cover.height}`, maxWidth: a.cover.width }}
            >
              <Img media={a.cover} sizes="(max-width: 1179px) 100vw, 1100px" priority="high" />
            </div>
          )}
        </div>

        <div className={`container ${styles.body}`}>
          <div className={`prose ${styles.prose}`}>
            {a.body.map((b, i) => {
              if (b.type === "h2") return <h2 key={i}>{b.text}</h2>;
              if (b.type === "ul")
                return (
                  <ul key={i}>
                    {b.items.map((it) => (
                      <li key={it}>{it}</li>
                    ))}
                  </ul>
                );
              return <p key={i}>{b.text}</p>;
            })}
          </div>
          {house ? (
            <aside className={styles.related} aria-label="Related house">
              <p className="label muted">The house</p>
              <Link href={`/houses/${house.slug}`} className={styles.relatedCard}>
                <div className={styles.relatedMedia}>
                  <Img media={house.card} sizes="320px" quality={60} />
                </div>
                <span className={styles.relatedName}>{house.name}</span>
                <span className="muted">{house.positioning}</span>
              </Link>
            </aside>
          ) : null}
        </div>
      </article>

      <section className="section theme-bone" aria-labelledby="more">
        <div className="container">
          <h2 id="more" className={`h2 ${styles.moreTitle}`}>
            More from the journal
          </h2>
          <div className={styles.more}>
            {more.map((m) => (
              <JournalCard key={m.slug} article={m} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
