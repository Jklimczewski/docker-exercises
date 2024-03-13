FROM node:alpine

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

HEALTHCHECK CMD [ "ping", "-c", "3", "localhost:3000" ]