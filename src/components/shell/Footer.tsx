import Link from "next/link";
import { houses, sectors } from "@/content/houses";
import { primaryNav, site } from "@/content/site";
import { PhoneIcon } from "@/components/ui/Icons";
import DhakaTime from "./DhakaTime";
import styles from "./Footer.module.css";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className={`${styles.footer} theme-ink grain`}>
      <div className="container">
        <div className={styles.cta}>
          <span className={styles.rest} data-line-anchor="rest" data-line-x="0.5" aria-hidden="true" />
          <p className="label muted">Where the currents meet</p>
          <Link href="/contact" className={styles.ctaLink}>
            Start a <em className="serif">conversation</em>
            <span className="arrow" aria-hidden="true" />
          </Link>
        </div>

        <div className={styles.cols}>
          <div className={styles.contact}>
            <a href={site.hotlineHref} className={styles.hotline} data-cta="hotline">
              <PhoneIcon />
              Hotline {site.hotline}
            </a>
            <a href={`mailto:${site.email}`} className="link">
              {site.email}
            </a>
            <address>
              {site.address.lines.map((l) => (
                <span key={l}>{l}</span>
              ))}
            </address>
            <a href={site.address.mapUrl} className="link" target="_blank" rel="noopener noreferrer">
              Open in Maps <span className="arrow" aria-hidden="true" />
            </a>
            <p className="muted">
              <DhakaTime />
            </p>
          </div>

          {sectors.map((s) => (
            <nav key={s.id} className={styles.col} aria-label={`${s.label} houses`}>
              <p className="label muted">{s.label}</p>
              <ul role="list">
                {houses
                  .filter((h) => h.sector === s.id)
                  .map((h) => (
                    <li key={h.slug}>
                      <Link href={`/houses/${h.slug}`}>{h.name.replace(/ Ltd\.$/, "")}</Link>
                    </li>
                  ))}
              </ul>
            </nav>
          ))}

          <nav className={styles.col} aria-label="Group">
            <p className="label muted">Group</p>
            <ul role="list">
              {primaryNav
                .filter((n) => n.href !== "/houses")
                .map((n) => (
                  <li key={n.href}>
                    <Link href={n.href}>{n.label}</Link>
                  </li>
                ))}
            </ul>
          </nav>
        </div>
      </div>

      <div className={styles.wordmark} data-reveal="lines" aria-hidden="true">
        {"MEGHNA".split("").map((c, i) => (
          <span className="line" key={i}>
            <span className="line-inner">{c}</span>
          </span>
        ))}
      </div>

      <div className={`container ${styles.bottom}`}>
        <p>
          © {year} {site.name}. Since {site.founded}.
        </p>
        <p className="muted">All imagery courtesy of the group’s houses and partners.</p>
      </div>
    </footer>
  );
}
