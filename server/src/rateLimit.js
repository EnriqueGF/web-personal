// Rate limiting en memoria. Sin Redis ni KV: el proceso Node es persistente (contenedor de larga
// vida), así que basta con contadores en memoria. Tres capas:
//   1) por IP y minuto      -> frena ráfagas
//   2) por IP y día         -> frena abuso sostenido de un visitante
//   3) global y día         -> tope duro de coste (todas las IPs juntas)

import { config } from './config.js';

const MINUTE = 60 * 1000;
const DAY = 24 * 60 * 60 * 1000;

/** @type {Map<string, {min:{c:number,reset:number}, day:{c:number,reset:number}}>} */
const ipBuckets = new Map();
let global = { c: 0, reset: Date.now() + DAY };

// Limpieza periódica de IPs inactivas para que el Map no crezca sin fin.
const sweep = setInterval(() => {
  const now = Date.now();
  for (const [ip, b] of ipBuckets) {
    if (b.min.reset < now && b.day.reset < now) ipBuckets.delete(ip);
  }
}, 10 * MINUTE);
sweep.unref?.();

function hit(bucket, limit, windowMs, now) {
  if (now > bucket.reset) {
    bucket.c = 0;
    bucket.reset = now + windowMs;
  }
  bucket.c += 1;
  return { ok: bucket.c <= limit, retryAfter: Math.ceil((bucket.reset - now) / 1000) };
}

/** Extrae la IP real del cliente detrás de Cloudflare + Nginx Proxy Manager. */
export function getClientIp(req) {
  if (config.trustProxy) {
    const cf = req.headers['cf-connecting-ip'];
    if (cf) return String(cf);
    const xff = req.headers['x-forwarded-for'];
    if (xff) return String(xff).split(',')[0].trim();
  }
  return req.socket?.remoteAddress || 'unknown';
}

/** Middleware de Express. Aplica las tres capas antes de tocar Mistral. */
export function rateLimit(req, res, next) {
  const now = Date.now();
  const ip = getClientIp(req);

  // Capa 3: tope global diario (protege la cuenta de Mistral pase lo que pase).
  if (now > global.reset) global = { c: 0, reset: now + DAY };
  if (global.c >= config.rl.globalPerDay) {
    res.set('Retry-After', String(Math.ceil((global.reset - now) / 1000)));
    return res.status(429).json({
      error: 'El asistente ha alcanzado su límite diario de uso. Vuelve a probar mañana.',
    });
  }

  // Capas 1 y 2: por IP.
  let b = ipBuckets.get(ip);
  if (!b) {
    b = { min: { c: 0, reset: now + MINUTE }, day: { c: 0, reset: now + DAY } };
    ipBuckets.set(ip, b);
  }

  const perMin = hit(b.min, config.rl.perMinute, MINUTE, now);
  if (!perMin.ok) {
    res.set('Retry-After', String(perMin.retryAfter));
    return res.status(429).json({
      error: `Vas muy rápido. Espera ${perMin.retryAfter}s y vuelve a intentarlo.`,
    });
  }

  const perDay = hit(b.day, config.rl.perDay, DAY, now);
  if (!perDay.ok) {
    res.set('Retry-After', String(perDay.retryAfter));
    return res.status(429).json({
      error: 'Has alcanzado el límite de mensajes por hoy. Para seguir, escríbeme por email.',
    });
  }

  // Solo contamos contra el global las peticiones que pasan los filtros por IP.
  global.c += 1;
  next();
}
