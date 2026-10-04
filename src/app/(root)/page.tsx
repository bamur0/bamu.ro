import type { Metadata } from "next";
import { defaultLocale } from "@/i18n/config";

// En Cloudflare Pages la redirección real la hace functions/index.js (idioma del navegador).
// Esta página es el respaldo para `next dev` y para cualquier host sin esa función.
export const metadata: Metadata = {
  title: "bamu.ro",
  robots: { index: false },
};

const pick = `try{var c=document.cookie.match(/(?:^|; )lang=(es|en)/),l=c?c[1]:((navigator.languages&&navigator.languages[0])||navigator.language||"es").slice(0,2).toLowerCase();location.replace("/"+(l==="es"?"es":"en")+"/")}catch(e){location.replace("/${defaultLocale}/")}`;

export default function RootPage() {
  return (
    <>
      <script dangerouslySetInnerHTML={{ __html: pick }} />
      <noscript>
        <meta httpEquiv="refresh" content={`0;url=/${defaultLocale}/`} />
      </noscript>
      <p style={{ fontFamily: "system-ui", padding: 24 }}>
        <a href={`/${defaultLocale}/`}>bamu.ro</a>
      </p>
    </>
  );
}
