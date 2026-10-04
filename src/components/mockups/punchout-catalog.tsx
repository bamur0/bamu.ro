"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import {
  ArrowRight,
  CaretDown,
  Drop,
  Flask,
  MagnifyingGlass,
  MapPin,
  Minus,
  Package,
  Plus,
  ShoppingCart,
  TestTube,
  Timer,
  Truck,
  X,
} from "@phosphor-icons/react";
import type { Locale } from "@/i18n/config";
import { getProducts, money, ui, type Product } from "./punchout-data";
import { ScaledFrame } from "./scaled-frame";

const expand = {
  es: { open: "Explorar pantalla", close: "Cerrar" },
  en: { open: "Explore screen", close: "Close" },
};

const W = 1120;
const H = 720;

const icons = { flask: Flask, tube: TestTube, drop: Drop, package: Package };

const spring = { type: "spring", duration: 0.35, bounce: 0 } as const;

export function PunchoutCatalog({
  locale,
  interactive = false,
  label,
}: {
  locale: Locale;
  interactive?: boolean;
  label: string;
}) {
  const t = ui[locale];
  const products = getProducts(locale);
  const [cart, setCart] = useState<Record<string, number>>({ p1: 3, p3: 1, p4: 2 });
  const [qty, setQty] = useState<Record<string, number>>({});

  const lines = products.filter((p) => cart[p.id]);
  const count = lines.reduce((n, p) => n + cart[p.id], 0);
  const subtotal = lines.reduce((n, p) => n + p.price * cart[p.id], 0);
  const tax = subtotal * 0.16;

  const add = (p: Product) =>
    setCart((c) => ({ ...c, [p.id]: (c[p.id] ?? 0) + (qty[p.id] ?? 1) }));
  const remove = (id: string) =>
    setCart((c) => {
      const next = { ...c };
      delete next[id];
      return next;
    });
  const step = (id: string, d: number) =>
    setQty((q) => ({ ...q, [id]: Math.max(1, (q[id] ?? 1) + d) }));

  const tab = interactive ? 0 : -1;

  return (
    <ScaledFrame width={W} height={H} label={label} interactive={interactive} expandLabel={expand[locale].open} closeLabel={expand[locale].close}>
      <div className="flex h-full flex-col bg-bg text-[13px] text-ink" {...(!interactive && { inert: true })}>
        {/* Barra superior */}
        <div className="flex h-12 shrink-0 items-center justify-between border-b border-line bg-surface px-6">
          <div className="flex items-center gap-2.5">
            <span className="grid size-6 place-items-center rounded-[6px] bg-ink text-[12px] font-semibold text-bg">C</span>
            <span className="font-medium">{t.vendor}</span>
          </div>
          <div className="flex items-center gap-3 text-ink-2">
            <span className="rounded-full border border-line px-2 py-0.5 font-mono text-[12px]">{locale.toUpperCase()}</span>
            <span>{t.buyer}</span>
            <span className="grid size-7 place-items-center rounded-full bg-surface-2 text-[12px] font-medium text-ink">CC</span>
          </div>
        </div>

        {/* Contexto de la sesión */}
        <div className="flex h-11 shrink-0 items-center justify-between border-b border-line bg-surface px-6">
          <div className="flex items-center gap-2">
            <span className="font-medium">{t.delivery}</span>
            <MapPin size={14} className="text-muted" />
            <span className="text-ink-2 underline decoration-line underline-offset-2">{t.address}</span>
          </div>
          <div className="flex items-center gap-2.5">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-accent px-2.5 py-1 text-[12px] font-medium text-accent-ink">
              <Timer size={13} weight="bold" />
              {t.timer}
            </span>
            <span className="rounded-control border border-line px-3 py-1.5 text-[12px] font-medium">{t.cancel}</span>
          </div>
        </div>

        <div className="flex min-h-0 flex-1 gap-5 p-5">
          {/* Catálogo */}
          <div className="flex min-w-0 flex-1 flex-col gap-4">
            <div className="flex items-center justify-between gap-3">
              <p className="text-[17px] font-semibold tracking-tight">{t.products}</p>
              <div className="flex items-center gap-2">
                <span className="flex h-8 w-36 items-center justify-between rounded-control border border-line bg-surface px-2.5 text-ink-2">
                  {t.brand}
                  <CaretDown size={12} />
                </span>
                <span className="flex h-8 w-64 items-center gap-2 rounded-control border border-line bg-surface px-2.5 text-muted">
                  <MagnifyingGlass size={14} />
                  {t.search}
                </span>
              </div>
            </div>

            <div className="grid flex-1 grid-cols-3 grid-rows-2 gap-3">
              {products.map((p) => {
                const Icon = icons[p.icon];
                return (
                  <div key={p.id} className="flex flex-col rounded-[10px] border border-line bg-surface p-2.5">
                    <div className="grid h-[76px] place-items-center rounded-[7px] bg-surface-2 text-muted">
                      <Icon size={30} weight="light" />
                    </div>
                    <div className="mt-2.5 flex flex-1 flex-col gap-0.5">
                      <p className="truncate font-medium leading-tight">{p.name}</p>
                      <p className="text-[12px] text-muted">{p.size}</p>
                      <p className="mt-1 text-[15px] font-semibold tracking-tight">{money(p.price)}</p>
                      <p className="font-mono text-[11.5px] text-ink-2">
                        SKU {p.sku} &nbsp; CAS {p.cas}
                      </p>
                      <p className="mt-auto flex items-center gap-1 text-[12px] text-ink-2">
                        <Truck size={13} />
                        {t.eta(p.days)}
                      </p>
                    </div>
                    <div className="mt-2 flex items-center gap-1.5">
                      <div className="flex h-8 flex-1 items-center justify-between rounded-control border border-line px-1">
                        <button tabIndex={tab} aria-label="-1" onClick={() => step(p.id, -1)} className="grid size-6 place-items-center rounded-[5px] text-muted hover:bg-surface-2">
                          <Minus size={12} />
                        </button>
                        <span className="tabular-nums">{qty[p.id] ?? 1}</span>
                        <button tabIndex={tab} aria-label="+1" onClick={() => step(p.id, 1)} className="grid size-6 place-items-center rounded-[5px] text-muted hover:bg-surface-2">
                          <Plus size={12} />
                        </button>
                      </div>
                      <button
                        tabIndex={tab}
                        onClick={() => add(p)}
                        className="h-8 flex-1 rounded-control bg-ink text-[12px] font-medium text-bg transition-transform duration-150 active:scale-[0.96]"
                      >
                        {t.add}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Carrito */}
          <aside className="flex w-[270px] shrink-0 flex-col rounded-[10px] border border-line bg-surface">
            <div className="flex items-center justify-between border-b border-line px-4 py-3">
              <div>
                <p className="font-semibold">{t.cart}</p>
                <p className="text-[12px] text-muted">{t.items(count)}</p>
              </div>
              <ShoppingCart size={18} className="text-ink-2" />
            </div>

            <div className="relative flex-1 overflow-hidden px-4 py-2">
              <AnimatePresence initial={false} mode="popLayout">
                {lines.length === 0 ? (
                  <motion.div
                    key="empty"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex h-full flex-col items-center justify-center text-center"
                  >
                    <p className="font-medium">{t.emptyTitle}</p>
                    <p className="mt-1 max-w-[180px] text-[12px] text-muted">{t.empty}</p>
                  </motion.div>
                ) : (
                  lines.map((p) => (
                    <motion.div
                      key={p.id}
                      layout
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.96 }}
                      transition={spring}
                      className="flex items-start gap-2 border-b border-line py-2.5 last:border-0"
                    >
                      <div className="min-w-0 flex-1">
                        <p className="truncate font-medium">{p.name}</p>
                        <p className="text-[12px] text-muted">
                          {cart[p.id]} × {money(p.price)}
                        </p>
                      </div>
                      <button
                        tabIndex={tab}
                        aria-label="Quitar"
                        onClick={() => remove(p.id)}
                        className="grid size-6 place-items-center rounded-[5px] text-muted hover:bg-surface-2 hover:text-ink"
                      >
                        <X size={12} />
                      </button>
                    </motion.div>
                  ))
                )}
              </AnimatePresence>
            </div>

            <div className="space-y-1.5 border-t border-line px-4 py-3 text-[12px]">
              <div className="flex justify-between text-ink-2">
                <span>{t.subtotal}</span>
                <span className="tabular-nums">{money(subtotal)}</span>
              </div>
              <div className="flex justify-between text-ink-2">
                <span>{t.tax}</span>
                <span className="tabular-nums">{money(tax)}</span>
              </div>
              <div className="flex justify-between pt-1 text-[14px] font-semibold">
                <span>{t.total}</span>
                <span className="tabular-nums">{money(subtotal + tax)}</span>
              </div>
            </div>
            <div className="px-4 pb-4">
              <button
                tabIndex={tab}
                disabled={lines.length === 0}
                className="flex h-9 w-full items-center justify-center gap-2 rounded-control bg-accent text-[12.5px] font-semibold text-accent-ink transition-opacity disabled:opacity-40"
              >
                {t.transfer}
                <ArrowRight size={14} weight="bold" />
              </button>
            </div>
          </aside>
        </div>
      </div>
    </ScaledFrame>
  );
}
