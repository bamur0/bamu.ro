// Worker bamu-avisos: manda un correo a Roberto cada vez que alguien pide acceso a un
// caso privado. Solo lo llama la Pages Function del sitio por Service binding (NOTIFY);
// no tiene ruta pública. Envía con el binding de Email Service (AVISO), solo a Roberto.
const FROM = "avisos@bamu.ro";
const TO = "r.bamuro@gmail.com";

const worker = {
  async fetch(request, env) {
    if (request.method !== "POST") return new Response(null, { status: 405 });
    const e = await request.json();
    const email = String(e.email ?? "").replace(/[\r\n]/g, "");
    if (!email) return new Response(null, { status: 400 });

    await env.AVISO.send({
      from: FROM,
      to: TO,
      subject: `Alguien pidió ver tu caso: ${email}`,
      text: [
        `${email} dejó su correo para ver el caso.`,
        "",
        `Caso: https://bamu.ro${e.path ?? ""}`,
        `Idioma: ${e.lang ?? "?"}`,
        `País: ${e.country ?? "?"}`,
        `Llegó desde: ${e.referer || "acceso directo"}`,
        `Fecha (UTC): ${e.at ?? new Date().toISOString()}`,
      ].join("\n"),
    });
    return new Response(null, { status: 204 });
  },
};

export default worker;
