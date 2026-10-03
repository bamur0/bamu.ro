"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Locale } from "@/i18n/config";

export function LangSwitch({ to, label, short }: { to: Locale; label: string; short: string }) {
  const pathname = usePathname() ?? "/";
  // /es/work/x/ -> /en/work/x/
  const href = pathname.replace(/^\/(es|en)(?=\/|$)/, `/${to}`);

  return (
    <Link
      href={href}
      hrefLang={to}
      lang={to}
      aria-label={label}
      title={label}
      className="grid h-11 min-w-11 place-items-center sm:h-9 sm:min-w-9 rounded-full px-2.5 font-mono text-xs tracking-wide text-ink-2 transition-colors duration-150 hover:bg-surface-2 hover:text-ink"
    >
      {short}
    </Link>
  );
}
