FROM docker.io/node:17-alpine as BUILDER

WORKDIR /app

ADD . .

RUN yarn install && yarn build

FROM docker.io/nginx:1.21.3-alpine

COPY --from=BUILDER /app/dist /usr/share/nginx/html
