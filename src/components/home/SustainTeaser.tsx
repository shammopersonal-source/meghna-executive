import Link from "next/link";
import Img from "@/components/ui/Img";
import Lines from "@/components/ui/Lines";
import { riverImage } from "@/content/group";
import styles from "./SustainTeaser.module.css";

export default function SustainTeaser() {
  return (
    <section className={`theme-ink ${styles.section}`} aria-labelledby="sustain-title">
      <div className={styles.media} data-scale-in>
        <div className={styles.parallax} data-parallax="0.2">
          <Img media={riverImage} sizes="100vw" quality={60} />
        </div>
        <div className={styles.shade} aria-hidden="true" />
      </div>
      <div className={`container ${styles.copy}`}>
        <span className={styles.anchor} data-line-anchor data-line-x="0.5" aria-hidden="true" />
        <p className="label">Sustainability</p>
        <Lines
          as="h2"
          id="sustain-title"
          className="display"
          lines={[
            "Leave the river",
            <>
              <em className="serif">cleaner.</em>
            </>,
          ]}
        />
        <p className={`lead ${styles.lead}`} data-reveal="fade">
          LEED Platinum and LEED Gold factories. Solar in our manufacturing units. FSC timber, water harvesting and
          zero-waste garment lines.
        </p>
        <Link href="/sustainability" className="btn" data-reveal="fade">
          Our sustainability <span className="arrow" aria-hidden="true" />
        </Link>
      </div>
    </section>
  );
}
