/**
 * Configuración global del sitio.
 * Centraliza textos, enlaces y metadatos para no repetirlos por todas partes.
 */

export const SITE = {
  name: 'Enrique García-Ferrer',
  title: 'Enrique García-Ferrer — Software & AI Engineer',
  description:
    'Software & AI Engineer especializado en backend, LLMs y arquitecturas escalables. Proyectos, blog y experiencia.',
  // Cambia esto por tu dominio definitivo (debe coincidir con astro.config.mjs).
  url: 'https://enriquegarcia.dev',
  lang: 'es',
  author: 'Enrique García-Ferrer Jiménez',
  location: 'Córdoba, España',
  // Roles que aparecen en el hero (se animan en rotación).
  roles: ['Software Engineer', 'AI Engineer', 'Backend Developer'],
} as const;

export const SOCIALS = {
  github: 'https://github.com/EnriqueGF',
  linkedin: 'https://www.linkedin.com/in/enriquegarciaferrer22',
  email: 'enrik.garcia98@gmail.com',
} as const;

export const NAV_LINKS = [
  { label: 'Inicio', href: '/' },
  { label: 'Proyectos', href: '/proyectos' },
  { label: 'Blog', href: '/blog' },
  { label: 'Sobre mí', href: '/sobre-mi' },
] as const;

/** Stack técnico destacado, agrupado por área (basado en tu CV). */
export const SKILLS = [
  {
    area: 'Backend',
    items: ['PHP / Laravel', 'Python / Django', 'FastAPI', 'C# (.NET)', 'Java', 'APIs REST · Microservicios', 'OOP · SOLID · DDD'],
  },
  {
    area: 'IA / LLMs',
    items: ['OpenAI', 'Claude', 'Gemini', 'Agentes con CrewAI', 'IA generativa en el ciclo de desarrollo'],
  },
  {
    area: 'Datos',
    items: ['MySQL', 'MariaDB', 'PostgreSQL', 'Minería y extracción de datos'],
  },
  {
    area: 'DevOps & Cloud',
    items: ['AWS', 'Docker', 'Heroku', 'GitLab CI/CD', 'WebSockets', 'Swagger / OpenAPI'],
  },
] as const;
