// Genera los PDF del CV (ES y EN) a partir del sitio ya compilado en `out/`.
// Uso: pnpm cv:pdf   (compila, sirve `out/` en local e imprime /es/cv y /en/cv con Chrome)
// Los PDF se guardan en public/cv/ y se publican con el sitio. Correr de nuevo cada vez que cambie el CV.
import { spawn } from "node:child_process";
import fs from "node:fs";
import http from "node:http";
import path from "node:path";

const root = path.resolve("out");
const outDir = path.resolve("public/cv");
const chrome =
  process.env.CHROME_PATH ?? "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";

if (!fs.existsSync(root)) {
  console.error("No existe out/. Corre `pnpm build` primero.");
  process.exit(1);
}
if (!fs.existsSync(chrome)) {
  console.error(`No encontré Chrome en ${chrome}. Define CHROME_PATH.`);
  process.exit(1);
}

const types = { ".html": "text/html", ".js": "text/javascript", ".css": "text/css", ".woff2": "font/woff2", ".jpg": "image/jpeg", ".svg": "image/svg+xml" };
const server = http.createServer((req, res) => {
  let file = path.join(root, decodeURIComponent(new URL(req.url, "http://x").pathname));
  if (fs.existsSync(file) && fs.statSync(file).isDirectory()) file = path.join(file, "index.html");
  if (!file.startsWith(root) || !fs.existsSync(file)) return res.writeHead(404).end();
  res.writeHead(200, { "content-type": types[path.extname(file)] ?? "application/octet-stream" });
  fs.createReadStream(file).pipe(res);
});

await new Promise((r) => server.listen(0, "127.0.0.1", r));
const { port } = server.address();
fs.mkdirSync(outDir, { recursive: true });

for (const lang of ["es", "en"]) {
  const target = path.join(outDir, `roberto-baez-cv-${lang}.pdf`);
  // spawn asíncrono: con spawnSync el servidor de arriba no podría responderle a Chrome
  const status = await new Promise((resolve) => {
    const child = spawn(chrome, [
      "--headless=new",
      "--disable-gpu",
      "--no-pdf-header-footer",
      "--virtual-time-budget=4000",
      `--print-to-pdf=${target}`,
      `http://127.0.0.1:${port}/${lang}/cv/`,
    ], { stdio: "ignore" });
    child.on("exit", resolve);
  });
  if (status !== 0 || !fs.existsSync(target)) {
    console.error(`Falló el PDF ${lang} (código ${status})`);
    process.exitCode = 1;
  } else {
    console.log(`✓ ${path.relative(process.cwd(), target)} (${Math.round(fs.statSync(target).size / 1024)} KB)`);
  }
}

server.close();
