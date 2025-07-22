import pool from '../config/database';
import bcrypt from 'bcryptjs';


/* * Servicio para manejar la creación de usuarios
 * Recibe un objeto JSON con los campos 'username' y 'password'.
  * Responde con un mensaje de éxito o error.
  */
export const crearUsuario = async (username: string, password: string) => {
  /**
   * Verifica si el nombre de usuario ya existe en la base de datos.
   * Si el usuario ya existe, lanza un error.
   */
  const [usuarios] = await pool.query(`SELECT id FROM tb_usuario WHERE username = ?`, [username]);

  if ((usuarios as any[]).length > 0) {
    throw new Error('El usuario ya existe');
  }

  /**
   * Hashea la contraseña usando bcrypt antes de almacenarla.
   * Utiliza un costo de 10 para el hash.
   */
  const hashedPassword = await bcrypt.hash(password, 10);
  
  /**
   * Inserta el nuevo usuario en la base de datos.
   * Utiliza una consulta parametrizada para evitar inyecciones SQL.
   */
  const query = `INSERT INTO tb_usuario (username, password) VALUES (?, ?)`;
  const [result] = await pool.execute(query, [username, hashedPassword]);

  return result;
};
