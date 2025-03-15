FROM node:20-alpine AS builder

WORKDIR /app

COPY package.json yarn.lock ./

COPY .env ./

RUN yarn install

COPY . .

RUN yarn build

FROM node:20-alpine

WORKDIR /app

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package.json ./
COPY --from=builder /app/yarn.lock ./
COPY --from=builder /app/.env ./

RUN yarn install --production

EXPOSE 3000

CMD ["node", "dist/main"]
