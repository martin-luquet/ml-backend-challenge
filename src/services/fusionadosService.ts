import pool from '../config/database';


/* Servicio para almacenar un fusionado en la base de datos
 * Recibe un objeto JSON con los campos del fusionado.
  * Responde con el resultado de la operación.
  */
export const guardarFusionado = async (fusionado: {
  characterName: string;
  height: string;
  mass: string;
  homeworld: string;
  climate: string;
  terrain: string;
  temperature?: string;
  windspeed?: string;
  conditionCode?: string;
}) => {
  const query = `
    INSERT INTO tb_fusionados (
      character_name, height, mass, homeworld, climate, terrain,
      temperature, windspeed, condition_code
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  const values = [
    fusionado.characterName,
    fusionado.height,
    fusionado.mass,
    fusionado.homeworld,
    fusionado.climate,
    fusionado.terrain,
    fusionado.temperature || null,
    fusionado.windspeed || null,
    fusionado.conditionCode || null
  ];

  const [result] = await pool.execute(query, values);
  return result;
};