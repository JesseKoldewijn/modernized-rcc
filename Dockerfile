FROM node:18-slim AS base

WORKDIR /app

# By copying only the package.json and pnpm-lock.yaml files
COPY package.json pnpm-lock.yaml ./

# Copying the `.npmrc` file
COPY .npmrc ./

# Copying the other config files
COPY ./tsconfig.json ./
COPY ./prettier.config.cjs ./
COPY ./seo-config.ts ./

# Installing pnpm
RUN npm install -g pnpm

FROM base AS prod-deps

RUN pnpm install --production

FROM base AS build-deps

RUN pnpm install --production=false

FROM build-deps AS build

ARG PORT=3000
ENV PORT=$PORT
ENV HOST=0.0.0.0
ENV CONTAINER=true

COPY . .

RUN pnpm run build

RUN pnpm prune --prod

FROM base AS runtime

ARG PORT=3000
ENV PORT=$PORT
ENV HOST=0.0.0.0

COPY --from=prod-deps /app/node_modules ./node_modules

COPY --from=build /app/dist ./dist

EXPOSE $PORT:$PORT

CMD node ./dist/server/entry.mjs
