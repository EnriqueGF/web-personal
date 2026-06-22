---
title: "Cangrejob"
description: "SaaS de búsqueda de empleo a puerta fría: subes tu CV, la IA detecta tu perfil y las empresas que encajan, y envía candidaturas personalizadas desde tu propio correo. Tú revisas y apruebas."
order: 0
featured: true
tech: ["Next.js 15", "NestJS", "BullMQ", "PostgreSQL", "Prisma", "Mistral AI", "Stripe", "Docker"]
year: 2026
repo: "https://github.com/EnriqueGF/cangrejob-showcase"
demo: "https://cangrejob.com"
heroImage: "/img/projects/cangrejob.webp"
draft: false
---

**Cangrejob** 🦀 ayuda a encontrar trabajo **contactando directamente con las empresas** en
lugar de competir entre miles de candidaturas en los portales de empleo. Subes tu CV, la IA
detecta en qué áreas encajas y a qué negocios tiene sentido escribir, redacta una candidatura
personalizada para cada uno y los envía **desde tu propia cuenta de correo**. Tú revisas,
editas y apruebas antes de que salga nada.

> La mayoría de las ofertas nunca se publican. Cangrejob llama a esas puertas por ti.

## Cómo funciona

- **1 · Sube o crea tu CV** — análisis del perfil con IA; también incluye un editor guiado que
  genera un CV en PDF con plantilla (foto, color, idiomas) y vista previa en vivo.
- **2 · Encontramos empresas** — búsqueda de negocios reales en Google Maps por sector y
  ubicación, con extracción del email de contacto público y un % de encaje por IA.
- **3 · Redactamos y envías** — un email humano y personalizado por empresa (con tu CV
  adjunto), enviado desde tu Gmail/Outlook vía OAuth. Pago por uso con un modelo de créditos.

## Qué tiene por dentro

- **Pipeline asíncrono** con colas (BullMQ): búsqueda → scraping de emails → redacción IA →
  envío, con reintentos, rate-limiting por cuenta y reconciliación de estados.
- **IA** (Mistral): análisis de CV, propuesta de áreas/sectores, % de relevancia y redacción
  de los correos con tono configurable.
- **Scraping de Google Maps** self-hosted (varias réplicas con balanceo) + proxies, con caché
  de resultados para no repetir búsquedas.
- **Envío real** desde la cuenta del usuario (Gmail/Outlook OAuth), con supresión de rebotes,
  footer de cumplimiento y baja.
- **Pagos** con Stripe (créditos, sin packs) y **modo sandbox** que mockea todos los servicios
  externos para probar el flujo de punta a punta.
- **Bilingüe** (ES/EN), panel de administración, observabilidad con Sentry.

## Stack técnico

| Capa | Tecnología |
|------|------------|
| Web | Next.js 15 (App Router), React 19, Tailwind, next-intl |
| API | NestJS 10, Zod, Auth.js (JWT compartido) |
| Workers | BullMQ + Redis (tsx) |
| Datos | PostgreSQL + Prisma |
| IA | Mistral (análisis y redacción) |
| Pagos | Stripe (checkout + webhooks) |
| Infra | Monorepo pnpm + Turborepo, Docker Compose, Cloudflare + Nginx Proxy Manager |

Proyecto propio, full-stack de principio a fin: arquitectura, infraestructura, IA, pagos y
producto.
