import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { Express } from 'express';

/**
 * Configuración de Swagger para la documentación de la API.
 * Utiliza swagger-jsdoc para generar la especificación OpenAPI
 * y swagger-ui-express para servir la documentación.
 */
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
        url: 'http://localhost:3000/api',
        description: 'Servidor local'
      },
      {
        url: 'https://hur2osjc10.execute-api.us-east-1.amazonaws.com/dev/api',
        description: 'AWS API Gateway (Development)'
      }
    ],
    components: {
      securitySchemes: {
        BearerAuth: {  // Define el esquema de autenticación Bearer
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',  // Opcional: especifica que es un JWT
        },
      },
    },
    security: [  // Aplica autenticación por defecto a todos los endpoints
      {
        BearerAuth: [],  // Usa el esquema definido arriba
      },
    ]
  },
  apis: ['src/routes/*.ts', 'src/controllers/*.ts']
};

/**
 * Genera la especificación Swagger para la API.
 */
const swaggerSpec = swaggerJsdoc(options);

export function swaggerDocs(app: Express): void {
  /**
   * Configura el middleware de Swagger UI para servir la documentación.
   */
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  console.log("Swagger docs disponibles en http://localhost:3000/api-docs");
}