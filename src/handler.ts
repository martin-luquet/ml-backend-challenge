
import serverless from 'serverless-http';
import app from './app';
import logger from './utils/logger';

/**
 * Handler para AWS Lambda.
 * Utiliza serverless-http para adaptar la aplicación Express a un entorno Lambda.
 */
export const handler = serverless(app, {
  request: (req: any, event: any, context: any) => {
    //logger.info({ event }, 'Lambda Challenge');
    /**
     * Extrae el cuerpo de la solicitud del evento.
     * Si el cuerpo es una cadena, intenta parsearlo como JSON.
     */
    if (typeof event.body === 'string') {
      try {
        req.body = JSON.parse(event.body);
      } catch (e) {
        req.body = {};
      }
    }
  },
});