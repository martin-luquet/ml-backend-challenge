import { Request, Response, NextFunction } from 'express';
import { verificarToken } from '../utils/jwtUtils';


/**
 * Middleware para autenticar las solicitudes usando JWT.
 * Verifica que el token esté presente y sea válido.
 */
export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Token no proporcionado' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = verificarToken(token);
    (req as any).user = decoded;
    next();
  } catch (error) {
    return res.status(403).json({ error: 'Token inválido o expirado' });
  }
};
