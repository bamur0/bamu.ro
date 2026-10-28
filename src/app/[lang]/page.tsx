import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowDown, ArrowRight, ArrowUpRight } from "@phosphor-icons/react/ssr";
import { hasLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { getCases } from "@/lib/cases";
import { site } from "@/lib/site";
import { certifications } from "@/content/certifications";
import { CaseCard } from "@/components/case-card";
import { Reveal } from "@/components/reveal";
import { CopyEmail } from "@/components/copy-email";
import { ToolList } from "@/components/tool-list";

/** Rótulo de sección a la izquierda y contenido en las nueve columnas restantes */
const sectionGrid = "mx-auto grid max-w-6xl gap-8 md:grid-cols-12";
const sectionLabel = "label md:col-span-3 md:pt-1.5";
const textLink = "group inline-flex min-h-11 items-center gap-1.5 text-[15px] font-medium text-ink";

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
    <div className="px-5 sm:px-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd).replace(/</g, "\\u003c") }}
      />

      {/* Hero: quién soy, qué hago y cómo contactarme. La foto es una firma, no la protagonista */}
      <section className="mx-auto max-w-6xl pb-24 pt-14 md:pb-32 md:pt-24">
        <div className="enter flex flex-wrap items-center gap-x-6 gap-y-4" style={{ "--i": 0 } as React.CSSProperties}>
          <div className="flex items-center gap-3.5">
            <Image
              src="/img/roberto.webp"
              alt={dict.about.photoAlt}
              width={112}
              height={112}
              priority
              className="size-14 rounded-full bg-surface-2 object-cover object-top"
            />
            <div>
              <p className="text-[15px] font-medium text-ink">Roberto Báez</p>
              <p className="text-sm text-muted">
                {dict.hero.role} · {dict.hero.place}
              </p>
            </div>
          </div>
          <p className="inline-flex items-start gap-2 rounded-2xl border border-line px-3 py-1.5 text-[13px] leading-5 text-ink-2 sm:items-center sm:rounded-full">
            <span aria-hidden className="relative mt-1.5 flex size-2 shrink-0 sm:mt-0">
              <span className="absolute inline-flex size-full rounded-full bg-ok opacity-60 motion-safe:animate-ping" />
              <span className="relative inline-flex size-2 rounded-full bg-ok" />
            </span>
            <span>
              {dict.hero.available}
              <span className="hidden sm:inline"> · </span>
              <span className="block text-muted sm:inline">{dict.hero.availableWhere}</span>
            </span>
          </p>
        </div>

        <h1
          className="enter font-display mt-12 max-w-[18ch] text-[clamp(40px,6vw,84px)] leading-[1.02] text-ink text-balance md:mt-16"
          style={{ "--i": 1 } as React.CSSProperties}
        >
          {dict.hero.title}
        </h1>
        <p
          className="enter mt-8 max-w-[58ch] text-lg leading-relaxed text-ink-2 text-pretty md:text-xl"
          style={{ "--i": 2 } as React.CSSProperties}
        >
          {dict.hero.lead}
        </p>
        <div className="enter mt-10 flex flex-wrap items-center gap-x-7 gap-y-2" style={{ "--i": 3 } as React.CSSProperties}>
          <Link
            href={`/${lang}/#work`}
            className="group inline-flex h-12 items-center gap-2 rounded-full bg-ink px-6 text-[15px] font-medium text-bg transition-transform duration-150 active:scale-[0.97]"
          >
            {dict.hero.ctaWork}
            <ArrowDown size={16} className="transition-transform duration-300 ease-out-quint group-hover:translate-y-0.5" />
          </Link>
          <Link href={`/${lang}/#contact`} className={textLink}>
            <span className="link">{dict.hero.ctaContact}</span>
          </Link>
          <a href={site.linkedin} target="_blank" rel="noreferrer" className={textLink}>
            <span className="link">LinkedIn</span>
            <ArrowUpRight size={14} />
          </a>
          <Link href={`/${lang}/cv/`} className={textLink}>
            <span className="link">{dict.nav.cv}</span>
          </Link>
        </div>
      </section>

      {/* Trabajo: índice de casos; al pasar el cursor por uno, los demás se atenúan */}
      <section id="work" aria-labelledby="work-title" className="mx-auto max-w-6xl scroll-mt-20">
        <div className="flex items-baseline justify-between pb-6">
          <h2 id="work-title" className="label">
            {dict.work.title}
          </h2>
          <span className="label">{String(cases.length).padStart(2, "0")}</span>
        </div>
        <ol className="index border-b border-line">
          {cases.map((item, i) => (
            <li key={item.slug}>
              <Reveal>
                <CaseCard item={item} locale={lang} index={i} />
              </Reveal>
            </li>
          ))}
        </ol>
      </section>

      {/* Trayectoria: aquí, y solo aquí, aparecen las empresas */}
      <section id="experience" aria-labelledby="experience-title" className={`${sectionGrid} mt-28 scroll-mt-24 md:mt-40`}>
        <h2 id="experience-title" className={sectionLabel}>
          {dict.experience.title}
        </h2>
        <div className="md:col-span-9">
          <ol className="border-b border-line">
            {dict.experience.items.map((e, i) => (
              <Reveal as="li" key={e.role} delay={i * 0.04} className="grid gap-2 border-t border-line py-7 sm:grid-cols-9 sm:gap-8">
                <p className="label sm:col-span-2 sm:pt-1">{e.dates}</p>
                <div className="sm:col-span-3">
                  <h3 className="text-[17px] font-medium leading-snug text-ink">{e.role}</h3>
                  <p className="mt-1 flex flex-wrap items-center gap-2 text-[15px] text-ink-2">
                    {e.org}
                    {e.cmmi && (
                      <span className="rounded-full border border-line px-2 py-0.5 font-mono text-[11px] uppercase tracking-[0.02em] text-ink-2">
                        {dict.experience.cmmi}
                      </span>
                    )}
                  </p>
                </div>
                <p className="text-[15px] leading-relaxed text-ink-2 sm:col-span-4">{e.body}</p>
              </Reveal>
            ))}
          </ol>
          <Link href={`/${lang}/cv/`} className={`${textLink} mt-4`}>
            <span className="link">{dict.about.cvLink}</span>
            <ArrowRight size={15} className="transition-transform duration-300 ease-out-quint group-hover:translate-x-1" />
          </Link>
        </div>
      </section>

      {/* Cómo trabajo: principios numerados en dos columnas */}
      <section aria-labelledby="process-title" className={`${sectionGrid} mt-28 md:mt-40`}>
        <h2 id="process-title" className={sectionLabel}>
          {dict.process.title}
        </h2>
        <ol className="grid gap-x-12 gap-y-12 sm:grid-cols-2 md:col-span-9">
          {dict.process.items.map((p, i) => (
            <Reveal as="li" key={p.name} delay={(i % 2) * 0.05}>
              <span className="label">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="mt-3 text-[19px] font-medium leading-snug tracking-tight text-ink">{p.name}</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-ink-2">{p.body}</p>
            </Reveal>
          ))}
        </ol>
      </section>

      {/* Sobre mí: quién soy en grande; herramientas, idiomas y certificaciones en tamaño de consulta */}
      <section id="about" aria-labelledby="about-title" className={`${sectionGrid} mt-28 scroll-mt-24 md:mt-40`}>
        <h2 id="about-title" className={sectionLabel}>
          {dict.about.title}
        </h2>
        <div className="md:col-span-9">
          <Reveal>
            {dict.about.body.map((para, i) => (
              <p
                key={para.slice(0, 24)}
                className={`max-w-[46ch] text-pretty ${
                  i === 0
                    ? "font-display text-[24px] leading-[1.35] text-ink md:text-[30px]"
                    : "mt-6 text-lg leading-relaxed text-ink-2"
                }`}
              >
                {para}
              </p>
            ))}
          </Reveal>

          <div className="mt-14 grid gap-10 border-t border-line pt-8">
            <div>
              <h3 className="label">{dict.about.tools}</h3>
              <div className="mt-4">
                <ToolList />
              </div>
            </div>
            <div>
              <h3 className="label">{dict.about.languagesTitle}</h3>
              <p className="mt-3 text-[15px] text-ink">{dict.about.languages}</p>
            </div>
          </div>

          <div className="mt-12">
            <h3 className="label">{dict.about.certifications}</h3>
            <ul className="mt-3 border-b border-line">
              {certifications[lang].map((c) => (
                <li key={c.name} className="flex items-start justify-between gap-4 border-t border-line py-4">
                  <div>
                    <p className="text-[15px] font-medium text-ink">{c.name}</p>
                    <p className="mt-0.5 text-sm text-muted">
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

          <p className="mt-8 text-[15px] leading-relaxed text-ink-2">
            {dict.about.explorationsBody}{" "}
            <a href={site.behance} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 font-medium text-ink">
              <span className="link">{dict.about.explorationsLink}</span>
              <ArrowUpRight size={13} />
            </a>
          </p>
        </div>
      </section>

      {/* Contacto: la invitación en grande y el correo a un clic */}
      <section
        id="contact"
        aria-labelledby="contact-title"
        className="mx-auto mt-28 max-w-6xl scroll-mt-24 border-t border-line pt-14 md:mt-40 md:pt-20"
      >
        <Reveal>
          <h2 id="contact-title" className="label">
            {dict.nav.contact}
          </h2>
          <p className="font-display mt-6 max-w-[14ch] text-[clamp(40px,6vw,80px)] leading-[1.02] text-ink">{dict.contact.title}</p>
          <p className="mt-6 max-w-[44ch] text-lg leading-relaxed text-ink-2">{dict.contact.body}</p>
          <div className="mt-10">
            <CopyEmail email={site.email} copyLabel={dict.contact.copy} copiedLabel={dict.contact.copied} />
          </div>
        </Reveal>
      </section>
    </div>
  );
}
