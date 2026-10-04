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
  /** Una línea bajo Educación */
  certificationsLine: string;
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
      "Product Designer con experiencia en UX/UI desde 2021 y más de 3 años diseñando productos digitales de punta a punta: plataformas de compra, ERP y CMS. Combina análisis de negocio, diseño, sistemas de diseño y QA para convertir requisitos complejos en productos con impacto medible.",
    roles: [
      {
        org: "RYNDEM Studios",
        place: "Cuernavaca, Morelos",
        positions: [
          {
            title: "Product Designer",
            dates: "2025 – Presente",
            bullets: [
              "Lideré, como analista principal y product designer, una plataforma PunchOut B2B que conecta el catálogo de un distribuidor con el sistema de compras de sus clientes; diseñada y liberada en 1 mes, redujo cerca de un 80% el tiempo de cotización a pedido",
              "Definí requisitos, flujos y criterios de aceptación con stakeholders de negocio y desarrollo, y acompañé cada producto hasta su salida a producción",
              "Integré herramientas de IA en el flujo de diseño para prototipar, documentar y validar con desarrollo, en equipos Agile/Scrum con planeación de sprints y revisiones de diseño",
            ],
          },
          {
            title: "UX/UI Designer",
            dates: "2023 – 2024",
            bullets: [
              "Lideré el diseño UX/UI de un CMS para proveedores internacionales que sincroniza su catálogo con el ERP en tiempo real, lo que eliminó días de espera causados por una diferencia horaria de 12 horas; en producción con 3 proveedores",
              "Construí el sistema de diseño del CMS con Atomic Design: 117 componentes con 599 variantes y 237 variables (104 primitivas y 133 tokens semánticos), versionado para escalar a nuevos proveedores",
              "Diseñé mejoras al cotizador de un ERP de venta interna (cambio de condiciones de pago, división por productos controlados y productos a investigación) que redujeron cerca de un 40% las cotizaciones resueltas fuera del sistema",
              "Participé en la adaptación del módulo de ventas del ERP para Perú, de las entrevistas con stakeholders al QA",
              "Diseñé y ejecuté casos de prueba de QA basados en las heurísticas de Nielsen y en criterios de aceptación antes de cada liberación",
            ],
          },
        ],
        tools: "Figma, FigJam, Jira, Notion, Claude, Claude Code, ChatGPT, Codex, Gemini, Stitch, NotebookLM",
      },
      {
        org: "EMECE",
        place: "Remoto",
        positions: [
          {
            title: "Prácticas profesionales en Diseño UX/UI",
            dates: "2021",
            bullets: [
              "Diseñé de forma remota interfaces y materiales digitales para distintos clientes, entre ellos AMBA (sector de blindajes)",
            ],
          },
        ],
        tools: "Photoshop, Illustrator",
      },
    ],
    skills: [
      ["Diseño y prototipado", "Figma, FigJam, Adobe Creative Cloud, Sketch, Zeplin, HTML, CSS"],
      ["Métodos", "Design Thinking, Lean UX, Atomic Design, design tokens, pruebas de usabilidad, QA testing, Agile/Scrum"],
      ["IA", "Claude, Claude Code, ChatGPT, Codex, Gemini, Stitch, NotebookLM, Figma AI, integraciones MCP"],
      ["Gestión de proyectos", "Notion, Jira, Trello, Asana"],
      ["Idiomas", "español (nativo), inglés (C1)"],
    ],
    education: [
      {
        school: "Universidad Iberoamericana Puebla",
        place: "Puebla, México",
        degree: "Licenciatura en Diseño de Interacción y Animación, titulado",
        date: "Mayo 2021",
      },
    ],
    certificationsLine:
      "Microsoft UX Design, certificado profesional (Coursera, 2025); AI for Designers (Interaction Design Foundation, 2025); Design Tokens, master class (Interaction Design Foundation, 2024)",
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
      "Product Designer with UX/UI design experience since 2021 and 3+ years designing digital products end to end, from procurement platforms to ERP and CMS. Combines business analysis, UX/UI design, design systems and QA to turn complex requirements into shipped products with measurable impact.",
    roles: [
      {
        org: "RYNDEM Studios",
        place: "Cuernavaca, Mexico",
        positions: [
          {
            title: "Product Designer",
            dates: "2025 – Present",
            bullets: [
              "Led a B2B PunchOut platform end to end as lead analyst and product designer, connecting a distributor's catalog to its customers' procurement systems; designed and shipped in 1 month, it cut time from quote to order by about 80%",
              "Defined requirements, flows and acceptance criteria with business and engineering stakeholders, and took each product through to production",
              "Integrated AI tools into the design workflow to prototype, document and validate with engineering, within Agile/Scrum teams running sprint planning and design reviews",
            ],
          },
          {
            title: "UX/UI Designer",
            dates: "2023 – 2024",
            bullets: [
              "Led UX/UI design of a CMS that lets international suppliers sync their catalog with the ERP in real time, removing days of delay caused by a 12-hour time difference; in production with 3 suppliers",
              "Built the CMS design system with Atomic Design: 117 components with 599 variants and 237 variables (104 primitives and 133 semantic tokens), versioned to scale to new suppliers",
              "Designed improvements to an internal sales ERP's quoting module (payment-term changes, controlled-product splits and research items) that reduced off-system quotes by about 40%",
              "Contributed to adapting the ERP sales module for Peru, from stakeholder interviews through QA",
              "Designed and ran QA test cases based on Nielsen's heuristics and acceptance criteria before every release",
            ],
          },
        ],
        tools: "Figma, FigJam, Jira, Notion, Claude, Claude Code, ChatGPT, Codex, Gemini, Stitch, NotebookLM",
      },
      {
        org: "EMECE",
        place: "Remote",
        positions: [
          {
            title: "UX/UI Design Intern",
            dates: "2021",
            bullets: [
              "Designed interfaces and digital materials remotely for several clients, including AMBA (armoring industry)",
            ],
          },
        ],
        tools: "Photoshop, Illustrator",
      },
    ],
    skills: [
      ["Design and prototyping", "Figma, FigJam, Adobe Creative Cloud, Sketch, Zeplin, HTML, CSS"],
      ["Methods", "Design Thinking, Lean UX, Atomic Design, design tokens, usability testing, QA testing, Agile/Scrum"],
      ["AI", "Claude, Claude Code, ChatGPT, Codex, Gemini, Stitch, NotebookLM, Figma AI, MCP integrations"],
      ["Project tools", "Notion, Jira, Trello, Asana"],
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
      "Microsoft UX Design Professional Certificate (Coursera, 2025); AI for Designers (Interaction Design Foundation, 2025); Design Tokens master class (Interaction Design Foundation, 2024)",
  },
};
