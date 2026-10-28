import type { Metadata } from "next";
import type { Locale } from "@/i18n/config";

/**
 * Campos de Open Graph compartidos. Next reemplaza `openGraph` completo cuando una página
 * lo define, así que cada página parte de aquí y solo cambia título, descripción y URL.
 */
export function openGraphFor(
  lang: Locale,
  page: { title: string; description: string; path: string; type?: "website" | "article" },
): NonNullable<Metadata["openGraph"]> {
  return {
    title: page.title,
    description: page.description,
    url: page.path,
    siteName: "bamu.ro",
    locale: lang === "es" ? "es_MX" : "en_US",
    type: page.type ?? "website",
    // El nombre lleva versión: LinkedIn guarda la imagen por URL y no la vuelve a pedir si el nombre no cambia.
    // 1200×627 exacto, la medida de LinkedIn: con la de 2x generaba una miniatura de 160 px y se veía borrosa.
    images: [{ url: `/og/og-${lang}-v4.png`, width: 1200, height: 627, alt: page.title }],
  };
}

/** Rutas alternas por idioma; x-default apunta a la raíz, que elige idioma según el navegador. */
export function languagesFor(path: (lang: Locale) => string) {
  return { es: path("es"), en: path("en"), "x-default": "/" };
}
