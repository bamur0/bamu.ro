"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { CaretDown, Check, MagnifyingGlass, PencilSimple, Plus } from "@phosphor-icons/react";
import type { Locale } from "@/i18n/config";
import { catalogUi, getCatalogRows, type InfoStatus } from "./catalog-data";
import { ScaledFrame } from "./scaled-frame";

const expand = {
  es: { open: "Explorar pantalla", close: "Cerrar" },
  en: { open: "Explore screen", close: "Close" },
};

const W = 1280;
const H = 720;

type Tab = "all" | "expired" | "expiring" | "approval" | "discontinued";
const TABS: Tab[] = ["all", "expired", "expiring", "approval", "discontinued"];

export const statusStyle: Record<InfoStatus, string> = {
  expired: "border-danger/40 bg-danger/8 text-danger",
  expiring: "border-transparent bg-accent text-accent-ink",
  approval: "border-dashed border-ink-2 text-ink",
  current: "border-line text-ink-2",
  discontinued: "border-line text-muted line-through decoration-muted/60",
};

export function CatalogCms({ locale, interactive = false, label }: { locale: Locale; interactive?: boolean; label: string }) {
  const t = catalogUi[locale];
  const rows = getCatalogRows(locale);
  const [tab, setTab] = useState<Tab>("all");
  const visible = tab === "all" ? rows : rows.filter((r) => r.status === tab);
  const count = (k: Tab) => (k === "all" ? rows.length : rows.filter((r) => r.status === k).length);
  const tabIndex = interactive ? 0 : -1;

  return (
    <ScaledFrame width={W} height={H} label={label} interactive={interactive} expandLabel={expand[locale].open} closeLabel={expand[locale].close}>
      <div className="flex h-full flex-col bg-bg text-[12.5px] text-ink" {...(!interactive && { inert: true })}>
        <div className="flex h-11 shrink-0 items-center justify-between border-b border-line bg-surface px-6">
          <div className="flex items-center gap-2.5">
            <span className="grid size-6 place-items-center rounded-[6px] bg-ink text-[12px] font-semibold text-bg">P</span>
            <span className="font-medium">{t.app}</span>
          </div>
          <div className="flex items-center gap-2 text-ink-2">
            <span>{t.supplier}</span>
            <span className="grid size-7 place-items-center rounded-full bg-surface-2 text-[12px] font-medium text-ink">PR</span>
          </div>
        </div>

        <div className="flex min-h-0 flex-1 flex-col gap-4 px-6 py-5">
          <p className="text-[20px] font-semibold tracking-tight">{t.title}</p>
          <div className="flex gap-3">
            <span className="flex h-9 flex-1 items-center gap-2 rounded-control border border-line bg-surface px-3 text-muted">
              <MagnifyingGlass size={15} />
              {t.search}
            </span>
            <span className="flex h-9 items-center gap-1.5 rounded-control bg-ink px-3.5 font-medium text-bg">
              <Plus size={14} weight="bold" />
              {t.add}
            </span>
          </div>

          <div className="flex items-end justify-between border-b border-line">
            <div role="tablist" className="flex gap-1">
              {TABS.map((k) => {
                const active = tab === k;
                return (
                  <button
                    key={k}
                    role="tab"
                    aria-selected={active}
                    tabIndex={tabIndex}
                    onClick={() => setTab(k)}
                    className={`relative flex items-center gap-1.5 px-3 pb-2.5 pt-1 transition-colors ${active ? "font-medium text-ink" : "text-ink-2 hover:text-ink"}`}
                  >
                    {t.tabs[k]}
                    <span className="rounded-full bg-surface-2 px-1.5 text-[12px] tabular-nums text-ink-2">{count(k)}</span>
                    {active && (
                      <motion.span
                        layoutId={`${label}-tab`}
                        className="absolute inset-x-1 -bottom-px h-[2px] bg-ink"
                        transition={{ type: "spring", duration: 0.35, bounce: 0.1 }}
                      />
                    )}
                  </button>
                );
              })}
            </div>
            <div className="flex gap-2 pb-2">
              {(locale === "es" ? ["Disponibilidad", "Contenedor"] : ["Availability", "Container"]).map((f) => (
                <span key={f} className="flex h-8 items-center gap-6 rounded-control border border-line bg-surface px-2.5 text-ink-2">
                  {f}
                  <CaretDown size={11} />
                </span>
              ))}
            </div>
          </div>

          <div className="min-h-0 flex-1 overflow-hidden rounded-[10px] border border-line bg-surface">
            <div className="grid grid-cols-[minmax(0,3.2fr)_1.5fr_1.1fr_0.7fr_1.1fr_1fr_36px] items-center gap-3 border-b border-line bg-surface-2/60 px-4 py-2.5 text-[12px] font-medium text-ink-2">
              {t.cols.map((c) => (
                <span key={c} className="truncate">
                  {c}
                </span>
              ))}
              <span />
            </div>
            <ul>
              <AnimatePresence initial={false} mode="popLayout">
                {visible.length === 0 ? (
                  <motion.li key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="px-4 py-10 text-center text-muted">
                    {t.empty}
                  </motion.li>
                ) : (
                  visible.map((r) => (
                    <motion.li
                      key={r.id}
                      layout
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ type: "spring", duration: 0.35, bounce: 0 }}
                      className="grid grid-cols-[minmax(0,3.2fr)_1.5fr_1.1fr_0.7fr_1.1fr_1fr_36px] items-center gap-3 border-b border-line px-4 py-2.5 last:border-0"
                    >
                      <span className="flex min-w-0 items-center gap-2">
                        <span className={`shrink-0 rounded-full border px-1.5 py-px text-[11.5px] font-medium ${statusStyle[r.status]}`}>
                          {r.status === "current" && <Check size={10} weight="bold" className="-mt-px mr-0.5 inline" />}
                          {t.status[r.status]}
                        </span>
                        <span className="truncate">{r.name}</span>
                      </span>
                      <span className={`tabular-nums ${r.status === "expired" ? "font-medium text-danger" : "text-ink-2"}`}>{r.expires}</span>
                      <span className="font-mono text-[12px] text-ink-2">{r.cat}</span>
                      <span className="text-ink-2">{r.qty}</span>
                      <span className="truncate text-ink-2">{r.container}</span>
                      <span className="font-mono text-[12px] text-ink-2">{r.cas}</span>
                      <span className="grid size-7 place-items-center rounded-[6px] text-muted" aria-label={t.edit}>
                        <PencilSimple size={14} />
                      </span>
                    </motion.li>
                  ))
                )}
              </AnimatePresence>
            </ul>
          </div>
          <p className="text-[12px] text-muted">{t.showing(visible.length, 1200)}</p>
        </div>
      </div>
    </ScaledFrame>
  );
}
