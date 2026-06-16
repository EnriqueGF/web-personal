// Cliente mínimo de la API de Mistral (fetch nativo de Node 18+). Solo lo que necesitamos:
// embeddings para el RAG y chat completions para responder.

import { config } from './config.js';

async function mistralFetch(path, body) {
  const res = await fetch(`${config.mistralBaseUrl}${path}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${config.mistralApiKey}`,
    },
    body: JSON.stringify(body),
    signal: AbortSignal.timeout(config.requestTimeoutMs),
  });

  if (!res.ok) {
    const detail = await res.text().catch(() => '');
    throw new Error(`Mistral API ${path} -> ${res.status}: ${detail.slice(0, 300)}`);
  }
  return res.json();
}

/**
 * Devuelve los embeddings de una lista de textos.
 * @param {string[]} inputs
 * @returns {Promise<number[][]>}
 */
export async function embed(inputs) {
  const data = await mistralFetch('/embeddings', {
    model: config.embedModel,
    input: inputs,
  });
  return data.data.map((d) => d.embedding);
}

/**
 * Chat completion no-streaming.
 * @param {{role: string, content: string}[]} messages
 * @param {{model?: string, maxTokens?: number, temperature?: number, jsonMode?: boolean}} [opts]
 * @returns {Promise<string>}
 */
export async function chat(messages, opts = {}) {
  const body = {
    model: opts.model || config.chatModel,
    messages,
    temperature: opts.temperature ?? config.temperature,
    max_tokens: opts.maxTokens ?? config.maxTokens,
  };
  if (opts.jsonMode) body.response_format = { type: 'json_object' };

  const data = await mistralFetch('/chat/completions', body);
  return data.choices?.[0]?.message?.content?.trim() || '';
}
