export function formatarPreco(valor) {
  const numero = typeof valor === 'number' ? valor : parseFloat(valor);
  if (Number.isNaN(numero)) {
    throw new TypeError('Valor inválido para formatação de preço');
  }
  return `R$ ${numero.toFixed(2).replace('.', ',')}`;
}
