---
title: "Classic Hunger Games"
description: "A multiplayer Minecraft game mode that blends the classic Hunger Games with UHC in a battle royale format. A Java plugin on Spigot/Paper, with kits, a dynamic world border, and multilingual support."
order: 3
featured: true
tech: ["Java", "Spigot / Paper API", "Maven", "PlaceholderAPI"]
year: 2021
repo: "https://github.com/EnriqueGF/mchg"
heroImage: "/img/projects/mchg.webp"
lang: en
draft: false
---

A *gamemode* for **Minecraft** servers that combines the thrill of the classic Hunger Games (HG)
with elements of modern Ultra Hardcore (UHC). It's built with the **Spigot API**
and **Maven** for dependency management.

## How it works

- **A new world every game** — when the server starts, a fresh vanilla world is generated, so
  every game is unique.
- **Kits** — during the lobby phase, each player picks a kit that equips them with specific
  items and abilities (Aquatic, Archer, Blacksmith, Enderman, Miner, Hunter…).
- **Initial invulnerability** — a countdown leads into 5 minutes without PvP so players can
  position themselves.
- **Dynamic world border** — when PvP is enabled, the world border starts shrinking, and
  it speeds up as fewer players remain: the *battle royale* component.
- **Extras** — a top bar showing the distance to the border, player detection with a compass, and more.

## Multilingual

The plugin automatically detects the client's language and supports **Spanish and English**.

## Technical details

Compatible with Minecraft 1.18.2 and built on TitleManager, PlaceholderAPI, and WorldBorderAPI.
A project where I enjoyed working out real-time game logic, events, and state management
for many simultaneous players.
