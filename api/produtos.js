import { Router } from 'express';
import { pool } from './db.js';
import { formatarPreco } from './preco.js';

const router = Router();

export async function consultarProdutos(db = pool) {
  const result = await db.query('SELECT id, nome, preco FROM produtos ORDER BY id ASC');
  return result.rows.map((row) => ({
    id: row.id,
    nome: row.nome,
    preco: formatarPreco(row.preco)
  }));
}

router.get('/produtos', async (req, res) => {
  try {
    const produtos = await consultarProdutos();
    return res.status(200).json(produtos);
  } catch (error) {
    console.error('Erro ao consultar produtos:', error);
    return res.status(500).json({ erro: 'Erro interno ao consultar produtos' });
  }
});

export default router;
export { router as produtosRouter };
