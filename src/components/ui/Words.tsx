import type { ElementType } from "react";

/** Paragraph whose words light up as it scrolls through the viewport. Screen readers get the sentence once. */
export default function Words({
  text,
  as: Tag = "p",
  className,
}: {
  text: string;
  as?: ElementType;
  className?: string;
}) {
  const words = text.split(" ");
  return (
    <Tag className={className} data-scrub-words>
      <span className="visually-hidden">{text}</span>
      {words.map((w, i) => (
        <span className="w" aria-hidden="true" key={i}>
          {w}
          {i < words.length - 1 ? " " : ""}
        </span>
      ))}
    </Tag>
  );
}
