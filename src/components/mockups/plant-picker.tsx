"use client";

import { useId, useState } from "react";
import { motion } from "motion/react";
import type { Locale } from "@/i18n/config";
import { plants, ui } from "./punchout-data";

/** Paso 2 del flujo PunchOut: elegir planta de entrega antes de entrar al catálogo. */
export function PlantPicker({ locale }: { locale: Locale }) {
  const t = ui[locale];
  const list = plants[locale];
  const [selected, setSelected] = useState(list[0].id);
  const name = useId();

  return (
    <div className="mx-auto w-full max-w-md rounded-surface border border-line bg-surface shadow-soft">
      <div className="border-b border-line px-5 py-4">
        <p className="text-[17px] font-semibold tracking-tight text-ink">{t.plantTitle}</p>
        <p className="mt-0.5 text-sm text-ink-2">{t.plantLead}</p>
      </div>
      <fieldset className="space-y-2 px-5 py-4">
        <legend className="sr-only">{t.plantTitle}</legend>
        {list.map((p) => {
          const active = p.id === selected;
          return (
            <label
              key={p.id}
              className="relative flex cursor-pointer items-start gap-3 rounded-control px-3.5 py-3 text-sm"
            >
              {active ? (
                <motion.span
                  layoutId={`${name}-ring`}
                  className="absolute inset-0 border-[1.5px] border-ink"
                  style={{ borderRadius: 8 }}
                  transition={{ type: "spring", duration: 0.4, bounce: 0.15 }}
                />
              ) : (
                <span className="absolute inset-0 rounded-control border border-line" />
              )}
              <input
                type="radio"
                name={name}
                value={p.id}
                checked={active}
                onChange={() => setSelected(p.id)}
                className="relative mt-0.5 size-4 accent-[var(--ink)]"
              />
              <span className="relative">
                <span className={`block ${active ? "font-semibold text-ink" : "text-ink"}`}>{p.name}</span>
                <span className="block text-muted">{p.mode}</span>
                <span className="block text-ink-2">{p.address}</span>
              </span>
            </label>
          );
        })}
        <p className="pt-1 text-xs text-muted">{t.plantHelp}</p>
      </fieldset>
      <div className="flex justify-end border-t border-line px-5 py-3.5">
        <button
          type="button"
          className="h-9 rounded-control bg-ink px-4 text-sm font-medium text-bg transition-transform duration-150 active:scale-[0.97]"
        >
          {t.plantConfirm}
        </button>
      </div>
    </div>
  );
}
