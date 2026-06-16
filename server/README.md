# Chatbot RAG — backend

Backend del asistente virtual de [enriquegf.com](https://enriquegf.com). Es un servicio Node
mínimo (Express) que responde preguntas sobre Enrique usando **RAG** sobre el contenido de la web
y el CV, con **Mistral** como LLM y **rate limiting** en memoria para controlar el coste.

No sirve la web (eso lo hace el contenedor nginx existente): solo expone `POST /api/chat`, que se
enruta desde Nginx Proxy Manager. El widget del navegador (`src/components/ChatWidget.astro`) le
habla al mismo origen, así que no hay CORS.

## Cómo funciona

```
Visitante ─▶ Cloudflare ─▶ Nginx Proxy Manager ─┬─ /            ─▶ web-personal   (nginx, estático)
                                                 └─ /api/chat    ─▶ web-personal-chat (este servicio)
```

1. **Ingesta (build):** `scripts/build-kb.mjs` lee `knowledge/*.md` + los proyectos y el blog de
   `../src/content`, los trocea, calcula embeddings con `mistral-embed` y escribe `data/kb.json`
   (vectores normalizados). Se commitea, así que el arranque no depende de la API.
2. **Consulta (runtime):** por cada mensaje se embebe la pregunta, se recuperan los fragmentos más
   parecidos (coseno) y se le pasan a `mistral-medium-latest` como contexto. El modelo responde solo
   con esa información.
3. **Recomendaciones dinámicas:** tras cada respuesta, un modelo pequeño (`mistral-small-latest`)
   genera preguntas de seguimiento contextuales que el widget muestra como chips. Es best-effort:
   si falla, el chat sigue igual. Se puede desactivar con `SUGGESTIONS_ENABLED=false`.

## Rate limiting (control de coste)

En memoria, tres capas (configurables por entorno):

| Límite              | Variable            | Defecto |
| ------------------- | ------------------- | ------- |
| Por IP / minuto     | `RL_PER_MINUTE`     | 6       |
| Por IP / día        | `RL_PER_DAY`        | 40      |
| Global / día (tope) | `RL_GLOBAL_PER_DAY` | 800     |

Además: mensaje máx. 1000 caracteres, historial recortado a 6 turnos y `max_tokens` de salida 600.
La IP real se lee de `CF-Connecting-IP` (Cloudflare) → `X-Forwarded-For` → socket.

## Desarrollo local

```bash
cd server
cp .env.example .env          # pon tu MISTRAL_API_KEY
npm install
npm run build:kb              # genera data/kb.json (solo si cambia el contenido)
npm run dev                   # escucha en :3000
```

Prueba:

```bash
curl -s localhost:3000/health
curl -s -X POST localhost:3000/api/chat -H 'Content-Type: application/json' \
  -d '{"message":"¿Qué experiencia tiene Enrique con LLMs?"}'
```

Para probar el widget contra este backend desde `astro dev` (otro puerto), define en la raíz del
proyecto `PUBLIC_CHAT_API_URL=http://localhost:3000/api/chat`.

## Despliegue (Proxmox · Docker + Nginx Proxy Manager)

1. **Genera/actualiza la base de conocimiento** (si cambió el contenido de la web):

   ```bash
   cd server && MISTRAL_API_KEY=... npm run build:kb
   ```

   Commitea `data/kb.json`.

2. **Levanta el contenedor** en la red del proxy (no publica puertos):

   ```bash
   cd server
   echo "MISTRAL_API_KEY=tu_key" > .env
   docker compose up -d --build
   ```

   Queda como `web-personal-chat` en `proxy-network`, escuchando en `:3000` interno.

3. **Enruta `/api/chat` en Nginx Proxy Manager.** En el Proxy Host de `enriquegf.com` →
   pestaña **Custom locations** → añade:

   - **location:** `/api/chat`
   - **scheme:** `http` · **forward host:** `web-personal-chat` · **forward port:** `3000`

   El `/` raíz sigue yendo a `web-personal:80`. (Opcional: en *Advanced* de esa location añade
   `proxy_set_header CF-Connecting-IP $http_cf_connecting_ip;` para preservar la IP real.)

4. **Redespliega la web** (incluye el widget): `npm run build` en la raíz y recarga el contenedor
   estático como sueles hacer.

### Actualizar el contenido del bot

Cada vez que cambies proyectos, blog o los `knowledge/*.md`: vuelve a correr `npm run build:kb`,
commitea `data/kb.json` y reconstruye el contenedor (`docker compose up -d --build`).

## Variables de entorno

Ver `.env.example`. La única obligatoria es `MISTRAL_API_KEY`.
