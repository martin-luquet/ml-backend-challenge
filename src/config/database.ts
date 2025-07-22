import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

/**
 * Carga las variables de entorno desde un archivo .env.
 */
dotenv.config();

/**
 * Configuración de la base de datos MySQL para la aplicación.
 * Utiliza mysql2/promise para manejar conexiones asíncronas.
 */
const pool = mysql.createPool({
  host: process.env.MYSQL_HOST,
  port: +(process.env.MYSQL_PORT || 3306),
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

export default pool;