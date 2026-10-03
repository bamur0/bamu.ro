import { site } from "@/lib/site";
import type { Dictionary } from "@/i18n/dictionaries";

export function SiteFooter({ dict }: { dict: Dictionary }) {
  return (
    <footer className="no-print mt-24 px-4 pb-10 sm:px-6">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
        <p>
          {dict.footer.rights}, {new Date().getFullYear()}
        </p>
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
