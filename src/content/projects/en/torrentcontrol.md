---
title: "TorrentControl"
description: "Self-hosted torrent search and aggregator built in Laravel: scraping of 15+ providers, metadata via TMDb, full-text search, integrated streaming, and a social layer."
order: 1
featured: true
tech: ["Laravel 12", "PHP 8.2", "MySQL", "Redis", "Meilisearch", "Docker"]
year: 2025
repo: "https://github.com/EnriqueGF/torrentcontrol"
heroImage: "/img/projects/torrentcontrol.webp"
lang: en
draft: false
---

**TorrentControl** is a self-hosted web application built with Laravel that works as a personal
torrent search engine and aggregator. It automates scraping across multiple providers,
identifies the content (movies and series) through external metadata APIs, and
centralizes everything in a local database with a modern, multilingual interface.

> A project for personal and educational use only: it neither hosts nor distributes copyrighted
> content, it only indexes metadata and links already publicly available on third-party sites.

## What it does

- **Automated scraping** — 15+ scrapers for different providers (ES, EN, FR, Latino).
- **Headless browsing** — integration with Selenium / WebDriver for JavaScript-heavy sites.
- **Enriched metadata** — integration with **TMDb** for complete movie and series details.
- **Integrated streaming** — optional player with original audio and subtitles (VOSE).
- **Advanced search** — full-text with autocomplete (Laravel Scout + Meilisearch).
- **Internationalization** — interface in Spanish, English, and French.

## Beyond the search engine

It includes a **social** layer (friends, favorites, lists, comments, and an activity wall),
**gamification** (experience, levels, and ranks), a full **forum**, a **REST API** documented
with OpenAPI/Swagger, an admin panel, queue monitoring with **Laravel Horizon**, and
an optional **Telegram bot** for notifications.

## Tech stack

| Layer | Technology |
|------|------------|
| Backend | PHP 8.2+, Laravel 12, Laravel Octane |
| Database | MySQL |
| Queues / Cache | Redis, Laravel Horizon |
| Search | Laravel Scout, Meilisearch |
| Scraping | php-webdriver, Selenium Chrome |
| Frontend | Blade, Tailwind CSS, Vite |
| Environment | Docker, Laravel Sail |

It's my most complete project and where you can best see how I work on the backend: scalable
architecture, queues, search, resilient scraping, and external integrations.
