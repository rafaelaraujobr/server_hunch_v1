FROM node:lts-alpine

RUN apk add --no-cache bash

RUN npm install -g @nestjs/cli

RUN node

RUN chmod -R 777 ./

WORKDIR /home/node/app