---
name: design-system
description: Use when creating or modifying UI components, applying design tokens, or ensuring visual consistency. Triggers on component creation, styling, theming, color, typography, spacing.
---

# Design System — bamu.ro

## Visual Direction

Minimalista, espaciado, pulcro. References: angelinacao.com, peternoah.com, read.cv/explore.

- Generous whitespace. Content breathes.
- Typography-driven hierarchy. Type does the heavy lifting.
- Neutral palette with one subtle accent for interactive elements.
- Restrained motion. Animate to reveal, not to impress.
- Editorial feel. Reads like a well-designed magazine, not a SaaS landing page.

## Tokens

CSS custom properties in `globals.css`. Never raw hex in components.

```css
/* Light */
--color-bg: #fafafa;
--color-fg: #171717;
--color-muted: #737373;
--color-accent: #404040;
--color-border: #e5e5e5;

/* Dark */
--color-bg: #0a0a0a;
--color-fg: #ededed;
--color-muted: #a3a3a3;
--color-accent: #d4d4d4;
--color-border: #262626;
```

## Typography

- Display: Self-hosted serif or distinctive sans via `next/font/local`. Editorial, not generic.
- Body: Clean sans-serif. Readable at 16px.
- Mono: For metadata, tags, dates.
- DO NOT use Inter, Roboto, or system-ui.

## Spacing

Page gutters: `px-6 md:px-12 lg:px-24`. Max content: `max-w-3xl` text, `max-w-5xl` grids.

## Motion

```ts
const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
}
```

Use `whileInView` with `once: true`. No bounces, no overshooting.

## Images

`next/image` always. Explicit dimensions. WebP. `priority` on hero. Store in `public/images/projects/[slug]/`.
NDA projects: blur or genericize. No client branding.
