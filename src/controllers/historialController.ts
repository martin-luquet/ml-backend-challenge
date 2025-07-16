import { Request, Response } from 'express';
import { obtenerHistorialPaginado, contarTotalFusionados } from '../services/historialService';


/**
 * Controlador para manejar la ruta /historial
 * Permite obtener un historial paginado de los fusionados
 */
export const historialController = async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;

    if (isNaN(page) || isNaN(limit) || page < 1 || limit < 1) {
      return res.status(400).json({ error: 'Parámetros de paginación inválidos.' });
    }
    
    const historial = await obtenerHistorialPaginado(page, limit);
    const total = await contarTotalFusionados();

    return res.status(200).json({
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
      results: historial
    });
  } catch (error: any) {
    console.error('Error al obtener historial:', error.message);
    return res.status(500).json({ error: 'Error al obtener historial' });
  }
};
