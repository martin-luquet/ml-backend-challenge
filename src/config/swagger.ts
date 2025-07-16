import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { Express } from 'express';

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'ML Backend Challenge API',
      version: '1.0.0',
      description: 'Documentación de los endpoints de la API usando Swagger'
    },
    servers: [
      {
        url: 'https://hur2osjc10.execute-api.us-east-1.amazonaws.com/dev',
        description: 'API Gateway - Entorno Dev'
      }
    ]
  },
  apis: ['src/routes/index.ts', 'src/controllers/*.ts']
};
const swaggerSpec = swaggerJsdoc(options);

export function swaggerDocs(app: Express): void {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  console.log(`Swagger docs disponibles en https://hur2osjc10.execute-api.us-east-1.amazonaws.com/dev/api-docs`);
}
