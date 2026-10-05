import type { Locale } from "./config";

const es = {
  meta: {
    title: "Roberto Báez · Product Designer y UX/UI en México",
    description:
      "Product designer en México. Diseño productos digitales de punta a punta, del levantamiento de requisitos al QA.",
  },
  nav: {
    work: "Trabajo",
    about: "Sobre mí",
    contact: "Contacto",
    cv: "CV",
    switchLang: "English",
    switchLangShort: "EN",
    theme: "Cambiar tema",
    skip: "Saltar al contenido",
    main: "Principal",
    menu: "Menú",
    closeMenu: "Cerrar menú",
  },
  hero: {
    greeting: "Hola, soy Roberto.",
    title: "Diseño productos complejos para que se sientan simples.",
    lead: "Product designer en RYNDEM Studios. Diseño productos digitales de punta a punta, de la investigación y el prototipado al design system y el QA.",
    ctaWork: "Ver casos",
    ctaContact: "Escríbeme",
  },
  work: {
    title: "Casos seleccionados",
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
        body: "Para prototipar rápido, documentar y validar con desarrollo. Las decisiones de diseño siguen siendo mías.",
      },
    ],
  },
  about: {
    title: "Sobre mí",
    body: [
      "Estudié Diseño de Interacción y Animación en la Ibero Puebla. En 2021 hice mis prácticas profesionales en diseño UX/UI, en 2023 entré a RYNDEM Studios como UX/UI Designer y desde 2025 soy Product Designer. Casi siempre trabajo de punta a punta: requisitos, UX, UI, sistema de diseño y QA.",
      "Me gusta el trabajo donde la complejidad es real: condiciones comerciales, catálogos enormes, flujos con muchos actores. Mi trabajo es que nada de eso se le note a quien usa el producto.",
    ],
    tools: "Herramientas",
    toolsList: "Figma, FigJam, HTML, CSS, Notion, Jira, Claude, Claude Code, ChatGPT, Codex, Gemini, Stitch, NotebookLM",
    languages: "Español nativo, inglés C1",
    certifications: "Certificaciones",
    verify: "Verificar",
    explorations: "Exploraciones académicas",
    explorationsBody: "Propuestas de la universidad para watchOS, una app de farmacia y un producto IoT.",
    explorationsLink: "Ver en Behance",
    photoAlt: "Retrato de Roberto Báez",
    cvLink: "Ver mi CV",
  },
  cv: {
    title: "CV",
    description: "CV de Roberto Báez, Product Designer y UX/UI Designer en México: experiencia, habilidades, educación y certificaciones.",
    download: "Descargar PDF",
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
    problem: "El problema",
    did: "Lo que hice",
    impact: "Resultado",
    nda: "Las pantallas de este caso están recreadas con un sistema neutro para respetar la confidencialidad del cliente. La estructura, los flujos y las decisiones son los originales.",
  },
  footer: {
    rights: "Diseñado y construido por Roberto Báez",
    madeWith: "Hecho con",
    love: "amor",
    and: "y",
  },
};

export type Dictionary = typeof es;

const en: Dictionary = {
  meta: {
    title: "Roberto Báez · Product Designer & UX/UI in Mexico",
    description:
      "Product designer based in Mexico. I design digital products end to end, from requirements to QA.",
  },
  nav: {
    work: "Work",
    about: "About",
    contact: "Contact",
    cv: "Resume",
    switchLang: "Español",
    switchLangShort: "ES",
    theme: "Toggle theme",
    skip: "Skip to content",
    main: "Main",
    menu: "Menu",
    closeMenu: "Close menu",
  },
  hero: {
    greeting: "Hi, I'm Roberto.",
    title: "I design complex products so they feel simple.",
    lead: "Product designer at RYNDEM Studios. I design digital products end to end, from research and prototyping to design systems and QA.",
    ctaWork: "See work",
    ctaContact: "Email me",
  },
  work: {
    title: "Selected work",
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
        body: "To prototype fast, document and validate with engineering. The design decisions stay mine.",
      },
    ],
  },
  about: {
    title: "About",
    body: [
      "I studied Interaction Design and Animation at Ibero Puebla. I did my UX/UI design internship in 2021, joined RYNDEM Studios in 2023 as a UX/UI Designer and have been a Product Designer since 2025. I usually work end to end: requirements, UX, UI, design system and QA.",
      "I like work where the complexity is real: commercial terms, huge catalogs, flows with many actors. My job is making sure none of it shows for the people using the product.",
    ],
    tools: "Tools",
    toolsList: "Figma, FigJam, HTML, CSS, Notion, Jira, Claude, Claude Code, ChatGPT, Codex, Gemini, Stitch, NotebookLM",
    languages: "Native Spanish, C1 English",
    certifications: "Certifications",
    verify: "Verify",
    explorations: "Academic explorations",
    explorationsBody: "University concepts for watchOS, a pharmacy app and an IoT product.",
    explorationsLink: "See on Behance",
    photoAlt: "Portrait of Roberto Báez",
    cvLink: "View my resume",
  },
  cv: {
    title: "Resume",
    description: "Resume of Roberto Báez, Product Designer and UX/UI Designer based in Mexico: experience, skills, education and certifications.",
    download: "Download PDF",
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
    problem: "The problem",
    did: "What I did",
    impact: "Outcome",
    nda: "Screens in this case are recreated with a neutral system to respect client confidentiality. The structure, flows and decisions are the original ones.",
  },
  footer: {
    rights: "Designed and built by Roberto Báez",
    madeWith: "Made with",
    love: "love",
    and: "and",
  },
};

const dictionaries: Record<Locale, Dictionary> = { es, en };

export const getDictionary = (locale: Locale) => dictionaries[locale];
