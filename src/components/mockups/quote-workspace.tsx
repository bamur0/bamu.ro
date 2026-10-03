"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import {
  CaretDown,
  CaretLeft,
  CaretRight,
  Check,
  ClipboardText,
  EnvelopeSimple,
  MagnifyingGlass,
  Plus,
  Truck,
  UserCircle,
  Warning,
} from "@phosphor-icons/react";
import type { Locale } from "@/i18n/config";
import { money } from "./punchout-data";
import { getQuoteProducts, quoteUi, type Availability } from "./quote-data";
import { ScaledFrame } from "./scaled-frame";

const W = 1280;
const H = 760;
const spring = { type: "spring", duration: 0.45, bounce: 0 } as const;

const badge: Record<Availability, string> = {
  available: "bg-accent text-accent-ink border-transparent",
  backorder: "border-ink-2 text-ink",
  notForSale: "border-line text-muted",
  discontinued: "border-line text-muted line-through decoration-muted/60",
};

function Rail({ label, onExpand, expandLabel }: { label: string; onExpand: () => void; expandLabel: string }) {
  return (
    <button
      type="button"
      onClick={onExpand}
      aria-label={`${expandLabel}: ${label}`}
      className="flex h-full w-full flex-col items-center gap-3 py-4 text-ink-2 hover:bg-surface-2"
    >
      <CaretRight size={14} />
      <span className="text-[12px] font-medium [writing-mode:vertical-rl]">{label}</span>
    </button>
  );
}

