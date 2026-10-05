import Link from "next/link";
import Img from "@/components/ui/Img";
import Lines from "@/components/ui/Lines";
import { houseBySlug } from "@/content/houses";
import styles from "./Spreads.module.css";

const spreads = [
  {
    slug: "executive-motors",
    word: "BMW",
    lines: [
      "The exclusive",
      <>
        home of <em className="serif">BMW.</em>
      </>,
    ],
  },
  {
    slug: "executive-machines",
    word: "Apple",
    lines: [
      "Apple, sold",
      <>
        and <em className="serif">serviced.</em>
      </>,
    ],
  },
  {
    slug: "executive-lifestyles",
    word: "KOHLER",
    lines: [
      "The bold look",
      <>
        of <em className="serif">KOHLER.</em>
      </>,
    ],
  },
  {
    slug: "penthouse-livings",
    word: "Penthouse",
    lines: [
      "Living,",
      <>
        <em className="serif">collected.</em>
      </>,
    ],
  },
];

/** One bold spread per trading partner: alternating, oversized type drifting with scroll. */
export default function Spreads() {
  return (
    <section className={`theme-ink grain ${styles.wrap}`} aria-label="Trading houses">
      {spreads.map((s, i) => {
        const h = houseBySlug(s.slug)!;
        const flip = i % 2 === 1;
        return (
          <article key={s.slug} className={styles.spread} data-flip={flip ? "" : undefined}>
            <span
              className={styles.anchor}
              data-line-anchor
              data-line-x={flip ? "0.06" : "0.94"}
              data-line-x-sm={flip ? "0.04" : "0.96"}
              aria-hidden="true"
            />
            <div className={styles.word} aria-hidden="true">
              <span data-drift={flip ? "12" : "-12"}>{s.word}</span>
            </div>
            <div className={styles.media} data-reveal="tide">
              <div className={styles.parallax} data-parallax="0.14">
                <Img media={h.hero} sizes="(max-width: 767px) 100vw, 62vw" />
              </div>
            </div>
            <div className={styles.text}>
              <p className="label muted">
                0{i + 1} · {h.name}
                {h.founded ? ` · since ${h.founded}` : ""}
              </p>
              <Lines as="h3" className="h2" lines={s.lines} />
              <p className={`muted ${styles.body}`} data-reveal="fade">
                {h.intro[0]}
              </p>
              <dl className={styles.stats} data-reveal="fade">
                {h.stats.slice(0, 2).map((st) => (
                  <div key={st.label}>
                    <dt className="muted">{st.label}</dt>
                    <dd>{st.value}</dd>
                  </div>
                ))}
              </dl>
              <Link href={`/houses/${h.slug}`} className="link">
                Enter {h.name.replace(/ Ltd\.$/, "")} <span className="arrow" aria-hidden="true" />
              </Link>
            </div>
          </article>
        );
      })}
    </section>
  );
}
