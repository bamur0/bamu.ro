import type { Metadata } from "next";
import { languagesFor, openGraphFor } from "@/lib/seo";
import Link from "next/link";
import { notFound } from "next/navigation";
import { compileMDX } from "next-mdx-remote/rsc";
import { ArrowRight, ArrowLeft } from "@phosphor-icons/react/ssr";
import { hasLocale, locales } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { getCase, getCaseSlugs, getCases } from "@/lib/cases";
import { getMdxComponents } from "@/components/mdx";
import { CaseCover } from "@/components/case-cover";
import { Reveal } from "@/components/reveal";
import { CaseToc } from "@/components/case-toc";
import { ReadingProgress } from "@/components/reading-progress";
import { sectionsOf } from "@/lib/slug";

export const dynamicParams = false;

export async function generateStaticParams() {
  const slugs = await getCaseSlugs();
  return locales.flatMap((lang) => slugs.map((slug) => ({ lang, slug })));
}

export async function generateMetadata({ params }: PageProps<"/[lang]/work/[slug]">): Promise<Metadata> {
  const { lang, slug } = await params;
  if (!hasLocale(lang)) return {};
  const c = await getCase(slug, lang);
  return {
    title: c.title,
    description: c.summary,
    alternates: {
      canonical: `/${lang}/work/${slug}/`,
      languages: languagesFor((l) => `/${l}/work/${slug}/`),
    },
    openGraph: openGraphFor(lang, {
      title: `${c.title} · Roberto Báez`,
      description: c.summary,
      path: `/${lang}/work/${slug}/`,
      type: "article",
    }),
  };
}

export default async function CasePage({ params }: PageProps<"/[lang]/work/[slug]">) {
  const { lang, slug } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = getDictionary(lang);
  const c = await getCase(slug, lang);
  const all = await getCases(lang);
  const next = all[(all.findIndex((x) => x.slug === slug) + 1) % all.length];

  const { content } = await compileMDX({
    source: c.body,
    components: getMdxComponents(lang),
  });

  const facts = [
    [dict.case.role, c.role],
    [dict.case.duration, c.duration],
    [dict.case.team, c.team],
    [dict.case.year, c.year],
    [dict.case.status, c.status],
  ].filter((f): f is [string, string] => Boolean(f[1]));

  return (
    <article>
      <ReadingProgress />
      <header className="px-5 pt-8 sm:px-8 md:pt-12">
        <div className="mx-auto max-w-6xl">
          <Link
            href={`/${lang}/#work`}
            className="group inline-flex min-h-11 items-center gap-1.5 text-sm text-ink-2 transition-colors hover:text-ink"
          >
            <ArrowLeft size={14} className="transition-transform duration-300 ease-out-quint group-hover:-translate-x-0.5" />
            {dict.case.back}
          </Link>
          <div className="mt-10 md:mt-16">
            <p className="flex items-center gap-2 text-sm text-muted">
              <span aria-hidden className="size-2 rounded-full" style={{ background: c.tint }} />
              {c.client} · {c.type}
            </p>
            <h1 className="font-display mt-5 max-w-[18ch] text-[clamp(40px,6vw,80px)] leading-[1.02] text-ink text-balance">
              {c.title}
            </h1>
            <p className="mt-6 max-w-[58ch] text-lg leading-relaxed text-ink-2 text-pretty md:text-xl">{c.summary}</p>
          </div>
        </div>
      </header>

      <div className="px-5 sm:px-8">
        <Reveal className="mx-auto mt-12 max-w-6xl md:mt-16">
          <CaseCover cover={c.cover} image={c.coverImage} title={c.title} locale={lang} interactive />
          <p className="mt-3 max-w-2xl text-sm text-muted">{c.note ?? dict.case.nda}</p>
        </Reveal>

        {/* Problema, lo que hice y resultado; los datos del caso en una fila debajo */}
        <div className="mx-auto mt-14 max-w-6xl md:mt-20">
          <dl className="grid gap-8 border-t border-line pt-8 md:grid-cols-3">
            {[
              [dict.case.problem, c.problem],
              [dict.case.did, c.did],
              [dict.case.impact, c.impact],
            ].map(([k, v]) => (
              <div key={k}>
                <dt className="label">{k}</dt>
                <dd className="mt-3 text-[17px] font-medium leading-snug text-ink text-pretty">{v}</dd>
              </div>
            ))}
          </dl>
          <dl className="mt-10 grid grid-cols-2 gap-x-6 gap-y-6 border-t border-line pt-8 sm:grid-cols-3 lg:grid-cols-5">
            {facts.map(([k, v]) => (
              <div key={k}>
                <dt className="label">{k}</dt>
                <dd className="mt-2 text-[15px] text-ink-2">{v}</dd>
              </div>
            ))}
          </dl>
        </div>

        {/* Cuerpo con índice lateral en pantallas anchas */}
        <div className="mx-auto max-w-6xl pt-8 xl:grid xl:grid-cols-[200px_minmax(0,660px)_200px] xl:justify-between xl:gap-10">
          <aside className="hidden pt-16 xl:block">
            <CaseToc label={dict.case.toc} items={sectionsOf(c.body)} />
          </aside>
          <div className="mx-auto max-w-[620px] xl:max-w-none">
            {content}
          </div>
        </div>

        <nav className="mx-auto mt-28 max-w-6xl border-t border-line pb-4 pt-10">
          <Link
            href={`/${lang}/work/${next.slug}/`}
            prefetch={next.locked ? false : undefined}
            className="group flex items-end justify-between gap-6"
          >
            <span>
              <span className="label block">{dict.case.next}</span>
              <span className="font-display mt-3 block text-[32px] leading-[1.08] text-ink text-balance md:text-[48px]">
                {next.title}
              </span>
            </span>
            <span className="grid size-12 shrink-0 place-items-center rounded-full bg-ink text-bg transition-transform duration-300 ease-out-quint group-hover:translate-x-1">
              <ArrowRight size={18} />
            </span>
          </Link>
        </nav>
      </div>
    </article>
  );
}
