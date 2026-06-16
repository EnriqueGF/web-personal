// Configuración central del backend del chat. Todo parametrizable por variables de entorno
// para no tener que tocar código al desplegar el contenedor.

const num = (v, def) => (v === undefined || v === '' ? def : Number(v));

export const config = {
  port: num(process.env.PORT, 3000),

  // --- Mistral ---
  mistralApiKey: process.env.MISTRAL_API_KEY || '',
  mistralBaseUrl: process.env.MISTRAL_BASE_URL || 'https://api.mistral.ai/v1',
  chatModel: process.env.MISTRAL_CHAT_MODEL || 'mistral-medium-latest',
  embedModel: process.env.MISTRAL_EMBED_MODEL || 'mistral-embed',

  // --- Generación ---
  maxTokens: num(process.env.CHAT_MAX_TOKENS, 600), // tope de salida por respuesta
  temperature: num(process.env.CHAT_TEMPERATURE, 0.2),
  requestTimeoutMs: num(process.env.MISTRAL_TIMEOUT_MS, 20000), // corta llamadas colgadas a Mistral
  topK: num(process.env.RAG_TOP_K, 5), // nº de fragmentos recuperados
  minScore: num(process.env.RAG_MIN_SCORE, 0.4), // similitud mínima para usar un fragmento

  // --- Sugerencias de seguimiento (recomendaciones dinámicas) ---
  suggestions: {
    enabled: (process.env.SUGGESTIONS_ENABLED || 'true') !== 'false',
    // Modelo barato a propósito: las sugerencias no necesitan el modelo grande.
    model: process.env.SUGGESTIONS_MODEL || 'mistral-small-latest',
    count: num(process.env.SUGGESTIONS_COUNT, 3),
    maxTokens: num(process.env.SUGGESTIONS_MAX_TOKENS, 120),
  },

  // --- Límites de entrada (control de coste/abuso) ---
  maxMessageChars: num(process.env.MAX_MESSAGE_CHARS, 1000), // largo máx. del mensaje del usuario
  maxHistoryMessages: num(process.env.MAX_HISTORY_MESSAGES, 6), // turnos previos que se reenvían

  // --- Rate limiting (en memoria) ---
  rl: {
    perMinute: num(process.env.RL_PER_MINUTE, 6), // mensajes/IP por minuto
    perDay: num(process.env.RL_PER_DAY, 40), // mensajes/IP por día
    globalPerDay: num(process.env.RL_GLOBAL_PER_DAY, 800), // tope global diario (capa de coste)
  },

  // Orígenes permitidos para CORS. Vacío = mismo origen (recomendado, vía proxy).
  // Lista separada por comas, p. ej. "https://enriquegf.com,https://www.enriquegf.com".
  allowedOrigins: (process.env.ALLOWED_ORIGINS || '')
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean),

  // Cabecera de la que extraer la IP real del cliente (detrás de Cloudflare + NPM).
  // Orden de preferencia ya gestionado en getClientIp().
  trustProxy: (process.env.TRUST_PROXY || 'true') !== 'false',
};

export function assertConfig() {
  if (!config.mistralApiKey) {
    throw new Error(
      'Falta MISTRAL_API_KEY. Defínela como variable de entorno del contenedor.'
    );
  }
}
