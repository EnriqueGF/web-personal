// Punto de entrada del backend del chat. Express mínimo: una ruta para chatear y una de salud.
// Pensado para correr como contenedor en la red interna, detrás de Nginx Proxy Manager.

import 'dotenv/config';
import express from 'express';
import { config, assertConfig } from './config.js';
import { rateLimit } from './rateLimit.js';
import { handleChat } from './chat.js';
import { kbSize } from './retrieval.js';

assertConfig();

const app = express();
app.disable('x-powered-by');
app.set('trust proxy', config.trustProxy);

// Cabeceras de seguridad en todas las respuestas (API JSON: no necesitamos cargar nada externo).
app.use((_req, res, next) => {
  res.set('X-Content-Type-Options', 'nosniff');
  res.set('X-Frame-Options', 'DENY');
  res.set('Referrer-Policy', 'no-referrer');
  res.set('Cross-Origin-Resource-Policy', 'same-origin');
  res.set('Content-Security-Policy', "default-src 'none'; frame-ancestors 'none'");
  next();
});

// Cuerpo JSON pequeño: no necesitamos más y limita el abuso. Si el JSON viene mal formado o se
// pasa de tamaño, respondemos 400 en vez de un error 500 sin controlar.
app.use((req, res, next) => {
  express.json({ limit: '16kb' })(req, res, (err) => {
    if (err) return res.status(400).json({ error: 'Petición inválida.' });
    next();
  });
});

// Control de origen. Si ALLOWED_ORIGINS está definido (recomendado en producción), se rechazan
// las peticiones de navegador procedentes de otros sitios (evita que terceros usen el endpoint
// como API gratis). Las peticiones sin Origin (mismo origen / curl) las filtra el rate limiting.
app.use((req, res, next) => {
  const origin = req.headers.origin;
  if (config.allowedOrigins.length) {
    if (origin && !config.allowedOrigins.includes(origin)) {
      return res.status(403).json({ error: 'Origen no autorizado.' });
    }
    if (origin) {
      res.set('Access-Control-Allow-Origin', origin);
      res.set('Vary', 'Origin');
      res.set('Access-Control-Allow-Methods', 'POST, OPTIONS');
      res.set('Access-Control-Allow-Headers', 'Content-Type');
    }
  }
  if (req.method === 'OPTIONS') return res.sendStatus(204);
  next();
});

// Salud: útil para healthchecks de Docker / NPM.
const health = (_req, res) => res.json({ ok: true, kbChunks: kbSize() });
app.get('/health', health);
app.get('/api/chat/health', health);

// Endpoint principal. El rate limiting va ANTES de tocar Mistral.
app.post('/api/chat', rateLimit, handleChat);

app.listen(config.port, () => {
  console.log(
    `[chat] escuchando en :${config.port} · modelo=${config.chatModel} · kb=${kbSize()} fragmentos`
  );
});
