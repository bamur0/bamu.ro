"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "motion/react";
import { ArrowsOut, X } from "@phosphor-icons/react";

/** Escala mínima para interactuar con un mockup: por debajo, el texto deja de ser legible. */
const MIN_INTERACTIVE_SCALE = 0.85;

/**
 * Renderiza una interfaz a su ancho de diseño (p. ej. 1120px) y la escala para
 * que quepa en el contenedor, así el mockup se ve igual que en Figma.
 * Si un mockup interactivo no cabe legible (pantallas angostas), se muestra
 * completo como vista previa y se abre a pantalla completa para explorarlo.
 */
export function ScaledFrame({
  width,
  height,
  children,
  className = "",
  label,
  interactive = false,
  expandLabel,
  closeLabel,
}: {
  width: number;
  height: number;
  children: React.ReactNode;
  className?: string;
  label: string;
  interactive?: boolean;
  expandLabel?: string;
  closeLabel?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [fit, setFit] = useState<number | null>(null);
  const [open, setOpen] = useState(false);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => setFit(entry.contentRect.width / width));
    ro.observe(el);
    return () => ro.disconnect();
  }, [width]);

  // Interactivo en su lugar solo si cabe legible; si no, se explora a pantalla completa
  const inline = interactive && fit !== null && fit >= MIN_INTERACTIVE_SCALE;
  const expandable = interactive && fit !== null && !inline;

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div ref={ref} className="relative w-full">
      <div
        role={inline ? "group" : "img"}
        aria-label={label}
        className={`relative w-full overflow-hidden rounded-surface border border-line bg-surface shadow-soft ${className}`}
        style={{ aspectRatio: `${width} / ${height}` }}
      >
        <div
          aria-hidden={!inline}
          {...(!inline && { inert: true })}
          className="scaled-inner absolute left-0 top-0 origin-top-left"
          style={{
            width,
            height,
            transform: `scale(${fit ?? 1})`,
            visibility: fit === null ? "hidden" : undefined,
          }}
        >
          {children}
        </div>
      </div>

      {expandable && expandLabel && (
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="mt-3 inline-flex h-11 items-center gap-2 rounded-full border border-line px-4 text-sm font-medium text-ink transition-[background-color,transform] duration-150 hover:bg-surface-2 active:scale-[0.97]"
        >
          <ArrowsOut size={16} weight="bold" />
          {expandLabel}
        </button>
      )}

      {expandable &&
        typeof document !== "undefined" &&
        createPortal(
          <AnimatePresence>
            {open && (
              <motion.div
                role="dialog"
                aria-modal="true"
                aria-label={label}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="fixed inset-0 z-40 flex flex-col bg-bg"
              >
                <div className="flex h-14 shrink-0 items-center justify-between gap-3 border-b border-line px-4">
                  <p className="truncate text-sm font-medium text-ink">{label}</p>
                  <button
                    type="button"
                    autoFocus
                    aria-label={closeLabel}
                    onClick={() => setOpen(false)}
                    className="grid size-11 shrink-0 place-items-center rounded-full text-ink hover:bg-surface-2"
                  >
                    <X size={20} />
                  </button>
                </div>
                <div className="min-h-0 flex-1 overflow-auto overscroll-contain p-4">
                  <div
                    className="relative overflow-hidden rounded-surface border border-line bg-surface"
                    style={{ width: width * MIN_INTERACTIVE_SCALE, height: height * MIN_INTERACTIVE_SCALE }}
                  >
                    <div
                      className="absolute left-0 top-0 origin-top-left"
                      style={{ width, height, transform: `scale(${MIN_INTERACTIVE_SCALE})` }}
                    >
                      {children}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body,
        )}

      {/* Sin JavaScript no hay medición: se muestra a tamaño real dentro del marco */}
      <noscript>
        <style>{`.scaled-inner{visibility:visible!important}`}</style>
      </noscript>
    </div>
  );
}
