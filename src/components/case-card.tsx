import Link from "next/link";
import { ArrowUpRight, LockSimple } from "@phosphor-icons/react/ssr";
import type { Locale } from "@/i18n/config";
import type { CaseMeta } from "@/lib/cases";
import { getDictionary } from "@/i18n/dictionaries";
import { CaseCover, LockedCover } from "./case-cover";

/**
 * Tarjeta de caso: la portada flota sobre un panel con el color del caso, y debajo
 * va un pie tranquilo (título a la izquierda, cliente y año a la derecha).
 */
export function CaseCard({ item, locale }: { item: CaseMeta; locale: Locale }) {
  const dict = getDictionary(locale);
  return (
    // Sin prefetch en los protegidos: la función de Cloudflare respondería 401 al payload
    <Link href={`/${locale}/work/${item.slug}/`} prefetch={item.locked ? false : undefined} className="group block">
      <div
        className="tint-panel overflow-hidden rounded-surface p-5 transition-transform duration-300 ease-out-quint group-hover:-translate-y-1 sm:p-8"
        style={{ "--tint": item.tint } as React.CSSProperties}
      >
        <div className="transition-transform duration-500 ease-out-quint group-hover:scale-[1.015]">
          {item.locked ? (
            <LockedCover label={item.title} badge={dict.case.locked} />
          ) : (
            <CaseCover cover={item.cover} title={item.title} locale={locale} />
          )}
        </div>
      </div>
      <div className="mt-4 flex items-baseline justify-between gap-4">
        <h3 className="font-display text-xl text-ink text-balance md:text-[22px]">{item.title}</h3>
        <span className="flex shrink-0 items-center gap-1.5 font-mono text-xs text-muted">
          {item.locked && <LockSimple size={13} aria-label={dict.case.locked} />}
          {item.year}
          <ArrowUpRight
            size={14}
            className="transition-transform duration-300 ease-out-quint group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
          />
        </span>
      </div>
      <p className="mt-1.5 max-w-[56ch] text-[15px] leading-relaxed text-ink-2 text-pretty">{item.summary}</p>
    </Link>
  );
}
