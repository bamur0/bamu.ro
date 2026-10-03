import Link from "next/link";
import { ArrowUpRight } from "@phosphor-icons/react/ssr";
import type { Locale } from "@/i18n/config";
import type { CaseMeta } from "@/lib/cases";
import { CaseCover } from "./case-cover";

export function CaseCard({
  item,
  locale,
  featured = false,
}: {
  item: CaseMeta;
  locale: Locale;
  featured?: boolean;
}) {
  return (
    <Link href={`/${locale}/work/${item.slug}/`} className="group block">
      <div className="transition-transform duration-300 ease-out-quint group-hover:-translate-y-1">
        <CaseCover cover={item.cover} title={item.title} locale={locale} />
      </div>
      <div className={`mt-5 flex items-start justify-between gap-6 ${featured ? "md:mt-6" : ""}`}>
        <div className="min-w-0">
          <h3
            className={`font-semibold tracking-tight text-ink text-balance ${featured ? "text-2xl md:text-[28px]" : "text-xl"}`}
          >
            {item.title}
          </h3>
          <p className={`mt-2 text-ink-2 text-pretty ${featured ? "max-w-[62ch] text-[17px]" : "max-w-[52ch]"}`}>
            {item.summary}
          </p>
          <p className="mt-3 font-mono text-xs text-muted">
            {item.role}, {item.year}
          </p>
        </div>
        <span className="mt-1 grid size-10 shrink-0 place-items-center rounded-full border border-line text-ink transition-[transform,background-color] duration-300 ease-out-quint group-hover:rotate-45 group-hover:bg-surface-2">
          <ArrowUpRight size={17} />
        </span>
      </div>
    </Link>
  );
}
