---
title: "This very website + AI chatbot"
description: "The portfolio you're looking at: static Astro with a terminal aesthetic and a custom RAG chatbot (Mistral) that answers questions about me using the website and my CV. Self-hosted with Docker."
order: 0
featured: true
tech: ["Astro", "Tailwind CSS v4", "TypeScript", "Node.js", "Mistral AI", "Docker"]
year: 2026
repo: "https://github.com/EnriqueGF/web-personal"
demo: "https://enriquegf.com"
heroImage: "/img/projects/web-personal.svg"
lang: en
draft: false
---

This website is, on top of being my portfolio, a project in its own right. I built it with **Astro**
(a static site, fast and good for SEO) and **Tailwind CSS v4**, with a homemade "terminal /
nature tech" aesthetic: phosphor green, monospaced typography, and light/dark mode.

But the part I enjoyed most is the **AI chatbot** you'll find in the bottom right:
a **RAG** assistant that answers questions about me using only the content of this website and my
CV as its source. It's a practical demonstration of how I integrate LLMs into a real product.

## How the chatbot works (RAG)

- **Ingestion:** all the content (profile, experience, projects, blog) is chunked and turned into
  *embeddings* with `mistral-embed`, which are stored precomputed. Startup doesn't depend on the API.
- **Retrieval:** when you ask something, the most relevant fragments are found by **semantic
  similarity** (cosine) and passed to the model as context.
- **Response:** `mistral-medium-latest` writes the answer **anchored only to that context**, so
  it doesn't make anything up. A smaller model (`mistral-small-latest`) also generates
  dynamic follow-up recommendations.

## Designed to not get out of hand

Since it's a public endpoint with a cost per use, I locked it down:

- **Rate limiting** in memory (per IP per minute, per IP per day, and a **global daily cap** that
  protects the bill no matter what).
- **Security:** anti-injection and restricted-scope prompt (it only talks about me, won't let itself
  be used as "free ChatGPT"), origin blocking, security headers, and input validation.

## Tech stack

| Layer | Technology |
|------|------------|
| Frontend | Astro 5, Tailwind CSS v4, TypeScript |
| Content | Markdown / MDX (Astro collections) |
| Chatbot | Node.js, Express, Mistral (chat + embeddings), RAG with cosine similarity |
| Infra | Docker, Nginx Proxy Manager, Cloudflare · self-hosted |

I wrote a blog article explaining the design and the full architecture, including the AI part. The
code is public in the repository.
