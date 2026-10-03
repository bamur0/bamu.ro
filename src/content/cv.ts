import type { Locale } from "@/i18n/config";

/**
 * CV en formato Harvard: nombre centrado, una línea de contacto, secciones con
 * línea inferior, experiencia en orden cronológico inverso y educación al final.
 * Viñetas con verbo de acción, contexto del dominio e impacto medible, sin punto final.
 * Sin nombres de clientes (confidencialidad), sin foto ni teléfono en la versión web.
 */
export type CvPosition = { title: string; dates: string; bullets: string[] };

/** Una empresa con uno o más puestos (un ascenso se muestra dentro de la misma empresa). */
export type CvRole = {
  org: string;
  place: string;
  positions: CvPosition[];
  tools: string;
};

export type Cv = {
  name: string;
  contact: string[];
  headings: { profile: string; experience: string; skills: string; education: string; certifications: string; tools: string };
  profile: string;
  roles: CvRole[];
  skills: [string, string][];
  education: { school: string; place: string; degree: string; date: string }[];
  certifications: { name: string; issuer: string; date: string }[];
};

const contact = ["Cuernavaca, Morelos, México", "r.bamuro@gmail.com", "linkedin.com/in/robertobmz", "bamu.ro"];

export const cv: Record<Locale, Cv> = {
  es: {
    name: "Roberto Báez Muñoz",
    contact,
    headings: {
      profile: "Perfil",
      experience: "Experiencia profesional",
      skills: "Habilidades",
      education: "Educación",
      certifications: "Certificaciones",
      tools: "Herramientas:",
    },
    profile:
      "Product Designer con más de 3 años diseñando productos digitales de punta a punta, de plataformas de compra a ERP y CMS. Combina análisis de negocio, diseño UX/UI, sistemas de diseño y QA para llevar requisitos complejos a productos en producción con impacto medible.",
    roles: [
      {
        org: "RYNDEM Studios",
        place: "Cuernavaca, Morelos",
        positions: [
          {
            title: "Product Designer",
            dates: "2025 – Presente",
            bullets: [
              "Lideré de punta a punta, como analista principal y product designer, una plataforma PunchOut B2B que conecta el catálogo de un distribuidor con el sistema de compras de sus clientes; diseñada y liberada en 1 mes, redujo cerca de 80% el tiempo de la cotización al pedido",
              "Definí requisitos, flujos y criterios de aceptación con stakeholders de negocio y desarrollo, y acompañé cada producto hasta su salida a producción",
              "Integré herramientas de IA en el flujo de diseño para prototipado rápido, documentación y validación con desarrollo",
              "Colaboré con equipos de desarrollo y negocio bajo Agile/Scrum en planeación de sprints, revisiones de diseño y entregas iterativas",
            ],
          },
          {
            title: "UX/UI Designer",
            dates: "2023 – 2024",
            bullets: [
              "Lideré el diseño UX/UI de un CMS para proveedores internacionales que sincroniza su catálogo con el ERP en tiempo real, eliminando días de espera causados por una diferencia horaria de 12 horas; en producción con 3 proveedores",
              "Construí el sistema de diseño del CMS con Atomic Design: 117 componentes con 599 variantes y 237 variables (104 primitivas y 133 tokens semánticos), versionado para escalar a nuevos proveedores",
              "Diseñé mejoras al cotizador de un ERP de venta interna (cambio de condiciones de pago, división por productos controlados y productos a investigación) que redujeron cerca de 40% las cotizaciones resueltas fuera del sistema",
              "Participé en la adaptación del módulo de ventas del ERP para operar en Perú, desde las entrevistas con stakeholders hasta el QA y la implementación",
              "Diseñé y ejecuté casos de prueba de QA con heurísticas de Nielsen y criterios de aceptación antes de cada liberación",
            ],
          },
        ],
        tools: "Figma, FigJam, Jira, Notion, Claude, Claude Code, ChatGPT, Gemini, Stitch, NotebookLM",
      },
    ],
    skills: [
      ["Diseño y prototipado", "Figma, FigJam, Adobe Creative Cloud, Sketch, Zeplin"],
      ["Métodos", "Design Thinking, Lean UX, Atomic Design, design tokens, pruebas de usabilidad, QA testing, Agile/Scrum"],
      ["IA", "Claude, Claude Code, ChatGPT, Gemini, Stitch, NotebookLM, Figma AI, integraciones MCP"],
      ["Gestión", "Notion, Jira, Trello, Asana"],
      ["Idiomas", "Español (nativo), inglés (C1)"],
    ],
    education: [
      {
        school: "Universidad Iberoamericana Puebla",
        place: "Puebla, México",
        degree: "Licenciatura en Diseño de Interacción y Animación, titulado",
        date: "Mayo 2021",
      },
    ],
    certifications: [{ name: "Microsoft UX Design", issuer: "Coursera", date: "2025" }],
  },
  en: {
    name: "Roberto Báez Muñoz",
    contact: ["Cuernavaca, Morelos, Mexico", ...contact.slice(1)],
    headings: {
      profile: "Profile",
      experience: "Experience",
      skills: "Skills",
      education: "Education",
      certifications: "Certifications",
      tools: "Tools:",
    },
    profile:
      "Product Designer with 3+ years designing digital products end to end, from procurement platforms to ERP and CMS. Combines business analysis, UX/UI design, design systems and QA to turn complex requirements into shipped products with measurable impact.",
    roles: [
      {
        org: "RYNDEM Studios",
        place: "Cuernavaca, Mexico",
        positions: [
          {
            title: "Product Designer",
            dates: "2025 – Present",
            bullets: [
              "Led a B2B PunchOut platform end to end as lead analyst and product designer, connecting a distributor's catalog to its customers' procurement systems; designed and shipped in 1 month, it cut quote-to-order time by about 80%",
              "Defined requirements, flows and acceptance criteria with business and engineering stakeholders, and took each product through to production",
              "Integrated AI tools into the design workflow for rapid prototyping, documentation and validation with engineering",
              "Partnered with engineering and business teams in Agile/Scrum on sprint planning, design reviews and iterative delivery",
            ],
          },
          {
            title: "UX/UI Designer",
            dates: "2023 – 2024",
            bullets: [
              "Led UX/UI design of a CMS that lets international suppliers sync their catalog with the ERP in real time, removing days of delay caused by a 12-hour time difference; in production with 3 suppliers",
              "Built the CMS design system with Atomic Design: 117 components with 599 variants and 237 variables (104 primitives and 133 semantic tokens), versioned to scale to new suppliers",
              "Designed improvements to an internal sales ERP's quoting module (payment-term changes, controlled-product splits and research items) that reduced off-system quotes by about 40%",
              "Contributed to adapting the ERP sales module for Peru, from stakeholder interviews through QA and rollout",
              "Designed and ran QA test cases against Nielsen's heuristics and acceptance criteria before every release",
            ],
          },
        ],
        tools: "Figma, FigJam, Jira, Notion, Claude, Claude Code, ChatGPT, Gemini, Stitch, NotebookLM",
      },
    ],
    skills: [
      ["Design and prototyping", "Figma, FigJam, Adobe Creative Cloud, Sketch, Zeplin"],
      ["Methods", "Design Thinking, Lean UX, Atomic Design, design tokens, usability testing, QA testing, Agile/Scrum"],
      ["AI", "Claude, Claude Code, ChatGPT, Gemini, Stitch, NotebookLM, Figma AI, MCP integrations"],
      ["Project tools", "Notion, Jira, Trello, Asana"],
      ["Languages", "Spanish (native), English (C1)"],
    ],
    education: [
      {
        school: "Universidad Iberoamericana Puebla",
        place: "Puebla, Mexico",
        degree: "B.A. in Interaction Design and Animation",
        date: "May 2021",
      },
    ],
    certifications: [{ name: "Microsoft UX Design", issuer: "Coursera", date: "2025" }],
  },
};
