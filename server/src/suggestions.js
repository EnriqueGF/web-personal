// Genera preguntas de seguimiento ("recomendaciones dinámicas") a partir de la última pregunta y
// la respuesta dada. Usa a propósito un modelo pequeño y barato: sugerir no necesita el grande.
// Es best-effort: si algo falla, devuelve [] y el chat sigue funcionando igual.

import { config } from './config.js';
import { chat } from './mistral.js';

const SYSTEM = `Eres un generador de preguntas de seguimiento para el asistente de la web personal de
Enrique García-Ferrer (Software & AI Engineer). A partir de la última pregunta del visitante y la
respuesta dada, propón preguntas CORTAS y naturales que el visitante podría querer hacer A
CONTINUACIÓN sobre Enrique.

Reglas:
- Solo sobre Enrique o esta web: su experiencia, proyectos, stack técnico, formación, cómo funciona
  la web/el chatbot, o cómo contactarlo. Nada genérico ni fuera de tema.
- Cada pregunta: máximo 8 palabras, formulada en primera persona del visitante, en el MISMO idioma
  que usó el usuario.
- Que aporten variedad y NO repitan lo que ya se acaba de responder.
- Responde SOLO con JSON válido: {"suggestions": ["...", "..."]}`;

export async function generateSuggestions(userMessage, answer) {
  if (!config.suggestions.enabled) return [];
  try {
    const raw = await chat(
      [
        { role: 'system', content: SYSTEM },
        {
          role: 'user',
          content: `Pregunta del visitante: ${userMessage}\n\nRespuesta dada: ${answer}\n\nGenera ${config.suggestions.count} preguntas de seguimiento.`,
        },
      ],
      {
        model: config.suggestions.model,
        maxTokens: config.suggestions.maxTokens,
        temperature: 0.5,
        jsonMode: true,
      }
    );

    const parsed = JSON.parse(raw);
    const list = Array.isArray(parsed.suggestions) ? parsed.suggestions : [];
    return list
      .filter((s) => typeof s === 'string' && s.trim())
      .map((s) => s.trim().slice(0, 80))
      .slice(0, config.suggestions.count);
  } catch (err) {
    console.error('[suggestions] error:', err.message);
    return [];
  }
}
