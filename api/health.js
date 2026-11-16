import { Router } from 'express';
import { pool } from './db.js';

const router = Router();

router.get('/health', async (req, res) => {
  try {
    await pool.query('SELECT 1');
    return res.status(200).json({ ok: true });
  } catch (error) {
    console.error('Falha na verificação de saúde do banco:', error);
    return res.status(503).json({ ok: false });
  }
});

export default router;
export { router as healthRouter };
