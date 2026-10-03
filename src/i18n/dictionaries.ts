import type { Locale } from "./config";

const es = {
  meta: {
    title: "Roberto Báez · Product Designer",
    description:
      "Product designer en México. Diseño productos B2B complejos (ERP, plataformas de compra y CMS) de punta a punta, del levantamiento de requisitos al QA.",
  },
  nav: {
    work: "Trabajo",
    about: "Sobre mí",
    contact: "Contacto",
    switchLang: "English",
    switchLangShort: "EN",
    theme: "Cambiar tema",
    skip: "Saltar al contenido",
  },
  hero: {
    greeting: "Hola, soy Roberto.",
    title: "Diseño productos B2B complejos para que se sientan simples.",
    lead: "Product designer en RYNDEM Studios. Llevo ERPs, plataformas de compra y CMS de la investigación al QA.",
    ctaWork: "Ver casos",
    ctaContact: "Escríbeme",
  },
  work: {
    title: "Casos seleccionados",
    open: "Leer caso",
    role: "Rol",
    year: "Año",
  },
  process: {
    title: "Cómo trabajo",
    items: [
      {
        name: "Entiendo el negocio antes que la pantalla",
        body: "Levanto requisitos con stakeholders y usuarios, mapeo reglas de negocio y flujos antes de abrir Figma.",
      },
      {
        name: "Diseño todos los estados",
        body: "Carga, vacío, error, sesión por expirar, datos extremos. Lo que no se diseña, se improvisa en desarrollo.",
      },
      {
        name: "Construyo sistemas, no pantallas sueltas",
        body: "Tokens y componentes compartidos para que diseño y desarrollo hablen el mismo idioma.",
      },
      {
        name: "Cierro el ciclo con QA",
        body: "Escribo y ejecuto casos de prueba contra heurísticas y criterios de aceptación antes de liberar.",
      },
      {
        name: "Uso IA donde acelera",
        body: "Prototipado rápido, documentación y validación con desarrollo, con criterio humano en cada decisión.",
      },
    ],
  },
  about: {
    title: "Sobre mí",
    body: [
      "Soy licenciado en Diseño de Interacción y Animación por la Ibero Puebla. Desde 2023 diseño productos empresariales en RYNDEM Studios, casi siempre de punta a punta: requisitos, UX, UI, sistema de diseño y QA.",
      "Me gusta el trabajo donde la complejidad es real: reglas fiscales, catálogos enormes, flujos con muchos actores. Mi trabajo es que nada de eso se le note a quien usa el producto.",
    ],
    tools: "Herramientas",
    toolsList: "Figma, FigJam, Notion, Jira, Claude, Claude Code, ChatGPT, Gemini, Stitch, NotebookLM",
    languages: "Español nativo, inglés C1",
    explorations: "Exploraciones académicas",
    explorationsBody: "Propuestas de la universidad para watchOS, una app de farmacia y un producto IoT.",
    explorationsLink: "Ver en Behance",
  },
  contact: {
    title: "¿Hablamos?",
    body: "Estoy abierto a nuevos roles de product design. La forma más rápida es por correo.",
    copy: "Copiar correo",
    copied: "Copiado",
  },
  case: {
    back: "Todos los casos",
    role: "Rol",
    duration: "Duración",
    team: "Equipo",
    year: "Año",
    status: "Estado",
    next: "Siguiente caso",
    pending: "Pendiente",
    nda: "Las pantallas de este caso están recreadas con un sistema neutro para respetar la confidencialidad del cliente. La estructura, los flujos y las decisiones son los originales.",
  },
  footer: {
    rights: "Diseñado y construido por Roberto Báez",
  },
};

export type Dictionary = typeof es;

const en: Dictionary = {
  meta: {
    title: "Roberto Báez · Product Designer",
    description:
      "Product designer based in Mexico. I design complex B2B products (ERP, procurement platforms and CMS) end to end, from requirements to QA.",
  },
  nav: {
    work: "Work",
    about: "About",
    contact: "Contact",
    switchLang: "Español",
    switchLangShort: "ES",
    theme: "Toggle theme",
    skip: "Skip to content",
  },
  hero: {
    greeting: "Hi, I'm Roberto.",
    title: "I design complex B2B products so they feel simple.",
    lead: "Product designer at RYNDEM Studios. I take ERPs, procurement platforms and CMS from research to QA.",
    ctaWork: "See work",
    ctaContact: "Email me",
  },
  work: {
    title: "Selected work",
    open: "Read case",
    role: "Role",
    year: "Year",
  },
  process: {
    title: "How I work",
    items: [
      {
        name: "Business first, screens second",
        body: "I gather requirements with stakeholders and users, and map business rules and flows before opening Figma.",
      },
      {
        name: "I design every state",
        body: "Loading, empty, error, expiring sessions, extreme data. Whatever isn't designed gets improvised in development.",
      },
      {
        name: "Systems, not loose screens",
        body: "Shared tokens and components so design and engineering speak the same language.",
      },
      {
        name: "I close the loop with QA",
        body: "I write and run test cases against heuristics and acceptance criteria before release.",
      },
      {
        name: "AI where it speeds things up",
        body: "Rapid prototyping, documentation and dev validation, with human judgment on every decision.",
      },
    ],
  },
  about: {
    title: "About",
    body: [
      "I hold a degree in Interaction Design and Animation from Ibero Puebla. Since 2023 I've designed enterprise products at RYNDEM Studios, usually end to end: requirements, UX, UI, design system and QA.",
      "I like work where the complexity is real: tax rules, huge catalogs, flows with many actors. My job is making sure none of it shows for the people using the product.",
    ],
    tools: "Tools",
    toolsList: "Figma, FigJam, Notion, Jira, Claude, Claude Code, ChatGPT, Gemini, Stitch, NotebookLM",
    languages: "Native Spanish, C1 English",
    explorations: "Academic explorations",
    explorationsBody: "University concepts for watchOS, a pharmacy app and an IoT product.",
    explorationsLink: "See on Behance",
  },
  contact: {
    title: "Let's talk",
    body: "I'm open to new product design roles. Email is the fastest way to reach me.",
    copy: "Copy email",
    copied: "Copied",
  },
  case: {
    back: "All work",
    role: "Role",
    duration: "Duration",
    team: "Team",
    year: "Year",
    status: "Status",
    next: "Next case",
    pending: "Pending",
    nda: "Screens in this case are recreated with a neutral system to respect client confidentiality. The structure, flows and decisions are the original ones.",
  },
  footer: {
    rights: "Designed and built by Roberto Báez",
  },
};

const dictionaries: Record<Locale, Dictionary> = { es, en };

export const getDictionary = (locale: Locale) => dictionaries[locale];
