"use client";

import { useLayoutEffect, useRef, useState } from "react";

/** Escala mínima de un mockup interactivo: por debajo, el texto deja de ser legible. */
const MIN_INTERACTIVE_SCALE = 0.85;

/**
 * Renderiza una interfaz a su ancho de diseño (p. ej. 1120px) y la escala para
 * que quepa en el contenedor, así el mockup se ve igual que en Figma.
 * Los mockups interactivos no bajan de MIN_INTERACTIVE_SCALE: en pantallas
 * angostas se recorren con scroll horizontal en lugar de volverse ilegibles.
 */
export function ScaledFrame({
  width,
  height,
  children,
  className = "",
  label,
  interactive = false,
  scrollHint,
}: {
  width: number;
  height: number;
  children: React.ReactNode;
  className?: string;
  label: string;
  interactive?: boolean;
  scrollHint?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [fit, setFit] = useState<number | null>(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => setFit(entry.contentRect.width / width));
    ro.observe(el);
    return () => ro.disconnect();
  }, [width]);

  const scale = fit === null ? null : interactive ? Math.max(fit, MIN_INTERACTIVE_SCALE) : fit;
  const scrolls = fit !== null && scale !== null && scale > fit + 0.001;

  return (
    <div ref={ref} className="w-full">
      <div
        role={interactive ? "group" : "img"}
        aria-label={label}
        tabIndex={scrolls ? 0 : undefined}
        className={`relative w-full rounded-surface border border-line bg-surface shadow-soft ${
          scrolls ? "overflow-x-auto overscroll-x-contain" : "overflow-hidden"
        } ${className}`}
        style={scale === null ? { aspectRatio: `${width} / ${height}` } : { height: height * scale }}
      >
        <div className="relative" style={scale === null ? undefined : { width: width * scale, height: height * scale }}>
          <div
            aria-hidden={!interactive}
            className="scaled-inner absolute left-0 top-0 origin-top-left"
            style={{
              width,
              height,
              transform: `scale(${scale ?? 1})`,
              visibility: scale === null ? "hidden" : undefined,
            }}
          >
            {children}
          </div>
        </div>
      </div>
      {scrolls && scrollHint && <p className="mt-2 text-sm text-muted">{scrollHint}</p>}
      {/* Sin JavaScript no hay medición: se muestra a tamaño real dentro del marco */}
      <noscript>
        <style>{`.scaled-inner{visibility:visible!important}`}</style>
      </noscript>
    </div>
  );
}
