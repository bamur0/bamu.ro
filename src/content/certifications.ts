import type { Locale } from "@/i18n/config";

export type Certification = { name: string; issuer: string; date: string; url: string };

const ixdf = "https://ixdf.org/members/roberto-baez-munoz";
const coursera = "https://coursera.org/verify/professional-cert/W1VX8CSDSB9X";

/** Más reciente primero. La master class es de participación, no un curso evaluado: se nombra como tal. */
export const certifications: Record<Locale, Certification[]> = {
  es: [
    { name: "AI for Designers", issuer: "Interaction Design Foundation, curso", date: "Jul 2025", url: ixdf },
    { name: "Microsoft UX Design", issuer: "Coursera, certificado profesional de 4 cursos", date: "Feb 2025", url: coursera },
    { name: "Design Tokens: Powering Your Design System", issuer: "Interaction Design Foundation, master class", date: "Jul 2024", url: ixdf },
  ],
  en: [
    { name: "AI for Designers", issuer: "Interaction Design Foundation, course", date: "Jul 2025", url: ixdf },
    { name: "Microsoft UX Design", issuer: "Coursera, 4-course professional certificate", date: "Feb 2025", url: coursera },
    { name: "Design Tokens: Powering Your Design System", issuer: "Interaction Design Foundation, master class", date: "Jul 2024", url: ixdf },
  ],
};
