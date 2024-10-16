# Build stage
FROM node:lts-alpine AS builder

USER node
WORKDIR /home/node

COPY server/package*.json .
RUN npm ci

COPY --chown=node:node . .
RUN cd server && npm run build && npm prune --omit=dev

COPY client/package*.json .
RUN npm ci

COPY --chown=node:node . .
RUN cd client && npm run build

# Final run stage
FROM node:lts-alpine

ENV NODE_ENV production
USER node
WORKDIR /home/node

COPY --from=builder --chown=node:node /home/node/server/package*.json .
COPY --from=builder --chown=node:node /home/node/server/node_modules/ ./node_modules
COPY --from=builder --chown=node:node /home/node/server/dist/ ./dist
COPY --from=builder --chown=node:node /home/node/client/ ./client

ARG PORT
EXPOSE ${PORT:-3000}

CMD ["npm", "start"]
