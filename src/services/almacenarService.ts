import bcrypt from 'bcryptjs';

import { User } from '../models/user';
import pool from '../config/database';

/* * Servicio para manejar la creación de usuarios
 * Recibe un objeto JSON con los campos 'username' y 'password'.
  * Responde con un mensaje de éxito o error.
  */
export const crearUsuario = async (user: User) => {
  /**
   * Verifica si el nombre de usuario ya existe en la base de datos.
   * Si el usuario ya existe, lanza un error.
   */
  const [users] = await pool.query(`SELECT id FROM tb_usuario WHERE username = ?`, [user.username]);

  /**
   * Si la consulta devuelve algún resultado, significa que el usuario ya existe.
   * Lanza un error para evitar duplicados.
   */
  if ((users as any[]).length > 0) {
    throw new Error('El usuario ya existe');
  }

  /**
   * Hashea la contraseña usando bcrypt antes de almacenarla.
   * Utiliza un costo de 10 para el hash.
   */
  const hashedPassword = await bcrypt.hash(user.password, 10);
  
  /**
   * Inserta el nuevo usuario en la base de datos.
   * Utiliza una consulta parametrizada para evitar inyecciones SQL.
   */
  const query = `INSERT INTO tb_usuario (username, password) VALUES (?, ?)`;
  const [result] = await pool.execute(query, [user.username, hashedPassword]);

  return result;
};
