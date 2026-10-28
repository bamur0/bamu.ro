"use client";

import { useEffect, useState } from "react";

type Item = { id: string; label: string };

/**
 * Índice lateral del caso: las secciones vienen del servidor (los ## del MDX) y aquí
 * solo se marca la que se está leyendo. Aparece en pantallas anchas (xl), donde cabe.
 */
export function CaseToc({ label, items }: { label: string; items: Item[] }) {
  const [active, setActive] = useState(items[0]?.id ?? null);

  useEffect(() => {
    // Activa la última sección cuyo título ya pasó la franja superior de la pantalla
    const update = () => {
      const line = window.innerHeight * 0.3;
      let current = items[0]?.id ?? null;
      for (const { id } of items) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= line) current = id;
      }
      setActive(current);
    };
    const frame = requestAnimationFrame(update);
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [items]);

  if (!items.length) return null;

  return (
    <nav aria-label={label} className="sticky top-28">
      <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.06em] text-muted">{label}</p>
      <ol className="space-y-1 border-l border-line">
        {items.map((item) => {
          const on = item.id === active;
          return (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                aria-current={on ? "location" : undefined}
                className={`-ml-px block border-l py-1 pl-4 text-sm leading-snug transition-colors duration-200 ${
                  on ? "border-accent text-ink" : "border-transparent text-muted hover:text-ink-2"
                }`}
              >
                {item.label}
              </a>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
