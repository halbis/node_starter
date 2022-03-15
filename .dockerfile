FROM node:16.13.1-alpine3.14
WORKDIR /app
COPY package*.json .
RUN yarn install
COPY . .
RUN addgroup app && adduser -S -G app app
USER app
EXPOSE 5000
ENTRYPOINT [ "yarn","start"]

