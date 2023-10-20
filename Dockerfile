# Build stage
FROM node:18-alpine AS builder

ENV NODE_ENV build
USER node
WORKDIR /home/node

COPY package*.json .
RUN npm ci

COPY --chown=node:node . .
RUN npm run build && npm prune --omit=dev


# Final run stage
FROM node:18-alpine

ENV NODE_ENV production
USER node
WORKDIR /home/node

COPY --from=builder --chown=node:node /home/node/package*.json .
COPY --from=builder --chown=node:node /home/node/node_modules/ ./node_modules
COPY --from=builder --chown=node:node /home/node/dist/ ./dist

ARG PORT
EXPOSE ${PORT:-3000}

CMD ["node", "dist/main.js"]
