"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "motion/react";
import { ArrowsOut, X } from "@phosphor-icons/react";
import type { Locale } from "@/i18n/config";

const labels = {
  es: { open: "Ver pantalla completa", close: "Cerrar" },
  en: { open: "View full screen", close: "Close" },
};

/**
 * Pantalla exportada de Figma (con datos ficticios). Se ve enmarcada como los
 * mockups recreados y se abre a pantalla completa para leer el detalle.
 */
export function ScreenShot({
  src,
  alt,
  width,
  height,
  locale,
  priority = false,
  retina = false,
}: {
  src: string;
  alt: string;
  width: number;
  height: number;
  locale: Locale;
  priority?: boolean;
  /** Recorte exportado a 2x: se muestra a su tamaño de diseño, no más grande */
  retina?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const t = labels[locale];

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
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label={`${t.open}: ${alt}`}
        className="group relative mx-auto block w-full cursor-zoom-in overflow-hidden rounded-surface border border-line bg-surface shadow-soft"
        style={retina ? { maxWidth: width / 2 } : undefined}
      >
        {/* eslint-disable-next-line @next/next/no-img-element -- export estático, imágenes ya optimizadas */}
        <img
          src={src}
          alt={alt}
          width={width}
          height={height}
          loading={priority ? "eager" : "lazy"}
          decoding="async"
          className="block h-auto w-full"
        />
        <span className="absolute bottom-3 right-3 grid size-9 place-items-center rounded-full border border-line bg-surface/90 text-ink opacity-0 shadow-soft transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100">
          <ArrowsOut size={16} weight="bold" />
        </span>
      </button>

      {typeof document !== "undefined" &&
        createPortal(
          <AnimatePresence>
            {open && (
              <motion.div
                role="dialog"
                aria-modal="true"
                aria-label={alt}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="fixed inset-0 z-40 flex flex-col bg-bg"
              >
                <div className="flex h-14 shrink-0 items-center justify-between gap-3 border-b border-line px-4">
                  <p className="truncate text-sm font-medium text-ink">{alt}</p>
                  <button
                    type="button"
                    autoFocus
                    aria-label={t.close}
                    onClick={() => setOpen(false)}
                    className="grid size-11 shrink-0 place-items-center rounded-full text-ink hover:bg-surface-2"
                  >
                    <X size={20} />
                  </button>
                </div>
                {/* En pantallas angostas se ve a tamaño real y se recorre con scroll */}
                <div className="min-h-0 flex-1 overflow-auto overscroll-contain p-4" onClick={() => setOpen(false)}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={src}
                    alt=""
                    width={width}
                    height={height}
                    className={`mx-auto block h-auto w-auto max-w-none rounded-surface border border-line md:min-w-0 md:max-w-full ${retina ? "" : "min-w-[960px]"}`}
                    style={retina ? { width: width / 2 } : undefined}
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body,
        )}
    </>
  );
}
