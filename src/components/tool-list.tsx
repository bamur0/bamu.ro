import { OpenAiLogo } from "@phosphor-icons/react/ssr";
import {
  siClaude,
  siClaudecode,
  siCss,
  siFigma,
  siGoogle,
  siGooglegemini,
  siHtml5,
  siJira,
  siNotebooklm,
  siNotion,
  siSketch,
  type SimpleIcon,
} from "simple-icons";

/**
 * Herramientas con su logo, para que se reconozcan de un vistazo. Los logos vienen de
 * Simple Icons (CC0); OpenAI no está ahí y sale de Phosphor. FigJam usa el de Figma y
 * Stitch el de Google, porque no tienen logo propio publicado.
 * Los logos negros (Notion, NotebookLM, OpenAI) van en tinta para que se vean en oscuro.
 * Adobe pidió retirar sus logos de Simple Icons: sus apps van como el mosaico de dos letras.
 * Orca tampoco tiene logo publicado y usa el mismo mosaico, en tinta; Google Workspace, la G de Google.
 */
type Tile = { tile: string; bg: string; fg: string };
type Tool = { name: string; icon: SimpleIcon | Tile | "openai"; ink?: boolean };

const tools: Tool[] = [
  { name: "Figma", icon: siFigma },
  { name: "FigJam", icon: siFigma },
  { name: "Sketch", icon: siSketch },
  { name: "Photoshop", icon: { tile: "Ps", bg: "#001E36", fg: "#31A8FF" } },
  { name: "Illustrator", icon: { tile: "Ai", bg: "#330000", fg: "#FF9A00" } },
  { name: "After Effects", icon: { tile: "Ae", bg: "#00005B", fg: "#9999FF" } },
  { name: "HTML", icon: siHtml5 },
  { name: "CSS", icon: siCss },
  { name: "Notion", icon: siNotion, ink: true },
  { name: "Jira", icon: siJira },
  { name: "Google Workspace", icon: siGoogle },
  { name: "Claude", icon: siClaude },
  { name: "Claude Code", icon: siClaudecode },
  { name: "ChatGPT", icon: "openai", ink: true },
  { name: "Codex", icon: "openai", ink: true },
  { name: "Orca", icon: { tile: "O", bg: "var(--color-ink)", fg: "var(--color-bg)" } },
  { name: "Gemini", icon: siGooglegemini },
  { name: "Stitch", icon: siGoogle },
  { name: "NotebookLM", icon: siNotebooklm, ink: true },
];

export function ToolList() {
  return (
    <ul className="flex flex-wrap gap-2">
      {tools.map(({ name, icon, ink }) => (
        <li
          key={name}
          className="inline-flex items-center gap-2 rounded-full border border-line bg-surface py-1.5 pl-2.5 pr-3.5 text-[14px] text-ink"
        >
          {icon === "openai" ? (
            <OpenAiLogo size={16} weight="fill" aria-hidden />
          ) : "tile" in icon ? (
            <span
              aria-hidden
              className="inline-flex size-[15px] items-center justify-center rounded-[3.5px] text-[8px] font-semibold leading-none tracking-tight"
              style={{ background: icon.bg, color: icon.fg }}
            >
              {icon.tile}
            </span>
          ) : (
            <svg
              viewBox="0 0 24 24"
              width={15}
              height={15}
              aria-hidden
              fill={ink ? "currentColor" : `#${icon.hex}`}
            >
              <path d={icon.path} />
            </svg>
          )}
          {name}
        </li>
      ))}
    </ul>
  );
}
