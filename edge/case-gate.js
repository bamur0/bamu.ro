// Cloudflare Pages Function compartida: protege un caso y sus imágenes detrás de un correo.
// La única forma de entrar es dejar un correo: se guarda en el KV CASE_REQUESTS (si está
// enlazado) para saber quién vio el caso, y se entra directo. CASE_PASSWORD (secreto en el
// panel de Cloudflare) nunca se muestra: solo firma la cookie de acceso. Sin la variable no
// se sirve nada: falla cerrado.
const COOKIE = "case_key";
const MAX_AGE = 60 * 60 * 24 * 30;
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const copy = {
  es: {
    label: "Acceso con correo",
    title: "Caso privado",
    lead: "Este caso muestra trabajo de un proyecto en curso, así que no es público. Déjame tu correo y entras directo.",
    email: "Tu correo",
    submit: "Ver el caso",
    privacy: "Solo lo uso para saber quién vio el caso. No lo comparto ni te agrego a ninguna lista.",
    badEmail: "Revisa el correo, parece incompleto.",
    back: "Todos los casos",
  },
  en: {
    label: "Email access",
    title: "Private case",
    lead: "This case shows work from an ongoing project, so it isn't public. Leave your email and you're in.",
    email: "Your email",
    submit: "View case",
    privacy: "I only use it to know who viewed the case. I won't share it or add you to any list.",
    badEmail: "Check the email, it looks incomplete.",
    back: "All work",
  },
};

async function digest(text) {
  const buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(text));
  return [...new Uint8Array(buf)].map((b) => b.toString(16).padStart(2, "0")).join("");
}

function readCookie(header) {
  const match = new RegExp(`(?:^|;\\s*)${COOKIE}=([a-f0-9]{64})`).exec(header ?? "");
  return match ? match[1] : null;
}

const escape = (s) =>
  String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]);

const cookieHeader = (value) => `${COOKIE}=${value}; Path=/; Max-Age=${MAX_AGE}; HttpOnly; Secure; SameSite=Lax`;

function page(lang, { invalid = false, email = "" } = {}) {
  const t = copy[lang];
  const body = `<p class="label">${escape(t.label)}</p>
  <h1>${escape(t.title)}</h1>
  <p class="lead">${escape(t.lead)}</p>
  <form method="post">
    <label for="email">${escape(t.email)}</label>
    <input id="email" name="email" type="email" autocomplete="email" inputmode="email" required autofocus value="${escape(email)}"${invalid ? ' aria-invalid="true" aria-describedby="email-error"' : ""}>
    ${invalid ? `<p class="error" id="email-error" role="alert">${escape(t.badEmail)}</p>` : ""}
    <input class="trap" name="website" tabindex="-1" autocomplete="off" aria-hidden="true">
    <button type="submit">${escape(t.submit)} <span aria-hidden="true">→</span></button>
    <p class="note">${escape(t.privacy)}</p>
  </form>`;

  // Mismos tokens y tipografía que el sitio (src/app/globals.css)
  const html = `<!doctype html>
<html lang="${lang}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex">
<title>${escape(t.title)} · Roberto Báez</title>
<link rel="icon" href="/icon.svg" type="image/svg+xml">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Geist:wght@400;500&family=Geist+Mono&display=swap" rel="stylesheet">
<style>
  :root { --bg:#fbfbfa; --surface:#fff; --ink:#141414; --ink-2:#474747; --muted:#6f6f6f; --line:#e6e6e3; --danger:#b42318; color-scheme: light dark; }
  @media (prefers-color-scheme: dark) { :root { --bg:#0c0c0c; --surface:#151515; --ink:#ededed; --ink-2:#b5b5b5; --muted:#8f8f8f; --line:#262626; --danger:#f97066; } }
  * { box-sizing: border-box; }
  body { margin:0; min-height:100dvh; display:flex; flex-direction:column; background:var(--bg); color:var(--ink); font:16px/1.5 Geist, system-ui, -apple-system, "Segoe UI", sans-serif; -webkit-font-smoothing:antialiased; }
  header { display:flex; justify-content:space-between; align-items:center; max-width:1152px; width:100%; margin:0 auto; padding:20px; }
  header a { color:var(--ink-2); font-size:15px; text-decoration:none; }
  header a:hover { color:var(--ink); }
  .logo { color:var(--ink); font-weight:500; }
  .logo span { color:var(--muted); }
  main { flex:1; display:grid; place-items:center; padding:24px 20px 80px; }
  .wrap { width:100%; max-width:440px; }
  .label { margin:0; font:12px/1.4 "Geist Mono", ui-monospace, monospace; text-transform:uppercase; color:var(--muted); }
  h1 { margin:16px 0 0; font-size:44px; font-weight:500; line-height:1.04; letter-spacing:-0.035em; }
  .lead { margin:16px 0 0; font-size:17px; color:var(--ink-2); text-wrap:pretty; }
  form { margin-top:36px; padding-top:28px; border-top:1px solid var(--line); }
  label { display:block; font-size:14px; font-weight:500; }
  input { width:100%; height:48px; margin-top:8px; padding:0 14px; border:1px solid var(--line); border-radius:12px; background:var(--surface); color:var(--ink); font:inherit; transition:border-color 150ms; }
  input:hover { border-color:var(--muted); }
  input:focus-visible { outline:2px solid var(--ink); outline-offset:2px; }
  input[aria-invalid="true"] { border-color:var(--danger); }
  .trap { position:absolute; left:-9999px; width:1px; height:1px; opacity:0; }
  .error { margin:8px 0 0; color:var(--danger); font-size:14px; }
  .note { margin:14px 0 0; font-size:13px; color:var(--muted); }
  button { display:inline-flex; align-items:center; justify-content:center; gap:8px; width:100%; height:48px; margin-top:16px; border:0; border-radius:999px; background:var(--ink); color:var(--bg); font:inherit; font-size:15px; font-weight:500; cursor:pointer; transition:transform 150ms; }
  button span { transition:transform 300ms cubic-bezier(0.22,1,0.36,1); }
  button:hover span { transform:translateX(3px); }
  button:active { transform:scale(0.97); }
  button:focus-visible { outline:2px solid var(--ink); outline-offset:3px; }
  @media (min-width:640px) { header { padding:20px 32px; } h1 { font-size:56px; } }
</style>
</head>
<body>
<header>
  <a class="logo" href="/${lang}/">bamu<span>.ro</span></a>
  <a href="/${lang}/#work">← ${escape(t.back)}</a>
</header>
<main>
  <div class="wrap">
  ${body}
  </div>
</main>
</body>
</html>`;
  return new Response(html, {
    status: 401,
    headers: { "Content-Type": "text/html; charset=utf-8", "Cache-Control": "no-store", "X-Robots-Tag": "noindex" },
  });
}

