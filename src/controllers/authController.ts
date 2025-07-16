import { Request, Response } from 'express';
import pool from '../config/database';
import bcrypt from 'bcryptjs';
import { generarToken } from '../utils/jwtUtils';

// Controlador para manejar el login de usuarios
/**
 * Controlador para manejar el login de usuarios.
 * Recibe un objeto JSON con los campos 'username' y 'password'.
 * Responde con un token JWT si el login es exitoso.
 */

export const loginController = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  console.log('Datos de login:', { username, password });

  if (!username || !password) {
    return res.status(400).json({ error: 'Username y password son requeridos' });
  }

  try {
    const [rows] = await pool.query(
      'SELECT id, username, password FROM tb_usuario WHERE username = ?',
      [username]
    );

    const user = (rows as any[])[0];

    if (!user) {
      return res.status(401).json({ error: 'Usuario no encontrado' });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ error: 'Contraseña incorrecta' });
    }

    const token = generarToken({ id: user.id, username: user.username });

    return res.status(200).json({
      message: 'Login exitoso',
      token
    });

  } catch (error: any) {
    console.error('Error en login:', error.message);
    return res.status(500).json({ error: 'Error interno del servidor' });
  }
};
