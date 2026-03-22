---
name: case-study
description: Use when creating, editing, or structuring case study content. Triggers on MDX files, project writeups, case study pages, portfolio content.
---

# Case Study Authoring

Case studies live in `src/content/projects/` as `.mdx` files.

## Frontmatter

```yaml
---
title: "PROMSY - Proquifa Management System"
description: "Under 160 chars, for SEO and cards"
client: "Farmacéutica / Proveedora"
roles: ["Lead Product Designer", "Business Analyst", "UX Designer", "UI Designer"]
team: "1 PM, 15 devs, 1 QA, 1 Product Designer, 1 UX Designer"
timeline: "Marzo – Julio 2024"
tools: ["Figma", "Jira", "Notion"]
cover: "/images/projects/promsy/cover.webp"
order: 1
published: true
nda: true
---
```

## Narrative Arc

1. **Datos Rápidos** → Metadata bar. Client, roles, team, duration, tools, NDA badge.
2. **El Contexto** → Situation, stakes, why it mattered.
3. **El Problema** → Real problem vs brief. Evidence. What the business lost.
4. **Mi Enfoque** → Personal: research approach, key decisions, surprises, failures, constraints.
5. **La Solución** → Concrete: screens, flows, design decisions + WHY. Design system if relevant.
6. **El Resultado** → Metrics, before/after, quotes. If NDA: be honest about limits.
7. **Lo Que Aprendí** → Specific reflection. Not generic.

## MDX Components

```tsx
<MetricCard label="Tiempo de actualización" before="1-3 días" after="Inmediato" />
<ImageGrid columns={2} />
<Callout type="insight|nda|note">Text</Callout>
<BeforeAfter before="/images/..." after="/images/..." />
<QuickFacts data={frontmatter} />
```

## Writing

- First person. Direct. No filler.
- Lead with outcomes.
- Every image gets a caption explaining design intent.
- Paragraphs: max 3 sentences.
