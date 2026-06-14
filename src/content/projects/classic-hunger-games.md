---
title: "Classic Hunger Games"
description: "Modo de juego multijugador para Minecraft que mezcla los Hunger Games clásicos con UHC en formato battle royale. Plugin en Java sobre Spigot/Paper, con kits, world border dinámico y multidioma."
order: 3
featured: true
tech: ["Java", "Spigot / Paper API", "Maven", "PlaceholderAPI"]
year: 2021
repo: "https://github.com/EnriqueGF/mchg"
heroImage: "/img/projects/mchg.webp"
draft: false
---

Un *gamemode* para servidores de **Minecraft** que combina la emoción de los Hunger Games (HG)
clásicos con elementos del Ultra Hardcore (UHC) moderno. Está construido con la **API de Spigot**
y **Maven** para la gestión de dependencias.

## Cómo funciona

- **Mundo nuevo cada partida** — al iniciar el servidor se genera un mundo vanilla fresco, para
  que cada partida sea única.
- **Kits** — durante la espera, cada jugador elige un kit que le equipa con objetos y habilidades
  específicas (Acuático, Arquero, Herrero, Enderman, Minero, Cazador…).
- **Invulnerabilidad inicial** — una cuenta atrás da paso a 5 minutos sin PvP para que los
  jugadores se posicionen.
- **World border dinámico** — cuando se activa el PvP, el borde del mundo empieza a encogerse, y
  se acelera a medida que quedan menos jugadores: el componente *battle royale*.
- **Extras** — barra superior con la distancia al borde, detección de jugadores con brújula y más.

## Multidioma

El plugin detecta automáticamente el idioma del cliente y soporta **español e inglés**.

## Detalles técnicos

Compatible con Minecraft 1.18.2 y apoyado en TitleManager, PlaceholderAPI y WorldBorderAPI.
Un proyecto donde disfruté resolviendo lógica de juego en tiempo real, eventos y gestión de
estado de muchos jugadores simultáneos.
