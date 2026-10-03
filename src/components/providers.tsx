"use client";

import { ThemeProvider } from "next-themes";
import { MotionConfig } from "motion/react";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="data-theme" defaultTheme="system" enableSystem disableTransitionOnChange>
      {/* reducedMotion="user": con movimiento reducido solo se anima opacidad y color */}
      <MotionConfig reducedMotion="user" transition={{ type: "spring", duration: 0.5, bounce: 0 }}>
        {children}
      </MotionConfig>
    </ThemeProvider>
  );
}
