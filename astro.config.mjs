// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  // Dominio del sitio (afecta a sitemap, RSS y canonical).
  site: 'https://enriquegf.com',
  // Multi-idioma: español por defecto en la raíz (/) e inglés bajo /en/.
  i18n: {
    defaultLocale: 'es',
    locales: ['es', 'en'],
    routing: {
      prefixDefaultLocale: false,
    },
  },
  integrations: [mdx(), sitemap()],
  vite: {
    plugins: [tailwindcss()],
  },
  markdown: {
    shikiConfig: {
      // Tema de resaltado de código en tonos verdes/oscuros.
      theme: 'github-dark',
      wrap: true,
    },
  },
});
