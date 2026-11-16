import app from './app.js';

const PORT = process.env.PORT || 3001;

const server = app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

export default server;
