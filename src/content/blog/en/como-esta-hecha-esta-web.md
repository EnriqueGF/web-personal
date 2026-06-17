---
title: "How this website is built (with its AI chatbot)"
description: "A look at this site's architecture: static Astro, self-hosted deployment with Docker, and a custom RAG chatbot powered by Mistral. With diagrams and the AI part explained in detail."
pubDate: 2026-06-17
tags: ["astro", "ia", "rag", "arquitectura"]
lang: en
---

This website is my portfolio, but it's also a project I wanted to talk about. It's not just pretty
HTML: behind it there's an architecture designed to be **fast, cheap to maintain, and secure**,
plus an **AI chatbot** that answers questions about me. Let me break it all down for you.

## The frontend: static Astro

I wanted a site that loads instantly and is easy to maintain, so I chose **Astro**: it generates
**static HTML** by default, with no unnecessary JavaScript. The styles use **Tailwind CSS v4**
and all the content (projects and this blog) is written in **Markdown**, so publishing is just a
matter of adding a file.

The design is a homemade "terminal / nature tech" aesthetic: phosphor green, monospaced typography,
`>` prompts, and light/dark mode. The result is a site of just a few KB that absolutely flies.

## The full architecture

The interesting part is that the site is static yet has a dynamic component (the chatbot) without
giving up the low cost of serving plain HTML. Here's how it all fits together, self-hosted on my
own machine:

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

The key: `/` is served by **nginx** with the static HTML, and only `/api/chat` is routed to a
separate **Node container**. Both live on the same Docker network, behind **Nginx Proxy Manager**
(which terminates TLS) with **Cloudflare** in front. Since everything goes through the same domain,
the browser talks to the chatbot **without any CORS headaches**.

## The AI part: a RAG chatbot

The assistant you see in the bottom right isn't a generic LLM: it's a **RAG**
(*Retrieval-Augmented Generation*). It answers **only** with real information from this website and
my CV, which keeps it from making things up. It works in two phases.

### 1. Ingestion (at build time)

All the content is turned into vectors once and stored committed in the repo, so startup doesn't
depend on the API:

```
contenido (perfil · CV · proyectos · blog)
        │   build-kb.mjs
        ▼
   trocear  ──▶  mistral-embed  ──▶  normalizar  ──▶  data/kb.json
```

### 2. Query (on every question)

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

I retrieve the fragments most similar to your question by **cosine similarity** and pass them to
`mistral-medium-latest` as context. For the follow-up recommendations I deliberately use a smaller,
cheaper model, `mistral-small-latest`: suggesting questions doesn't need the big model.

## Keeping it from getting out of hand

A public endpoint that calls a paid API is an invitation to abuse, so I locked it down:

- **Rate limiting** in memory (no need for Redis because the container is long-lived): limits
  per IP per minute, per IP per day, and a **global daily cap** that protects the bill no matter what.
- **Anti-injection and restricted scope:** the bot only talks about me; if you try to use it as
  "free ChatGPT" or change its rules, it refuses.
- **Origin blocking, security headers, a *timeout* on Mistral, and input validation.**

## The deployment

Each piece is a **Docker** container. The static site is rebuilt with `npm run build` and nginx
serves the `dist` folder; the chatbot is another container on the same network, routed with a *custom
location* in Nginx Proxy Manager. Cloudflare acts as a shield and CDN in front.

## Try it

The best thing is to see it for yourself: click the chat icon (bottom right) or the **"Talk to my
AI"** button on the home page and ask whatever you want about me. All the code is public in
[the repository](https://github.com/EnriqueGF/web-personal).
