import { Heart } from "@phosphor-icons/react/ssr";
import { site } from "@/lib/site";
import type { Dictionary } from "@/i18n/dictionaries";
import { ClaudeCodeMark } from "./claude-code-mark";

export function SiteFooter({ dict }: { dict: Dictionary }) {
  return (
    <footer className="no-print mt-24 px-4 pb-10 sm:px-6">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 text-sm text-muted sm:flex-row sm:items-end sm:justify-between">
        <div className="space-y-1.5">
          <p>
            {dict.footer.rights}, {new Date().getFullYear()}
          </p>
          <p className="flex flex-wrap items-center gap-x-1.5">
            {dict.footer.madeWith}
            <Heart size={15} weight="fill" className="text-danger" aria-label={dict.footer.love} />
            {dict.footer.and}
            <a
              href="https://claude.com/claude-code"
              target="_blank"
              rel="noreferrer"
              className="group inline-flex items-center gap-1.5 text-ink-2 hover:text-ink"
            >
              <ClaudeCodeMark className="size-4 transition-transform duration-300 ease-out-quint group-hover:-translate-y-0.5" />
              <span className="link">Claude Code</span>
            </a>
          </p>
        </div>
        <div className="flex gap-5">
          <a className="link" href={site.linkedin} target="_blank" rel="noreferrer">
            LinkedIn
          </a>
          <a className="link" href={site.behance} target="_blank" rel="noreferrer">
            Behance
          </a>
          <a className="link" href={`mailto:${site.email}`}>
            Email
          </a>
        </div>
      </div>
    </footer>
  );
}
