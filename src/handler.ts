
import serverless from 'serverless-http';
import app from './app';
import logger from './utils/logger';

// Esta configuración fuerza serverless-http a decodificar bien el body JSON
export const handler = serverless(app, {
  request: (req: any, event: any, context: any) => {
    //logger.info({ event }, 'Lambda Challenge');
    if (typeof event.body === 'string') {
      try {
        req.body = JSON.parse(event.body);
      } catch (e) {
        req.body = {};
      }
    }
  },
});