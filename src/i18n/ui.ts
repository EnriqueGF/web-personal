/**
 * Diccionario de traducciones de la interfaz (ES/EN).
 * Centraliza todos los textos visibles para no repetirlos por componentes y páginas.
 * El contenido largo de blog y proyectos vive en src/content/ (con su variante en/).
 */

export const LANGUAGES = ['es', 'en'] as const;
export type Lang = (typeof LANGUAGES)[number];
export const DEFAULT_LANG: Lang = 'es';

export const ui = {
  es: {
    // Meta por defecto del sitio
    site: {
      description:
        'Software & AI Engineer especializado en backend, LLMs y arquitecturas escalables. Proyectos, blog y experiencia.',
      location: 'Córdoba, España',
      htmlLang: 'es',
      ogLocale: 'es_ES',
    },
    nav: {
      home: 'Inicio',
      projects: 'Proyectos',
      blog: 'Blog',
      about: 'Sobre mí',
      primaryLabel: 'Navegación principal',
      footerLabel: 'Enlaces del pie',
    },
    skipToContent: 'Saltar al contenido',
    langToggle: {
      label: 'Cambiar idioma',
      switchTo: 'English',
    },
    hero: {
      kicker: 'Software & AI Engineer',
      tagline:
        'Construyo backends sólidos e <span class="marker font-medium">inteligencia artificial</span> que llega a producción.',
      intro:
        'Con base en Córdoba (España), llevo más de seis años diseñando APIs, arquitecturas backend e integraciones de LLMs para producto real. Me importa el detalle: que lo que entrego sea fiable, escalable y fácil de mantener.',
      ctaProjects: 'Ver proyectos',
      ctaAbout: 'Sobre mí',
      ctaChat: 'Habla con mi IA',
      photoAlt: 'Retrato de Enrique García-Ferrer',
    },
    home: {
      projectsKicker: 'Trabajo seleccionado',
      projectsTitle: 'Proyectos destacados',
      projectsViewAll: 'Ver todos',
      projectsEmpty: 'Pronto añadiré aquí mis proyectos destacados.',
      stackKicker: 'Stack',
      stackTitle: 'Con lo que trabajo',
      stackIntro:
        'Especializado en backend, con soltura en todo el campo técnico. Estas son las tecnologías con las que más trabajo.',
      blogKicker: 'Notas técnicas',
      blogTitle: 'Desde el blog',
      blogViewAll: 'Ver el blog',
      blogEmpty: 'Aún no hay entradas publicadas. ¡Pronto!',
      contactKicker: 'Contacto',
      contactTitle: '¿Hablamos de tecnología, IA o de alguna idea? Escríbeme.',
      contactCta: 'Escríbeme',
      contactAbout: 'Sobre mí',
    },
    projects: {
      metaTitle: 'Proyectos',
      metaDescription: 'Portfolio de proyectos de Enrique García-Ferrer.',
      kicker: 'en lo que he metido las manos',
      title: 'Proyectos',
      intro:
        'Una selección de proyectos que he diseñado y construido. Filtra por tecnología para explorarlos.',
      filterLabel: 'Filtrar por tecnología',
      filterAll: 'Todos',
      empty: 'Pronto añadiré aquí mis proyectos.',
      viewProject: 'Ver proyecto',
      featured: 'destacado',
      back: 'Volver a proyectos',
      viewDemo: 'Ver demo',
      code: 'Código',
      screenshotOf: (title: string) => `Captura de ${title}`,
    },
    blog: {
      metaTitle: 'Blog',
      metaDescription: 'Artículos sobre desarrollo backend, IA generativa, LLMs y más.',
      kicker: 'lo que me ronda la cabeza',
      title: 'Blog',
      intro: 'Artículos sobre backend, IA generativa, agentes y arquitectura de software.',
      empty: 'Aún no hay entradas publicadas. ¡Pronto!',
      readArticle: 'Leer artículo',
      back: 'Volver al blog',
      updatedOn: 'actualizado el',
    },
    about: {
      metaTitle: 'Sobre mí',
      metaDescription: 'Trayectoria, experiencia y stack de Enrique García-Ferrer.',
      kicker: 'un poco sobre mí',
      greeting: 'Hola, soy',
      intro1:
        'Software &amp; AI Engineer con base en Córdoba (España). Diseño y construyo el lado servidor de productos web —APIs, arquitecturas backend e integraciones— con especial foco en llevar la <span class="marker font-medium">IA generativa a casos de uso reales</span>.',
      intro2:
        'Soy <strong class="text-[var(--fg)]">autodidacta</strong> y me considero un perfil con habilidades horizontales en lo técnico: me muevo con soltura entre lenguajes y stacks, y priorizo el código fiable y mantenible por encima de la moda de turno.',
      experienceTitle: 'Experiencia',
      stackTitle: 'Stack técnico',
      educationTitle: 'Educación',
      contactTitle: '¿Hablamos?',
      contactIntro:
        'Estoy abierto a nuevos proyectos y colaboraciones. La mejor forma de contactar conmigo es por email.',
    },
    notFound: {
      metaTitle: '404 — Página no encontrada',
      heading: 'Esta página se perdió en el repositorio',
      text: 'No encuentro lo que buscas. Quizá quieras volver al inicio.',
      cta: 'Volver al inicio',
    },
    footer: {
      role: 'Software & AI Engineer',
      builtWith: 'Hecho con',
    },
    chat: {
      open: 'Abrir el asistente',
      close: 'Cerrar el asistente',
      dialogLabel: 'Asistente de Enrique',
      assistant: 'Asistente',
      subtitle: 'Pregúntame sobre Enrique',
      placeholder: 'Escribe tu pregunta…',
      send: 'Enviar',
      you: 'Tú',
      greeting:
        '¡Hola! 👋 Soy el asistente de Enrique. Puedo contarte sobre su experiencia, proyectos, stack técnico o cómo contactarlo. ¿Qué quieres saber?',
      suggestions: [
        '¿Con qué está hecha la web?',
        '¿Qué tecnologías usa Enrique?',
        '¿Cómo funciona este chatbot?',
        '¿Qué experiencia tiene con IA?',
        '¿Cómo contacto con Enrique?',
      ],
      errorGeneric: 'Algo ha ido mal. Inténtalo de nuevo.',
      errorReply: 'Lo siento, no he podido generar una respuesta.',
      errorConnection:
        'No he podido conectar con el asistente. Revisa tu conexión e inténtalo de nuevo.',
    },
    // Etiquetas de las áreas del stack (las claves se definen en consts.ts en español).
    skillAreas: {
      Backend: 'Backend',
      'IA / LLMs': 'IA / LLMs',
      Datos: 'Datos',
      'DevOps & Cloud': 'DevOps & Cloud',
    } as Record<string, string>,
  },

  en: {
    site: {
      description:
        'Software & AI Engineer specialized in backend, LLMs and scalable architectures. Projects, blog and experience.',
      location: 'Córdoba, Spain',
      htmlLang: 'en',
      ogLocale: 'en_US',
    },
    nav: {
      home: 'Home',
      projects: 'Projects',
      blog: 'Blog',
      about: 'About',
      primaryLabel: 'Main navigation',
      footerLabel: 'Footer links',
    },
    skipToContent: 'Skip to content',
    langToggle: {
      label: 'Change language',
      switchTo: 'Español',
    },
    hero: {
      kicker: 'Software & AI Engineer',
      tagline:
        'I build solid backends and <span class="marker font-medium">artificial intelligence</span> that ships to production.',
      intro:
        'Based in Córdoba (Spain), I have spent more than six years designing APIs, backend architectures and LLM integrations for real products. I care about the details: what I deliver should be reliable, scalable and easy to maintain.',
      ctaProjects: 'View projects',
      ctaAbout: 'About me',
      ctaChat: 'Talk to my AI',
      photoAlt: 'Portrait of Enrique García-Ferrer',
    },
    home: {
      projectsKicker: 'Selected work',
      projectsTitle: 'Featured projects',
      projectsViewAll: 'View all',
      projectsEmpty: 'Featured projects coming soon.',
      stackKicker: 'Stack',
      stackTitle: 'What I work with',
      stackIntro:
        'Specialized in backend, comfortable across the whole technical field. These are the technologies I work with the most.',
      blogKicker: 'Tech notes',
      blogTitle: 'From the blog',
      blogViewAll: 'Visit the blog',
      blogEmpty: 'No posts published yet. Soon!',
      contactKicker: 'Contact',
      contactTitle: 'Want to talk tech, AI or an idea? Drop me a line.',
      contactCta: 'Get in touch',
      contactAbout: 'About me',
    },
    projects: {
      metaTitle: 'Projects',
      metaDescription: "Enrique García-Ferrer's project portfolio.",
      kicker: 'what I have got my hands on',
      title: 'Projects',
      intro:
        'A selection of projects I have designed and built. Filter by technology to explore them.',
      filterLabel: 'Filter by technology',
      filterAll: 'All',
      empty: 'Projects coming soon.',
      viewProject: 'View project',
      featured: 'featured',
      back: 'Back to projects',
      viewDemo: 'View demo',
      code: 'Code',
      screenshotOf: (title: string) => `Screenshot of ${title}`,
    },
    blog: {
      metaTitle: 'Blog',
      metaDescription: 'Articles on backend development, generative AI, LLMs and more.',
      kicker: 'what is on my mind',
      title: 'Blog',
      intro: 'Articles on backend, generative AI, agents and software architecture.',
      empty: 'No posts published yet. Soon!',
      readArticle: 'Read article',
      back: 'Back to the blog',
      updatedOn: 'updated on',
    },
    about: {
      metaTitle: 'About',
      metaDescription: "Enrique García-Ferrer's background, experience and stack.",
      kicker: 'a little about me',
      greeting: "Hi, I'm",
      intro1:
        'Software &amp; AI Engineer based in Córdoba (Spain). I design and build the server side of web products —APIs, backend architectures and integrations— with a special focus on bringing <span class="marker font-medium">generative AI to real use cases</span>.',
      intro2:
        'I am <strong class="text-[var(--fg)]">self-taught</strong> and consider myself a horizontal technical profile: I move comfortably across languages and stacks, and I prioritize reliable, maintainable code over the trend of the day.',
      experienceTitle: 'Experience',
      stackTitle: 'Tech stack',
      educationTitle: 'Education',
      contactTitle: "Let's talk?",
      contactIntro:
        'I am open to new projects and collaborations. The best way to reach me is by email.',
    },
    notFound: {
      metaTitle: '404 — Page not found',
      heading: 'This page got lost in the repository',
      text: "I can't find what you're looking for. Maybe you want to go back home.",
      cta: 'Back home',
    },
    footer: {
      role: 'Software & AI Engineer',
      builtWith: 'Built with',
    },
    chat: {
      open: 'Open the assistant',
      close: 'Close the assistant',
      dialogLabel: "Enrique's assistant",
      assistant: 'Assistant',
      subtitle: 'Ask me about Enrique',
      placeholder: 'Type your question…',
      send: 'Send',
      you: 'You',
      greeting:
        "Hi! 👋 I'm Enrique's assistant. I can tell you about his experience, projects, tech stack or how to reach him. What would you like to know?",
      suggestions: [
        'What is the website built with?',
        'What technologies does Enrique use?',
        'How does this chatbot work?',
        'What experience does he have with AI?',
        'How do I contact Enrique?',
      ],
      errorGeneric: 'Something went wrong. Please try again.',
      errorReply: "Sorry, I couldn't generate a response.",
      errorConnection:
        "I couldn't reach the assistant. Check your connection and try again.",
    },
    skillAreas: {
      Backend: 'Backend',
      'IA / LLMs': 'AI / LLMs',
      Datos: 'Data',
      'DevOps & Cloud': 'DevOps & Cloud',
    } as Record<string, string>,
  },
} as const;

export type UI = (typeof ui)[Lang];
