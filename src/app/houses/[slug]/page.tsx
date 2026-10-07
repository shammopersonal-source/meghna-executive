import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Img from "@/components/ui/Img";
import ChapterSpine, { type Chapter } from "@/components/monograph/ChapterSpine";
import Lines from "@/components/ui/Lines";
import AutoVideo from "@/components/media/AutoVideo";
import HouseHero from "@/components/house/HouseHero";
import Gallery from "@/components/house/Gallery";
import Offerings from "@/components/house/Offerings";
import SectionHead from "@/components/page/SectionHead";
import JsonLd from "@/components/seo/JsonLd";
import { houses, materials, nextHouse, sectorLabel } from "@/content/houses";
import { getHouse } from "@/lib/cms";
import { breadcrumbSchema, houseSchema } from "@/lib/schema";
import styles from "./page.module.css";

export function generateStaticParams() {
  return houses.map((h) => ({ slug: h.slug }));
}
export const dynamicParams = false;

export async function generateMetadata({ params }: PageProps<"/houses/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const h = await getHouse(slug);
  if (!h) return {};
  const desc = `${h.positioning} ${h.intro[0]}`.slice(0, 300);
  return {
    title: h.name,
    description: desc,
    alternates: { canonical: `/houses/${h.slug}` },
    openGraph: { title: `${h.name} · Meghna Executive Holdings`, description: h.positioning },
  };
}

