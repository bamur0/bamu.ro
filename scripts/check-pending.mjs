// Corre antes de cada build: si queda una nota <Pending> en algún caso, el build falla
// y no se publica. En `next dev` no corre, así las notas siguen visibles al editar.
import fs from "node:fs";
import path from "node:path";

const dir = path.join(process.cwd(), "content", "cases");
const hits = [];
for (const slug of fs.readdirSync(dir)) {
  const caseDir = path.join(dir, slug);
  if (!fs.statSync(caseDir).isDirectory()) continue;
  for (const file of fs.readdirSync(caseDir)) {
    const lines = fs.readFileSync(path.join(caseDir, file), "utf8").split("\n");
    lines.forEach((line, i) => line.includes("<Pending") && hits.push(`content/cases/${slug}/${file}:${i + 1}`));
  }
}

if (hits.length) {
  console.error(`Hay notas <Pending> sin resolver:\n${hits.map((h) => `  ${h}`).join("\n")}`);
  process.exit(1);
}
