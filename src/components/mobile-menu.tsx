"use client";

import { useEffect, useId, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { List, X } from "@phosphor-icons/react";

type Item = { href: string; label: string };

/** Menú de navegación para pantallas angostas, donde los enlaces no caben en la barra. */
export function MobileMenu({ items, openLabel, closeLabel }: { items: Item[]; openLabel: string; closeLabel: string }) {
  const [open, setOpen] = useState(false);
  const id = useId();

  // Cerrar con Escape (los enlaces cierran el menú al hacer clic)
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <div className="sm:hidden">
      <button
        type="button"
        aria-expanded={open}
        aria-controls={id}
        aria-label={open ? closeLabel : openLabel}
        onClick={() => setOpen((o) => !o)}
        className="grid size-11 place-items-center rounded-full text-ink transition-colors hover:bg-surface-2"
      >
        {open ? <X size={20} /> : <List size={20} />}
      </button>
      <AnimatePresence>
        {open && (
          <motion.nav
            id={id}
            aria-label={openLabel}
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ type: "spring", duration: 0.3, bounce: 0 }}
            className="absolute inset-x-0 top-16 border-b border-line bg-bg px-4 pb-4"
          >
            <ul className="divide-y divide-line">
              {items.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} onClick={() => setOpen(false)} className="flex min-h-12 items-center text-lg text-ink">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>
    </div>
  );
}
