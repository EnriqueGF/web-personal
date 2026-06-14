---
title: "TorrentControl"
description: "Buscador y agregador de torrents self-hosted en Laravel: scraping de 15+ proveedores, metadatos vía TMDb, búsqueda full-text, streaming integrado y capa social."
order: 1
featured: true
tech: ["Laravel 12", "PHP 8.2", "MySQL", "Redis", "Meilisearch", "Docker"]
year: 2025
repo: "https://github.com/EnriqueGF/torrentcontrol"
heroImage: "/img/projects/torrentcontrol.webp"
draft: false
---

**TorrentControl** es una aplicación web self-hosted construida con Laravel que funciona como
buscador y agregador personal de torrents. Automatiza el scraping de múltiples proveedores,
identifica el contenido (películas y series) a través de APIs de metadatos externas y lo
centraliza todo en una base de datos local con una interfaz moderna y multi-idioma.

> Proyecto solo para uso personal y educativo: no aloja ni distribuye contenido con copyright,
> únicamente indexa metadatos y enlaces ya disponibles públicamente en terceros.

## Qué hace

- **Scraping automatizado** — 15+ scrapers para distintos proveedores (ES, EN, FR, Latino).
- **Navegación headless** — integración con Selenium / WebDriver para sitios con mucho JavaScript.
- **Metadatos enriquecidos** — integración con **TMDb** para fichas completas de películas y series.
- **Streaming integrado** — reproductor opcional con audio original y subtítulos (VOSE).
- **Búsqueda avanzada** — full-text con autocompletado (Laravel Scout + Meilisearch).
- **Internacionalización** — interfaz en español, inglés y francés.

## Más allá del buscador

Incluye una capa **social** (amigos, favoritos, listas, comentarios y muro de actividad),
**gamificación** (experiencia, niveles y rangos), un **foro** completo, **API REST** documentada
con OpenAPI/Swagger, panel de administración, monitorización de colas con **Laravel Horizon** y
un **bot de Telegram** opcional para notificaciones.

## Stack técnico

| Capa | Tecnología |
|------|------------|
| Backend | PHP 8.2+, Laravel 12, Laravel Octane |
| Base de datos | MySQL |
| Colas / Caché | Redis, Laravel Horizon |
| Búsqueda | Laravel Scout, Meilisearch |
| Scraping | php-webdriver, Selenium Chrome |
| Frontend | Blade, Tailwind CSS, Vite |
| Entorno | Docker, Laravel Sail |

Es mi proyecto más completo y donde mejor se ve cómo trabajo el backend: arquitectura
escalable, colas, búsqueda, scraping resiliente e integraciones externas.
