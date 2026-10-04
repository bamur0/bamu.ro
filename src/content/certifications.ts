import type { Locale } from "@/i18n/config";

export type Certification = { name: string; issuer: string; date: string; url: string };

const ixdfAi = "https://ixdf.org/members/roberto-baez-munoz/certificate/course/6b625376-f0cb-4697-9bee-06e2bc30071f";
const ixdfTokens =
  "https://ixdf.org/members/roberto-baez-munoz/certificate/masterclass/mcc_1e2eab1ae6f34d1a9c51a16eb20708d3?certificateType=masterclass&masterclass=design-tokens-powering-your-design-system";
const coursera = "https://coursera.org/verify/professional-cert/W1VX8CSDSB9X";

/** Más reciente primero. La master class es de participación, no un curso evaluado: se nombra como tal. */
export const certifications: Record<Locale, Certification[]> = {
  es: [
    { name: "AI for Designers", issuer: "Interaction Design Foundation, curso", date: "Jul 2025", url: ixdfAi },
    { name: "Microsoft UX Design", issuer: "Coursera, certificado profesional de 4 cursos", date: "Feb 2025", url: coursera },
    { name: "Design Tokens: Powering Your Design System", issuer: "Interaction Design Foundation, master class", date: "Jul 2024", url: ixdfTokens },
  ],
  en: [
    { name: "AI for Designers", issuer: "Interaction Design Foundation, course", date: "Jul 2025", url: ixdfAi },
    { name: "Microsoft UX Design", issuer: "Coursera, 4-course professional certificate", date: "Feb 2025", url: coursera },
    { name: "Design Tokens: Powering Your Design System", issuer: "Interaction Design Foundation, master class", date: "Jul 2024", url: ixdfTokens },
  ],
};
