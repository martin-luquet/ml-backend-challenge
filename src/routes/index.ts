import { Router } from 'express';

import { authMiddleware } from '../middlewares/authMiddleware';

import { pingController } from '../controllers/pingController';
import { fusionadosController } from '../controllers/fusionadosController';
import { historialController } from '../controllers/historialController';
import { almacenarController } from '../controllers/almacenarController';
import { loginController } from '../controllers/authController';

/**
 * Router principal de la aplicación.
 * Define las rutas y los controladores asociados.
 */
const router = Router();

/**
 * @openapi
 * /ping:
 *   get:
 *     summary: Endpoint para verificar que el servidor está funcionando
 *     tags:
 *       - Ping
 *     responses:
 *       200:
 *         description: El servidor está funcionando correctamente
 *       500:
 *         description: Error del servidor
 */
router.get('/ping', pingController);

/**
 * @openapi
 * /fusionados/{id}:
 *   get:
 *     summary: Obtiene información fusionada del personaje y clima
 *     tags:
 *       - Fusionados
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Datos fusionados correctamente
 *       400:
 *         description: ID inválido
 *       500:
 *         description: Error del servidor
 */
router.get('/fusionados/:id', authMiddleware, fusionadosController);

/**
 * @openapi
 * /historial:
 *   get:
 *     summary: Obtiene el historial paginado de personajes consultados
 *     description: |
 *       Devuelve una lista paginada de los personajes fusionados previamente consultados.
 *       Requiere autenticación mediante JWT.
 *     tags:
 *       - Historial
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - name: page
 *         in: query
 *         description: Número de página (default 1)
 *         required: false
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 1
 *       - name: limit
 *         in: query
 *         description: Cantidad de items por página (default 10)
 *         required: false
 *         schema:
 *           type: integer
 *           minimum: 1
 *           maximum: 100
 *           default: 10
 *     responses:
 *       200:
 *         description: Datos fusionados correctamente
 *       400:
 *         description: ID inválido
 *       500:
 *         description: Error del servidor
 */
router.get('/historial', authMiddleware, historialController);

/**
 * @openapi
 * /almacenar:
 *   post:
 *     summary: Almacena un nuevo personaje con credenciales
 *     description: |
 *       Crea un nuevo registro de credenciales de usuario.
 *     tags:
 *       - Almacenamiento
 *     requestBody:
 *       required: true
 *       description: credenciales del nuevo usuario registrado
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *                 description: Nombre de usuario (mínimo 4 caracteres)
 *                 example: "usuarioEjemplo"
 *               password:
 *                 type: string
 *                 format: password
 *                 description: Contraseña (mínimo 8 caracteres)
 *                 example: "claveSegura123"
 *     responses:
 *       201:
 *         description: Personaje almacenado correctamente
 *       400:
 *         description: Datos inválidos o faltantes
 *       401:
 *         description: No autorizado (token inválido o no proporcionado)
 *       500:
 *         description: Error del servidor
 */
router.post('/almacenar', almacenarController);

/**
 * @openapi
 * /login:
 *   post:
 *     summary: Endpoint para iniciar sesión
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Inicio de sesión exitoso
 *       401:
 *         description: Credenciales inválidas
 *       500:
 *         description: Error del servidor
 */
router.post('/login', loginController);

router.get('/', (req, res) => {
  res.json({ message: 'Welcome to the backend challenge' });
});

export default router;