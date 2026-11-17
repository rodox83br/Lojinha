# Lojinha - API de Consulta de Produtos

API REST para consulta de produtos desenvolvida com **Node.js**, **Express** e **PostgreSQL**, estruturada como base para pipelines de Integração Contínua (CI) e Entrega Contínua (CD).

O desenvolvimento deste projeto seguiu o método **SDD (Spec-Driven Development)**, com especificações rastreadas através de Issues e Pull Requests no GitHub.

---

## 📁 Estrutura do Projeto

O código-fonte da API está localizado na pasta `api/` com responsabilidades estritamente separadas:

- [`api/app.js`](api/app.js): Configuração do Express, middlewares (CORS, JSON) e registro de rotas. Exportado sem ligar o servidor para permitir testes.
- [`api/server.js`](api/server.js): Inicialização do servidor HTTP na porta definida por `PORT` (padrão: 3001).
- [`api/db.js`](api/db.js): Pool de conexões com o PostgreSQL usando `DATABASE_URL`.
- [`api/migrate.js`](api/migrate.js): Script de migração e carga inicial idempotente de dados usando `DIRECT_URL`.
- [`api/produtos.js`](api/produtos.js): Consulta e rota `GET /produtos` com preços formatados.
- [`api/preco.js`](api/preco.js): Função utilitária `formatarPreco(valor)` para moeda brasileira.
- [`api/health.js`](api/health.js): Rota `GET /health` para checagem ativa da conexão com o banco.
- [`api/test/preco.test.js`](api/test/preco.test.js): Testes unitários para `formatarPreco`.
- [`api/test/produtos.integration.test.js`](api/test/produtos.integration.test.js): Testes de integração com banco real e encerramento limpo de conexões.
- [`api/eslint.config.js`](api/eslint.config.js): Configuração de linting com ESLint (Flat Config).

---

## ⚙️ Variáveis de Ambiente

Crie um arquivo `.env` dentro da pasta `api/` (ou utilize o modelo [`.env.example`](.env.example)):

```env
PORT=3001
DIRECT_URL=postgresql://usuario:senha@host:5432/nome_banco?sslmode=require
DATABASE_URL=postgresql://usuario:senha@host:5432/nome_banco?sslmode=require
```

---

## 🚀 Comandos Disponíveis

Navegue até a pasta `api/` para executar os comandos:

```bash
cd api
```

| Comando | Descrição |
|---|---|
| `npm start` | Inicia o servidor Express |
| `npm run migrate` | Cria a tabela `produtos` e insere os registros iniciais (idempotente) |
| `npm test` | Executa a suíte de testes unitários |
| `npm run test:integration` | Executa os testes de integração contra o banco de dados |
| `npm run lint` | Executa a validação estática de código com ESLint |

---

## 📌 Endpoints da API

### `GET /produtos`
Retorna a listagem de produtos ordenados por `id`:
```json
[
  {
    "id": 1,
    "nome": "Caderno",
    "preco": "R$ 19,90"
  },
  {
    "id": 2,
    "nome": "Caneta",
    "preco": "R$ 4,50"
  },
  {
    "id": 3,
    "nome": "Mochila",
    "preco": "R$ 89,90"
  }
]
```

### `GET /health`
Verifica a conectividade ativa com o banco PostgreSQL:
- **Status 200**: `{"ok": true}`
- **Status 503**: `{"ok": false}`

---

## 📋 Rastreabilidade SDD (Issues & Pull Requests)

1. **Issue [#1](https://github.com/rodox83br/Lojinha/issues/1)** / **PR [#5](https://github.com/rodox83br/Lojinha/pull/5)**: Conexão com PostgreSQL e script de migração (`db.js`, `migrate.js`)
2. **Issue [#2](https://github.com/rodox83br/Lojinha/issues/2)** / **PR [#6](https://github.com/rodox83br/Lojinha/pull/6)**: Funcionalidades da API e healthcheck (`preco.js`, `health.js`, `produtos.js`, `app.js`, `server.js`)
3. **Issue [#3](https://github.com/rodox83br/Lojinha/issues/3)** / **PR [#7](https://github.com/rodox83br/Lojinha/pull/7)**: Testes unitários e de integração (`test/preco.test.js`, `test/produtos.integration.test.js`)
4. **Issue [#4](https://github.com/rodox83br/Lojinha/issues/4)** / **PR [#8](https://github.com/rodox83br/Lojinha/pull/8)**: Linter ESLint e padronização dos scripts npm
