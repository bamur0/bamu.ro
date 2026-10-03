import "server-only";
import fs from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";
import type { Locale } from "@/i18n/config";

const CASES_DIR = path.join(process.cwd(), "content", "cases");

export type CaseMeta = {
  slug: string;
  order: number;
  title: string;
  summary: string;
  client: string;
  type: string;
  year: string;
  role: string;
  duration?: string;
  team?: string;
  status?: string;
  cover: "punchout" | "quote" | "catalog-cms";
};

export type CaseFile = CaseMeta & { body: string };

async function readCase(slug: string, locale: Locale): Promise<CaseFile> {
  const raw = await fs.readFile(path.join(CASES_DIR, slug, `${locale}.mdx`), "utf8");
  const { data, content } = matter(raw);
  return { ...(data as Omit<CaseMeta, "slug">), slug, body: content };
}

export async function getCaseSlugs(): Promise<string[]> {
  const entries = await fs.readdir(CASES_DIR, { withFileTypes: true });
  return entries.filter((e) => e.isDirectory()).map((e) => e.name);
}

export async function getCases(locale: Locale): Promise<CaseMeta[]> {
  const slugs = await getCaseSlugs();
  const cases = await Promise.all(slugs.map((slug) => readCase(slug, locale)));
  return cases
    .map((c): CaseMeta => {
      const meta: Partial<CaseFile> = { ...c };
      delete meta.body;
      return meta as CaseMeta;
    })
    .sort((a, b) => a.order - b.order);
}

export async function getCase(slug: string, locale: Locale) {
  return readCase(slug, locale);
}
