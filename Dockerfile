FROM node:lts-alpine

RUN apk add --no-cache bash

RUN npm install -g @nestjs/cli

RUN node

WORKDIR /home/node/app