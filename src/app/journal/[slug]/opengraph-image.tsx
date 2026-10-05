import { articleBySlug, articles } from "@/content/journal";
import { ogContentType, ogSize, renderOg } from "@/lib/og";

export const alt = "An article from the Meghna Executive Holdings journal";
export const size = ogSize;
export const contentType = ogContentType;

export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const a = articleBySlug(slug)!;
  return renderOg({
    kicker: `Journal · ${a.category}`,
    title: a.title.length > 70 ? a.title.slice(0, a.title.lastIndexOf(" ", 70)) + "…" : a.title,
  });
}
