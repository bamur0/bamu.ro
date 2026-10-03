import Link from "next/link";
import { otherLocale, type Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { LangSwitch } from "./lang-switch";
import { MobileMenu } from "./mobile-menu";
import { ThemeToggle } from "./theme-toggle";

export function SiteHeader({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const to = otherLocale(locale);
  const items = [
    { href: `/${locale}/#work`, label: dict.nav.work },
    { href: `/${locale}/#about`, label: dict.nav.about },
    { href: `/${locale}/cv/`, label: dict.nav.cv },
    { href: `/${locale}/#contact`, label: dict.nav.contact },
  ];

  return (
    <header className="no-print sticky top-0 z-20 bg-bg/80 px-4 backdrop-blur-md supports-[not(backdrop-filter:blur(0))]:bg-bg sm:px-6">
      <a
        href="#main"
        className="sr-only rounded-full bg-ink px-4 py-2 text-sm text-bg focus:not-sr-only focus:absolute focus:left-4 focus:top-3"
      >
        {dict.nav.skip}
      </a>
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between">
        <Link href={`/${locale}/`} className="flex min-h-11 items-center text-[15px] font-semibold tracking-tight text-ink">
          bamu<span className="text-muted">.ro</span>
        </Link>
        <div className="flex items-center gap-0.5">
          <nav aria-label={dict.nav.main} className="hidden items-center gap-0.5 sm:flex">
            {items.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-full px-3 py-1.5 text-sm text-ink-2 transition-colors duration-150 hover:bg-surface-2 hover:text-ink"
              >
                {item.label}
              </Link>
            ))}
            <span aria-hidden className="mx-1.5 h-4 w-px bg-line" />
          </nav>
          <LangSwitch to={to} label={dict.nav.switchLang} short={dict.nav.switchLangShort} />
          <ThemeToggle label={dict.nav.theme} />
          <MobileMenu items={items} openLabel={dict.nav.menu} closeLabel={dict.nav.closeMenu} />
        </div>
      </div>
    </header>
  );
}
