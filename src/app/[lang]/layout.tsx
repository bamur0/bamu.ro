import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Geist, Geist_Mono } from "next/font/google";
import { hasLocale, locales } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { site } from "@/lib/site";
import { languagesFor, openGraphFor } from "@/lib/seo";
import { Providers } from "@/components/providers";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import "../globals.css";

const geist = Geist({ subsets: ["latin"], variable: "--font-geist", display: "swap" });
const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono", display: "swap" });

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
      languages: languagesFor((l) => `/${l}/`),
    },
    openGraph: openGraphFor(lang, { title: dict.meta.title, description: dict.meta.description, path: `/${lang}/` }),
    twitter: { card: "summary_large_image" },
  };
}

export default async function LangLayout({ children, params }: LayoutProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = getDictionary(lang);

  return (
    <html lang={lang} suppressHydrationWarning className={`${geist.variable} ${geistMono.variable} antialiased`}>
      <body className="min-h-dvh">
        <Providers>
          <SiteHeader locale={lang} dict={dict} />
          <main id="main">{children}</main>
          <SiteFooter dict={dict} />
        </Providers>
      </body>
    </html>
  );
}
