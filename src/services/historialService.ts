import pool from '../config/database';

/**
 * Obtiene el historial paginado de la tabla fusionados
 */
export const obtenerHistorialPaginado = async (page: number = 1, limit: number = 10) => {
  const safePage = Math.max(Number(page), 1);
  const safeLimit = Math.max(Number(limit), 1);
  const offset = (safePage - 1) * safeLimit;

  const query = `
    SELECT
      id,
      character_name,
      height,
      mass,
      homeworld,
      climate,
      terrain,
      temperature,
      windspeed,
      condition_code,
      created_at
    FROM tb_fusionados
    ORDER BY created_at ASC
    LIMIT ${safeLimit} OFFSET ${offset}
  `;

  const [rows] = await pool.query(query);
  return rows;
};

/**
 * Cuenta el total de registros en la tabla fusionados
 */
export const contarTotalFusionados = async () => {
  const [rows]: any = await pool.query(`SELECT COUNT(*) as total FROM tb_fusionados`);
  return rows[0].total;
};
