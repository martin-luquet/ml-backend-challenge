import pool from '../config/database';
import { Fusionado } from '../models/fusionado';


/* Servicio para almacenar un fusionado en la base de datos
 * Recibe un objeto JSON con los campos del fusionado.
  * Responde con el resultado de la operación.
  */
export const guardarFusionado = async (fusionado: Fusionado) => {
  const query = `
    INSERT INTO tb_fusionados (
      character_name, height, mass, homeworld, climate, terrain,
      temperature, windspeed 
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `;

  const values = [
    fusionado.characterName,
    fusionado.height,
    fusionado.mass,
    fusionado.homeworld,
    fusionado.climate,
    fusionado.terrain,
    fusionado.weather.temperature || null,
    fusionado.weather.windspeed || null
  ];

  const [result] = await pool.execute(query, values);
  return result;
};