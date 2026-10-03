import type { Metadata } from "next";
import { defaultLocale } from "@/i18n/config";

// En Cloudflare Pages la redirección real la hace public/_redirects.
// Esta página es el respaldo para `next dev` y para cualquier host sin _redirects.
export const metadata: Metadata = {
  title: "bamu.ro",
  robots: { index: false },
};

export default function RootPage() {
  return (
    <>
      <meta httpEquiv="refresh" content={`0;url=/${defaultLocale}/`} />
      <p style={{ fontFamily: "system-ui", padding: 24 }}>
        <a href={`/${defaultLocale}/`}>bamu.ro</a>
      </p>
    </>
  );
}
