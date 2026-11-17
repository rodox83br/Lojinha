# Lojinha - Fullstack & CI/CD

Aplicação fullstack da **Lojinha**, composta por uma API REST em **Node.js/Express** integrada ao **PostgreSQL** e um **Frontend** em HTML, CSS e JavaScript moderno com testes ponta a ponta (E2E) automatizados via **Cypress**.

O projeto foi construído seguindo a metodologia **SDD (Spec-Driven Development)**, com ciclo contínuo de Especificação (Issues), Branches temáticas e Pull Requests no GitHub.

---

## 📁 Estrutura do Projeto

### Backend (`api/`)
- [`api/app.js`](api/app.js): Configuração do Express com suporte a CORS para consumo por outras origens e registro de rotas. Exportável sem disparar servidor (test-friendly).
- [`api/server.js`](api/server.js): Inicialização do servidor na porta definida por `PORT` (padrão: 3001).
- [`api/db.js`](api/db.js): Pool de conexões PostgreSQL via `DATABASE_URL`.
- [`api/migrate.js`](api/migrate.js): Migração de schema e inserção idempotente dos produtos usando `DIRECT_URL`.
- [`api/produtos.js`](api/produtos.js): Consulta e rota `GET /produtos` com ordenação por ID e formatação em reais.
- [`api/preco.js`](api/preco.js): Utilitário de formatação `formatarPreco(valor)`.
- [`api/health.js`](api/health.js): Verificação ativa de saúde do banco de dados em `GET /health`.
- [`api/test/preco.test.js`](api/test/preco.test.js): Testes unitários da formatação de valores.
- [`api/test/produtos.integration.test.js`](api/test/produtos.integration.test.js): Teste de integração com banco de dados real e encerramento limpo de conexões.
- [`api/eslint.config.js`](api/eslint.config.js): Configuração do linter ESLint.

### Frontend (`frontend/`)
- [`frontend/index.html`](frontend/index.html): Estrutura semântica em português (`pt-BR`) com título "Lojinha" e lista dinâmica.
- [`frontend/styles.css`](frontend/styles.css): Estilização moderna, centralizada, com largura otimizada para leitura e estados visuais.
- [`frontend/app.js`](frontend/app.js): Consumo assíncrono de `http://localhost:3001/produtos` via `fetch`, manipulação do DOM com `textContent` e tratamento de erros via `try/catch`.

### Testes E2E (`cypress/`)
- [`cypress.config.cjs`](cypress.config.cjs): Configuração do Cypress apontando para `http://localhost:3000`.
- [`cypress/e2e/lojinha.cy.js`](cypress/e2e/lojinha.cy.js): Testes E2E cobrindo renderização, produtos reais e resiliência com API indisponível.

---

## ⚙️ Variáveis de Ambiente

Crie um arquivo `.env` dentro da pasta `api/` (baseado em [`.env.example`](.env.example)):

```env
PORT=3001
DIRECT_URL=postgresql://usuario:senha@host:5432/nome_banco?sslmode=require
DATABASE_URL=postgresql://usuario:senha@host:5432/nome_banco?sslmode=require
```

---

## 🚀 Execução e Testes

### Na raiz do projeto (Fullstack & E2E):
```bash
# Executa todos os testes E2E (inicia backend, frontend e roda Cypress)
npm run test:e2e

# Abre a interface interativa do Cypress
npm run cypress:open
```

### Na pasta `api/` (Backend):
```bash
cd api

# Iniciar servidor da API (porta 3001)
npm start

# Executar migração do banco de dados
npm run migrate

# Executar testes unitários
npm test

# Executar testes de integração
npm run test:integration

# Executar verificação estática de código
npm run lint
```

---

## 📌 Endpoints da API

- **`GET /produtos`**: Retorna os produtos ordenados com valores formatados:
  ```json
  [
    { "id": 1, "nome": "Caderno", "preco": "R$ 19,90" },
    { "id": 2, "nome": "Caneta", "preco": "R$ 4,50" },
    { "id": 3, "nome": "Mochila", "preco": "R$ 89,90" }
  ]
  ```
- **`GET /health`**: Retorna o status de conexão com o banco (`{"ok": true}` ou `{"ok": false}`).

---

## 📋 Rastreabilidade SDD (Issues & Pull Requests)

1. **Issue [#1](https://github.com/rodox83br/Lojinha/issues/1)** / **PR [#5](https://github.com/rodox83br/Lojinha/pull/5)**: Conexão com PostgreSQL e script de migração (`db.js`, `migrate.js`)
2. **Issue [#2](https://github.com/rodox83br/Lojinha/issues/2)** / **PR [#6](https://github.com/rodox83br/Lojinha/pull/6)**: Funcionalidades da API e healthcheck (`preco.js`, `health.js`, `produtos.js`, `app.js`, `server.js`)
3. **Issue [#3](https://github.com/rodox83br/Lojinha/issues/3)** / **PR [#7](https://github.com/rodox83br/Lojinha/pull/7)**: Testes unitários e de integração (`test/preco.test.js`, `test/produtos.integration.test.js`)
4. **Issue [#4](https://github.com/rodox83br/Lojinha/issues/4)** / **PR [#8](https://github.com/rodox83br/Lojinha/pull/8)**: Linter ESLint e padronização dos scripts npm
5. **Issue [#9](https://github.com/rodox83br/Lojinha/issues/9)** / **PR [#11](https://github.com/rodox83br/Lojinha/pull/11)**: Frontend da Lojinha, consumo da API e tratamento de falhas (`index.html`, `styles.css`, `app.js`)
6. **Issue [#10](https://github.com/rodox83br/Lojinha/issues/10)** / **PR [#12](https://github.com/rodox83br/Lojinha/pull/12)**: Testes ponta a ponta (E2E) com Cypress (`cypress/e2e/lojinha.cy.js`)
