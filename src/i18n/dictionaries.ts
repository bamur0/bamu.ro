import type { Locale } from "./config";

const es = {
  meta: {
    title: "Roberto Báez · Product Designer y diseñador UX/UI en México",
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
    role: "Product Designer",
    place: "Cuernavaca, México",
    available: "Abierto a nuevos roles",
    availableWhere: "Remoto, Cuernavaca, CDMX o Querétaro",
    title: "Product designer con ojo de animador y cabeza de analista.",
    lead: "Me formé en diseño de interacción y animación. Hoy llevo productos de la primera conversación al lanzamiento, con la IA como parte de mi proceso.",
    ctaWork: "Ver trabajo",
    ctaContact: "Escríbeme",
  },
  work: {
    title: "Trabajo seleccionado",
    open: "Ver caso",
  },
  experience: {
    title: "Trayectoria",
    cmmi: "CMMI nivel 3",
    items: [
      {
        dates: "2025 – presente",
        role: "Product Designer",
        org: "RYNDEM Studios",
        body: "Analista principal y product designer: de los requisitos con negocio al QA antes de liberar, dentro de los procesos de una organización con CMMI nivel 3.",
        cmmi: true,
      },
      {
        dates: "2023 – 2024",
        role: "UX/UI Designer",
        org: "RYNDEM Studios",
        body: "El CMS para proveedores y su sistema de diseño, mejoras al cotizador del ERP y los casos de prueba de QA de cada liberación.",
        cmmi: false,
      },
      {
        dates: "2021 – 2023",
        role: "Animación e ilustración",
        org: "Freelance",
        body: "Proyectos independientes de animación e ilustración.",
        cmmi: false,
      },
      {
        dates: "2021",
        role: "Prácticas profesionales en diseño UX/UI",
        org: "EMECE, remoto",
        body: "Interfaces y materiales digitales para distintos clientes.",
        cmmi: false,
      },
      {
        dates: "2021",
        role: "Licenciatura en Diseño de Interacción y Animación",
        org: "Ibero Puebla",
        body: "Titulado.",
        cmmi: false,
      },
    ],
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
      "Soy product designer. Estudié Diseño de Interacción y Animación en la Ibero Puebla y diseño interfaces desde 2021. Casi siempre trabajo de punta a punta: requisitos, UX, UI, sistema de diseño y QA.",
      "Me gustan los proyectos donde la complejidad es real: condiciones comerciales, catálogos enormes, flujos con muchos actores. Mi trabajo es que nada de eso se le note a quien usa el producto.",
    ],
    tools: "Herramientas",
    languagesTitle: "Idiomas",
    languages: "Español nativo, inglés C1",
    certifications: "Certificaciones",
    verify: "Verificar",
    explorations: "Exploraciones académicas",
    explorationsBody: "De la universidad: un ident animado para Disney XD, infografías y propuestas de producto para watchOS, una app de farmacia y un termo inteligente.",
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
    locked: "Acceso con correo",
    toc: "En este caso",
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
    title: "Roberto Báez · Product Designer & UX/UI Designer in Mexico",
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
    role: "Product Designer",
    place: "Cuernavaca, Mexico",
    available: "Open to new roles",
    availableWhere: "Remote, Cuernavaca, Mexico City or Querétaro",
    title: "A product designer with an animator's eye and an analyst's mind.",
    lead: "I trained in interaction design and animation. Today I take products from the first conversation to launch, with AI as part of my process.",
    ctaWork: "See work",
    ctaContact: "Email me",
  },
  work: {
    title: "Selected work",
    open: "View case",
  },
  experience: {
    title: "Experience",
    cmmi: "CMMI Level 3",
    items: [
      {
        dates: "2025 – present",
        role: "Product Designer",
        org: "RYNDEM Studios",
        body: "Lead analyst and product designer: from requirements with the business to QA before release, within the processes of a CMMI Level 3 organization.",
        cmmi: true,
      },
      {
        dates: "2023 – 2024",
        role: "UX/UI Designer",
        org: "RYNDEM Studios",
        body: "The supplier CMS and its design system, improvements to the ERP's quoting module, and QA test cases for every release.",
        cmmi: false,
      },
      {
        dates: "2021 – 2023",
        role: "Animation and illustration",
        org: "Freelance",
        body: "Independent animation and illustration projects.",
        cmmi: false,
      },
      {
        dates: "2021",
        role: "UX/UI Design Intern",
        org: "EMECE, remote",
        body: "Interfaces and digital materials for several clients.",
        cmmi: false,
      },
      {
        dates: "2021",
        role: "Bachelor's Degree in Interaction Design and Animation",
        org: "Ibero Puebla",
        body: "Graduated.",
        cmmi: false,
      },
    ],
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
        name: "Systems, not one-off screens",
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
      "I'm a product designer. I studied Interaction Design and Animation at Ibero Puebla and have been designing interfaces since 2021. I usually work end to end: requirements, UX, UI, design system and QA.",
      "I like work where the complexity is real: commercial terms, huge catalogs, flows with many actors. My job is making sure none of it shows for the people using the product.",
    ],
    tools: "Tools",
    languagesTitle: "Languages",
    languages: "Native Spanish, C1 English",
    certifications: "Certifications",
    verify: "Verify",
    explorations: "Academic explorations",
    explorationsBody: "From university: an animated ident for Disney XD, infographics, and product concepts for watchOS, a pharmacy app and a smart thermos.",
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
    locked: "Email access",
    toc: "In this case",
    nda: "Screens in this case are recreated with a neutral system to respect client confidentiality. The structure, flows and decisions are original.",
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
