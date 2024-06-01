FROM node:18-slim AS build

WORKDIR /app

RUN apt-get update -y

ARG FUN_PROJECT

COPY ./dist/apps/${FUN_PROJECT}/package*.json ./

# some packages use this for optimizing for speed and security
ENV NODE_ENV production

RUN npm install --production

FROM node:18-alpine

RUN apk add dumb-init

ARG FUN_PROJECT

ENV PORT=${PORT:-8080}
EXPOSE ${PORT}

# available as least-priviledge user
USER node

WORKDIR /app

# files to use as node user, docker runs as root by default
# ... from the build image
COPY --chown=node:node --from=build /app/node_modules ./node_modules
# ... the host
COPY --chown=node:node ./dist/apps/${FUN_PROJECT} .

CMD [ "dumb-init", "node", "main.js" ]
