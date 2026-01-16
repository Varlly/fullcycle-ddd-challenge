# 🏗️ ddd-app

> Uma aplicação de exemplo implementando os princípios de **Domain-Driven Design (DDD)** em TypeScript com testes automatizados.

![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=flat&logo=typescript&logoColor=white)
![Jest](https://img.shields.io/badge/jest-C21325?style=flat&logo=jest&logoColor=white)
![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=flat&logo=docker&logoColor=white)
![Node.js](https://img.shields.io/badge/node.js-339933?style=flat&logo=node.js&logoColor=white)

---

## 📋 Sumário

- [Requisitos](#-requisitos)
- [Instalação](#-instalação)
- [Como Usar](#-como-usar)
- [Docker](#-docker)
- [Notas](#-notas)

---

## 📦 Requisitos

- **Node.js** 18+ com npm
- **Docker** e **Docker Compose** (opcional, para containerização)

---

## 🚀 Instalação

Clone o repositório e instale as dependências:

```bash
npm install
```

---

## 🎯 Como Usar

### ✅ Rodando os testes

Executar validação de tipos + Jest:

```bash
npm test
```

Ou rodar apenas o Jest:

```bash
npx jest
```

### 🎮 Rodando a aplicação localmente

```bash
npm start
```

A aplicação estará disponível em `http://localhost:3000`

---

## 🐳 Docker

### 🔵 Usando docker-compose (Recomendado ⭐)

A forma mais rápida e simples de iniciar a aplicação:

```bash
docker-compose up
```

**Isso irá:**
- ✅ Construir a imagem automaticamente
- ✅ Instalar todas as dependências
- ✅ Iniciar o servidor em modo desenvolvimento com `nodemon`
- ✅ Expor a aplicação na porta `3000`

Para parar a aplicação:

```bash
docker-compose down
```

#### 🔄 Forçar rebuild da imagem

Se você fez mudanças no `Dockerfile` ou `package.json` e quer garantir que a imagem será reconstruída:

```bash
DOCKER_BUILDKIT=1 docker-compose up -d
```

Ou com rebuild forçado:

```bash
docker-compose up --build -d
```

---

### 🔶 Usando Docker puro (sem docker-compose)

**1. Build da imagem:**

```bash
docker build -t node_ddd:latest .
```

**2. Rodar o container:**

```bash
docker run --rm -p 3000:3000 --name node_ddd node_ddd:latest
```

---

### 🧪 Rodando testes no Docker

```bash
docker-compose exec app npm test
```

> **⚠️ Nota importante**: O Dockerfile instala TODAS as dependências (incluindo devDependencies) necessárias para `ts-node`, `jest` e testes funcionarem corretamente.

---

## 📝 Notas

- `npm test` executa a validação de tipos (`tsc`) antes do `jest`
- O projeto usa **SQLite em memória** para testes (sem dependências externas)
- Estrutura baseada em **Domain-Driven Design** com separação clara de camadas

---

## 📄 Licença

MIT

