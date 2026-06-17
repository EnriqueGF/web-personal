---
title: "Stellar Combat"
description: "Real-time 1v1 tactical spaceship combat in the browser, inspired by FTL. Procedural art, synthesized audio, and an authoritative server. Phaser + TypeScript + Socket.IO."
order: 2
featured: true
tech: ["TypeScript", "Phaser", "Socket.IO", "Node.js", "Web Audio API"]
year: 2026
repo: "https://github.com/EnriqueGF/stellar_combat"
heroImage: "/img/projects/stellar-combat.webp"
lang: en
draft: false
---

**Stellar Combat** is a multiplayer, *server-authoritative* space combat game,
inspired by **FTL: Faster Than Light**. You manage power, crew, fires, and hull
breaches on your ship while trading shots with your rival, room by room. You can
fight your way through a *roguelite* expedition or duel another commander in real
time.

All the **art is procedurally generated** (no external sprites) and **every sound is
synthesized at runtime** with the Web Audio API.

## How to play

Combat is a tactical duel between two ships drawn as FTL-style sections. You distribute a
limited amount of reactor power across systems (weapons, shields, engines, oxygen,
medbay…), aim at specific enemy rooms, and react to fires, breaches, and
boarding parties as the fight unfolds. The crew physically moves through doors
to operate stations, put out fires, and repair damage.

> **The golden rule:** *energy melts shields · kinetic pierces hulls · explosives wreck systems.*

![Sector map](/img/projects/stellar-combat-sector.webp)

## Game modes

- **Expedition (roguelite)** — a sector with 8 columns of branching nodes (battles, elites,
  events, and shops) against ever-tougher NPCs, up to a final boss. You earn scrap,
  buy upgrades, and reconfigure your ship between battles, with FTL-style narrative encounters.
- **1v1 duel** — direct real-time combat against another player.

![Main menu](/img/projects/stellar-combat-menu.webp)

## Tech stack

Client in **TypeScript** with **Phaser** for rendering, real-time communication with
**Socket.IO**, and an authoritative **Node.js** server that maintains the combat state. This
repository is the MVP of GDD v0.1.0.
