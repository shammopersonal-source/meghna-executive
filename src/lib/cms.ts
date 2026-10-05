import "server-only";
import { houses, houseBySlug, type House } from "@/content/houses";
import { articles, articleBySlug, type Article } from "@/content/journal";

/**
 * Content access layer.
 *
 * Today the content is the typed snapshot in src/content (migrated from the
 * live site). Pages only ever call these functions, so moving to the live CMS
 * API at cms.meghna-executive.com means re-implementing this file (fetch with
 * `next: { revalidate }` tags) and nothing else. See README → "CMS integration".
 */

export async function getHouses(): Promise<House[]> {
  return houses;
}

export async function getHouse(slug: string): Promise<House | undefined> {
  return houseBySlug(slug);
}

export async function getArticles(): Promise<Article[]> {
  return [...articles].sort((a, b) => b.date.localeCompare(a.date));
}

export async function getArticle(slug: string): Promise<Article | undefined> {
  return articleBySlug(slug);
}
