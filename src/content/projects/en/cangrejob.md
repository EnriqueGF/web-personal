---
title: "Cangrejob"
description: "Cold-email job-hunting SaaS: upload your CV, the AI detects your profile and the companies that fit, and it sends personalized applications from your own inbox. You review and approve."
order: 0
featured: true
tech: ["Next.js 15", "NestJS", "BullMQ", "PostgreSQL", "Prisma", "Mistral AI", "Stripe", "Docker"]
year: 2026
repo: "https://github.com/EnriqueGF/cangrejob-showcase"
demo: "https://cangrejob.com"
heroImage: "/img/projects/cangrejob.webp"
lang: en
draft: false
---

**Cangrejob** 🦀 helps you find a job by **reaching out to companies directly** instead of
competing among thousands of applications on job boards. You upload your CV, the AI detects
which areas fit you and which businesses are worth contacting, drafts a personalized
application for each one, and sends them **from your own email account**. You review, edit and
approve before anything goes out.

> Most openings are never posted. Cangrejob knocks on those doors for you.

## How it works

- **1 · Upload or build your CV** — AI profile analysis, plus a guided editor that generates a
  templated PDF CV (photo, color, languages) with a live preview.
- **2 · We find companies** — real businesses on Google Maps by sector and location, with
  public contact-email extraction and an AI match score.
- **3 · We draft, you send** — a human, personalized email per company (with your CV attached),
  sent from your Gmail/Outlook via OAuth. Pay-as-you-go credit model.

## Under the hood

- **Async pipeline** with queues (BullMQ): search → email scraping → AI drafting → sending,
  with retries, per-account rate-limiting and state reconciliation.
- **AI** (Mistral): CV analysis, area/sector suggestions, relevance scoring and email drafting
  with a configurable tone.
- **Self-hosted Google Maps scraping** (several load-balanced replicas) + proxies, with result
  caching to avoid repeat searches.
- **Real sending** from the user's account (Gmail/Outlook OAuth), with bounce suppression,
  compliance footer and unsubscribe.
- **Payments** with Stripe (credits, no packs) and a **sandbox mode** that mocks every external
  service to test the flow end to end.
- **Bilingual** (ES/EN), admin panel, observability with Sentry.

## Tech stack

| Layer | Technology |
|-------|------------|
| Web | Next.js 15 (App Router), React 19, Tailwind, next-intl |
| API | NestJS 10, Zod, Auth.js (shared JWT) |
| Workers | BullMQ + Redis (tsx) |
| Data | PostgreSQL + Prisma |
| AI | Mistral (analysis & drafting) |
| Payments | Stripe (checkout + webhooks) |
| Infra | pnpm + Turborepo monorepo, Docker Compose, Cloudflare + Nginx Proxy Manager |

A full-stack solo project end to end: architecture, infrastructure, AI, payments and product.
