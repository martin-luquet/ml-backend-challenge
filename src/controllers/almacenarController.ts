import { Request, Response } from 'express';
import { crearUsuario } from '../services/almacenarService';
import logger from '../utils/logger';

/**
 * Controlador para manejar la creación de usuarios.
 * Recibe un objeto JSON con los campos 'username' y 'password'.
 * Responde con un mensaje de éxito o error.
 */
export const almacenarController = async (req: Request, res: Response) => {
  /**
   * Recibe las credenciales del usuario desde el cuerpo de la solicitud.
   */
  const { username, password } = req.body;

  logger.info({ username }, 'Intentando crear usuario');

  /**
   * Verifica que se hayan proporcionado las credenciales necesarias.
   */
  if (!username || !password) {
    logger.warn('Faltan credenciales para crear usuario');
    return res.status(400).json({ error: 'username y password son requeridos' });
  }

  try {
    /**
     * Intenta crear el usuario utilizando el servicio de almacenamiento.
     */
    const user = { username, password };
    await crearUsuario(user);
    logger.info({ username }, 'Usuario creado exitosamente');
    return res.status(200).json({ message: 'Usuario creado exitosamente' });
  } catch (error: any) {
    logger.error({ err: error, username }, 'Error al crear usuario');
    return res.status(400).json({ error: error.message });
  }
};
