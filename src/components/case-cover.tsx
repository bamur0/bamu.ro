import { LockSimple } from "@phosphor-icons/react/ssr";
import type { Locale } from "@/i18n/config";
import type { CaseMeta } from "@/lib/cases";
import { PunchoutCatalog } from "./mockups/punchout-catalog";
import { PendingVisual } from "./mockups/pending-visual";
import { QuoteWorkspace } from "./mockups/quote-workspace";
import { CatalogCms } from "./mockups/catalog-cms";
import { ScreenShot } from "./screen-shot";

const inbox = {
  src: "/work/correos-recibidos/cr-06-detalle.webp",
  width: 1568,
  height: 882,
};

const pendingLabel = {
  es: "Recreación de pantallas en proceso",
  en: "Screen recreation in progress",
};

/**
 * Portada de un caso con contraseña: no usa pantallas reales, solo la estructura
 * de una bandeja dibujada con los tokens del sitio.
 */
export function LockedCover({ label, badge }: { label: string; badge: string }) {
  return (
    <div
      role="img"
      aria-label={`${label}. ${badge}`}
      className="relative aspect-[16/9] w-full overflow-hidden rounded-surface border border-line bg-surface shadow-soft"
    >
      <div aria-hidden className="absolute inset-0 grid grid-cols-[16%_1fr_30%] gap-3 p-4 md:gap-5 md:p-7">
        <div className="flex flex-col gap-2 rounded-control bg-surface-2 p-2 md:gap-3 md:p-3">
          {[70, 55, 62, 48].map((w, i) => (
            <span key={i} className="h-1.5 rounded-full bg-line md:h-2" style={{ width: `${w}%` }} />
          ))}
        </div>
        <div className="flex flex-col justify-between">
          {[72, 88, 64, 80, 70, 84, 60, 76].map((w, i) => (
            <div key={i} className="flex items-center gap-2 border-b border-line pb-2 md:gap-3 md:pb-3">
              <span className={`h-1.5 w-6 shrink-0 rounded-full md:h-2 md:w-10 ${i % 3 === 0 ? "bg-accent" : "bg-surface-2"}`} />
              <span className="h-1.5 rounded-full bg-surface-2 md:h-2" style={{ width: `${w}%` }} />
            </div>
          ))}
        </div>
        <div className="flex flex-col gap-2 rounded-control border border-line p-3 md:gap-3 md:p-4">
          <span className="h-2 w-3/4 rounded-full bg-surface-2 md:h-3" />
          <span className="h-1.5 w-1/2 rounded-full bg-surface-2 md:h-2" />
          <span className="mt-2 h-1.5 w-1/3 rounded-full bg-accent md:mt-4 md:h-2" />
          <span className="h-1.5 w-full rounded-full bg-surface-2 md:h-2" />
          <span className="h-1.5 w-5/6 rounded-full bg-surface-2 md:h-2" />
          <span className="h-1.5 w-2/3 rounded-full bg-surface-2 md:h-2" />
        </div>
      </div>
      <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-surface via-surface/70 to-surface/20" />
      <span className="absolute left-1/2 top-1/2 inline-flex -translate-x-1/2 -translate-y-1/2 items-center gap-2 whitespace-nowrap rounded-full border border-line bg-surface px-4 py-2 text-sm font-medium text-ink shadow-soft">
        <LockSimple size={16} />
        {badge}
      </span>
    </div>
  );
}

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
    case "inbox":
      // Dentro de la tarjeta (que ya es un enlace) va como imagen; en el caso se abre a pantalla completa
      return interactive ? (
        <ScreenShot {...inbox} alt={title} locale={locale} priority />
      ) : (
        <div className="overflow-hidden rounded-surface border border-line bg-surface shadow-soft">
          {/* eslint-disable-next-line @next/next/no-img-element -- export estático */}
          <img {...inbox} alt={title} loading="lazy" decoding="async" className="block h-auto w-full" />
        </div>
      );
    default:
      return <PendingVisual label={pendingLabel[locale]} />;
  }
}
