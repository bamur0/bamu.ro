import { ArrowRight, ArrowsClockwise } from "@phosphor-icons/react/ssr";
import type { Locale } from "@/i18n/config";

const ui = {
  es: {
    before: "Antes",
    after: "Ahora",
    beforeSteps: ["Correo del cliente", "Se clasifica por tipo", "Bandeja de cotizaciones, bandeja de pedidos…"],
    afterSteps: ["Correo del cliente", "Clasificación automática", "Un pendiente por asunto, en su módulo y con responsable"],
    fix: "Si se equivoca, se corrige desde el pendiente",
  },
  en: {
    before: "Before",
    after: "Now",
    beforeSteps: ["Customer email", "Sorted by type", "Quotes inbox, orders inbox…"],
    afterSteps: ["Customer email", "Automatic classification", "One task per topic, in its module, with an owner"],
    fix: "If it's wrong, it's corrected from the task",
  },
};

function Row({ label, steps, strong = false }: { label: string; steps: string[]; strong?: boolean }) {
  return (
    <div className="grid gap-3 md:grid-cols-[72px_1fr] md:items-center">
      <p className="font-mono text-xs text-muted">{label}</p>
      <ol className="flex flex-col gap-2 md:flex-row md:items-center">
        {steps.map((s, i) => (
          <li key={s} className="flex flex-col gap-2 md:flex-1 md:flex-row md:items-center">
            <span
              className={`rounded-control border px-3 py-2.5 text-sm leading-snug md:flex-1 ${
                strong && i === steps.length - 1 ? "border-ink bg-surface text-ink" : "border-line bg-surface text-ink-2"
              }`}
            >
              {s}
            </span>
            {i < steps.length - 1 && (
              <ArrowRight size={14} className="mx-auto shrink-0 rotate-90 text-muted md:mx-0 md:rotate-0" aria-hidden />
            )}
          </li>
        ))}
      </ol>
    </div>
  );
}

/** El flujo de un correo antes y después del MVP */
export function FlowCompare({ locale }: { locale: Locale }) {
  const t = ui[locale];
  return (
    <div className="space-y-5 rounded-surface border border-line bg-surface-2/50 p-4 md:p-6">
      <Row label={t.before} steps={t.beforeSteps} />
      <div className="border-t border-dashed border-line" />
      <Row label={t.after} steps={t.afterSteps} strong />
      <p className="flex items-center gap-2 text-sm text-ink-2 md:justify-end">
        <ArrowsClockwise size={15} className="shrink-0 text-muted" aria-hidden />
        {t.fix}
      </p>
    </div>
  );
}
