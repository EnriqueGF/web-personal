// Recuperación (la "R" de RAG): carga la base de conocimiento precalculada y busca los
// fragmentos más parecidos a la pregunta por similitud coseno. Los embeddings de kb.json se
// guardan ya normalizados, así que la similitud es un simple producto escalar.

import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { embed } from './mistral.js';
import { config } from './config.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const KB_PATH = join(__dirname, '..', 'data', 'kb.json');

let chunks = [];
try {
  const raw = JSON.parse(readFileSync(KB_PATH, 'utf8'));
  chunks = raw.chunks || [];
} catch {
  console.warn(
    `[retrieval] No se pudo cargar ${KB_PATH}. Ejecuta "npm run build:kb" para generar la base de conocimiento.`
  );
}

export function kbSize() {
  return chunks.length;
}

const dot = (a, b) => {
  let s = 0;
  for (let i = 0; i < a.length; i++) s += a[i] * b[i];
  return s;
};

/**
 * Recupera los fragmentos más relevantes para una consulta.
 * @param {string} query
 * @returns {Promise<{text: string, source: string, title: string, score: number}[]>}
 */
export async function retrieve(query) {
  if (!chunks.length) return [];

  const [qEmb] = await embed([query]);
  // Normaliza el embedding de la consulta para que el producto escalar sea coseno.
  const norm = Math.sqrt(dot(qEmb, qEmb)) || 1;
  const q = qEmb.map((v) => v / norm);

  const scored = chunks.map((c) => ({
    text: c.text,
    source: c.source,
    title: c.title,
    url: c.url,
    score: dot(q, c.embedding),
  }));

  scored.sort((a, b) => b.score - a.score);
  return scored.filter((c) => c.score >= config.minScore).slice(0, config.topK);
}
