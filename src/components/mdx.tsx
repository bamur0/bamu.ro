import type { MDXComponents } from "mdx/types";
import { NotePencil } from "@phosphor-icons/react/ssr";
import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { PlantPicker } from "./mockups/plant-picker";
import { PendingVisual } from "./mockups/pending-visual";
import { ChangeHistory } from "./mockups/change-history";

/** Nota de contenido faltante. Se ve en la vista previa para saber qué falta; se borra antes de publicar. */
function Pending({ children, label }: { children: React.ReactNode; label: string }) {
  return (
    <aside className="my-8 flex gap-3 rounded-surface border border-dashed border-line bg-surface px-4 py-3.5 text-[15px] leading-relaxed text-ink-2">
      <NotePencil size={18} className="mt-0.5 shrink-0 text-muted" />
      <div className="[&>p]:m-0">
        <span className="mr-2 rounded-full bg-accent px-2 py-0.5 text-xs font-medium text-accent-ink">{label}</span>
        {children}
      </div>
    </aside>
  );
}

function Figure({ children, caption }: { children: React.ReactNode; caption?: string }) {
  return (
    <figure className="my-12 md:-mx-16 lg:-mx-32">
      {children}
      {caption && <figcaption className="mt-3 text-center text-sm text-muted">{caption}</figcaption>}
    </figure>
  );
}

export function getMdxComponents(locale: Locale): MDXComponents {
  const dict = getDictionary(locale);
  return {
    h2: (props) => <h2 className="mb-4 mt-16 text-2xl font-semibold tracking-tight text-ink md:text-[28px]" {...props} />,
    h3: (props) => <h3 className="mb-2 mt-10 text-lg font-semibold tracking-tight text-ink" {...props} />,
    p: (props) => <p className="my-4 text-[17px] leading-[1.7] text-ink-2" {...props} />,
    ul: (props) => <ul className="my-4 list-disc space-y-2 pl-5 text-[17px] leading-[1.7] text-ink-2 marker:text-muted" {...props} />,
    strong: (props) => <strong className="font-semibold text-ink" {...props} />,
    a: (props) => <a className="link text-ink" {...props} />,
    Pending: ({ children }: { children: React.ReactNode }) => <Pending label={dict.case.pending}>{children}</Pending>,
    Figure,
    PlantPicker: () => <PlantPicker locale={locale} />,
    ChangeHistory: () => <ChangeHistory locale={locale} />,
    PendingVisual: ({ label }: { label: string }) => (
      <div className="my-12 md:-mx-16 lg:-mx-32">
        <PendingVisual label={label} />
      </div>
    ),
  };
}
