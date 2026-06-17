/**
 * Utilidades de i18n: detección de idioma, traducciones y rutas equivalentes entre idiomas.
 *
 * Estructura de URLs:
 *   ES (por defecto, sin prefijo):  /            /proyectos   /blog   /sobre-mi
 *   EN (prefijo /en):               /en/         /en/projects /en/blog /en/about
 * Los slugs de las entradas (blog/proyectos) se comparten entre idiomas.
 */
import { ui, DEFAULT_LANG, type Lang, type UI } from './ui';

/** Rutas de las páginas principales por idioma. */
export const ROUTES: Record<Lang, { home: string; projects: string; blog: string; about: string }> = {
  es: { home: '/', projects: '/proyectos', blog: '/blog', about: '/sobre-mi' },
  en: { home: '/en/', projects: '/en/projects', blog: '/en/blog', about: '/en/about' },
};

/** Segmento de la sección -> traducción, en ambos sentidos. */
const SECTION_ES_TO_EN: Record<string, string> = { proyectos: 'projects', blog: 'blog', 'sobre-mi': 'about' };
const SECTION_EN_TO_ES: Record<string, string> = { projects: 'proyectos', blog: 'blog', about: 'sobre-mi' };

/** Deduce el idioma a partir de la ruta (todo lo que cuelga de /en es inglés). */
export function getLangFromUrl(url: URL): Lang {
  const path = url.pathname;
  if (path === '/en' || path.startsWith('/en/')) return 'en';
  return DEFAULT_LANG;
}

/** Devuelve el diccionario de textos del idioma indicado. */
export function useTranslations(lang: Lang): UI {
  return ui[lang];
}

/** Traduce la etiqueta de un área del stack (las claves están en español en consts.ts). */
export function translateSkillArea(area: string, lang: Lang): string {
  return ui[lang].skillAreas[area] ?? area;
}

/**
 * Dada una ruta y su idioma, calcula la ruta equivalente en el otro idioma.
 * Se usa para el selector de idioma, los enlaces hreflang y la auto-detección.
 */
export function getAlternateUrl(pathname: string, lang: Lang): string {
  // Normaliza quitando la barra final (salvo la raíz).
  const clean = pathname !== '/' ? pathname.replace(/\/$/, '') : '/';

  if (lang === 'es') {
    if (clean === '/') return '/en/';
    const [, section, ...rest] = clean.split('/'); // '' , 'proyectos', slug...
    const enSection = SECTION_ES_TO_EN[section];
    if (!enSection) return '/en/';
    return ['/en', enSection, ...rest].join('/');
  }

  // lang === 'en'
  const parts = clean.split('/').filter(Boolean); // ['en', 'projects', slug...]
  if (parts.length <= 1) return '/'; // '/en'
  const [, section, ...rest] = parts;
  const esSection = SECTION_EN_TO_ES[section];
  if (!esSection) return '/';
  return ['', esSection, ...rest].join('/');
}
