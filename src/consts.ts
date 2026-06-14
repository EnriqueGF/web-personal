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

/** Una tecnología del stack; `icon` es un slug resuelto en src/lib/techIcons.ts */
export type Skill = { name: string; icon?: string };
export type SkillGroup = { area: string; items: Skill[] };

/** Stack técnico destacado, agrupado por área (basado en tu CV). */
export const SKILLS: SkillGroup[] = [
  {
    area: 'Backend',
    items: [
      { name: 'PHP', icon: 'php' },
      { name: 'Laravel', icon: 'laravel' },
      { name: 'Python', icon: 'python' },
      { name: 'Django', icon: 'django' },
      { name: 'FastAPI', icon: 'fastapi' },
      { name: 'C#' },
      { name: '.NET', icon: 'dotnet' },
      { name: 'Java' },
    ],
  },
  {
    area: 'IA / LLMs',
    items: [
      { name: 'OpenAI', icon: 'openai' },
      { name: 'Claude', icon: 'claude' },
      { name: 'Gemini', icon: 'gemini' },
      { name: 'CrewAI' },
    ],
  },
  {
    area: 'Datos',
    items: [
      { name: 'MySQL', icon: 'mysql' },
      { name: 'MariaDB', icon: 'mariadb' },
      { name: 'PostgreSQL', icon: 'postgresql' },
    ],
  },
  {
    area: 'DevOps & Cloud',
    items: [
      { name: 'AWS' },
      { name: 'Docker', icon: 'docker' },
      { name: 'Heroku' },
      { name: 'GitLab CI/CD', icon: 'gitlab' },
      { name: 'WebSockets' },
      { name: 'Swagger / OpenAPI', icon: 'swagger' },
    ],
  },
];
