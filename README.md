# ddd-app

Este repositório contém uma aplicação de exemplo (DDD) em TypeScript com testes usando Jest.

## Requisitos

- Node.js 18+ / npm
- Docker (opcional, para rodar em container)

## Instalação

Instale dependências:

```bash
npm install
```

## Rodando os testes

Executar validação do TypeScript e testes:

```bash
npm test
```

Para rodar apenas o Jest (ignorando `tsc`):

```bash
npx jest
```

## Rodando a aplicação localmente

```bash
npm start
```

## Rodando com Docker

Exemplo simples para construir uma imagem e rodar o container.

1. Crie um `Dockerfile` (se já não existir). Exemplo mínimo:

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm install --production
COPY . .
CMD ["npm", "start"]
```

2. Build da imagem:

```bash
docker build -t ddd-app:latest .
```

3. Rodar container:

```bash
docker run --rm -p 3000:3000 --name ddd-app ddd-app:latest
```

> Observação: a aplicação de exemplo não expõe necessariamente a porta `3000`. Ajuste `-p`/`CMD` conforme necessário.

## Notas

- `npm test` executa `tsc` antes do `jest` (ver `package.json`).
- O projeto usa SQLite em memória para testes, então não há dependências externas para os testes.

