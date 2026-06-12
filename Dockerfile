# BUILDER STAGE
FROM node:20-alpine AS builder
WORKDIR /app

COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

COPY . .
RUN yarn build

## RUNNER STAGE
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production

COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile --production

COPY --from=builder /app/dist ./dist
COPY .env ./.env

EXPOSE 3000

CMD ["node", "dist/main"]
