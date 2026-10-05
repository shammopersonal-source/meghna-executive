/**
 * A figure that counts up once in view. The final value is server-rendered;
 * digits sit in fixed-width cells (Banana Grotesk has proportional figures)
 * so the number never jitters while counting.
 */
export default function Count({ value, display, className }: { value: number; display: string; className?: string }) {
  const decimals = display.includes(".") ? display.split(".")[1].replace(/\D/g, "").length : 0;
  const suffix = display.replace(/[\d.,]/g, "");
  const grouping = display.includes(",");
  return (
    <span
      className={className}
      data-count={value}
      data-decimals={decimals}
      data-suffix={suffix}
      data-grouping={grouping ? "true" : "false"}
    >
      <span className="count-digits" aria-hidden="true">
        {display}
      </span>
      <span className="visually-hidden">{display}</span>
    </span>
  );
}
