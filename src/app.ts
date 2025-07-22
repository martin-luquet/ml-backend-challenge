import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';

import routes from './routes';
import { swaggerDocs } from './config/swagger';

/**
 * Configuración del entorno
 * Carga las variables de entorno desde un archivo .env.
 */
dotenv.config();

/**
 * Inicializa la aplicación Express.
 * Configura middlewares, rutas y Swagger.
 */
const app = express();

/**
 * Middleware para manejar el cuerpo de las solicitudes.
 * Utiliza body-parser para parsear JSON y URL-encoded.
 */
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

/**
 * Middleware para manejar CORS.
 * Permite solicitudes desde cualquier origen y define los métodos permitidos.
 */
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method'
  );
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
  // Permite el acceso a los recursos estáticos de Swagger
  if (req.path.includes('/api-docs') ){
    res.header('Access-Control-Allow-Headers', '*');
    res.header('Cache-Control', 'no-store');
  }
  
  // Maneja las solicitudes preflight OPTIONS
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  
  next();
});

/**
 * Define las rutas de la aplicación.
 */
app.use('/api', routes);

/**
 * Configura Swagger para la documentación de la API.
 * Swagger proporciona una interfaz interactiva para explorar y probar la API.
 */
swaggerDocs(app);

export default app;

/**
 * Inicia el servidor si este archivo es ejecutado directamente.
 * Utiliza el puerto definido en las variables de entorno o el puerto 3000 por defecto
 */
if (require.main === module) {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
  });
}