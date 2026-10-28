import type { Locale } from "@/i18n/config";

/**
 * CV en formato Harvard: nombre centrado, una línea de contacto, secciones con
 * línea inferior, experiencia en orden cronológico inverso y educación al final.
 * Viñetas con verbo de acción, contexto del dominio e impacto medible, sin punto final.
 * Sin nombres de clientes (confidencialidad) ni foto. El teléfono solo sale en el PDF (ver cv-sheet).
 */
export type CvPosition = { title: string; dates: string; bullets: string[] };

/** Una empresa con uno o más puestos (un ascenso se muestra dentro de la misma empresa). */
export type CvRole = {
  org: string;
  place: string;
  positions: CvPosition[];
  /** Sin herramientas no se imprime la línea */
  tools?: string;
};

export type Cv = {
  name: string;
  contact: string[];
  headings: { profile: string; experience: string; skills: string; education: string; certifications: string; tools: string };
  profile: string;
  roles: CvRole[];
  skills: [string, string][];
  education: { school: string; place: string; degree: string; date: string }[];
  /** Una línea bajo Educación */
  certificationsLine: string;
};

const contact = ["Cuernavaca, México (remoto, CDMX o Querétaro)", "+52 777 327 2205", "hello@bamu.ro", "linkedin.com/in/robertobmz", "bamu.ro"];

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
      "Product Designer con más de 3 años diseñando productos digitales de punta a punta: plataformas de compra, ERP y CMS. Combina análisis de negocio, UX/UI, sistemas de diseño y QA para convertir requisitos complejos en productos con impacto medible.",
    roles: [
      {
        org: "RYNDEM Studios",
        place: "Cuernavaca, Morelos (empresa con CMMI nivel 3)",
        positions: [
          {
            title: "Product Designer",
            dates: "ene. 2025 – presente",
            bullets: [
              "Lideré como analista y product designer una plataforma PunchOut B2B que conecta el catálogo de un distribuidor con el sistema de compras de sus clientes; diseñada y liberada en 1 mes, redujo cerca de 80% el tiempo de cotización a pedido (registro del ERP)",
              "Diseñé el módulo de notas de crédito ante el SAT: un asistente de tres pasos para doce casos fiscales",
              "Diseñé en 2 semanas un MVP que convierte correos en pendientes: 85 pantallas hi-fi con sus reglas documentadas",
              "Extendí el sistema de diseño del ERP con tokens de componente y estados como variantes: más de 300 instancias sin romperse",
              "Definí requisitos trazables y criterios de aceptación con stakeholders de negocio y desarrollo bajo CMMI nivel 3",
              "Integré IA y servidores MCP conectados a Figma para prototipar, documentar y auditar, en equipos multidisciplinarios",
            ],
          },
          {
            title: "UX/UI Designer",
            dates: "abr. 2023 – dic. 2024",
            bullets: [
              "Lideré el diseño UX/UI de un CMS para proveedores internacionales que sincroniza su catálogo con el ERP en tiempo real, lo que eliminó días de espera causados por una diferencia horaria de casi 12 horas; en producción con 3 proveedores",
              "Construí el sistema de diseño del CMS con Atomic Design: 117 componentes con 599 variantes y 237 variables (104 primitivas y 133 tokens semánticos), versionado para escalar a nuevos proveedores",
              "Diseñé mejoras al cotizador de un ERP de venta interna (cambio de condiciones de pago, división por productos controlados y productos a investigación) que redujeron cerca de 40% las cotizaciones resueltas fuera del sistema (estimación del equipo)",
              "Analicé el ERP completo y diseñé su adaptación para Perú: experiencia de usuario, reglas de negocio e interfaz",
              "Diseñé y ejecuté casos de prueba de QA basados en las heurísticas de Nielsen y en criterios de aceptación antes de cada liberación",
            ],
          },
        ],
        tools: "Figma, FigJam, Jira, Notion, Google Workspace, Claude, Claude Code, ChatGPT, Codex, Orca, Gemini, Stitch, NotebookLM",
      },
      {
        org: "Freelance",
        place: "Remoto",
        positions: [{ title: "Animación e ilustración", dates: "2021 – 2023", bullets: [] }],
      },
      {
        org: "EMECE",
        place: "Remoto",
        positions: [
          {
            title: "Prácticas profesionales en diseño UX/UI",
            dates: "2021",
            bullets: [
              "Diseñé interfaces y materiales digitales para distintos clientes, entre ellos una empresa de blindajes",
            ],
          },
        ],
        tools: "Photoshop, Illustrator",
      },
    ],
    skills: [
      ["Diseño y prototipado", "Figma, FigJam, Adobe Creative Cloud, Sketch, HTML, CSS"],
      ["Métodos", "UX research, user flows, wireframes, prototipado hi-fi, diseño responsive, pruebas de usabilidad, data-informed, Agile/Scrum"],
      ["IA", "Claude, Claude Code, ChatGPT, Codex, Orca, Gemini, Stitch, NotebookLM, Figma AI, integraciones MCP"],
      ["Gestión de proyectos", "Notion, Jira, Google Workspace, Trello, Asana"],
      ["Idiomas", "español (nativo), inglés (C1)"],
    ],
    education: [
      {
        school: "Universidad Iberoamericana Puebla",
        place: "Puebla, México",
        degree: "Licenciatura en Diseño de Interacción y Animación, titulado",
        date: "may. 2021",
      },
    ],
    certificationsLine:
      "Prompt Engineering (Platzi, 2026); AI for Designers (Interaction Design Foundation, 2025); Microsoft UX Design, certificado profesional (Coursera, 2025); Design Tokens, master class (Interaction Design Foundation, 2024)",
  },
  en: {
    name: "Roberto Báez Muñoz",
    contact: ["Cuernavaca, Mexico (remote, Mexico City or Querétaro)", ...contact.slice(1)],
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
        place: "Cuernavaca, Mexico (CMMI Level 3 company)",
        positions: [
          {
            title: "Product Designer",
            dates: "Jan 2025 – present",
            bullets: [
              "Drove a B2B PunchOut platform end to end as lead analyst and product designer, connecting a distributor's catalog to its customers' procurement systems; designed and shipped in 1 month, it cut quote-to-order time by about 80% (ERP records)",
              "Designed a credit-note module for Mexico's tax authority (SAT): a three-step wizard for twelve tax scenarios",
              "Designed an email-to-task MVP in 2 weeks: 85 hi-fi screens with documented rules",
              "Extended the ERP design system with component tokens and states as variants: 300+ instances updated without breaking",
              "Defined traceable requirements and acceptance criteria with business and engineering stakeholders under CMMI Level 3",
              "Integrated AI and MCP servers connected to Figma to prototype, document and audit, within cross-functional teams",
            ],
          },
          {
            title: "UX/UI Designer",
            dates: "Apr 2023 – Dec 2024",
            bullets: [
              "Led UX/UI design of a CMS that lets international suppliers sync their catalog with the ERP in real time, removing days of delay caused by a nearly 12-hour time difference; in production with 3 suppliers",
              "Built the CMS design system with Atomic Design: 117 components with 599 variants and 237 variables (104 primitives and 133 semantic tokens), versioned to scale to new suppliers",
              "Designed improvements to an internal sales ERP's quoting module (payment-term changes, controlled-product splits and research items) that reduced off-system quotes by about 40% (team estimate)",
              "Analyzed the full ERP and designed its adaptation for Peru: user experience, business rules and interface",
              "Designed and ran QA test cases based on Nielsen's heuristics and acceptance criteria before every release",
            ],
          },
        ],
        tools: "Figma, FigJam, Jira, Notion, Google Workspace, Claude, Claude Code, ChatGPT, Codex, Orca, Gemini, Stitch, NotebookLM",
      },
      {
        org: "Freelance",
        place: "Remote",
        positions: [{ title: "Animation and illustration", dates: "2021 – 2023", bullets: [] }],
      },
      {
        org: "EMECE",
        place: "Remote",
        positions: [
          {
            title: "UX/UI Design Intern",
            dates: "2021",
            bullets: [
              "Designed interfaces and digital materials for several clients, including an armoring company",
            ],
          },
        ],
        tools: "Photoshop, Illustrator",
      },
    ],
    skills: [
      ["Design and prototyping", "Figma, FigJam, Adobe Creative Cloud, Sketch, HTML, CSS"],
      ["Methods", "UX research, user flows, wireframes, hi-fi prototyping, responsive design, usability testing, data-informed design, Agile/Scrum"],
      ["AI", "Claude, Claude Code, ChatGPT, Codex, Orca, Gemini, Stitch, NotebookLM, Figma AI, MCP integrations"],
      ["Project tools", "Notion, Jira, Google Workspace, Trello, Asana"],
      ["Languages", "Spanish (native), English (C1)"],
    ],
    education: [
      {
        school: "Universidad Iberoamericana Puebla",
        place: "Puebla, Mexico",
        degree: "Bachelor's Degree in Interaction Design and Animation",
        date: "May 2021",
      },
    ],
    certificationsLine:
      "Prompt Engineering (Platzi, 2026); AI for Designers (Interaction Design Foundation, 2025); Microsoft UX Design Professional Certificate (Coursera, 2025); Design Tokens master class (Interaction Design Foundation, 2024)",
  },
};
