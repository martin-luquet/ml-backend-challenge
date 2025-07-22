import dotenv from 'dotenv';

/**
 * Carga las variables de entorno desde un archivo .env.
 */
dotenv.config();

/**
 * Configuración de JWT para la aplicación.
 * Utiliza una clave secreta y un tiempo de expiración para los tokens.
 */
export const jwtConfig = {
  secret: process.env.JWT_SECRET || 'backendchallenge',
  expiresIn: '1h' as const
};