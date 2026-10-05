import styles from "./Logo.module.css";

/**
 * The official MEH logo artwork (/brand/logo.svg), used as a CSS mask so it
 * can take any brand colour without altering the drawing.
 */
export function Logo({ className }: { className?: string }) {
  return (
    <span
      className={[styles.logo, className].filter(Boolean).join(" ")}
      role="img"
      aria-label="Meghna Executive Holdings"
    />
  );
}

/** The circular monogram only (left square of the same artwork). */
export function Monogram({ className }: { className?: string }) {
  return <span className={[styles.mark, className].filter(Boolean).join(" ")} aria-hidden="true" />;
}
