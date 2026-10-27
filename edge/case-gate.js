// Cloudflare Pages Function compartida: protege con contraseña un caso y sus imágenes.
// Quien no tiene la contraseña deja su correo y la recibe en pantalla; el correo se
// guarda en el KV CASE_REQUESTS (si está enlazado) para saber quién vio el caso.
// La contraseña vive en la variable CASE_PASSWORD (secreto en el panel de Cloudflare),
// nunca en el repo. Sin la variable no se sirve nada: falla cerrado.
const COOKIE = "case_key";
const MAX_AGE = 60 * 60 * 24 * 30;
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const copy = {
  es: {
    title: "Caso con contraseña",
    lead: "Este caso muestra trabajo de un proyecto en curso, así que está protegido. Déjame tu correo y te doy la contraseña aquí mismo.",
    email: "Tu correo",
    request: "Obtener la contraseña",
    privacy: "Solo lo uso para saber quién vio el caso. No lo comparto ni te agrego a ninguna lista.",
    badEmail: "Revisa el correo, parece incompleto.",
    have: "¿Ya tienes la contraseña?",
    label: "Contraseña",
    submit: "Ver el caso",
    error: "La contraseña no es correcta.",
    grantedTitle: "Listo, ya puedes verlo",
    grantedLead: "Esta es la contraseña, por si quieres volver desde otro dispositivo:",
    back: "Todos los casos",
  },
  en: {
    title: "Password protected case",
    lead: "This case shows work from an ongoing project, so it's protected. Leave your email and I'll give you the password right here.",
    email: "Your email",
    request: "Get the password",
    privacy: "I only use it to know who viewed the case. I won't share it or add you to any list.",
    badEmail: "Check the email, it looks incomplete.",
    have: "Already have the password?",
    label: "Password",
    submit: "View case",
    error: "That password isn't right.",
    grantedTitle: "Done, you can view it now",
    grantedLead: "Here's the password, in case you want to come back from another device:",
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

/** state: "request" | "badEmail" | "badPassword" | "granted" */
function page(lang, state, { password = "", path = "/", email = "", status = 401, cookie } = {}) {
  const t = copy[lang];
  const body =
    state === "granted"
      ? `<h1>${escape(t.grantedTitle)}</h1>
  <p>${escape(t.grantedLead)}</p>
  <div class="card">
    <code>${escape(password)}</code>
    <a class="button" href="${escape(path)}">${escape(t.submit)}</a>
  </div>`
      : `<h1>${escape(t.title)}</h1>
  <p>${escape(t.lead)}</p>
  <form method="post" class="card">
    <label for="email">${escape(t.email)}</label>
    <input id="email" name="email" type="email" autocomplete="email" inputmode="email" required value="${escape(email)}"${state === "badPassword" ? "" : " autofocus"}${state === "badEmail" ? ' aria-invalid="true" aria-describedby="email-error"' : ""}>
    ${state === "badEmail" ? `<p class="error" id="email-error" role="alert">${escape(t.badEmail)}</p>` : ""}
    <input class="trap" name="website" tabindex="-1" autocomplete="off" aria-hidden="true">
    <button type="submit">${escape(t.request)}</button>
    <p class="note">${escape(t.privacy)}</p>
  </form>
  <details${state === "badPassword" ? " open" : ""}>
    <summary>${escape(t.have)}</summary>
    <form method="post" class="card">
      <label for="password">${escape(t.label)}</label>
      <input id="password" name="password" type="password" autocomplete="current-password" required${state === "badPassword" ? ' autofocus aria-invalid="true" aria-describedby="password-error"' : ""}>
      ${state === "badPassword" ? `<p class="error" id="password-error" role="alert">${escape(t.error)}</p>` : ""}
      <button type="submit" class="secondary">${escape(t.submit)}</button>
    </form>
  </details>`;

  const html = `<!doctype html>
<html lang="${lang}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex">
<title>${escape(t.title)} · Roberto Báez</title>
<style>
  :root { --bg:#f4f4f3; --surface:#fbfbfa; --surface-2:#ebebe9; --ink:#19191b; --ink-2:#47474c; --muted:#66666c; --line:#deded9; --danger:#b42318; color-scheme: light dark; }
  @media (prefers-color-scheme: dark) { :root { --bg:#111112; --surface:#18181a; --surface-2:#232326; --ink:#ededea; --ink-2:#bdbdb7; --muted:#94948f; --line:#2c2c30; --danger:#f97066; } }
  * { box-sizing: border-box; }
  body { margin:0; min-height:100dvh; display:grid; place-items:center; padding:16px; background:var(--bg); color:var(--ink); font:16px/1.5 system-ui, -apple-system, "Segoe UI", sans-serif; }
  main { width:100%; max-width:400px; }
  a { color:var(--ink-2); font-size:14px; text-decoration:none; }
  a:hover { color:var(--ink); }
  h1 { margin:28px 0 8px; font-size:26px; line-height:1.15; letter-spacing:-0.02em; }
  p { margin:0; color:var(--ink-2); }
  .card { margin-top:24px; padding:20px; border:1px solid var(--line); border-radius:14px; background:var(--surface); }
  label { display:block; font-size:14px; font-weight:500; }
  input { width:100%; height:44px; margin-top:8px; padding:0 12px; border:1px solid var(--line); border-radius:8px; background:var(--bg); color:var(--ink); font:inherit; }
  input:focus { outline:2px solid var(--ink); outline-offset:1px; }
  .trap { position:absolute; left:-9999px; width:1px; height:1px; opacity:0; }
  .error { margin-top:8px; color:var(--danger); font-size:14px; }
  .note { margin-top:12px; font-size:13px; color:var(--muted); }
  button, .button { display:grid; place-items:center; width:100%; height:44px; margin-top:16px; border:0; border-radius:8px; background:var(--ink); color:var(--bg); font:inherit; font-size:16px; font-weight:500; cursor:pointer; }
  .button:hover { color:var(--bg); }
  button.secondary { background:var(--surface-2); color:var(--ink); }
  button:active, .button:active { transform:scale(0.98); }
  details { margin-top:20px; }
  summary { cursor:pointer; font-size:14px; color:var(--ink-2); }
  details .card { margin-top:12px; }
  code { display:block; padding:12px; border-radius:8px; background:var(--surface-2); font:500 18px/1.4 ui-monospace, SFMono-Regular, Menlo, monospace; text-align:center; user-select:all; word-break:break-all; }
</style>
</head>
<body>
<main>
  <a href="/${lang}/#work">← ${escape(t.back)}</a>
  ${body}
</main>
</body>
</html>`;
  const headers = { "Content-Type": "text/html; charset=utf-8", "Cache-Control": "no-store", "X-Robots-Tag": "noindex" };
  if (cookie) headers["Set-Cookie"] = cookie;
  return new Response(html, { status, headers });
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
    return;
  }
  // Clave ordenable por fecha; el valor completo va también en metadata para leerlo desde el listado
  await env.CASE_REQUESTS.put(`${entry.at}:${email}`, JSON.stringify(entry), { metadata: entry });
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

    if (form.has("email")) {
      const email = String(form.get("email") ?? "").trim().toLowerCase().slice(0, 254);
      // Campo trampa: un bot que lo llena recibe el formulario de nuevo, sin acceso
      if (String(form.get("website") ?? "")) return page(lang, "request");
      if (!EMAIL.test(email)) return page(lang, "badEmail", { email });
      context.waitUntil(recordRequest(env, request, email, lang).catch((e) => console.error("case-request", e)));
      return page(lang, "granted", {
        password: env.CASE_PASSWORD,
        path: url.pathname,
        status: 200,
        cookie: cookieHeader(expected),
      });
    }

    const given = String(form.get("password") ?? "");
    if (given && (await digest(`bamu.ro:${given}`)) === expected) {
      return new Response(null, {
        status: 303,
        headers: { Location: url.pathname, "Set-Cookie": cookieHeader(expected), "Cache-Control": "no-store" },
      });
    }
    return page(lang, "badPassword");
  }

  // Imágenes y payloads de Next no reciben el formulario, solo el rechazo
  if (!(request.headers.get("Accept") ?? "").includes("text/html")) {
    return new Response(null, { status: 401, headers: { "Cache-Control": "no-store" } });
  }
  return page(lang, "request");
}
