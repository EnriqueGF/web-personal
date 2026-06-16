# Backend del chatbot RAG (Mistral). Imagen mínima de Node.
FROM node:20-alpine

ENV NODE_ENV=production
WORKDIR /app

# Instala solo dependencias de producción (capa cacheable).
COPY package.json package-lock.json ./
RUN npm ci --omit=dev && npm cache clean --force

# Código + base de conocimiento ya generada (kb.json va commiteado).
COPY src ./src
COPY data ./data

EXPOSE 3000

# Healthcheck contra el endpoint de salud.
HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD node -e "fetch('http://localhost:'+(process.env.PORT||3000)+'/health').then(r=>process.exit(r.ok?0:1)).catch(()=>process.exit(1))"

# Corre como usuario no-root (incluido en la imagen oficial).
USER node

CMD ["node", "src/index.js"]
