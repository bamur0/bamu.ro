import Link from "next/link";
import { ArrowRight, LockSimple } from "@phosphor-icons/react/ssr";
import type { Locale } from "@/i18n/config";
import type { CaseMeta } from "@/lib/cases";
import { getDictionary } from "@/i18n/dictionaries";
import { CaseCover, LockedCover } from "./case-cover";

/**
 * Fila del índice de casos: número, título, resumen y el resultado a la izquierda; la
 * portada a la derecha. El resultado va resaltado porque es lo primero que busca quien revisa.
 * La atenuación de las otras filas al pasar el cursor vive en globals.css (.index).
 */
export function CaseCard({ item, locale, index }: { item: CaseMeta; locale: Locale; index: number }) {
  const dict = getDictionary(locale);
  return (
    // Sin prefetch en los protegidos: la función de Cloudflare respondería 401 al payload
    <Link
      href={`/${locale}/work/${item.slug}/`}
      prefetch={item.locked ? false : undefined}
      className="index-row group grid gap-6 border-t border-line py-10 md:grid-cols-12 md:gap-8 md:py-14"
    >
      <span className="label md:col-span-1 md:pt-2">{String(index + 1).padStart(2, "0")}</span>
      <div className="flex flex-col md:col-span-5">
        <p className="flex items-center gap-2 text-sm text-muted">
          <span aria-hidden className="size-2 rounded-full" style={{ background: item.tint }} />
          {item.type} · {item.year}
          {item.locked && <LockSimple size={13} aria-label={dict.case.locked} />}
        </p>
        <h3 className="font-display mt-3 text-[28px] leading-[1.1] text-ink text-balance md:text-[34px]">{item.title}</h3>
        <p className="mt-4 max-w-[52ch] text-[15px] leading-relaxed text-ink-2 text-pretty">{item.summary}</p>
        <div className="mt-6 border-l-2 border-ink pl-4">
          <p className="label">{dict.case.impact}</p>
          <p className="mt-1.5 text-[15px] font-medium leading-snug text-ink text-pretty">{item.impact}</p>
        </div>
        <span className="mt-8 inline-flex items-center gap-1.5 text-sm font-medium text-ink">
          {dict.work.open}
          <ArrowRight size={15} className="transition-transform duration-300 ease-out-quint group-hover:translate-x-1" />
        </span>
      </div>
      <div className="md:col-span-6 md:pt-1">
        <div className="transition-transform duration-500 ease-out-quint group-hover:scale-[1.025]">
          {item.locked ? (
            <LockedCover label={item.title} badge={dict.case.locked} />
          ) : (
            <CaseCover cover={item.cover} image={item.coverImage} title={item.title} locale={locale} />
          )}
        </div>
      </div>
    </Link>
  );
}
