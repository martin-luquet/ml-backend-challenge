import dotenv from 'dotenv';

dotenv.config();

// Configuración del JWT
// Si no se define JWT_SECRET en el entorno, se usa un valor por defecto
export const jwtConfig = {
  secret: process.env.JWT_SECRET || 'backendchallenge',
  expiresIn: '1h' as const
};