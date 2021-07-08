
FROM node:10-alpine as build-step

RUN mkdir /app

WORKDIR /app

COPY package.json /app

RUN npm install

COPY . /app

ENTRYPOINT node index.js
