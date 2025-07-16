import { Request, Response } from 'express';
import { crearUsuario } from '../services/almacenarService';

/**
 * Controlador para manejar la creación de usuarios.
 * Recibe un objeto JSON con los campos 'username' y 'password'.
 * Responde con un mensaje de éxito o error.
 */
export const almacenarController = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  
  // Validación básica
  if (!username || !password) {
    return res.status(400).json({ error: 'username y password son requeridos' });
  }

  try {
    await crearUsuario(username, password);
    return res.status(201).json({ message: 'Usuario creado exitosamente' });
  } catch (error: any) {
    return res.status(400).json({ error: error.message });
  }
};
