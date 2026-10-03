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
      className="grid h-9 min-w-9 place-items-center rounded-full px-2.5 font-mono text-xs tracking-wide text-ink-2 transition-colors duration-150 hover:bg-surface-2 hover:text-ink"
    >
      {short}
    </Link>
  );
}
