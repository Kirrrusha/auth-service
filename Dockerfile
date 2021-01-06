FROM node:latest as dev

WORKDIR '/app'

COPY ./package.json ./

RUN yarn --only=dev

COPY ./ ./

FROM node:12.13-alpine as production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /app

RUN yarn --only=production

COPY ./ ./

COPY --from=dev /app/dist ./dist

CMD ["node", "dist/main"]
