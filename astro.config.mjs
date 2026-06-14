// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  // Cambia esto por tu dominio definitivo cuando lo tengas (afecta a sitemap, RSS y canonical).
  site: 'https://enriquegarcia.dev',
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
