
import serverless from 'serverless-http';
import app from './app';

// Esta configuración fuerza serverless-http a decodificar bien el body JSON
export const handler = serverless(app, {
  request: (req: any, event: any, context: any) => {
    if (typeof event.body === 'string') {
      try {
        req.body = JSON.parse(event.body);
      } catch (e) {
        req.body = {};
      }
    }
  },
});