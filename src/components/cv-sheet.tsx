import { EB_Garamond } from "next/font/google";
import type { Cv } from "@/content/cv";

// Garamond solo aquí: la hoja emula un CV impreso en formato Harvard, que es tradicionalmente serif.
const garamond = EB_Garamond({ subsets: ["latin"], weight: ["400", "500", "600"], display: "swap" });

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-5 break-inside-avoid-page first:mt-0">
      <h2 className="border-b border-neutral-900 pb-0.5 text-[1.05em] font-semibold uppercase tracking-[0.06em]">{title}</h2>
      <div className="mt-2">{children}</div>
    </section>
  );
}

/** Hoja tamaño carta. Siempre en "papel" claro, también en modo oscuro, y lista para imprimir. */
export function CvSheet({ cv }: { cv: Cv }) {
  return (
    <article
      className={`${garamond.className} cv-sheet mx-auto w-full max-w-[816px] rounded-[4px] bg-[#fffffe] px-6 py-8 text-[14px] leading-[1.35] text-neutral-900 shadow-[0_1px_2px_rgb(0_0_0/0.06),0_24px_48px_-24px_rgb(0_0_0/0.25)] sm:px-[72px] sm:py-[64px] sm:text-[15px]`}
    >
      <header className="text-center">
        <h1 className="text-[1.9em] font-semibold leading-tight">{cv.name}</h1>
        <p className="mt-1 flex flex-wrap justify-center gap-x-2 text-[0.95em]">
          {cv.contact.map((c, i) => (
            <span key={c} className="whitespace-nowrap">
              {i > 0 && <span aria-hidden className="mr-2 text-neutral-400">|</span>}
              {c.includes("@") ? (
                <a href={`mailto:${c}`}>{c}</a>
              ) : c.includes(".") && !c.includes(",") ? (
                <a href={`https://${c.startsWith("bamu") ? c : `www.${c}`}`}>{c}</a>
              ) : (
                c
              )}
            </span>
          ))}
        </p>
      </header>

      <div className="mt-5">
        <Section title={cv.headings.profile}>
          <p>{cv.profile}</p>
        </Section>

        <Section title={cv.headings.experience}>
          {cv.roles.map((r) => (
            <div key={r.org + r.dates} className="break-inside-avoid">
              <div className="flex flex-wrap justify-between gap-x-4">
                <p>
                  <span className="font-semibold">{r.org}</span>, {r.place}
                </p>
                <p>{r.dates}</p>
              </div>
              <p className="italic">{r.title}</p>
              <ul className="mt-1.5 list-disc space-y-1 pl-5 marker:text-neutral-500">
                {r.bullets.map((b) => (
                  <li key={b.slice(0, 32)}>{b}</li>
                ))}
              </ul>
              <p className="mt-1.5 text-[0.92em] text-neutral-600">
                <span className="font-semibold italic">{cv.headings.tools}</span> <span className="italic">{r.tools}</span>
              </p>
            </div>
          ))}
        </Section>

        <Section title={cv.headings.skills}>
          <dl className="space-y-0.5">
            {cv.skills.map(([k, v]) => (
              <div key={k}>
                <dt className="inline font-semibold">{k}: </dt>
                <dd className="inline">{v}</dd>
              </div>
            ))}
          </dl>
        </Section>

        <Section title={cv.headings.education}>
          {cv.education.map((e) => (
            <div key={e.school}>
              <div className="flex flex-wrap justify-between gap-x-4">
                <p>
                  <span className="font-semibold">{e.school}</span>, {e.place}
                </p>
                <p>{e.date}</p>
              </div>
              <p className="italic">{e.degree}</p>
            </div>
          ))}
        </Section>

        <Section title={cv.headings.certifications}>
          {cv.certifications.map((c) => (
            <div key={c.name} className="flex flex-wrap justify-between gap-x-4">
              <p>
                <span className="font-semibold">{c.name}</span>, {c.issuer}
              </p>
              <p>{c.date}</p>
            </div>
          ))}
        </Section>
      </div>
    </article>
  );
}
