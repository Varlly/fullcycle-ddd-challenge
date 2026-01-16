# Dockerfile
FROM node:18-alpine

WORKDIR /usr/src/app

COPY app/package*.json ./

RUN npm install

COPY app/src ./src
COPY app/tsconfig.json ./

# Compilar TypeScript com tsc
RUN npm run tsc

EXPOSE 3000

CMD ["node", "dist/index.js"]