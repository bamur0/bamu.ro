// Cloudflare Pages Function: solo corre en la raíz ("/").
// Elige el idioma del sitio: primero la elección guardada con el botón de idioma
// (cookie "lang"), luego el idioma del navegador (Accept-Language). Español si el
// visitante prefiere español; inglés para cualquier otro idioma.
const LOCALES = ["es", "en"];

function fromCookie(header) {
  const match = /(?:^|;\s*)lang=(es|en)\b/.exec(header ?? "");
  return match ? match[1] : null;
}

function fromAcceptLanguage(header) {
  if (!header) return "es";
  const ranked = header
    .split(",")
    .map((part) => {
      const [tag, ...params] = part.trim().toLowerCase().split(";");
      const q = params.find((p) => p.trim().startsWith("q="));
      return { lang: tag.split("-")[0], q: q ? Number(q.trim().slice(2)) : 1 };
    })
    .filter((x) => x.lang && !Number.isNaN(x.q))
    .sort((a, b) => b.q - a.q);
  const first = ranked.find((x) => LOCALES.includes(x.lang));
  // Si no habla ninguno de los dos, inglés es la opción más útil
  return first ? first.lang : "en";
}

export function onRequest({ request }) {
  const lang = fromCookie(request.headers.get("Cookie")) ?? fromAcceptLanguage(request.headers.get("Accept-Language"));
  const url = new URL(request.url);
  return new Response(null, {
    status: 302,
    headers: {
      Location: `${url.origin}/${lang}/${url.search}`,
      "Cache-Control": "private, no-store",
      Vary: "Accept-Language, Cookie",
    },
  });
}
