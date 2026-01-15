# Dockerfile
FROM node:18-alpine

WORKDIR /usr/src/app

COPY app/package*.json ./

RUN npm install --legacy-peer-deps

COPY app/ .

EXPOSE 3000

CMD ["ts-node", "src/index.ts"]