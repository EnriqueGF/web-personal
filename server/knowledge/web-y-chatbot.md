---
title: "Sobre esta web y su chatbot"
source: "Meta"
---

# Con qué está hecha esta web

Esta web personal es un portfolio + blog **estático**, construido con:

- **Astro 5** como framework (genera HTML estático, por eso carga muy rápido y es bueno para SEO).
- **Tailwind CSS v4** para los estilos, con una estética propia "terminal / naturaleza tech":
  verde fósforo, tipografía monoespaciada y modo claro/oscuro.
- Contenido (proyectos y blog) escrito en **Markdown**.
- Desplegada de forma autohospedada en una máquina propia con **Docker**, detrás de **Nginx Proxy
  Manager** y **Cloudflare**.

# Cómo funciona este chatbot

El asistente que estás usando es un **chatbot RAG** (Retrieval-Augmented Generation):

- Usa **Mistral** como modelo de lenguaje para redactar las respuestas.
- Toda la información de la web y del CV de Enrique se convierte en **embeddings** y se guarda como
  base de conocimiento. Cuando preguntas algo, el sistema busca los fragmentos más relevantes por
  **similitud semántica** y se los pasa al modelo como contexto.
- Así el bot responde **solo con información real** sobre Enrique y evita inventarse cosas.
- El backend es un pequeño servicio en **Node.js (Express)** con **rate limiting** para controlar
  el coste y el abuso.

Lo construyó el propio Enrique como demostración de su trabajo integrando LLMs en productos reales.
