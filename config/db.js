const mysql = require('mysql2/promise');
require('dotenv').config();

// Validação das variáveis de ambiente
if (!process.env.DB_HOST || !process.env.DB_USER || !process.env.DB_PASSWORD || !process.env.DB_NAME || !process.env.DB_PORT) {
  throw new Error('Variáveis de ambiente do banco de dados não configuradas corretamente. Verifique o arquivo .env');
}

// Criação do pool de conexões
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Teste inicial de conexão
(async () => {
  try {
    const connection = await pool.getConnection();
    console.log('Conexão bem-sucedida ao banco de dados');
    connection.release(); // Liberar a conexão após o teste
  } catch (err) {
    console.error('Erro ao conectar ao banco de dados:', err.message);
    process.exit(1); // Finaliza a aplicação se a conexão inicial falhar
  }
})();

// Exporta o pool para uso nos controladores
module.exports = pool;
