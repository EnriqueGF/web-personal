// Construye la base de conocimiento del RAG: lee el contenido de la web (knowledge + proyectos +
// blog), lo trocea, calcula embeddings con Mistral y guarda data/kb.json (con los vectores ya
// normalizados para que la búsqueda en runtime sea un simple producto escalar).
//
// Uso:  MISTRAL_API_KEY=... node scripts/build-kb.mjs
// (o "npm run build:kb" con la key en el entorno / .env)

import 'dotenv/config';
import { readFileSync, writeFileSync, readdirSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join, basename } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const REPO = join(ROOT, '..');

const API_KEY = process.env.MISTRAL_API_KEY;
const BASE_URL = process.env.MISTRAL_BASE_URL || 'https://api.mistral.ai/v1';
const EMBED_MODEL = process.env.MISTRAL_EMBED_MODEL || 'mistral-embed';
const MAX_CHARS = Number(process.env.KB_CHUNK_CHARS || 900);

if (!API_KEY) {
  console.error('Falta MISTRAL_API_KEY en el entorno.');
  process.exit(1);
}

// --- Parser mínimo de frontmatter (sin dependencias) -----------------------
function parseDoc(raw) {
  const m = raw.match(/^---\n([\s\S]*?)\n---\n?/);
  const meta = {};
  let body = raw;
  if (m) {
    body = raw.slice(m[0].length);
    for (const line of m[1].split('\n')) {
      const mm = line.match(/^(\w+):\s*(.*)$/);
      if (mm) meta[mm[1]] = mm[2].trim().replace(/^["']|["']$/g, '');
    }
  }
  return { meta, body };
}

// --- Troceado: agrupa párrafos hasta MAX_CHARS, anteponiendo el título ------
function chunkBody(body, title) {
  const paras = body
    .replace(/\r/g, '')
    .split(/\n{2,}/)
    .map((p) => p.trim())
    .filter(Boolean);

  const chunks = [];
  let buf = '';
  for (const p of paras) {
    if ((buf + '\n\n' + p).length > MAX_CHARS && buf) {
      chunks.push(buf);
      buf = p;
    } else {
      buf = buf ? `${buf}\n\n${p}` : p;
    }
  }
  if (buf) chunks.push(buf);
  // Antepone el título a cada fragmento para dar contexto al embedding.
  return chunks.map((c) => (title ? `# ${title}\n${c}` : c));
}

// --- Recolecta documentos de las distintas fuentes -------------------------
function collectFrom(dir, { source, urlBase, skipDrafts } = {}) {
  if (!existsSync(dir)) return [];
  const docs = [];
  for (const file of readdirSync(dir)) {
    if (!/\.mdx?$/.test(file)) continue;
    const { meta, body } = parseDoc(readFileSync(join(dir, file), 'utf8'));
    if (skipDrafts && String(meta.draft) === 'true') continue;
    const slug = basename(file).replace(/\.mdx?$/, '');
    const title = meta.title || slug;
    const src = source || meta.source || title;
    const url = urlBase ? `${urlBase}/${slug}` : meta.url || '';
    // En proyectos/blog la descripción aporta contexto: la unimos al cuerpo.
    const full = meta.description ? `${meta.description}\n\n${body}` : body;
    docs.push({ source: src, title, url, body: full });
  }
  return docs;
}

const docs = [
  ...collectFrom(join(ROOT, 'knowledge'), { urlBase: '' }),
  ...collectFrom(join(REPO, 'src/content/projects'), {
    source: 'Proyecto',
    urlBase: '/proyectos',
    skipDrafts: true,
  }),
  ...collectFrom(join(REPO, 'src/content/blog'), {
    source: 'Blog',
    urlBase: '/blog',
    skipDrafts: true,
  }),
];

// --- Trocea todos los documentos -------------------------------------------
const chunks = [];
for (const d of docs) {
  for (const text of chunkBody(d.body, d.title)) {
    chunks.push({ source: d.source, title: d.title, url: d.url, text });
  }
}
console.log(`Documentos: ${docs.length} · Fragmentos: ${chunks.length}`);

// --- Embeddings (en lotes) --------------------------------------------------
async function embedBatch(inputs) {
  const res = await fetch(`${BASE_URL}/embeddings`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${API_KEY}` },
    body: JSON.stringify({ model: EMBED_MODEL, input: inputs }),
  });
  if (!res.ok) throw new Error(`Mistral embeddings ${res.status}: ${await res.text()}`);
  const data = await res.json();
  return data.data.map((d) => d.embedding);
}

const normalize = (v) => {
  const n = Math.sqrt(v.reduce((s, x) => s + x * x, 0)) || 1;
  return v.map((x) => x / n);
};

const BATCH = 32;
for (let i = 0; i < chunks.length; i += BATCH) {
  const slice = chunks.slice(i, i + BATCH);
  const embs = await embedBatch(slice.map((c) => c.text));
  embs.forEach((e, j) => {
    slice[j].embedding = normalize(e);
  });
  console.log(`Embebidos ${Math.min(i + BATCH, chunks.length)}/${chunks.length}`);
}

const out = {
  model: EMBED_MODEL,
  dim: chunks[0]?.embedding.length || 0,
  builtFor: 'enriquegf.com',
  chunks,
};

const outPath = join(ROOT, 'data', 'kb.json');
writeFileSync(outPath, JSON.stringify(out));
console.log(`Escrito ${outPath} (${chunks.length} fragmentos, dim ${out.dim})`);
