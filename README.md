# Web personal — Enrique García-Ferrer

Portfolio + blog construido con [Astro](https://astro.build) y [Tailwind CSS v4](https://tailwindcss.com).
Estética "naturaleza tech": verde protagonista, modo claro/oscuro, 100% estático y rápido.

## 🚀 Comandos

| Comando           | Acción                                                |
| :---------------- | :---------------------------------------------------- |
| `npm install`     | Instala las dependencias                              |
| `npm run dev`     | Servidor de desarrollo en `http://localhost:4321`     |
| `npm run build`   | Compila el sitio de producción en `./dist/`           |
| `npm run preview` | Sirve la build localmente para revisarla              |
| `npm run check`   | Comprueba tipos y errores de Astro                    |

## 📁 Estructura

```
src/
├── components/      → Componentes reutilizables (.astro)
├── content/
│   ├── blog/        → Entradas del blog (.md / .mdx)
│   └── projects/    → Proyectos del portfolio (.md / .mdx)
├── layouts/         → Plantillas de página
├── pages/           → Rutas del sitio
├── styles/          → global.css (paleta y temas)
├── consts.ts        → Datos del sitio, enlaces sociales, stack
└── content.config.ts→ Esquemas de las colecciones de contenido
public/
├── img/             → Foto de perfil
└── favicon.svg
```

## ✍️ Cómo añadir contenido

### Un proyecto
Crea `src/content/projects/mi-proyecto.md`:

```md
---
title: "Nombre del proyecto"
description: "Descripción breve."
order: 1            # menor = aparece antes
featured: true      # aparece en la home
tech: ["Laravel", "AWS"]
year: 2025
repo: "https://github.com/..."   # opcional
demo: "https://..."              # opcional
---

Contenido en Markdown...
```

### Una entrada del blog
Crea `src/content/blog/mi-post.md`:

```md
---
title: "Título del post"
description: "Resumen."
pubDate: 2026-06-14
tags: ["ia", "backend"]
---

Contenido en Markdown...
```

> Pon `draft: true` en el frontmatter para que algo no se publique todavía.

## 🎨 Personalización rápida

- **Colores:** edita la paleta y los tokens de tema en `src/styles/global.css`.
- **Datos personales y enlaces:** `src/consts.ts`.
- **Dominio:** cámbialo en `astro.config.mjs` (`site`) y en `src/consts.ts` (`SITE.url`).

## 🌐 Despliegue

El sitio es estático: cualquier hosting de estáticos vale. Recomendado **Cloudflare Pages**,
**Netlify** o **Vercel** — conecta el repo de GitHub y listo (build: `npm run build`, output: `dist`).

## ⚠️ Pendiente

- Añadir `public/og-image.png` (1200×630) para las vistas previas en redes sociales.
