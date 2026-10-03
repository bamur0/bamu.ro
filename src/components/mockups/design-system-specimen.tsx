"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { ArrowRight } from "@phosphor-icons/react";
import type { Locale } from "@/i18n/config";

// Cifras leídas del archivo de Figma del sistema (v1.0).
const stats = {
  es: [
    ["599", "variantes en 117 componentes"],
    ["237", "variables: 104 primitivas y 133 tokens"],
    ["46", "íconos propios"],
    ["38", "estilos tipográficos"],
  ],
  en: [
    ["599", "variants across 117 components"],
    ["237", "variables: 104 primitives and 133 tokens"],
    ["46", "custom icons"],
    ["38", "text styles"],
  ],
};

// Cadenas primitiva → token → componente con la nomenclatura del sistema original
// (color/{rol}/{componente}/{estado}), pintadas con la paleta neutra de este sitio.
const chains = {
  es: [
    { primitive: "color/greyscale/900", token: "color/background/button/primary-normal", component: "Botón primario", swatch: "#19191b", kind: "button" },
    { primitive: "color/lime/300", token: "color/background/chip/accent", component: "Chip por vencer", swatch: "#c8f060", kind: "chip" },
    { primitive: "color/red/700", token: "color/text/accent/red", component: "Fecha vencida", swatch: "#b42318", kind: "date" },
  ],
  en: [
    { primitive: "color/greyscale/900", token: "color/background/button/primary-normal", component: "Primary button", swatch: "#19191b", kind: "button" },
    { primitive: "color/lime/300", token: "color/background/chip/accent", component: "Expiring chip", swatch: "#c8f060", kind: "chip" },
    { primitive: "color/red/700", token: "color/text/accent/red", component: "Expired date", swatch: "#b42318", kind: "date" },
  ],
} as const;

const labels = {
  es: { primitive: "Primitiva", token: "Token semántico", component: "Componente", pick: "Elige una cadena", add: "Agregar", expiring: "Por vencer", expired: "02 sep 2026" },
  en: { primitive: "Primitive", token: "Semantic token", component: "Component", pick: "Pick a chain", add: "Add", expiring: "Expiring soon", expired: "Sep 02, 2026" },
};

function Preview({ kind, locale }: { kind: string; locale: Locale }) {
  const l = labels[locale];
  if (kind === "button") return <span className="font-sans rounded-control bg-ink px-3.5 py-2 text-sm font-medium text-bg">{l.add}</span>;
  if (kind === "chip") return <span className="font-sans rounded-full bg-accent px-2.5 py-1 text-xs font-medium text-accent-ink">{l.expiring}</span>;
  return <span className="font-sans text-sm font-medium tabular-nums text-danger">{l.expired}</span>;
}

export function DesignSystemSpecimen({ locale }: { locale: Locale }) {
  const l = labels[locale];
  const list = chains[locale];
  const [active, setActive] = useState(0);
  const c = list[active];

  return (
    <div className="w-full rounded-surface border border-line bg-surface p-5 shadow-soft sm:p-6">
      <dl className="grid grid-cols-2 gap-x-6 gap-y-5 border-b border-line pb-6 sm:grid-cols-4">
        {stats[locale].map(([n, label]) => (
          <div key={label}>
            <dt className="sr-only">{label}</dt>
            <dd>
              <span className="block text-3xl font-semibold tracking-tight text-ink tabular-nums">{n}</span>
              <span className="mt-1 block text-sm leading-snug text-ink-2">{label}</span>
            </dd>
          </div>
        ))}
      </dl>

      <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm font-medium text-ink">{l.pick}</p>
        <div role="radiogroup" aria-label={l.pick} className="flex gap-1.5">
          {list.map((item, i) => (
            <button
              key={item.token}
              type="button"
              role="radio"
              aria-checked={active === i}
              aria-label={item.token}
              onClick={() => setActive(i)}
              className={`grid size-8 place-items-center rounded-full border transition-colors ${active === i ? "border-ink" : "border-line hover:border-ink-2"}`}
            >
              <span className="size-4 rounded-full ring-1 ring-inset ring-ink/15" style={{ background: item.swatch }} />
            </button>
          ))}
        </div>
      </div>

      <div className="mt-4 grid items-stretch gap-2 sm:grid-cols-[1fr_auto_1fr_auto_1fr]">
        {[
          [l.primitive, <span key="p" className="flex items-center gap-2"><span className="size-5 rounded-[5px] border border-line" style={{ background: c.swatch }} />{c.primitive}</span>],
          [l.token, <span key="t">{c.token.split("/").map((part, j, all) => (j < all.length - 1 ? <span key={j}>{part}/<wbr /></span> : part))}</span>],
          [l.component, <Preview key="c" kind={c.kind} locale={locale} />],
        ].map(([title, body], i) => (
          <div key={String(title)} className="contents">
            {i > 0 && (
              <span aria-hidden className="hidden place-items-center text-muted sm:grid">
                <ArrowRight size={14} />
              </span>
            )}
            <div className="rounded-control border border-line px-4 py-3.5">
              <p className="text-xs text-muted">{title}</p>
              <motion.div
                key={`${active}-${i}`}
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: i * 0.06, ease: [0.23, 1, 0.32, 1] }}
                className="mt-2 flex min-h-9 items-center font-mono text-[12.5px] text-ink"
              >
                {body}
              </motion.div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