export default async function HousePage({ params }: PageProps<"/houses/[slug]">) {
  const { slug } = await params;
  const house = await getHouse(slug);
  if (!house) notFound();
  const mat = materials[house.material];
  const roman = ["I", "II", "III", "IV", "V", "VI"];
  const sections: [string, string, boolean][] = [
    ["overview", "Overview", true],
    ["offerings", house.offeringsTitle ?? "Offerings", !!house.offerings?.length],
    ["specs", "The detail", !!(house.facts?.length || house.capacities?.length)],
    ["gallery", "Plates", house.gallery.length > 0],
    ["visit", "Visit", true],
  ];
  const chapters: Chapter[] = sections
    .filter(([, , on]) => on)
    .map(([id, title], i) => ({ id, title, numeral: roman[i] }));
  const num = (id: string) => chapters.find((c) => c.id === id)?.numeral;
  const next = nextHouse(house.slug);
  const style = {
    "--mat-bg": mat.bg,
    "--mat-fg": mat.fg,
    "--mat-muted": mat.muted,
    "--mat-accent": mat.accent,
    "--mat-shade": mat.dark ? mat.bg : "#191d1c",
  } as React.CSSProperties;

  return (
    <main id="main" data-mat-bg={mat.bg} style={style} className={styles.page}>
      <JsonLd
        data={[
          houseSchema(house),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Houses", path: "/houses" },
            { name: house.name, path: `/houses/${house.slug}` },
          ]),
        ]}
      />
      <ChapterSpine chapters={chapters} />
      <HouseHero house={house} />

      {/* Overview */}
      <section className={`section ${mat.dark ? "theme-material" : "theme-bone"}`} aria-labelledby="overview">
        <div className={`container ${styles.overview}`}>
          <h2 id="overview" className="smallcaps muted">
            <span className={styles.numeral}>I</span> {sectorLabel(house.sector)} · {house.name}
          </h2>
          <div className={styles.introText}>
            {house.placeholder ? (
              <p className={styles.placeholder} role="note">
                {house.placeholder}
              </p>
            ) : null}
            <p className={`lead ${styles.introLead}`} data-reveal="fade">
              {house.intro[0]}
            </p>
            {house.intro.slice(1).map((p) => (
              <p key={p} className="muted" data-reveal="fade">
                {p}
              </p>
            ))}
          </div>
          <dl className={styles.stats}>
            {house.stats.map((s, i) => (
              <div key={s.label} className={styles.stat} data-reveal="fade" data-delay={i * 0.08}>
                <dt className="muted">{s.label}</dt>
                <dd>{s.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {house.video ? (
        <section className={`theme-bone ${styles.filmWrap}`} aria-label={`${house.name} film`}>
          <div className={styles.film} data-reveal="window">
            <AutoVideo video={house.video} className={styles.video} />
          </div>
        </section>
      ) : null}

      {house.offerings?.length ? (
        <section className="section theme-material" aria-labelledby="offerings">
          <div className="container">
            <SectionHead
              kicker={house.partner ?? "Offerings"}
              id="offerings"
              numeral={num("offerings")}
              lines={[house.offeringsTitle ?? "What we offer"]}
            />
            <Offerings items={house.offerings} />
          </div>
        </section>
      ) : null}

      {house.facts?.length || house.capacities?.length ? (
        <section className="section theme-bone" aria-labelledby="specs">
          <div className="container">
            <SectionHead kicker="At a glance" id="specs" numeral={num("specs")} lines={["The detail"]} />
            {house.facts?.length ? (
              <dl className={styles.facts}>
                {house.facts.map((f) => (
                  <div key={f.term} className={styles.fact} data-reveal="fade">
                    <dt className="label muted">{f.term}</dt>
                    <dd>{f.detail}</dd>
                  </div>
                ))}
              </dl>
            ) : null}
            {house.capacities?.length ? (
              <dl className={styles.capacities}>
                {house.capacities.map((c) => (
                  <div key={c.label}>
                    <dt className="muted">{c.label}</dt>
                    <dd>{c.value}</dd>
                  </div>
                ))}
              </dl>
            ) : null}
          </div>
        </section>
      ) : null}

      {house.gallery.length ? (
        <section className={`section ${mat.dark ? "theme-material" : "theme-bone"}`} aria-labelledby="gallery">
          <div className="container">
            <SectionHead kicker="Gallery" id="gallery" numeral={num("gallery")} lines={["Plates"]} />
            <Gallery images={house.gallery} label={`${house.name} gallery`} />
          </div>
        </section>
      ) : null}

      <section className="section theme-ink grain" aria-labelledby="visit">
        <div className="container">
          <SectionHead
            kicker="Visit & contact"
            id="visit"
            numeral={num("visit")}
            lines={["Visit and enquire"]}
            aside={
              <div className={styles.ctas}>
                {house.website ? (
                  <a
                    href={house.website.href}
                    className="btn"
                    target="_blank"
                    rel="noopener noreferrer"
                    data-cta="visit-website"
                  >
                    Visit {house.website.label} <span className="arrow" aria-hidden="true" />
                  </a>
                ) : null}
                {house.documents?.map((d) => (
                  <a key={d.href} href={d.href} className="link" target="_blank" rel="noopener noreferrer">
                    {d.label} <span className="arrow" aria-hidden="true" />
                  </a>
                ))}
              </div>
            }
          />
          <ul className={styles.locations} role="list">
            {house.locations.map((l) => (
              <li key={l.label} className={styles.location} data-reveal="fade">
                <p className="label muted">{l.label}</p>
                <address>{l.address}</address>
                <div className={styles.locLinks}>
                  {l.phone ? (
                    <a href={`tel:${l.phone.replace(/[^\d+]/g, "")}`} className="link" data-cta="hotline">
                      {l.phone}
                    </a>
                  ) : null}
                  {l.email ? (
                    <a href={`mailto:${l.email}`} className="link">
                      {l.email}
                    </a>
                  ) : null}
                  {l.mapUrl ? (
                    <a href={l.mapUrl} className="link" target="_blank" rel="noopener noreferrer">
                      Map <span className="arrow" aria-hidden="true" />
                    </a>
                  ) : null}
                </div>
              </li>
            ))}
          </ul>
          <p className={styles.enquire}>
            <Link href={`/contact?house=${house.slug}`} className="btn btn-solid">
              Send an enquiry to {house.name.replace(/ Ltd\.$/, "")}
            </Link>
          </p>
        </div>
      </section>

      <Link href={`/houses/${next.slug}`} className={`theme-ink ${styles.next}`}>
        <div className={styles.nextMedia}>
          <Img media={next.card} sizes="100vw" quality={60} />
        </div>
        <div className={`container ${styles.nextCopy}`}>
          <p className="label">Next in the river</p>
          <Lines as="p" className="display" lines={[next.name.replace(/ Ltd\.$/, "")]} />
          <span className={styles.nextArrow} aria-hidden="true">
            <span className="arrow" />
          </span>
        </div>
      </Link>
    </main>
  );
}
