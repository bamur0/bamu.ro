import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { IBM_Plex_Mono, Onest } from "next/font/google";
import { hasLocale, locales } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { site } from "@/lib/site";
import { Providers } from "@/components/providers";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Intro, introScript } from "@/components/intro";
import "../globals.css";

const onest = Onest({ subsets: ["latin"], variable: "--font-onest", display: "swap" });
const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-plex-mono",
  display: "swap",
});

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: LayoutProps<"/[lang]">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const dict = getDictionary(lang);
  return {
    metadataBase: new URL(site.url),
    title: { default: dict.meta.title, template: `%s · Roberto Báez` },
    description: dict.meta.description,
    alternates: {
      canonical: `/${lang}/`,
      languages: { es: "/es/", en: "/en/" },
    },
    openGraph: {
      title: dict.meta.title,
      description: dict.meta.description,
      url: `/${lang}/`,
      siteName: "bamu.ro",
      locale: lang === "es" ? "es_MX" : "en_US",
      type: "website",
      images: [{ url: `/og/og-${lang}-2x.png`, width: 2400, height: 1260, alt: dict.meta.title }],
    },
    twitter: { card: "summary_large_image" },
  };
}

export default async function LangLayout({ children, params }: LayoutProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = getDictionary(lang);

  return (
    <html lang={lang} suppressHydrationWarning className={`${onest.variable} ${plexMono.variable} antialiased`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: introScript }} />
      </head>
      <body className="min-h-dvh">
        <Intro />
        <Providers>
          <SiteHeader locale={lang} dict={dict} />
          <main id="main">{children}</main>
          <SiteFooter dict={dict} />
        </Providers>
      </body>
    </html>
  );
}
