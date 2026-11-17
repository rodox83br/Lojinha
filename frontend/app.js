const API_URL = 'http://localhost:3001/produtos';

async function buscarProdutos() {
  const resposta = await fetch(API_URL);
  if (!resposta.ok) {
    throw new Error(`Erro HTTP ao buscar produtos: ${resposta.status}`);
  }
  return await resposta.json();
}

function exibirErro(mensagem) {
  const elementoMensagem = document.getElementById('mensagem');
  if (elementoMensagem) {
    elementoMensagem.textContent = mensagem;
    elementoMensagem.classList.add('erro');
  }
}

function renderizarProdutos(produtos) {
  const lista = document.getElementById('produtos');
  if (!lista) return;

  lista.innerHTML = '';
  produtos.forEach((produto) => {
    const item = document.createElement('li');
    item.textContent = `${produto.nome}: ${produto.preco}`;
    lista.appendChild(item);
  });
}

async function inicializar() {
  try {
    const produtos = await buscarProdutos();
    renderizarProdutos(produtos);
  } catch (erro) {
    console.error('Erro ao consultar produtos:', erro);
    exibirErro('Não foi possível carregar os produtos.');
  }
}

document.addEventListener('DOMContentLoaded', inicializar);
