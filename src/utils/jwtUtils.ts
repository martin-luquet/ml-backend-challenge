import jwt, { Secret, SignOptions } from 'jsonwebtoken';
import { jwtConfig } from '../config/jwt';

/**
 * Genera un token JWT a partir de un payload.
 * Utiliza la clave secreta y las opciones definidas en la configuración.
 */
const secretKey: string = jwtConfig.secret;

/**
 * Genera un token JWT con un payload y opciones de expiración.
 * @param payload - Objeto que contiene la información a incluir en el token.
 * @returns Un token JWT firmado.
 */
export const generarToken = (payload: object): string => {
  /**
   * Define las opciones de firma del token.
   */
  const options: SignOptions = { 
    expiresIn: jwtConfig.expiresIn
  };

  /**
   * Firma el token usando la clave secreta y las opciones definidas.
   */
  return jwt.sign(payload, secretKey, options);
};

/**
 * 
 * @param token - Token JWT a verificar.
 * Verifica la validez del token JWT.
 * @returns 
 */
export const verificarToken = (token: string): any => {
  return jwt.verify(token, secretKey);
};
