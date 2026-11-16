import { test, describe, after } from 'node:test';
import assert from 'node:assert/strict';
import request from 'supertest';
import app from '../app.js';
import { pool } from '../db.js';

describe('Testes de Integração - API Lojinha', () => {
  after(async () => {
    // Encerra as conexões com o banco de dados após a conclusão dos testes
    await pool.end();
  });

  test('GET /health deve responder com status 200 e { ok: true }', async () => {
    const res = await request(app).get('/health');
    assert.equal(res.status, 200);
    assert.deepEqual(res.body, { ok: true });
  });

  test('GET /produtos deve retornar status 200, os 3 produtos e precos formatados em reais', async () => {
    const res = await request(app).get('/produtos');

    assert.equal(res.status, 200);
    assert.equal(Array.isArray(res.body), true);
    assert.equal(res.body.length, 3);

    // Valida estrutura de campos e ordenação por ID
    for (let i = 0; i < res.body.length; i += 1) {
      assert.ok('id' in res.body[i], 'Produto deve conter id');
      assert.ok('nome' in res.body[i], 'Produto deve conter nome');
      assert.ok('preco' in res.body[i], 'Produto deve conter preco formatado');

      if (i > 0) {
        assert.ok(res.body[i].id > res.body[i - 1].id, 'Produtos devem estar ordenados por id crescente');
      }
    }

    // Valida os 3 produtos específicos e seus preços formatados
    const caderno = res.body.find((p) => p.nome === 'Caderno');
    const caneta = res.body.find((p) => p.nome === 'Caneta');
    const mochila = res.body.find((p) => p.nome === 'Mochila');

    assert.ok(caderno, 'Caderno deve estar presente');
    assert.equal(caderno.preco, 'R$ 19,90');

    assert.ok(caneta, 'Caneta deve estar presente');
    assert.equal(caneta.preco, 'R$ 4,50');

    assert.ok(mochila, 'Mochila deve estar presente');
    assert.equal(mochila.preco, 'R$ 89,90');
  });
});
