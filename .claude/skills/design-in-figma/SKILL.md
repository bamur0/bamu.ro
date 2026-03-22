---
name: design-in-figma
description: Use when creating or modifying designs directly in Figma. Triggers on requests to design screens, create mockups, build layouts in Figma, or when Notion content needs to become Figma frames.
---

# Design in Figma

Use the figma-console MCP (southleft) to create designs directly in Figma via `figma_execute`.

## Workflow: Notion Content → Figma Screens

1. **Read content** from Notion via Notion MCP
2. **Plan the screen** — determine layout, sections, hierarchy from the content
3. **Create in Figma** via `figma_execute` using Figma Plugin API
4. **Screenshot** via `figma_take_screenshot` to verify
5. **Iterate** until the design matches the vision

## figma_execute Basics

`figma_execute` runs Figma Plugin API code. Key patterns:

### Create a frame
```js
const frame = figma.createFrame()
frame.name = "Home - Hero"
frame.resize(1440, 900)
frame.layoutMode = "VERTICAL"
frame.primaryAxisAlignItems = "CENTER"
frame.paddingTop = 80
frame.paddingBottom = 80
frame.paddingLeft = 120
frame.paddingRight = 120
frame.itemSpacing = 32
```

### Create text
```js
const text = figma.createText()
await figma.loadFontAsync({ family: "Inter", style: "Bold" })
text.characters = "Me gusta resolver, diseñando :)"
text.fontSize = 48
text.fontName = { family: "Inter", style: "Bold" }
```

### Apply colors
```js
frame.fills = [{ type: 'SOLID', color: { r: 0.98, g: 0.98, b: 0.97 } }]
text.fills = [{ type: 'SOLID', color: { r: 0.09, g: 0.09, b: 0.09 } }]
```

### Auto-layout
```js
frame.layoutMode = "VERTICAL" // or "HORIZONTAL"
frame.primaryAxisSizingMode = "AUTO"
frame.counterAxisSizingMode = "FIXED"
frame.itemSpacing = 16
```

## Design Principles for This Portfolio

- **1440px wide** frames for desktop, **375px** for mobile
- Generous padding: 80-120px vertical, 120px horizontal on desktop
- Use auto-layout on everything for responsive behavior
- Follow the neutral color palette from the design-system skill
- Typography hierarchy: large display heading, clean body text, small metadata
- Group related content in named frames for clean layer structure

## Validation Loop

After every `figma_execute`:
1. Run `figma_take_screenshot` to see the result
2. Check alignment, spacing, visual balance
3. Fix issues with another `figma_execute`
4. Screenshot again to confirm

## Important

- Always load fonts before using them: `await figma.loadFontAsync(...)`
- Figma colors are 0-1 range, not 0-255. Convert: `hexValue / 255`
- Name every frame and layer descriptively for clean handoff
- Roberto will refine designs manually after Claude creates the initial layout
