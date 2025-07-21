import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';

import pool from '../config/database';
import { generarToken } from '../utils/jwtUtils';
import logger from '../utils/logger';

/**
 * Controlador para manejar el login de usuarios.
 * Recibe un objeto JSON con los campos 'username' y 'password'.
 * Responde con un token JWT si el login es exitoso.
 */
export const loginController = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  logger.info({ username }, 'Intentando iniciar sesión');

  if (!username || !password) {
    logger.warn('Faltan credenciales');
    return res.status(400).json({ error: 'Username y password son requeridos' });
  }

  try {
    const [rows] = await pool.query(
      'SELECT id, username, password FROM tb_usuario WHERE username = ?',
      [username]
    );

    const user = (rows as any[])[0];

    if (!user) {
      logger.warn({ username }, 'Usuario no encontrado');
      return res.status(401).json({ error: 'Usuario no encontrado' });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      logger.warn({ username }, 'Contraseña incorrecta');
      return res.status(401).json({ error: 'Contraseña incorrecta' });
    }

    const token = generarToken({ id: user.id, username: user.username });

    logger.info({ username, id: user.id }, 'Login exitoso');
    return res.status(200).json({
      message: 'Login exitoso',
      token
    });

  } catch (error: any) {
    logger.error({ err: error }, 'Error en login');
    return res.status(500).json({ error: 'Error interno del servidor' });
  }
};
