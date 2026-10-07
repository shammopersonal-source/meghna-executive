import Link from "next/link";
import { houses, sectors } from "@/content/houses";
import { PhoneIcon } from "@/components/ui/Icons";
import styles from "./Contents.module.css";

const short = (name: string) => name.replace(/ (Ltd\.|Limited)$/, "");

/**
 * The contents page, which is also the directory. Most visitors arrive with a
 * task (call the BMW showroom, reach a factory), so every company is one tap
 * away, and the trading companies carry their partner and phone. No years here:
 * founding dates live in Milestones, so the page never states two for one company.
 */
export default function Contents() {
  return (
    <section id="contents" className={`theme-bone ${styles.contents}`} aria-labelledby="contents-title">
      <div className="container">
        <header className={styles.head}>
          <p className="smallcaps muted">Find a company</p>
          <h2 id="contents-title" className={styles.title}>
            Our companies
          </h2>
        </header>
        <div className={styles.sectors}>
          {sectors.map((s) => (
            <nav key={s.id} className={styles.sector} aria-labelledby={`contents-${s.id}`}>
              <h3 id={`contents-${s.id}`} className={`smallcaps ${styles.sectorName}`}>
                {s.label}
              </h3>
              <ol role="list" className={styles.list}>
                {houses
                  .filter((h) => h.sector === s.id)
                  .map((h) => {
                    const phone = h.sector === "trading" ? h.locations.find((l) => l.phone)?.phone : undefined;
                    return (
                      <li key={h.slug} className={styles.entry}>
                        <Link href={`/houses/${h.slug}`} className={styles.row}>
                          <span className={styles.name}>{short(h.name)}</span>
                          <span className={styles.leader} aria-hidden="true" />
                          <span className="arrow" aria-hidden="true" />
                        </Link>
                        {h.partner || phone ? (
                          <p className={styles.sub}>
                            {h.partner ? <span className="smallcaps">{h.partner}</span> : null}
                            {phone ? (
                              <a
                                href={`tel:${phone.replace(/[^\d+]/g, "")}`}
                                className={styles.call}
                                data-cta="hotline"
                                aria-label={`Call ${short(h.name)}, ${phone}`}
                              >
                                <PhoneIcon />
                                {phone}
                              </a>
                            ) : null}
                          </p>
                        ) : null}
                      </li>
                    );
                  })}
              </ol>
            </nav>
          ))}
        </div>
      </div>
    </section>
  );
}
