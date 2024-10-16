# Build stage
FROM node:lts-alpine AS builder

USER node
WORKDIR /home/node

COPY server/package*.json .
RUN npm ci

COPY --chown=node:node . .
RUN cd server && npm run build && npm prune --omit=dev

FROM node:lts-alpine AS builder_client

USER node
WORKDIR /home/node_client

COPY client/package*.json .
RUN npm ci

COPY --chown=node:node . .
RUN cd client && npm run build

# Final run stage
FROM node:lts-alpine

RUN apk add --no-cache curl

ENV NODE_ENV production
USER node
WORKDIR /home/node

RUN npm install concurrently

COPY --from=builder --chown=node:node /home/node/server/package*.json .
COPY --from=builder --chown=node:node /home/node/server/node_modules/ ./node_modules
COPY --from=builder --chown=node:node /home/node/server/dist/ ./dist

WORKDIR /home/node/client

COPY --from=builder_client --chown=node:node /home/node_client/client/ ./
COPY --from=builder_client --chown=node:node /home/node_client/node_modules/ ./node_modules

WORKDIR /home/node

ARG PORT
EXPOSE ${PORT:-3000}

CMD ["npm", "start"]
