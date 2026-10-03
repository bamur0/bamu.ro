import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { compileMDX } from "next-mdx-remote/rsc";
import { ArrowLeft, ArrowRight } from "@phosphor-icons/react/ssr";
import { hasLocale, locales } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { getCase, getCaseSlugs, getCases } from "@/lib/cases";
import { getMdxComponents } from "@/components/mdx";
import { CaseCover } from "@/components/case-cover";
import { Reveal } from "@/components/reveal";

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
      languages: { es: `/es/work/${slug}/`, en: `/en/work/${slug}/` },
    },
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
    <article className="px-4 sm:px-6">
      <header className="mx-auto max-w-6xl pt-10 md:pt-16">
        <Link
          href={`/${lang}/#work`}
          className="inline-flex items-center gap-1.5 text-sm text-ink-2 transition-colors hover:text-ink"
        >
          <ArrowLeft size={14} />
          {dict.case.back}
        </Link>
        <div className="mt-10 max-w-3xl">
          <p className="text-sm text-muted">
            {c.client}, {c.type.toLowerCase()}
          </p>
          <h1 className="mt-3 text-4xl font-semibold leading-[1.08] tracking-tight text-ink text-balance md:text-5xl">
            {c.title}
          </h1>
          <p className="mt-5 max-w-[60ch] text-lg leading-relaxed text-ink-2 text-pretty">{c.summary}</p>
        </div>
        <dl className="mt-10 grid grid-cols-2 gap-x-6 gap-y-5 border-t border-line pt-6 sm:grid-cols-3 lg:grid-cols-5">
          {facts.map(([k, v]) => (
            <div key={k}>
              <dt className="font-mono text-xs text-muted">{k}</dt>
              <dd className="mt-1 text-[15px] text-ink">{v}</dd>
            </div>
          ))}
        </dl>
        <dl className="mt-8 grid gap-px overflow-hidden rounded-surface border border-line bg-line md:grid-cols-3">
          {[
            [dict.case.problem, c.problem],
            [dict.case.did, c.did],
            [dict.case.impact, c.impact],
          ].map(([k, v]) => (
            <div key={k} className="bg-surface p-5">
              <dt className="text-sm font-medium text-ink">{k}</dt>
              <dd className="mt-2 leading-relaxed text-ink-2">{v}</dd>
            </div>
          ))}
        </dl>
        <Reveal className="mt-12">
          <CaseCover cover={c.cover} title={c.title} locale={lang} interactive />
          <p className="mt-3 max-w-2xl text-sm text-muted">{dict.case.nda}</p>
        </Reveal>
      </header>

      <div className="mx-auto max-w-[620px] pt-8">{content}</div>

      <nav className="mx-auto mt-24 max-w-6xl border-t border-line pt-8">
        <Link href={`/${lang}/work/${next.slug}/`} className="group flex items-end justify-between gap-6">
          <span>
            <span className="block font-mono text-xs text-muted">{dict.case.next}</span>
            <span className="mt-2 block text-2xl font-semibold tracking-tight text-ink md:text-3xl">{next.title}</span>
          </span>
          <span className="grid size-11 shrink-0 place-items-center rounded-full border border-line text-ink transition-transform duration-200 ease-out-quint group-hover:translate-x-1">
            <ArrowRight size={18} />
          </span>
        </Link>
      </nav>
    </article>
  );
}
