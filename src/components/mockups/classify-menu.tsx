"use client";

import { useEffect, useId, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowCounterClockwise, CheckCircle, Lock } from "@phosphor-icons/react";
import type { Locale } from "@/i18n/config";

type Option = "quote" | "order" | "payment" | "other";
const OPTIONS: Option[] = ["quote", "order", "payment", "other"];

// Datos ficticios
const ui = {
  es: {
    context: "Solicitud de cotización · Laboratorios Quetzal",
    title: "Clasificar como",
    options: { quote: "Cotización", order: "Pedido", payment: "Cobro", other: "Otros" },
    result: "Este pendiente se clasificará como:",
    resultOther: "Se eliminará este pendiente y el correo pasará a Otros.",
    resultEmpty: "Elige al menos una clasificación.",
    confirm: "Confirmar clasificación",
    remove: "Eliminar pendiente",
    done: "Clasificación confirmada",
    doneOther: "Pendiente eliminado",
    fixed: "Confirmada",
    reset: "Reiniciar",
  },
  en: {
    context: "Quote request · Quetzal Laboratories",
    title: "Classify as",
    options: { quote: "Quote", order: "Order", payment: "Payment", other: "Other" },
    result: "This task will be classified as:",
    resultOther: "This task will be deleted and the email moved to Other.",
    resultEmpty: "Pick at least one classification.",
    confirm: "Confirm classification",
    remove: "Delete task",
    done: "Classification confirmed",
    doneOther: "Task deleted",
    fixed: "Confirmed",
    reset: "Reset",
  },
};

/** Lo que el clasificador automático asignó al correo */
const SYSTEM: Option[] = ["quote"];

const same = (a: Set<Option>, b: Set<Option>) => a.size === b.size && [...a].every((x) => b.has(x));

/**
 * Menú de clasificación del pendiente, recreado con sus reglas: el botón solo se
 * activa si algo cambió, Otros excluye al resto y convierte la acción en eliminar,
 * y lo ya confirmado queda fijo.
 */
export function ClassifyMenu({ locale }: { locale: Locale }) {
  const t = ui[locale];
  const id = useId();
  const [base, setBase] = useState<Set<Option>>(() => new Set(SYSTEM));
  const [locked, setLocked] = useState<Set<Option>>(() => new Set());
  const [selected, setSelected] = useState<Set<Option>>(() => new Set(SYSTEM));
  const [toast, setToast] = useState<null | "done" | "doneOther">(null);
  const [removed, setRemoved] = useState(false);

  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => setToast(null), 3000);
    return () => clearTimeout(timer);
  }, [toast]);

  const isOther = selected.has("other");
  const changed = !same(selected, base);
  const canConfirm = changed && selected.size > 0 && !removed;

  function toggle(o: Option) {
    setSelected((prev) => {
      if (o === "other") return prev.has("other") ? new Set(locked) : new Set(["other"]);
      const next = new Set(prev);
      if (next.has(o)) next.delete(o);
      else next.add(o);
      return next;
    });
  }

  function confirm() {
    if (isOther) {
      setRemoved(true);
      setToast("doneOther");
      return;
    }
    setLocked(new Set(selected));
    setBase(new Set(selected));
    setToast("done");
  }

  function reset() {
    setBase(new Set(SYSTEM));
    setLocked(new Set());
    setSelected(new Set(SYSTEM));
    setRemoved(false);
    setToast(null);
  }

  const chosen = OPTIONS.filter((o) => selected.has(o)).map((o) => t.options[o]);

  return (
    <div className="relative mx-auto w-full max-w-sm">
      <div
        className={`rounded-surface border border-line bg-surface shadow-soft transition-opacity duration-300 ${removed ? "opacity-50" : ""}`}
      >
        <div className="border-b border-line px-5 py-4">
          <p className="text-xs text-muted">{t.context}</p>
          <p className="mt-1 text-[17px] font-semibold tracking-tight text-ink">{t.title}</p>
        </div>

        <fieldset disabled={removed} className="space-y-2 px-5 py-4">
          <legend className="sr-only">{t.title}</legend>
          {OPTIONS.map((o) => {
            const fixed = locked.has(o);
            // Otros excluye al resto, y deja de estar disponible una vez que hay algo confirmado
            const blocked = !fixed && (o === "other" ? locked.size > 0 : isOther);
            const checked = selected.has(o);
            return (
              <label
                key={o}
                htmlFor={`${id}-${o}`}
                className={`flex items-center gap-3 rounded-control border px-3.5 py-2.5 text-sm transition-colors duration-150 ${
                  fixed ? "border-transparent bg-surface-2" : "cursor-pointer border-line hover:bg-surface-2/60"
                } ${blocked ? "cursor-not-allowed opacity-45 hover:bg-transparent" : ""}`}
              >
                {fixed ? (
                  <Lock size={15} className="text-muted" />
                ) : (
                  <input
                    id={`${id}-${o}`}
                    type="checkbox"
                    checked={checked}
                    disabled={blocked}
                    onChange={() => toggle(o)}
                    className="size-4 accent-[var(--ink)]"
                  />
                )}
                <span className={checked ? "font-medium text-ink" : "text-ink-2"}>{t.options[o]}</span>
                {fixed && <span className="ml-auto font-mono text-[11px] text-muted">{t.fixed}</span>}
              </label>
            );
          })}

          <p className="min-h-10 pt-1 text-[13px] leading-snug text-ink-2" aria-live="polite">
            {selected.size === 0 ? (
              t.resultEmpty
            ) : isOther ? (
              t.resultOther
            ) : (
              <>
                {t.result} <strong className="font-semibold text-ink">{chosen.join(", ")}</strong>
              </>
            )}
          </p>
        </fieldset>

        <div className="flex items-center justify-between gap-3 border-t border-line px-5 py-3.5">
          <button
            type="button"
            onClick={reset}
            className="inline-flex h-9 items-center gap-1.5 rounded-control px-2 text-sm text-ink-2 transition-colors hover:text-ink"
          >
            <ArrowCounterClockwise size={14} />
            {t.reset}
          </button>
          <button
            type="button"
            onClick={confirm}
            disabled={!canConfirm}
            className={`h-9 rounded-control px-4 text-sm font-medium transition-[background-color,color,transform,opacity] duration-200 active:scale-[0.97] disabled:pointer-events-none disabled:opacity-40 ${
              isOther ? "bg-danger text-white" : "bg-ink text-bg"
            }`}
          >
            {isOther ? t.remove : t.confirm}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {toast && (
          <motion.div
            role="status"
            initial={{ opacity: 0, y: 8, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 4 }}
            transition={{ type: "spring", duration: 0.35, bounce: 0.1 }}
            className="absolute inset-x-5 -bottom-5 flex items-center gap-2 rounded-control bg-ink px-4 py-3 text-sm text-bg shadow-soft"
          >
            <CheckCircle size={18} weight="fill" className="shrink-0 text-accent" />
            {t[toast]}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
