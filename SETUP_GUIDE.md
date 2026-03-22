# Setup Guide — Portfolio bamu.ro

Guía paso a paso. Asume que partes de cero.

---

## Paso 0: Requisitos

Necesitas tener instalado:

| Herramienta | Cómo verificar | Cómo instalar |
|---|---|---|
| Node.js 18+ | `node -v` | https://nodejs.org |
| pnpm | `pnpm -v` | `npm install -g pnpm` |
| Git | `git -v` | https://git-scm.com |
| Antigravity IDE | Abrirlo | Ya lo tienes |
| Claude Code | Viene con Antigravity | Ya integrado |

---

## Paso 1: Crear el proyecto Next.js

Abre la terminal de Antigravity y ejecuta:

```bash
pnpm create next-app@latest portfolio --typescript --tailwind --eslint --app --src-dir
cd portfolio
```

Cuando pregunte opciones:
- TypeScript → **Yes**
- ESLint → **Yes**  
- Tailwind CSS → **Yes**
- src/ directory → **Yes**
- App Router → **Yes**
- Turbopack → **No**
- Import alias → **@/***

## Paso 2: Instalar dependencias extra

```bash
pnpm add framer-motion next-themes next-mdx-remote gray-matter
pnpm add -D @tailwindcss/typography clsx tailwind-merge
```

## Paso 3: Configurar static export

Abre `next.config.ts` y reemplaza todo el contenido con:

```ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
```

## Paso 4: Copiar los archivos de Claude Code

Descarga el `.tar.gz` que te di y extrae los archivos. Copia todo a la raíz de tu proyecto para que quede así:

```
portfolio/
├── CLAUDE.md                          ← pégalo aquí
├── .mcp.json                          ← pégalo aquí
├── .claude/
│   ├── settings.json
│   ├── skills/
│   │   ├── design-system/SKILL.md
│   │   ├── case-study/SKILL.md
│   │   ├── figma-to-code/SKILL.md
│   │   ├── design-in-figma/SKILL.md
│   │   └── notion-to-mdx/SKILL.md
│   ├── agents/
│   │   └── code-review.md
│   └── commands/
│       ├── design-screen.md
│       ├── build-from-figma.md
│       ├── import-case-study.md
│       └── deploy.md
├── src/
├── public/
├── package.json
└── ...
```

## Paso 5: Configurar el MCP de Figma (southleft)

El `.mcp.json` ya tiene la config para el modo remoto (SSE). Pero si ya lo configuraste de otra forma en Antigravity, verifica que aparezca.

En Claude Code dentro de Antigravity, escribe:

```
/mcp
```

Deberías ver `figma-console` como **connected**. Si no aparece, agrega manualmente:

```bash
claude mcp add --transport sse figma-console https://figma-console-mcp.southleft.com/sse
```

### Si usas el modo local (Desktop Bridge)

Si quieres crear diseños en Figma (Phase 1), necesitas el modo local del MCP + el Desktop Bridge plugin. Esto te da acceso a `figma_execute`.

1. Abre Figma Desktop con debug port:
   - **Mac**: `open -a "Figma" --args --remote-debugging-port=9222`
   - **Windows**: `start figma://--remote-debugging-port=9222`

2. Descarga el plugin Bridge de: https://github.com/southleft/figma-console-mcp/releases
3. En Figma: Plugins → Development → Import plugin from manifest
4. Ejecuta el plugin en tu archivo de Figma

5. Actualiza `.mcp.json` para modo local:
```json
{
  "mcpServers": {
    "figma-console": {
      "type": "stdio",
      "command": "npx",
      "args": ["-y", "figma-console-mcp@latest"],
      "env": {
        "FIGMA_ACCESS_TOKEN": "tu_token_aquí"
      }
    }
  }
}
```

6. Obtén tu token en: https://www.figma.com/developers/api#access-tokens

## Paso 6: Configurar Notion MCP

Si Antigravity ya tiene el Notion MCP conectado (vía claude.ai), no necesitas hacer nada más. Verifica con `/mcp`.

Si no aparece:
```bash
claude plugin install notion
```

## Paso 7: Inicializar Git

```bash
git init
git add .
git commit -m "Initial setup: Next.js + Claude Code config"
```

## Paso 8: Conectar Cloudflare Pages

1. Crea un repo en GitHub: `portfolio` (o el nombre que quieras)
2. Push:
   ```bash
   git remote add origin https://github.com/TU_USUARIO/portfolio.git
   git push -u origin main
   ```
3. En Cloudflare Dashboard → Pages → Create project → Connect to Git
4. Settings:
   - Framework: **Next.js (Static HTML Export)**
   - Build command: **`pnpm build`**
   - Output directory: **`out`**
5. Deploy. Cada push a `main` deplorea automáticamente.

---

## Tu flujo de trabajo diario

### Fase 1: Diseñar en Figma

```
Tú: "Diseña la pantalla de Home basándote en mi info de Notion"

Claude lee tu Notion → crea frames en Figma vía figma_execute
→ toma screenshot → te muestra el resultado

Tú: Ajustas en Figma manualmente lo que no te guste
```

Comando rápido:
```
/design-screen Home https://notion.so/bamuro/Proquifa-Management-System-32b25c73...
```

### Fase 2: De Figma a código

```
Tú: "Construye el componente Hero basándote en lo que hay en Figma"

Claude toma screenshot de Figma → extrae variables/tokens
→ genera componente Next.js + Tailwind + Framer Motion

Tú: Revisas el código, iteras
```

Comando rápido:
```
/build-from-figma Hero
```

### Para importar un case study:

```
/import-case-study https://notion.so/bamuro/Proquifa-Management-System-32b25c73...
```

### Antes de deployar:

```
/deploy
```

---

## Comandos disponibles

| Comando | Fase | Qué hace |
|---|---|---|
| `/design-screen` | Diseño | Crea pantalla en Figma desde Notion |
| `/build-from-figma` | Código | Genera componente desde Figma |
| `/import-case-study` | Contenido | Notion → MDX |
| `/deploy` | Deploy | Checklist + build |
| `/code-review` | QA | Revisa a11y, performance, tokens |

## Skills automáticos

| Skill | Se activa cuando... |
|---|---|
| `design-in-figma` | Creas o modificas diseños en Figma |
| `design-system` | Creas/editas componentes o tokens |
| `case-study` | Trabajas con MDX o contenido de proyectos |
| `figma-to-code` | Implementas un diseño de Figma en código |
| `notion-to-mdx` | Importas contenido desde Notion |

---

## Tips para noobs

1. **Empieza cada sesión** diciendo qué vas a hacer: "Voy a trabajar en la pantalla de Home"
2. **Usa Plan Mode** para cosas complejas: escribe `plan` antes del prompt
3. **`/clear`** cuando cambies de tarea para resetear contexto
4. **Commitea seguido**: después de cada feature `git add . && git commit -m "feat: hero section"`
5. **No te asustes de los errores**: Claude los puede leer y corregir
6. **El typecheck es tu amigo**: si pasa, probablemente está bien
