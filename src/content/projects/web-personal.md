---
title: "Esta misma web + chatbot IA"
description: "El portfolio que estás viendo: Astro estático con estética terminal y un chatbot RAG propio (Mistral) que responde sobre mí a partir de la web y mi CV. Autohospedado con Docker."
order: 0
featured: true
tech: ["Astro", "Tailwind CSS v4", "TypeScript", "Node.js", "Mistral AI", "Docker"]
year: 2026
repo: "https://github.com/EnriqueGF/web-personal"
demo: "https://enriquegf.com"
heroImage: "/img/projects/web-personal.svg"
draft: false
---

Esta web es, además de mi portfolio, un proyecto en sí mismo. La construí con **Astro** (sitio
estático, rápido y bueno para SEO) y **Tailwind CSS v4**, con una estética propia "terminal /
naturaleza tech": verde fósforo, tipografía monoespaciada y modo claro/oscuro.

Pero la parte de la que más he disfrutado es el **chatbot con IA** que tienes abajo a la derecha:
un asistente **RAG** que responde preguntas sobre mí usando como única fuente el contenido de esta
web y mi CV. Es una demostración práctica de cómo integro LLMs en producto real.

## Cómo funciona el chatbot (RAG)

- **Ingesta:** todo el contenido (perfil, experiencia, proyectos, blog) se trocea y se convierte en
  *embeddings* con `mistral-embed`, que se guardan precalculados. El arranque no depende de la API.
- **Recuperación:** cuando preguntas algo, se busca por **similitud semántica** (coseno) los
  fragmentos más relevantes y se le pasan al modelo como contexto.
- **Respuesta:** `mistral-medium-latest` redacta la respuesta **anclada solo a ese contexto**, así
  que no se inventa nada. Un modelo más pequeño (`mistral-small-latest`) genera además
  recomendaciones de seguimiento dinámicas.

## Pensado para no irse de las manos

Al ser un endpoint público con coste por uso, lo blindé:

- **Rate limiting** en memoria (por IP y minuto, por IP y día, y un **tope global diario** que
  protege la factura pase lo que pase).
- **Seguridad:** prompt anti-inyección y de alcance restringido (solo habla de mí, no se deja usar
  como "ChatGPT gratis"), bloqueo de orígenes, cabeceras de seguridad y validación de entrada.

## Stack técnico

| Capa | Tecnología |
|------|------------|
| Frontend | Astro 5, Tailwind CSS v4, TypeScript |
| Contenido | Markdown / MDX (colecciones de Astro) |
| Chatbot | Node.js, Express, Mistral (chat + embeddings), RAG con similitud coseno |
| Infra | Docker, Nginx Proxy Manager, Cloudflare · autohospedado |

Escribí un artículo en el blog explicando el diseño y la arquitectura al completo, incluida la
parte de IA. El código es público en el repositorio.
