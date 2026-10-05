"use client";

import { useEffect, useState } from "react";

const fmt = new Intl.DateTimeFormat("en-GB", {
  timeZone: "Asia/Dhaka",
  hour: "2-digit",
  minute: "2-digit",
  hour12: false,
});

/** Live local time in Dhaka (GMT+6). Server renders the zone only; the clock fills in on the client. */
export default function DhakaTime() {
  const [now, setNow] = useState<string | null>(null);
  useEffect(() => {
    const tick = () => setNow(fmt.format(new Date()));
    tick();
    const id = window.setInterval(tick, 15_000);
    return () => window.clearInterval(id);
  }, []);
  return (
    <span>
      Dhaka{" "}
      <time suppressHydrationWarning style={{ fontVariantNumeric: "tabular-nums" }}>
        {now ?? "GMT+6"}
      </time>
      {now ? " GMT+6" : null}
    </span>
  );
}
