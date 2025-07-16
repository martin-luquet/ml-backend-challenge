import { Router } from 'express';

import { authMiddleware } from '../middlewares/authMiddleware';

import { pingController } from '../controllers/pingController';
import { fusionadosController } from '../controllers/fusionadosController';
import { historialController } from '../controllers/historialController';
import { almacenarController } from '../controllers/almacenarController';
import { loginController } from '../controllers/authController';


const router = Router();

router.get('/ping', pingController);
router.get('/fusionados/:id', authMiddleware, fusionadosController);
router.get('/historial', authMiddleware, historialController);
router.post('/almacenar', almacenarController);
router.post('/login', loginController);

router.get('/', (req, res) => {
  res.json({ message: 'Welcome to the backend challenge' });
});

export default router;