import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, ArrowUpRight } from "@phosphor-icons/react/ssr";
import { hasLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { getCases } from "@/lib/cases";
import { site } from "@/lib/site";
import { certifications } from "@/content/certifications";
import { CaseCard } from "@/components/case-card";
import { Reveal } from "@/components/reveal";
import { CopyEmail } from "@/components/copy-email";

/** Marca la última palabra del titular: en tinta y con el marcador vino suave. */
function markLastWord(text: string) {
  const i = text.trimEnd().lastIndexOf(" ");
  const head = text.slice(0, i + 1);
  const last = text.slice(i + 1).replace(/\.$/, "");
  return (
    <>
      {head}
      <span className="mark text-ink">{last}</span>.
    </>
  );
}

export default async function Home({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = getDictionary(lang);
  const cases = await getCases(lang);

  // Datos estructurados: ayudan a Google a asociar el nombre con el sitio y los perfiles
  const personJsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: site.name,
    jobTitle: "Product Designer",
    url: `${site.url}/${lang}/`,
    image: `${site.url}/img/roberto.webp`,
    email: `mailto:${site.email}`,
    address: { "@type": "PostalAddress", addressLocality: "Cuernavaca", addressRegion: "Morelos", addressCountry: "MX" },
    alumniOf: { "@type": "CollegeOrUniversity", name: "Universidad Iberoamericana Puebla" },
    knowsAbout: ["Product Design", "UX Design", "UI Design", "UX Research", "Design Systems", "Design Tokens", "Prototyping", "Figma"],
    knowsLanguage: ["es", "en"],
    sameAs: [site.linkedin, site.behance],
  };

  return (
    <div className="px-4 sm:px-6">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd).replace(/</g, "\\u003c") }}
      />
      {/* Hero: saludo y propuesta en dos tonos; deja ver el trabajo sin ocupar toda la pantalla */}
      <section className="mx-auto max-w-6xl pb-20 pt-16 md:pb-28 md:pt-28">
        <h1
          className="enter font-display max-w-[20ch] text-[clamp(38px,5.6vw,76px)] leading-[1.06] text-muted text-balance"
          style={{ "--i": 0 } as React.CSSProperties}
        >
          <span className="text-ink">{dict.hero.greeting}</span> {markLastWord(dict.hero.title)}
        </h1>
        <div
          className="enter mt-10 grid gap-6 md:mt-12 md:grid-cols-[1fr_auto] md:items-end"
          style={{ "--i": 1 } as React.CSSProperties}
        >
          <p className="max-w-[48ch] text-lg leading-relaxed text-ink-2 text-pretty">{dict.hero.lead}</p>
          <div className="flex flex-wrap gap-3">
            <Link
              href={`/${lang}/#work`}
              className="inline-flex h-11 items-center rounded-full bg-accent px-5 text-[15px] font-medium text-accent-ink transition-transform duration-150 active:scale-[0.97]"
            >
              {dict.hero.ctaWork}
            </Link>
            <Link
              href={`/${lang}/#contact`}
              className="inline-flex h-11 items-center rounded-full border border-line bg-surface px-5 text-[15px] font-medium text-ink transition-[background-color,transform] duration-150 hover:bg-surface-2 active:scale-[0.97]"
            >
              {dict.hero.ctaContact}
            </Link>
          </div>
        </div>
      </section>

      {/* Trabajo: dos columnas, la segunda desfasada para que la vista respire */}
      <section id="work" aria-labelledby="work-title" className="mx-auto max-w-6xl scroll-mt-20">
        <h2 id="work-title" className="font-display mb-8 text-3xl text-ink md:mb-12 md:text-4xl">
          {dict.work.title}
        </h2>
        <div className="grid gap-14 md:grid-cols-2 md:gap-x-8 md:gap-y-16">
          {cases.map((item, i) => (
            <Reveal key={item.slug} delay={(i % 2) * 0.08} className={i % 2 === 1 ? "md:mt-24" : undefined}>
              <CaseCard item={item} locale={lang} />
            </Reveal>
          ))}
        </div>
      </section>

      {/* Cómo trabajo */}
      <section className="mx-auto mt-28 grid max-w-6xl gap-10 md:mt-40 md:grid-cols-12 md:gap-8">
        <div className="md:col-span-4">
          <h2 className="font-display text-3xl text-ink md:sticky md:top-28 md:text-4xl">{dict.process.title}</h2>
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
          {/* En claro, multiply funde el fondo gris de la foto con el crema de la superficie */}
          <div className="w-full max-w-sm overflow-hidden rounded-surface border border-line bg-surface-2">
            <Image
              src="/img/roberto.webp"
              alt={dict.about.photoAlt}
              width={720}
              height={900}
              sizes="(min-width: 768px) 360px, 100vw"
              className="aspect-[4/5] w-full object-cover mix-blend-multiply dark:mix-blend-normal"
            />
          </div>
        </Reveal>
        <Reveal delay={0.06} className="md:col-span-7 md:col-start-6">
          <h2 className="font-display text-3xl text-ink md:text-4xl">{dict.about.title}</h2>
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
          <div className="mt-8">
            <h3 className="font-mono text-xs text-muted">{dict.about.certifications}</h3>
            <ul className="mt-2 divide-y divide-line">
              {certifications[lang].map((c) => (
                <li key={c.name} className="flex items-start justify-between gap-4 py-3">
                  <div>
                    <p className="font-medium text-ink">{c.name}</p>
                    <p className="mt-0.5 text-sm text-ink-2">
                      {c.issuer}, {c.date}
                    </p>
                  </div>
                  <a
                    href={c.url}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`${dict.about.verify}: ${c.name}`}
                    className="inline-flex min-h-11 shrink-0 items-center gap-1 text-sm text-ink-2 hover:text-ink sm:min-h-0"
                  >
                    <span className="link">{dict.about.verify}</span>
                    <ArrowUpRight size={13} />
                  </a>
                </li>
              ))}
            </ul>
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
          <h2 className="font-display text-4xl text-ink md:text-6xl">{dict.contact.title}</h2>
          <p className="mt-4 max-w-[48ch] text-lg text-ink-2">{dict.contact.body}</p>
          <div className="mt-8">
            <CopyEmail email={site.email} copyLabel={dict.contact.copy} copiedLabel={dict.contact.copied} />
          </div>
        </Reveal>
      </section>
    </div>
  );
}
