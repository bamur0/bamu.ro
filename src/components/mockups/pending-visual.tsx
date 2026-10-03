import { ImagesSquare } from "@phosphor-icons/react/ssr";

/**
 * Espacio reservado para una pantalla que aún no se recrea desde Figma.
 * Debe desaparecer antes de publicar en bamu.ro.
 */
export function PendingVisual({ label, ratio = "16 / 10" }: { label: string; ratio?: string }) {
  return (
    <div
      className="grid w-full place-items-center rounded-surface border border-dashed border-line bg-surface-2/60 text-center"
      style={{ aspectRatio: ratio }}
    >
      <div className="flex max-w-xs flex-col items-center gap-2 px-6 text-sm text-muted">
        <ImagesSquare size={28} weight="light" />
        <span>{label}</span>
      </div>
    </div>
  );
}
