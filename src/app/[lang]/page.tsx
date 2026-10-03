import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, ArrowUpRight } from "@phosphor-icons/react/ssr";
import { hasLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { getCases } from "@/lib/cases";
import { site } from "@/lib/site";
import { CaseCard } from "@/components/case-card";
import { Reveal } from "@/components/reveal";
import { CopyEmail } from "@/components/copy-email";

/** Marca la última palabra del titular con el acento. */
function markLastWord(text: string) {
  const i = text.trimEnd().lastIndexOf(" ");
  const head = text.slice(0, i + 1);
  const last = text.slice(i + 1).replace(/\.$/, "");
  return (
    <>
      {head}
      <span className="mark">{last}</span>.
    </>
  );
}

export default async function Home({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = getDictionary(lang);
  const cases = await getCases(lang);
  const [featured, ...rest] = cases;

  return (
    <div className="px-4 sm:px-6">
      {/* Hero: ocupa toda la pantalla; el trabajo aparece al hacer scroll */}
      <section className="mx-auto flex min-h-[calc(100dvh-4rem)] max-w-6xl flex-col pb-10 pt-8 md:pb-14 md:pt-12">
        <p className="enter text-lg text-ink-2" style={{ "--i": 0 } as React.CSSProperties}>
          {dict.hero.greeting}
        </p>
        <div className="flex flex-1 items-center py-12">
          <h1
            className="enter max-w-[15ch] text-[clamp(44px,8.2vw,116px)] font-semibold leading-[0.98] tracking-[-0.035em] text-ink text-balance"
            style={{ "--i": 1 } as React.CSSProperties}
          >
            {markLastWord(dict.hero.title)}
          </h1>
        </div>
        <div
          className="enter grid gap-6 border-t border-line pt-6 md:grid-cols-[1fr_auto] md:items-end"
          style={{ "--i": 2 } as React.CSSProperties}
        >
          <p className="max-w-[46ch] text-lg leading-relaxed text-ink-2 text-pretty">{dict.hero.lead}</p>
          <div className="flex flex-wrap gap-3">
            <Link
              href={`/${lang}/#work`}
              className="inline-flex h-11 items-center rounded-full bg-ink px-5 text-[15px] font-medium text-bg transition-transform duration-150 active:scale-[0.97]"
            >
              {dict.hero.ctaWork}
            </Link>
            <Link
              href={`/${lang}/#contact`}
              className="inline-flex h-11 items-center rounded-full border border-line px-5 text-[15px] font-medium text-ink transition-[background-color,transform] duration-150 hover:bg-surface-2 active:scale-[0.97]"
            >
              {dict.hero.ctaContact}
            </Link>
          </div>
        </div>
      </section>

      {/* Trabajo */}
      <section id="work" aria-labelledby="work-title" className="mx-auto max-w-6xl scroll-mt-20">
        <h2 id="work-title" className="mb-10 pt-16 text-3xl font-semibold tracking-tight text-ink md:mb-14 md:pt-24">
          {dict.work.title}
        </h2>
        <Reveal>
          <CaseCard item={featured} locale={lang} featured />
        </Reveal>
        <div className="mt-16 grid gap-16 md:mt-20 md:grid-cols-12 md:gap-8">
          {rest.map((item, i) => (
            <Reveal
              key={item.slug}
              delay={i * 0.08}
              className={i === 0 ? "md:col-span-7" : "md:col-span-5 md:mt-24"}
            >
              <CaseCard item={item} locale={lang} />
            </Reveal>
          ))}
        </div>
      </section>

      {/* Cómo trabajo */}
      <section className="mx-auto mt-28 grid max-w-6xl gap-10 md:mt-40 md:grid-cols-12 md:gap-8">
        <div className="md:col-span-4">
          <h2 className="text-3xl font-semibold tracking-tight text-ink md:sticky md:top-28">{dict.process.title}</h2>
        </div>
        <ol className="divide-y divide-line border-y border-line md:col-span-8">
          {dict.process.items.map((p, i) => (
            <Reveal as="li" key={p.name} delay={i * 0.04} className="grid gap-2 py-6 sm:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] sm:gap-8">
              <h3 className="text-[17px] font-semibold tracking-tight text-ink">{p.name}</h3>
              <p className="leading-relaxed text-ink-2">{p.body}</p>
            </Reveal>
          ))}
        </ol>
      </section>

      {/* Sobre mí */}
      <section id="about" className="mx-auto mt-28 grid max-w-6xl scroll-mt-24 gap-10 md:mt-40 md:grid-cols-12 md:gap-8">
        <Reveal className="md:col-span-4">
          <Image
            src="/img/roberto.jpg"
            alt={dict.about.photoAlt}
            width={720}
            height={900}
            sizes="(min-width: 768px) 360px, 100vw"
            className="aspect-[4/5] w-full max-w-sm rounded-surface border border-line object-cover"
          />
        </Reveal>
        <Reveal delay={0.06} className="md:col-span-7 md:col-start-6">
          <h2 className="text-3xl font-semibold tracking-tight text-ink">{dict.about.title}</h2>
          {dict.about.body.map((para) => (
            <p key={para.slice(0, 24)} className="mt-5 max-w-[60ch] text-[17px] leading-[1.7] text-ink-2">
              {para}
            </p>
          ))}
          <Link
            href={`/${lang}/cv/`}
            className="mt-7 inline-flex h-11 items-center gap-2 rounded-full border border-line px-5 text-[15px] font-medium text-ink transition-[background-color,transform] duration-150 hover:bg-surface-2 active:scale-[0.97]"
          >
            {dict.about.cvLink}
            <ArrowRight size={15} />
          </Link>

          <div className="mt-12 grid gap-8 border-t border-line pt-8 sm:grid-cols-2">
            <div>
              <h3 className="font-mono text-xs text-muted">{dict.about.tools}</h3>
              <p className="mt-2 leading-relaxed text-ink">{dict.about.toolsList}</p>
            </div>
            <div>
              <h3 className="font-mono text-xs text-muted">{lang === "es" ? "Idiomas" : "Languages"}</h3>
              <p className="mt-2 text-ink">{dict.about.languages}</p>
            </div>
          </div>
          <div className="mt-8 flex flex-col gap-3 rounded-surface border border-line bg-surface p-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h3 className="font-medium text-ink">{dict.about.explorations}</h3>
              <p className="mt-1 text-sm leading-relaxed text-ink-2">{dict.about.explorationsBody}</p>
            </div>
            <a
              href={site.behance}
              target="_blank"
              rel="noreferrer"
              className="inline-flex shrink-0 items-center gap-1.5 text-sm font-medium text-ink"
            >
              <span className="link">{dict.about.explorationsLink}</span>
              <ArrowUpRight size={14} />
            </a>
          </div>
        </Reveal>
      </section>

      {/* Contacto */}
      <section id="contact" className="mx-auto mt-28 max-w-6xl scroll-mt-24 border-t border-line pt-14 md:mt-40 md:pt-20">
        <Reveal>
          <h2 className="text-4xl font-semibold tracking-tight text-ink md:text-5xl">{dict.contact.title}</h2>
          <p className="mt-4 max-w-[48ch] text-lg text-ink-2">{dict.contact.body}</p>
          <div className="mt-8">
            <CopyEmail email={site.email} copyLabel={dict.contact.copy} copiedLabel={dict.contact.copied} />
          </div>
        </Reveal>
      </section>
    </div>
  );
}
