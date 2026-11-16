import express from 'express';
import cors from 'cors';
import produtosRouter from './produtos.js';
import healthRouter from './health.js';

const app = express();

app.use(cors());
app.use(express.json());

app.use(produtosRouter);
app.use(healthRouter);

export default app;
export { app };
