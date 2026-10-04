"use client";

import { useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import type { Locale } from "@/i18n/config";

const KEY = "lang-switch-scroll";

/**
 * Cambia de idioma sin perder el lugar: misma página, misma sección (#hash)
 * y la misma posición relativa de scroll, ya que ambas versiones tienen la misma estructura.
 */
export function LangSwitch({ to, label, short }: { to: Locale; label: string; short: string }) {
  const pathname = usePathname() ?? "/";
  const router = useRouter();
  // /es/work/x/ -> /en/work/x/
  const href = pathname.replace(/^\/(es|en)(?=\/|$)/, `/${to}`);

  // Al llegar a la página en el otro idioma, restaurar la posición guardada
  useEffect(() => {
    let saved: string | null = null;
    try {
      saved = sessionStorage.getItem(KEY);
      sessionStorage.removeItem(KEY);
    } catch {}
    if (saved === null) return;
    const ratio = Number(saved);
    requestAnimationFrame(() => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      window.scrollTo({ top: Math.max(0, ratio * max), behavior: "instant" });
    });
  }, [pathname]);

  function onClick(e: React.MouseEvent<HTMLAnchorElement>) {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
    e.preventDefault();
    const max = document.documentElement.scrollHeight - window.innerHeight;
    try {
      sessionStorage.setItem(KEY, String(max > 0 ? window.scrollY / max : 0));
    } catch {}
    // Recordar la elección: al volver a bamu.ro se abre en este idioma (functions/index.js)
    document.cookie = `lang=${to}; path=/; max-age=31536000; samesite=lax`;
    router.push(href + window.location.hash, { scroll: false });
  }

  return (
    <Link
      href={href}
      onClick={onClick}
      hrefLang={to}
      lang={to}
      aria-label={label}
      title={label}
      className="grid h-11 min-w-11 place-items-center rounded-full px-2.5 font-mono text-xs tracking-wide text-ink-2 transition-colors duration-150 hover:bg-surface-2 hover:text-ink sm:h-9 sm:min-w-9"
    >
      {short}
    </Link>
  );
}