/** Guarda quién pidió acceso. Si el KV no está enlazado, queda al menos en el log. */
async function recordRequest(env, request, email, lang) {
  const entry = {
    email,
    lang,
    at: new Date().toISOString(),
    country: request.cf?.country ?? null,
    referer: request.headers.get("Referer"),
  };
  if (!env.CASE_REQUESTS) {
    console.log("case-request", JSON.stringify(entry));
  } else {
    // Clave ordenable por fecha; el valor completo va también en metadata para leerlo desde el listado
    await env.CASE_REQUESTS.put(`${entry.at}:${email}`, JSON.stringify(entry), { metadata: entry });
  }
  // Aviso por correo a través del Worker bamu-avisos (Service binding NOTIFY), si está enlazado
  if (env.NOTIFY) {
    const path = new URL(request.url).pathname;
    await env.NOTIFY.fetch("https://bamu-avisos/", { method: "POST", body: JSON.stringify({ ...entry, path }) });
  }
}

export async function onRequest(context) {
  const { request, env, next } = context;
  if (!env.CASE_PASSWORD) return new Response("Not available", { status: 503, headers: { "Cache-Control": "no-store" } });

  const expected = await digest(`bamu.ro:${env.CASE_PASSWORD}`);
  const url = new URL(request.url);
  const lang = url.pathname.startsWith("/en/") ? "en" : "es";

  if (readCookie(request.headers.get("Cookie")) === expected) {
    const res = await next();
    const out = new Response(res.body, res);
    out.headers.set("Cache-Control", "private, no-store");
    out.headers.set("X-Robots-Tag", "noindex");
    return out;
  }

  if (request.method === "POST") {
    const form = await request.formData();
    const email = String(form.get("email") ?? "").trim().toLowerCase().slice(0, 254);
    // Campo trampa: un bot que lo llena recibe el formulario de nuevo, sin acceso
    if (String(form.get("website") ?? "")) return page(lang);
    if (!EMAIL.test(email)) return page(lang, { invalid: true, email });
    context.waitUntil(recordRequest(env, request, email, lang).catch((e) => console.error("case-request", e)));
    return new Response(null, {
      status: 303,
      headers: { Location: url.pathname, "Set-Cookie": cookieHeader(expected), "Cache-Control": "no-store" },
    });
  }

  // Imágenes y payloads de Next no reciben el formulario, solo el rechazo
  if (!(request.headers.get("Accept") ?? "").includes("text/html")) {
    return new Response(null, { status: 401, headers: { "Cache-Control": "no-store" } });
  }
  return page(lang);
}
