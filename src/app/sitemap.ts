import type { MetadataRoute } from "next";
import { locales } from "@/i18n/config";
import { getCaseSlugs } from "@/lib/cases";
import { site } from "@/lib/site";

export const dynamic = "force-static";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const slugs = await getCaseSlugs();
  const paths = ["/", "/cv/", ...slugs.map((slug) => `/work/${slug}/`)];

  return paths.flatMap((path) =>
    locales.map((lang) => ({
      url: `${site.url}/${lang}${path}`,
      alternates: {
        languages: Object.fromEntries(locales.map((l) => [l, `${site.url}/${l}${path}`])),
      },
    })),
  );
}
