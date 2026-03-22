# Portfolio — Roberto Báez Muñoz

## Project

Personal portfolio for Roberto Báez Muñoz, Product Designer. Static site on Cloudflare Pages.

## Stack

- Next.js 15 (App Router, SSG via `output: "export"`)
- TypeScript strict
- Tailwind CSS v4
- Framer Motion
- MDX for case studies
- pnpm

## Architecture

```
src/
├── app/
│   ├── layout.tsx       # Root layout, fonts, theme provider
│   ├── page.tsx         # Home: headline + project grid
│   ├── work/
│   │   ├── page.tsx     # All projects
│   │   └── [slug]/page.tsx
│   ├── about/page.tsx
│   ├── side-projects/page.tsx
│   └── contact/page.tsx
├── components/
│   ├── ui/              # Button, Badge, Card, ThemeToggle, MetricCard
│   ├── layout/          # Header, Footer, Navigation
│   └── sections/        # Hero, ProjectGrid, CaseStudyHeader, ImageGrid
├── content/projects/    # .mdx case studies
├── lib/                 # mdx.ts, utils.ts, constants.ts
├── styles/globals.css   # Tailwind, tokens, fonts
└── public/
    ├── images/projects/
    ├── fonts/
    └── og/
```

## Owner

- Roberto Báez Muñoz
- Product Designer / UX Designer / UI Designer
- hello@bamu.ro | linkedin.com/in/robertobmz
- Headline: "Me gusta resolver, diseñando :)"
- Spanish (Native), English (C1)

## Design Direction

Minimalista, espaciado, pulcro. Neutros. Inspirado por angelinacao.com, peternoah.com, read.cv.
Tono: Directo, profesional, sin adornos.

## Workflow

This project follows a two-phase workflow:

### Phase 1: Design in Figma
Content lives in Notion → Claude reads it via Notion MCP → Claude creates screens in Figma via figma-console MCP (figma_execute) → Roberto refines in Figma manually.

### Phase 2: Figma to Code
Claude reads final designs from Figma via figma-console MCP (figma_get_component, figma_take_screenshot, figma_get_variables) → generates code in Next.js.

## MCPs Available

- **figma-console** (southleft): Design creation via `figma_execute`, screenshots via `figma_take_screenshot`, variables via `figma_get_variables`, components via `figma_get_component`
- **Notion**: Read case study content from Notion templates
- **Figma official** (optional): Read-only design context via `https://mcp.figma.com/mcp`

## Commands

```bash
pnpm dev          # Dev server
pnpm build        # Static export
pnpm lint         # ESLint
pnpm typecheck    # tsc --noEmit
```

## Code Style

- Functional components. Named exports. Default export only in page/layout.
- `cn()` (clsx + tailwind-merge) for conditional classes.
- Framer Motion `motion` components. Variants in the component file.
- `next/image` with explicit width/height. WebP. Priority on above-the-fold.
- Colors via CSS custom properties, never raw hex.

## Rules

- IMPORTANT: Run `pnpm typecheck` after finishing changes.
- IMPORTANT: Never install packages without asking first.
- Accessibility: semantic HTML, focus states, skip-to-content, alt text.
- No lorem ipsum. Realistic copy in Spanish or English.
- NDA projects: never include real client branding or specific metrics unless cleared.
