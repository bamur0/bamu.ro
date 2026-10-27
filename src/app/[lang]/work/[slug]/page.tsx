import type { Metadata } from "next";
import { languagesFor, openGraphFor } from "@/lib/seo";
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
import { CaseToc } from "@/components/case-toc";
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
      {/* Banda con el color del caso; termina en curva suave y la portada se monta encima */}
      <header
        className="tint-panel px-4 pb-40 pt-10 [border-bottom-left-radius:50%_3.5rem] [border-bottom-right-radius:50%_3.5rem] sm:px-6 md:pb-56 md:pt-14"
        style={{ "--tint": c.tint } as React.CSSProperties}
      >
        <div className="mx-auto max-w-6xl">
          <Link
            href={`/${lang}/#work`}
            className="inline-flex items-center gap-1.5 text-sm text-ink-2 transition-colors hover:text-ink"
          >
            <ArrowLeft size={14} />
            {dict.case.back}
          </Link>
          <div className="mt-10 max-w-3xl md:mt-14">
            <p className="flex items-center gap-2 text-sm text-ink-2">
              <span aria-hidden className="size-2.5 rounded-full" style={{ background: c.tint }} />
              {c.client} · {c.type}
            </p>
            <h1 className="font-display mt-4 text-[clamp(36px,5vw,60px)] leading-[1.06] text-ink text-balance">
              {c.title}
            </h1>
            <p className="mt-5 max-w-[60ch] text-lg leading-relaxed text-ink-2 text-pretty">{c.summary}</p>
          </div>
        </div>
      </header>

      <div className="px-4 sm:px-6">
        <Reveal className="mx-auto -mt-32 max-w-6xl md:-mt-44">
          <CaseCover cover={c.cover} image={c.coverImage} title={c.title} locale={lang} interactive />
          <p className="mt-3 max-w-2xl text-sm text-muted">{c.note ?? dict.case.nda}</p>
        </Reveal>

        {/* Datos del caso: etiquetas pequeñas y texto limpio, sin cajas */}
        <div className="mx-auto mt-14 max-w-6xl border-t border-line pt-8">
          <dl className="grid grid-cols-2 gap-x-6 gap-y-6 sm:grid-cols-3 lg:grid-cols-5">
            {facts.map(([k, v]) => (
              <div key={k}>
                <dt className="font-mono text-[11px] uppercase tracking-[0.06em] text-muted">{k}</dt>
                <dd className="mt-1.5 text-[15px] text-ink">{v}</dd>
              </div>
            ))}
          </dl>
          <dl className="mt-10 grid gap-8 md:grid-cols-3">
            {[
              [dict.case.problem, c.problem],
              [dict.case.did, c.did],
              [dict.case.impact, c.impact],
            ].map(([k, v]) => (
              <div key={k}>
                <dt className="font-mono text-[11px] uppercase tracking-[0.06em] text-muted">{k}</dt>
                <dd className="font-display mt-2 text-xl leading-snug text-ink">{v}</dd>
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

        <nav className="mx-auto mt-24 max-w-6xl border-t border-line pb-4 pt-8">
        <Link
          href={`/${lang}/work/${next.slug}/`}
          prefetch={next.locked ? false : undefined}
          className="group flex items-end justify-between gap-6">
          <span>
            <span className="block font-mono text-[11px] uppercase tracking-[0.06em] text-muted">{dict.case.next}</span>
            <span className="font-display mt-2 block text-2xl text-ink md:text-3xl">{next.title}</span>
          </span>
          <span className="grid size-11 shrink-0 place-items-center rounded-full border border-line text-ink transition-transform duration-200 ease-out-quint group-hover:translate-x-1">
            <ArrowRight size={18} />
          </span>
        </Link>
        </nav>
      </div>
    </article>
  );
}
