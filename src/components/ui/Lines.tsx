import type { ElementType, ReactNode } from "react";

type Props = {
  as?: ElementType;
  /** One entry per visual line. Keep headlines plain; PP Migra is reserved for numerals, years and house names. */
  lines: ReactNode[];
  className?: string;
  id?: string;
  /** Above the fold: reveal with CSS from first paint instead of waiting for scroll/JS. */
  immediate?: boolean;
};

/**
 * Headline authored as explicit lines so the masked line reveal is exact on
 * every breakpoint. Screen readers get the sentence once, unbroken.
 */
export default function Lines({ as: Tag = "h2", lines, className, id, immediate }: Props) {
  return (
    <Tag className={className} id={id} data-reveal={immediate ? "lines-now" : "lines"}>
      {lines.map((l, i) => (
        <span className="line" key={i} style={immediate ? ({ "--i": i } as React.CSSProperties) : undefined}>
          <span className="line-inner">{l}</span>
          {i < lines.length - 1 ? " " : null}
        </span>
      ))}
    </Tag>
  );
}
