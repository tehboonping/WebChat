FROM node:16.13.2
WORKDIR /usr/src/app
COPY app/package.json .
RUN yarn install
COPY . .