export function QuoteWorkspace({
  locale,
  interactive = false,
  label,
}: {
  locale: Locale;
  interactive?: boolean;
  label: string;
}) {
  const t = quoteUi[locale];
  const products = getQuoteProducts(locale);
  const [clientOpen, setClientOpen] = useState(true);
  const [requestOpen, setRequestOpen] = useState(true);
  const [added, setAdded] = useState<string[]>(["q1"]);
  const tab = interactive ? 0 : -1;

  const toggle = (id: string) =>
    setAdded((a) => (a.includes(id) ? a.filter((x) => x !== id) : [...a, id]));

  return (
    <ScaledFrame width={W} height={H} label={label} interactive={interactive}>
      <div className="flex h-full flex-col bg-bg text-[12.5px] text-ink" {...(!interactive && { inert: true })}>
        {/* Barra superior */}
        <div className="flex h-11 shrink-0 items-center justify-between border-b border-line bg-surface px-5">
          <div className="flex items-center gap-2.5">
            <span className="grid size-6 place-items-center rounded-[6px] bg-ink text-[11px] font-semibold text-bg">E</span>
            <span className="font-medium">{t.app}</span>
          </div>
          <div className="flex items-center gap-2 text-ink-2">
            <span>{t.user}</span>
            <UserCircle size={22} weight="light" />
          </div>
        </div>

        <div className="flex min-h-0 flex-1">
          {/* Panel 1: contexto del cliente */}
          <motion.section
            initial={false}
            animate={{ width: clientOpen ? 300 : 40 }}
            transition={spring}
            className="relative shrink-0 overflow-hidden border-r border-line bg-surface"
          >
            <AnimatePresence initial={false} mode="popLayout">
              {clientOpen ? (
                <motion.div
                  key="open"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.15 }}
                  className="w-[300px] p-5"
                >
                  <div className="flex items-center justify-between">
                    <p className="text-[11px] font-medium uppercase tracking-wide text-muted">{t.clientPanel}</p>
                    <button tabIndex={tab} aria-label={t.collapse} onClick={() => setClientOpen(false)} className="grid size-6 place-items-center rounded-[5px] text-muted hover:bg-surface-2 hover:text-ink">
                      <CaretLeft size={13} />
                    </button>
                  </div>
                  <div className="mt-4 flex items-center gap-3">
                    <span className="grid size-10 place-items-center rounded-full bg-surface-2 text-[12px] font-semibold">DA</span>
                    <div>
                      <p className="text-[14px] font-semibold leading-tight">{t.client}</p>
                      <p className="text-muted">{t.clientType}</p>
                    </div>
                  </div>
                  <div className="mt-4 grid grid-cols-3 gap-2 border-b border-line pb-4">
                    <div>
                      <p className="text-[11px] text-muted">{t.segment}</p>
                      <p className="mt-0.5 inline-block rounded-[4px] border border-line px-1 font-mono text-[11px]">AA+</p>
                    </div>
                    <div>
                      <p className="text-[11px] text-muted">{t.sector}</p>
                      <p className="mt-0.5">{t.sectorValue}</p>
                    </div>
                    <div>
                      <p className="text-[11px] text-muted">{t.industry}</p>
                      <p className="mt-0.5">{t.industryValue}</p>
                    </div>
                  </div>
                  <dl className="mt-4 space-y-2">
                    {t.terms.map(([k, v]) => (
                      <div key={k} className="flex justify-between gap-3">
                        <dt className="text-ink-2">{k}</dt>
                        <dd className="font-medium">{v}</dd>
                      </div>
                    ))}
                  </dl>
                  <div className="mt-5 border-t border-line pt-4">
                    <p className="text-[11px] text-muted">{t.contact}</p>
                    <p className="mt-1 font-medium">{t.contactName}</p>
                    <p className="mt-1 flex items-center gap-1.5 text-ink-2">
                      <EnvelopeSimple size={13} /> lparedes@ejemplo.pe
                    </p>
                  </div>
                </motion.div>
              ) : (
                <motion.div key="rail" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="h-full">
                  {interactive ? <Rail label={t.clientPanel} onExpand={() => setClientOpen(true)} expandLabel={t.expand} /> : null}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.section>

          {/* Panel 2: requerimiento original */}
          <motion.section
            initial={false}
            animate={{ width: requestOpen ? 230 : 40 }}
            transition={spring}
            className="relative shrink-0 overflow-hidden border-r border-line bg-surface-2/50"
          >
            <AnimatePresence initial={false} mode="popLayout">
              {requestOpen ? (
                <motion.div
                  key="open"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.15 }}
                  className="w-[230px] p-5"
                >
                  <div className="flex items-center justify-between">
                    <p className="text-[11px] font-medium uppercase tracking-wide text-muted">{t.requestPanel}</p>
                    <button tabIndex={tab} aria-label={t.collapse} onClick={() => setRequestOpen(false)} className="grid size-6 place-items-center rounded-[5px] text-muted hover:bg-surface-2 hover:text-ink">
                      <CaretLeft size={13} />
                    </button>
                  </div>
                  <p className="mt-4 font-mono text-[11.5px] font-medium">{t.requestId}</p>
                  <p className="text-ink-2">{t.requestSubject}</p>
                  <div className="mt-4 space-y-2 leading-relaxed text-ink-2">
                    {t.requestBody.map((line) => (
                      <p key={line}>{line}</p>
                    ))}
                  </div>
                  <p className="mt-5 flex items-center gap-1.5 text-ink-2">
                    <ClipboardText size={14} /> solicitud.pdf
                  </p>
                </motion.div>
              ) : (
                <motion.div key="rail" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="h-full">
                  {interactive ? <Rail label={t.requestPanel} onExpand={() => setRequestOpen(true)} expandLabel={t.expand} /> : null}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.section>

          {/* Panel 3: armado de la cotización */}
          <section className="flex min-w-0 flex-1 flex-col">
            <div className="flex h-12 shrink-0 items-end gap-1 border-b border-line bg-surface px-4">
              {t.quotes.map((q, i) => {
                const active = i === t.quotes.length - 1;
                return (
                  <div
                    key={q.id}
                    className={`rounded-t-[8px] border border-b-0 px-3 py-1.5 ${active ? "border-line bg-bg" : "border-transparent text-ink-2"}`}
                  >
                    <p className="font-mono text-[11px] font-medium">{q.id}</p>
                    <p className="text-[11px] text-muted">{q.status}</p>
                  </div>
                );
              })}
            </div>

            <div className="flex min-h-0 flex-1 flex-col gap-3 p-4">
              <div className="flex items-center justify-between">
                <p className="text-[15px] font-semibold tracking-tight">
                  {t.addTitle} <span className="font-mono text-[12px] font-normal text-muted">COT-0458</span>
                </p>
                <motion.span
                  key={added.length}
                  initial={{ scale: 0.92 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", duration: 0.3, bounce: 0.3 }}
                  className="rounded-full bg-ink px-2.5 py-1 text-[11.5px] font-medium text-bg"
                >
                  {t.inQuote(added.length)}
                </motion.span>
              </div>

              <div className="flex gap-2">
                <span className="flex h-8 flex-1 items-center gap-2 rounded-control border border-line bg-surface px-2.5 text-ink">
                  <MagnifyingGlass size={14} className="text-muted" />
                  ácido
                  <span className="text-muted">· {t.search}</span>
                </span>
                {t.filters.map((f) => (
                  <span key={f} className="flex h-8 w-32 items-center justify-between rounded-control border border-line bg-surface px-2.5 text-ink-2">
                    <span className="truncate">{f}</span>
                    <CaretDown size={11} />
                  </span>
                ))}
              </div>
              <div className="flex items-center justify-between">
                <p className="text-[12px] text-muted">{t.results(products.length)}</p>
                <span className="rounded-control border border-line px-2.5 py-1 text-[11.5px] text-ink-2">{t.outside}</span>
              </div>

              <ul className="flex min-h-0 flex-1 flex-col divide-y divide-line overflow-hidden rounded-[10px] border border-line bg-surface">
                {products.map((p, i) => {
                  const isAdded = added.includes(p.id);
                  const canAdd = p.availability !== "notForSale" && p.availability !== "discontinued" && !p.blocked;
                  return (
                    <li key={p.id} className={`flex items-start gap-3 px-3.5 py-2.5 ${p.blocked ? "bg-surface-2/40" : ""}`}>
                      <span className="w-4 pt-0.5 text-[11px] text-muted">{i + 1}</span>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2">
                          <span className={`rounded-full border px-1.5 py-px text-[10.5px] font-medium ${badge[p.availability]}`}>
                            {t.status[p.availability]}
                          </span>
                          <span className="truncate font-medium">{p.name}</span>
                        </div>
                        <p className="mt-0.5 text-[11.5px] text-ink-2">{p.detail}</p>
                        {p.note && <p className="mt-0.5 text-[11.5px] text-muted">{p.note}</p>}
                        {p.blocked && (
                          <p className="mt-1 flex max-w-[460px] items-start gap-1.5 text-[11.5px] text-ink">
                            <Warning size={13} weight="fill" className="mt-px shrink-0 text-ink-2" />
                            {p.blocked}
                          </p>
                        )}
                      </div>
                      <div className="w-28 shrink-0 text-right">
                        <p className="font-semibold tabular-nums">{p.price === null ? "N/D" : money(p.price)}</p>
                        {p.days !== null && (
                          <p className="mt-0.5 flex items-center justify-end gap-1 text-[11px] text-muted">
                            <Truck size={12} /> {t.days(p.days)}
                          </p>
                        )}
                      </div>
                      <button
                        tabIndex={tab}
                        disabled={!canAdd}
                        onClick={() => toggle(p.id)}
                        className={`flex h-7 w-24 shrink-0 items-center justify-center gap-1 rounded-control text-[11.5px] font-medium transition-[background-color,transform] duration-150 active:scale-[0.96] disabled:cursor-not-allowed disabled:opacity-35 ${
                          isAdded ? "border border-line bg-surface text-ink" : "bg-ink text-bg"
                        }`}
                      >
                        <AnimatePresence mode="popLayout" initial={false}>
                          <motion.span
                            key={isAdded ? "y" : "n"}
                            initial={{ opacity: 0, y: 6 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -6 }}
                            transition={{ type: "spring", duration: 0.25, bounce: 0 }}
                            className="flex items-center gap-1"
                          >
                            {isAdded ? <Check size={12} weight="bold" /> : <Plus size={12} weight="bold" />}
                            {isAdded ? t.added : t.add}
                          </motion.span>
                        </AnimatePresence>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          </section>
        </div>
      </div>
    </ScaledFrame>
  );
}
