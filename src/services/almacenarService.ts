import pool from '../config/database';
import bcrypt from 'bcryptjs';


/* * Servicio para manejar la creación de usuarios
 * Recibe un objeto JSON con los campos 'username' y 'password'.
  * Responde con un mensaje de éxito o error.
  */
export const crearUsuario = async (username: string, password: string) => {
  // Verificar si ya existe
  const [usuarios] = await pool.query(`SELECT id FROM tb_usuario WHERE username = ?`, [username]);

  if ((usuarios as any[]).length > 0) {
    throw new Error('El usuario ya existe');
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const query = `INSERT INTO tb_usuario (username, password) VALUES (?, ?)`;
  const [result] = await pool.execute(query, [username, hashedPassword]);

  return result;
};
