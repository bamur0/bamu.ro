import type { Locale } from "@/i18n/config";
import type { CaseMeta } from "@/lib/cases";
import { PunchoutCatalog } from "./mockups/punchout-catalog";
import { PendingVisual } from "./mockups/pending-visual";
import { QuoteWorkspace } from "./mockups/quote-workspace";
import { CatalogCms } from "./mockups/catalog-cms";

const pendingLabel = {
  es: "Recreación de pantallas en proceso",
  en: "Screen recreation in progress",
};

export function CaseCover({
  cover,
  title,
  locale,
  interactive = false,
}: {
  cover: CaseMeta["cover"];
  title: string;
  locale: Locale;
  interactive?: boolean;
}) {
  switch (cover) {
    case "punchout":
      return <PunchoutCatalog locale={locale} label={title} interactive={interactive} />;
    case "quote":
      return <QuoteWorkspace locale={locale} label={title} interactive={interactive} />;
    case "catalog-cms":
      return <CatalogCms locale={locale} label={title} interactive={interactive} />;
    default:
      return <PendingVisual label={pendingLabel[locale]} />;
  }
}
