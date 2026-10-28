/** Id para anclas a partir de un título: sin acentos, en minúsculas y con guiones. */
export const slugify = (text: string) =>
  text
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

/** Secciones de un caso: los `## títulos` del MDX, con el mismo id que recibe su h2. */
export const sectionsOf = (mdx: string) =>
  [...mdx.matchAll(/^## (.+)$/gm)].map(([, label]) => ({ id: slugify(label.trim()), label: label.trim() }));
