"use client";

import { DownloadSimple } from "@phosphor-icons/react";

/** Abre el diálogo de impresión; desde ahí se guarda como PDF con el formato de la hoja. */
export function PrintButton({ label }: { label: string }) {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className="inline-flex h-10 items-center gap-2 rounded-full bg-ink px-4 text-sm font-medium text-bg transition-transform duration-150 active:scale-[0.97]"
    >
      <DownloadSimple size={16} weight="bold" />
      {label}
    </button>
  );
}
