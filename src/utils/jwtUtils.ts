import jwt, { Secret, SignOptions } from 'jsonwebtoken';
import { jwtConfig } from '../config/jwt';

const secretKey: string = jwtConfig.secret; // Aseguramos tipo

export const generarToken = (payload: object): string => {
  const options: SignOptions = {
    
    expiresIn: jwtConfig.expiresIn // Aseguramos tipo
  };

  return jwt.sign(payload, secretKey, options);
};

export const verificarToken = (token: string): any => {
  return jwt.verify(token, secretKey);
};
