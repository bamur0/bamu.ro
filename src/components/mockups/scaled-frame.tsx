"use client";

import { useLayoutEffect, useRef, useState } from "react";

/**
 * Renderiza una interfaz a su ancho de diseño (p. ej. 1040px) y la escala para
 * que quepa en el contenedor. Así el mockup se ve igual que en Figma en
 * cualquier pantalla, sin rediseñarlo para cada breakpoint.
 */
export function ScaledFrame({
  width,
  height,
  children,
  className = "",
  label,
  interactive = false,
}: {
  width: number;
  height: number;
  children: React.ReactNode;
  className?: string;
  label: string;
  interactive?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState<number | null>(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => {
      setScale(entry.contentRect.width / width);
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, [width]);

  return (
    <div
      ref={ref}
      role={interactive ? "group" : "img"}
      aria-label={label}
      className={`relative w-full overflow-hidden rounded-surface border border-line bg-surface shadow-soft ${className}`}
      style={{ aspectRatio: `${width} / ${height}` }}
    >
      <div
        aria-hidden={!interactive}
        className="absolute left-0 top-0 origin-top-left"
        style={{ width, height, transform: `scale(${scale ?? 1})`, visibility: scale === null ? "hidden" : undefined }}
      >
        {children}
      </div>
    </div>
  );
}
