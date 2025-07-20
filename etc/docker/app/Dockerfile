ARG NODE_BASE=20.12.1-alpine
FROM node:${NODE_BASE} AS base

ARG BUILDIS_API_URL
ENV NEXT_PUBLIC_BUILDIS_API_URL=${BUILDIS_API_URL}

FROM base AS builder
WORKDIR /app

COPY ../../../package.json package-lock.json ./
RUN npm ci

COPY ../../.. .

RUN npm run build

FROM base AS runner
WORKDIR /app
ENV NODE_ENV=production

COPY --from=builder --chown=node:node /app/.next/standalone ./
COPY --from=builder --chown=node:node /app/public ./public
COPY --from=builder --chown=node:node /app/.next/static ./.next/static

USER node

CMD ["node", "server.js"]