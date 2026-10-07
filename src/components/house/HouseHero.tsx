import Link from "next/link";
import Img from "@/components/ui/Img";
import type { House } from "@/content/houses";
import { sectorLabel } from "@/content/houses";
import styles from "./HouseHero.module.css";

export default function HouseHero({ house }: { house: House }) {
  const { title } = house;
  return (
    <header className={`theme-material grain ${styles.hero}`}>
      <div className={styles.media}>
        <div className={styles.parallax} data-parallax="0.18">
          <Img media={house.hero} sizes="100vw" priority="high" quality={75} />
        </div>
        <div className={styles.shade} aria-hidden="true" />
      </div>
      <div className={`container ${styles.copy}`}>
        <nav aria-label="Breadcrumb" className={styles.crumbs}>
          <ol role="list">
            <li>
              <Link href="/houses">Houses</Link>
            </li>
            <li>
              <Link href={`/houses#${house.sector}`}>{sectorLabel(house.sector)}</Link>
            </li>
            <li aria-current="page">{house.name}</li>
          </ol>
        </nav>
        <h1 className={`display ${styles.title}`} data-reveal="lines-now">
          {title.before ? (
            <span className="line">
              <span className="line-inner">{title.before} </span>
            </span>
          ) : null}
          <span className="line" style={{ "--i": 1 } as React.CSSProperties}>
            <span className="line-inner">
              <em className="serif">{title.italic}</em>
              {title.after ? ` ${title.after}` : ""}
            </span>
          </span>
        </h1>
        <div className={styles.meta} data-reveal="fade-now">
          <p className={styles.positioning}>{house.positioning}</p>
          <dl className={styles.facts}>
            <div>
              <dt>Sector</dt>
              <dd>{sectorLabel(house.sector)}</dd>
            </div>
            {house.founded ? (
              <div>
                <dt>Founded</dt>
                <dd>{house.founded}</dd>
              </div>
            ) : null}
            {house.partner ? (
              <div>
                <dt>Partner</dt>
                <dd>{house.partner}</dd>
              </div>
            ) : null}
          </dl>
        </div>
      </div>
    </header>
  );
}
