---
name: figma-to-code
description: Use when implementing a Figma design into code. Triggers on design implementation, pixel-perfect, mockup to code, Figma frame to component.
---

# Figma → Code

Use the figma-console MCP (southleft) to read designs and generate Next.js components.

## 1. Capture Design Context

```
figma_take_screenshot     → Visual reference of the frame
figma_get_variables       → Design tokens (colors, spacing, typography)
figma_get_component       → Component structure and metadata
figma_get_styles          → Color, text, effect styles
```

## 2. Map to Design System

| Figma | Code |
|---|---|
| Fill color | `--color-*` token or Tailwind |
| Font size | Tailwind `text-*` |
| Spacing | Tailwind `p-*`, `gap-*` |
| Border radius | Tailwind `rounded-*` |
| Shadow | Tailwind `shadow-*` |

If a value doesn't map to existing tokens, ask before creating new ones.

## 3. Build Order

1. Layout structure (flex/grid via Tailwind)
2. Typography and spacing
3. Colors and borders
4. Hover/focus states
5. Framer Motion animations last

## 4. Verify

- Compare against Figma screenshot visually
- Check responsive: 375px, 768px, 1280px
- Verify dark mode
- Run `pnpm typecheck`
