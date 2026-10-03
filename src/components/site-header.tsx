import Link from "next/link";
import { otherLocale, type Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { LangSwitch } from "./lang-switch";
import { ThemeToggle } from "./theme-toggle";

export function SiteHeader({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const to = otherLocale(locale);
  const navLink =
    "rounded-full px-3 py-1.5 text-sm text-ink-2 transition-colors duration-150 hover:bg-surface-2 hover:text-ink";

  return (
    <header className="no-print sticky top-0 z-20 bg-bg/80 px-4 sm:px-6 backdrop-blur-md supports-[not(backdrop-filter:blur(0))]:bg-bg">
      <a
        href="#main"
        className="sr-only rounded-full bg-ink px-4 py-2 text-sm text-bg focus:not-sr-only focus:absolute focus:left-4 focus:top-3"
      >
        {dict.nav.skip}
      </a>
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between">
        <Link href={`/${locale}/`} className="text-[15px] font-semibold tracking-tight text-ink">
          bamu<span className="text-muted">.ro</span>
        </Link>
        <nav aria-label="Principal" className="flex items-center gap-0.5">
          <Link href={`/${locale}/#work`} className={`${navLink} hidden sm:inline-flex`}>
            {dict.nav.work}
          </Link>
          <Link href={`/${locale}/#about`} className={`${navLink} hidden sm:inline-flex`}>
            {dict.nav.about}
          </Link>
          <Link href={`/${locale}/cv/`} className={navLink}>
            {dict.nav.cv}
          </Link>
          <Link href={`/${locale}/#contact`} className={`${navLink} hidden sm:inline-flex`}>
            {dict.nav.contact}
          </Link>
          <span aria-hidden className="mx-1.5 h-4 w-px bg-line" />
          <LangSwitch to={to} label={dict.nav.switchLang} short={dict.nav.switchLangShort} />
          <ThemeToggle label={dict.nav.theme} />
        </nav>
      </div>
    </header>
  );
}
