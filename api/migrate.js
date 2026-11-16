import pg from 'pg';

const { Pool } = pg;

export async function runMigration() {
  const connectionString = process.env.DIRECT_URL || process.env.DATABASE_URL;

  if (!connectionString) {
    throw new Error('DIRECT_URL ou DATABASE_URL não foi definida.');
  }

  const pool = new Pool({ connectionString });

  try {
    console.log('Iniciando migração do banco de dados...');

    await pool.query(`
      CREATE TABLE IF NOT EXISTS produtos (
        id SERIAL PRIMARY KEY,
        nome TEXT NOT NULL UNIQUE,
        preco NUMERIC(10, 2) NOT NULL
      );
    `);

    await pool.query(`
      INSERT INTO produtos (nome, preco)
      VALUES 
        ('Caderno', 19.90),
        ('Caneta', 4.50),
        ('Mochila', 89.90)
      ON CONFLICT (nome) DO NOTHING;
    `);

    console.log('Migração e inserção de produtos concluídas com sucesso!');
  } catch (error) {
    console.error('Erro durante a migração:', error);
    process.exitCode = 1;
    throw error;
  } finally {
    await pool.end();
  }
}

runMigration().catch(() => {
  process.exit(1);
});
