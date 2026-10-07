import Link from "next/link";
import { media } from "@/content/media";
import styles from "./PartnerMarks.module.css";

/**
 * The partners' own marks, exactly as the live site supplies them (white, for
 * dark grounds). Plain <img>: SVG artwork is served untouched, never recoloured.
 */
const marks = [
  { house: "executive-motors", m: media("1730470036tBz7q", "BMW", { partner: true }) },
  { house: "executive-lifestyles", m: media("1730470036vE86X", "KOHLER", { partner: true }) },
  {
    house: "executive-machines",
    m: media("1730470036QjL0R", "Executive Machines: Apple Authorised Reseller and Authorised Service Provider", { partner: true }),
  },
  { house: "penthouse-livings", m: media("1730470036JuN6A", "Penthouse Livings", { partner: true }) },
];

export default function PartnerMarks() {
  return (
    <ul className={styles.marks} role="list" aria-label="Partners in Bangladesh">
      {marks.map(({ house, m }) => (
        <li key={house}>
          <Link href={`/houses/${house}`} className={styles.mark}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={m.src} alt={m.alt} width={Math.round(m.width)} height={Math.round(m.height)} decoding="async" fetchPriority="low" />
          </Link>
        </li>
      ))}
    </ul>
  );
}
