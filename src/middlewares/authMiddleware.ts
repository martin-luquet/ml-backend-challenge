import { Request, Response, NextFunction } from 'express';
import { verificarToken } from '../utils/jwtUtils';


/**
 * Middleware para autenticar las solicitudes usando JWT.
 * Verifica que el token esté presente y sea válido.
 */
export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  /**
   * Verifica si el encabezado de autorización contiene un token JWT.
   * Si el token no está presente o es inválido, responde con un error 401
   */
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Token no proporcionado' });
  }

  /**
   * Extrae el token del encabezado de autorización.
   */
  const token = authHeader.split(' ')[1];

  try {
    /**
     * Verifica el token usando la función verificarToken.
     * Si el token es válido, se adjunta la información del usuario al objeto de solicitud
     */
    const decoded = verificarToken(token);
    /**
     * Adjunta la información del usuario decodificada al objeto de solicitud.
     */
    (req as any).user = decoded;
    /**
     * Llama a la siguiente función de middleware o controlador.
     */
    next();
  } catch (error) {
    return res.status(403).json({ error: 'Token inválido o expirado' });
  }
};
