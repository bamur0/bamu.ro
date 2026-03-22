---
name: notion-to-mdx
description: Use when converting case study content from Notion to MDX. Triggers on Notion imports, content migration, case study conversion.
---

# Notion → MDX Conversion

## Notion Section → MDX Mapping

| Notion | MDX |
|---|---|
| Datos rápidos (table) | Frontmatter YAML |
| El contexto | `## Contexto` |
| El problema | `## El Problema` |
| Tu enfoque | `## Mi Enfoque` |
| La solución (meeting-notes) | `## La Solución` |
| El resultado (meeting-notes) | `## Resultado` |
| Lo que aprendí (meeting-notes) | `## Lo Que Aprendí` |
| NDA toggle | `nda: true` + `<Callout type="nda">` |

## Rules

1. Meeting-notes summaries become section content. Ignore transcript references.
2. Rewrite bullets into flowing prose (max 3 sentences per paragraph).
3. Remove footnote references — weave context inline.
4. Remove template instructions (italic prompts) and empty blocks.
5. Keep first-person voice. Direct.
6. Save to `src/content/projects/[slug].mdx`.
