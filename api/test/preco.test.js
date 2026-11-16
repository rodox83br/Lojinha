import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { formatarPreco } from '../preco.js';

describe('Testes Unitários - formatarPreco', () => {
  test('deve formatar 19.9 para "R$ 19,90"', () => {
    assert.equal(formatarPreco(19.9), 'R$ 19,90');
  });

  test('deve formatar 4.5 para "R$ 4,50"', () => {
    assert.equal(formatarPreco(4.5), 'R$ 4,50');
  });

  test('deve formatar 89.9 para "R$ 89,90"', () => {
    assert.equal(formatarPreco(89.9), 'R$ 89,90');
  });

  test('deve aceitar valores numéricos formatados como string', () => {
    assert.equal(formatarPreco('19.90'), 'R$ 19,90');
  });

  test('deve lançar TypeError caso o valor seja inválido', () => {
    assert.throws(() => formatarPreco('invalido'), {
      name: 'TypeError',
      message: 'Valor inválido para formatação de preço'
    });
  });
});
