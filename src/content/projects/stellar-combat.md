---
title: "Stellar Combat"
description: "Combate táctico 1v1 de naves en tiempo real en el navegador, inspirado en FTL. Arte procedural, audio sintetizado y servidor autoritativo. Phaser + TypeScript + Socket.IO."
order: 2
featured: true
tech: ["TypeScript", "Phaser", "Socket.IO", "Node.js", "Web Audio API"]
year: 2026
repo: "https://github.com/EnriqueGF/stellar_combat"
heroImage: "/img/projects/stellar-combat.webp"
draft: false
---

**Stellar Combat** es un juego de combate espacial multijugador y *server-authoritative*,
inspirado en **FTL: Faster Than Light**. Gestionas energía, tripulación, incendios y brechas
en el casco de tu nave mientras intercambias disparos con el rival, sala por sala. Puedes
abrirte paso en una expedición *roguelite* o batirte en duelo a tiempo real contra otro
comandante.

Todo el **arte está generado proceduralmente** (sin sprites externos) y **cada sonido se
sintetiza en tiempo de ejecución** con la Web Audio API.

## Cómo se juega

El combate es un duelo táctico entre dos naves dibujadas como secciones tipo FTL. Repartes una
cantidad limitada de energía del reactor entre sistemas (armas, escudos, motores, oxígeno,
enfermería…), apuntas a salas concretas del enemigo y reaccionas a incendios, brechas y
abordajes según se desarrolla el combate. La tripulación se mueve físicamente por las puertas
para manejar estaciones, apagar fuegos y reparar daños.

> **La regla de oro:** *la energía funde escudos · lo cinético atraviesa cascos · lo explosivo destroza sistemas.*

![Mapa del sector](/img/projects/stellar-combat-sector.webp)

## Modos de juego

- **Expedición (roguelite)** — un sector con 8 columnas de nodos ramificados (combates, élites,
  eventos y tiendas) contra NPCs cada vez más duros, hasta un jefe final. Ganas chatarra,
  compras mejoras y reconfiguras tu nave entre batallas, con encuentros narrativos al estilo FTL.
- **Duelo 1v1** — combate directo en tiempo real contra otro jugador.

![Menú principal](/img/projects/stellar-combat-menu.webp)

## Stack técnico

Cliente en **TypeScript** con **Phaser** para el renderizado, comunicación en tiempo real con
**Socket.IO** y un servidor **Node.js** autoritativo que mantiene el estado del combate. Este
repositorio es el MVP del GDD v0.1.0.
