import Link from "next/link";
import Lines from "@/components/ui/Lines";

export default function NotFound() {
  return (
    <main
      id="main"
      className="theme-ink grain"
      style={{
        minHeight: "100svh",
        display: "grid",
        placeItems: "center",
        textAlign: "center",
        padding: "var(--gutter)",
      }}
    >
      <div style={{ display: "grid", gap: 28, justifyItems: "center" }}>
        <p className="label muted">404</p>
        <Lines as="h1" immediate className="display" lines={["This stream", <>runs dry.</>]} />
        <p className="lead muted">The page you were looking for has moved or no longer exists.</p>
        <div style={{ display: "flex", gap: 16, flexWrap: "wrap", justifyContent: "center" }}>
          <Link href="/" className="btn">
            Back to the home page
          </Link>
          <Link href="/houses" className="btn">
            See all our companies
          </Link>
        </div>
      </div>
    </main>
  );
}
