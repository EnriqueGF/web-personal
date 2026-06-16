---
title: "Cómo está hecha esta web (con su chatbot de IA)"
description: "Un repaso a la arquitectura de este sitio: Astro estático, despliegue autohospedado con Docker y un chatbot RAG propio con Mistral. Con diagramas y la parte de IA al detalle."
pubDate: 2026-06-17
tags: ["astro", "ia", "rag", "arquitectura"]
---

Esta web es mi portfolio, pero también un proyecto que me apetecía contar. No es solo HTML
bonito: por detrás hay una arquitectura pensada para ser **rápida, barata de mantener y segura**,
y un **chatbot con IA** que responde sobre mí. Te lo desgloso entero.

## El frontend: Astro estático

Quería un sitio que cargara al instante y fuera fácil de mantener, así que elegí **Astro**: genera
**HTML estático** por defecto, sin JavaScript innecesario. Los estilos van con **Tailwind CSS v4**
y todo el contenido (proyectos y este blog) se escribe en **Markdown**, así publicar es solo añadir
un archivo.

El diseño es una estética propia "terminal / naturaleza tech": verde fósforo, tipografía
monoespaciada, prompts `>` y modo claro/oscuro. El resultado es un sitio de unos pocos KB que vuela.

## La arquitectura completa

Lo interesante es que el sitio es estático pero tiene una parte dinámica (el chatbot) sin renunciar
a lo barato de servir HTML plano. Así encaja todo, autohospedado en una máquina propia:

```
                         ┌────────────────┐
        navegador  ──▶   │   Cloudflare   │   DNS + proxy / CDN
                         └────────┬───────┘
                                  ▼
                       ┌───────────────────────┐
                       │  Nginx Proxy Manager  │   TLS · reverse proxy
                       └────┬─────────────┬────┘
                       /    │             │   /api/chat
                            ▼             ▼
                  ┌──────────────┐   ┌──────────────────────┐
                  │ web-personal │   │  web-personal-chat   │
                  │   (nginx)    │   │   Node + Express     │
                  │  Astro dist  │   │  · rate limiting     │
                  └──────────────┘   │  · RAG + Mistral     │
                                     └──────────┬───────────┘
                                                ▼
                                        ┌───────────────┐
                                        │  Mistral API  │
                                        │ embed + chat  │
                                        └───────────────┘
```

La clave: el `/` lo sirve **nginx** con el HTML estático, y solo `/api/chat` se desvía a un
**contenedor Node** aparte. Ambos viven en la misma red Docker, detrás de **Nginx Proxy Manager**
(que termina el TLS) y **Cloudflare** por delante. Como todo va por el mismo dominio, el navegador
habla con el chatbot **sin líos de CORS**.

## La parte de IA: un chatbot RAG

El asistente que ves abajo a la derecha no es un LLM genérico: es un **RAG**
(*Retrieval-Augmented Generation*). Responde **solo** con información real de esta web y mi CV, lo
que evita que se invente cosas. Funciona en dos fases.

### 1. Ingesta (en el build)

Todo el contenido se convierte en vectores una sola vez y se guarda commiteado, así el arranque no
depende de la API:

```
contenido (perfil · CV · proyectos · blog)
        │   build-kb.mjs
        ▼
   trocear  ──▶  mistral-embed  ──▶  normalizar  ──▶  data/kb.json
```

### 2. Consulta (en cada pregunta)

```
pregunta del visitante
        │
        ▼
 [1] embed(pregunta)              ─▶  vector
        │
        ▼
 [2] similitud coseno  vs  kb.json (embeddings de la web + CV)
        │
        ▼
 [3] top-k fragmentos             ─▶  contexto
        │
        ▼
 [4] mistral-medium(contexto + pregunta)   ─▶  respuesta
        │
        ▼
 [5] mistral-small                ─▶  preguntas de seguimiento dinámicas
```

Recupero los fragmentos más parecidos a tu pregunta por **similitud coseno** y se los paso a
`mistral-medium-latest` como contexto. Para las recomendaciones de seguimiento uso a propósito un
modelo más pequeño y barato, `mistral-small-latest`: sugerir no necesita el modelo grande.

## Que no se vaya de las manos

Un endpoint público que llama a una API de pago es una invitación al abuso, así que lo blindé:

- **Rate limiting** en memoria (no hace falta Redis porque el contenedor es de larga vida): límites
  por IP y minuto, por IP y día, y un **tope global diario** que protege la factura pase lo que pase.
- **Anti-inyección y alcance restringido:** el bot solo habla de mí; si intentas usarlo como
  "ChatGPT gratis" o cambiarle las reglas, lo rechaza.
- **Bloqueo de orígenes, cabeceras de seguridad, *timeout* a Mistral y validación de entrada.**

## El despliegue

Cada pieza es un contenedor **Docker**. La web estática se reconstruye con `npm run build` y nginx
sirve la carpeta `dist`; el chatbot es otro contenedor en la misma red, enrutado con una *custom
location* en Nginx Proxy Manager. Cloudflare hace de escudo y CDN por delante.

## Pruébalo

Lo mejor es que lo veas tú: pulsa el icono de chat (abajo a la derecha) o el botón **"Habla con mi
IA"** del inicio y pregúntale lo que quieras sobre mí. Todo el código es público en
[el repositorio](https://github.com/EnriqueGF/web-personal).
