"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowRight, Check, User } from "@phosphor-icons/react";
import type { Locale } from "@/i18n/config";
import { catalogUi } from "./catalog-data";

type Filter = "all" | "supplier" | "distributor";

/** Historial de cambios del producto: quién cambió qué, con el valor anterior y el nuevo. */
export function ChangeHistory({ locale }: { locale: Locale }) {
  const t = catalogUi[locale];
  const [filter, setFilter] = useState<Filter>("all");
  const events = t.events.filter((e) => filter === "all" || e.who === filter);
  const filters: [Filter, string][] = [
    ["all", t.filterAll],
    ["supplier", t.filterSupplier],
    ["distributor", t.filterDistributor],
  ];

  return (
    <div className="w-full rounded-surface border border-line bg-surface p-5 text-sm shadow-soft sm:p-6">
      <div className="flex flex-col gap-3 border-b border-line pb-5 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-xs text-muted">{t.detail}</p>
          <p className="mt-1 text-[17px] font-semibold tracking-tight text-ink">{t.product}</p>
          <p className="mt-1 font-mono text-xs text-ink-2">RS-1724-006 · CAS 85721-33-1</p>
        </div>
        <span className="inline-flex w-fit items-center gap-1 rounded-full border border-line px-2 py-0.5 text-xs text-ink-2">
          <Check size={11} weight="bold" />
          {t.status.current}
        </span>
      </div>

      <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
        <p className="font-semibold text-ink">{t.history}</p>
        <div role="radiogroup" aria-label={t.history} className="flex rounded-full border border-line p-0.5">
          {filters.map(([k, name]) => (
            <button
              key={k}
              type="button"
              role="radio"
              aria-checked={filter === k}
              onClick={() => setFilter(k)}
              className={`relative rounded-full px-3 py-1 text-xs transition-colors ${filter === k ? "text-bg" : "text-ink-2 hover:text-ink"}`}
            >
              {filter === k && (
                <motion.span
                  layoutId="history-filter"
                  className="absolute inset-0 bg-ink"
                  style={{ borderRadius: 999 }}
                  transition={{ type: "spring", duration: 0.35, bounce: 0.1 }}
                />
              )}
              <span className="relative">{name}</span>
            </button>
          ))}
        </div>
      </div>

      <ol className="relative mt-5 space-y-5 before:absolute before:bottom-2 before:left-[15px] before:top-2 before:w-px before:bg-line">
        <AnimatePresence initial={false} mode="popLayout">
          {events.map((e) => (
            <motion.li
              key={e.user + e.date}
              layout
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ type: "spring", duration: 0.35, bounce: 0 }}
              className="relative grid grid-cols-[32px_1fr] gap-3"
            >
              <span
                className={`relative z-10 grid size-8 place-items-center rounded-full border text-[11px] font-semibold ${
                  e.who === "supplier" ? "border-transparent bg-ink text-bg" : "border-line bg-surface text-ink"
                }`}
              >
                {e.who === "supplier" ? "PR" : "DI"}
              </span>
              <div className="min-w-0">
                <p className="flex flex-wrap items-baseline gap-x-2 text-ink">
                  <span className="font-medium">{e.org}</span>
                  <span className="inline-flex items-center gap-1 text-xs text-ink-2">
                    <User size={11} />
                    {e.user}
                  </span>
                  <span className="text-xs text-muted">{e.date}</span>
                </p>
                <div className="mt-2 space-y-2">
                  {e.changes.map(([field, before, after]) => (
                    <div key={field} className="rounded-control border border-line px-3 py-2.5">
                      <p className="text-xs text-muted">{field}</p>
                      <p className="mt-1 flex flex-wrap items-center gap-2 text-[13px]">
                        <span className="text-muted line-through decoration-muted/70">{before}</span>
                        <ArrowRight size={12} className="text-muted" />
                        <span className="mark font-medium text-ink">{after}</span>
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.li>
          ))}
        </AnimatePresence>
      </ol>
    </div>
  );
}
