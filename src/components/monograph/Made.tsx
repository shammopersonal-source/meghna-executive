import Link from "next/link";
import Figure from "./Figure";
import { buyers } from "@/content/houses";
import { media } from "@/content/media";
import styles from "./Chapters.module.css";

/** Chapter III: Made in Bangladesh. One great plate, a few plain facts, two portraits. */
export default function Made() {
  const list = buyers.slice(0, -1).join(", ") + " and " + buyers[buyers.length - 1];
  return (
    <section className={`theme-paper ${styles.chapter}`} aria-label="Made in Bangladesh">
      <div className="container">
        <Figure
          media={media(
            "1733815470BY8e5",
            "A long, bright production hall at Executive Intimates, machinists on both sides of the aisle.",
          )}
          fig="01"
          caption="The production hall at Executive Intimates, Sreepur, Gazipur. The factory was certified LEED Gold in November 2017."
          sizes="(max-width: 1179px) 100vw, 1600px"
          ratio="16 / 8"
        />
        <div className={styles.twoCol}>
          <p className={styles.lead} data-reveal="fade">
            Six apparel companies knit, dye, cut, print, embroider and sew in Gazipur. Their garments are made for{" "}
            {list}.
          </p>
          <dl className={styles.facts} data-reveal="fade" data-delay="0.1">
            <div>
              <dt className="smallcaps muted">Sewn each day</dt>
              <dd>80,000</dd>
              <dd className="muted">pieces, Meghna Knit Composite</dd>
            </div>
            <div>
              <dt className="smallcaps muted">Monthly capacity</dt>
              <dd>1.5 million</dd>
              <dd className="muted">pieces, Executive Greentex</dd>
            </div>
            <div>
              <dt className="smallcaps muted">Certified</dt>
              <dd>LEED Platinum</dd>
              <dd className="muted">Executive Greentex</dd>
            </div>
          </dl>
        </div>
        <div className={styles.pair}>
          <Figure
            media={media("1733818304igDl6", "A technician reaching into a circular knitting machine.")}
            fig="02"
            caption="Circular knitting at Executive Hi Fashions, Bhabanipur."
            sizes="(max-width: 767px) 50vw, 40vw"
            ratio="4 / 5"
          />
          <Figure
            media={media("1737611666LBRco", "Hands guiding fabric beneath the foot of an overlock machine.")}
            fig="03"
            caption="Overlocking at Sublime Greentex, Gilarchala."
            sizes="(max-width: 767px) 50vw, 40vw"
            ratio="4 / 5"
            className={styles.offset}
          />
        </div>
        <p className={styles.more}>
          <Link href="/houses#apparel" className="link">
            Apparel companies <span className="arrow" aria-hidden="true" />
          </Link>
          <Link href="/houses#industrial" className="link">
            Industrial companies <span className="arrow" aria-hidden="true" />
          </Link>
          <Link href="/sustainability" className="link">
            Sustainability <span className="arrow" aria-hidden="true" />
          </Link>
        </p>
      </div>
    </section>
  );
}
