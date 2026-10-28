"use client";

import { motion, useScroll, useSpring } from "motion/react";

/** Línea fina arriba de la pantalla que avanza con la lectura del caso. */
export function ReadingProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 260, damping: 40, restDelta: 0.001 });
  return (
    <motion.div
      aria-hidden
      style={{ scaleX }}
      className="no-print fixed inset-x-0 top-0 z-30 h-0.5 origin-left bg-ink"
    />
  );
}
