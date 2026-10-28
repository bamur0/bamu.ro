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
  type SimpleIcon,
} from "simple-icons";

/**
 * Herramientas con su logo, para que se reconozcan de un vistazo. Los logos vienen de
 * Simple Icons (CC0); OpenAI no está ahí y sale de Phosphor. FigJam usa el de Figma y
 * Stitch el de Google, porque no tienen logo propio publicado.
 * Los logos negros (Notion, NotebookLM, OpenAI) van en tinta para que se vean en oscuro.
 */
type Tool = { name: string; icon: SimpleIcon | "openai"; ink?: boolean };

const tools: Tool[] = [
  { name: "Figma", icon: siFigma },
  { name: "FigJam", icon: siFigma },
  { name: "HTML", icon: siHtml5 },
  { name: "CSS", icon: siCss },
  { name: "Notion", icon: siNotion, ink: true },
  { name: "Jira", icon: siJira },
  { name: "Claude", icon: siClaude },
  { name: "Claude Code", icon: siClaudecode },
  { name: "ChatGPT", icon: "openai", ink: true },
  { name: "Codex", icon: "openai", ink: true },
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
