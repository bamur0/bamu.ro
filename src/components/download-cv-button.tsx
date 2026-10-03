import { DownloadSimple } from "@phosphor-icons/react/ssr";

/** Descarga el PDF del CV generado con `pnpm cv:pdf` (public/cv/). */
export function DownloadCvButton({ href, label }: { href: string; label: string }) {
  return (
    <a
      href={href}
      download
      className="inline-flex h-11 items-center gap-2 rounded-full bg-ink px-5 text-sm font-medium text-bg transition-transform duration-150 active:scale-[0.97]"
    >
      <DownloadSimple size={16} weight="bold" />
      {label}
    </a>
  );
}
