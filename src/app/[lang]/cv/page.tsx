import type { Metadata } from "next";
import { languagesFor, openGraphFor } from "@/lib/seo";
import { notFound } from "next/navigation";
import { hasLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { cv } from "@/content/cv";
import { CvSheet } from "@/components/cv-sheet";
import { DownloadCvButton } from "@/components/download-cv-button";

export async function generateMetadata({ params }: PageProps<"/[lang]/cv">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const dict = getDictionary(lang);
  return {
    title: dict.cv.title,
    description: dict.cv.description,
    alternates: { canonical: `/${lang}/cv/`, languages: languagesFor((l) => `/${l}/cv/`) },
    openGraph: openGraphFor(lang, {
      title: `${dict.cv.title} · Roberto Báez`,
      description: dict.cv.description,
      path: `/${lang}/cv/`,
    }),
  };
}

export default async function CvPage({ params }: PageProps<"/[lang]/cv">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = getDictionary(lang);

  return (
    <div className="px-4 sm:px-6">
      <div className="no-print mx-auto flex max-w-[816px] items-center justify-between gap-4 pb-8 pt-10 md:pt-16">
        <h1 className="text-3xl font-semibold tracking-tight text-ink md:text-4xl">{dict.cv.title}</h1>
        <DownloadCvButton href={`/cv/roberto-baez-cv-${lang}.pdf`} label={dict.cv.download} />
      </div>
      <CvSheet cv={cv[lang]} />
    </div>
  );
}
