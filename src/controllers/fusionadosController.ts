import { Request, Response } from 'express';
import axios from 'axios';

import memcachedClient from '../config/memcached';
import { guardarFusionado } from '../services/fusionadosService';
import { planetCoordinateMap } from '../utils/planetMap';
import logger from '../utils/logger';

/**
 * Controlador para manejar la ruta /fusionados/:id
 * Permite obtener información de un personaje fusionado por su ID
 * obtenerlo desde la caché si ya fue consultado anteriormente.
 * Si no está en caché, realiza las consultas a la API de Star Wars y Open Meteo,
 * guarda el resultado en caché y en la base de datos.
 */
export const fusionadosController = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id, 10);

    if (isNaN(id) || id < 1) {
      return res.status(400).json({ error: 'ID inválido. Debe ser un número mayor que 0.' });
    }

    const cacheKey = `merged:${id}`;

    const { value: cached } = await memcachedClient.get(cacheKey);
    if (cached) {
      const parsed = JSON.parse(cached.toString());
      logger.info('Resultado obtenido desde cache');
      return res.status(200).json(parsed);
    }

    const { data: peopleData } = await axios.get(`${process.env.SWAPI_BASE_URL}/people/${id}/`);
    const { data: planetData } = await axios.get(peopleData.homeworld);

    const planetName = planetData.name;
    const location = planetCoordinateMap[planetName];

    let weather = {
      temperature: 'No disponible',
      windspeed: 'No disponible',
      condition_code: 'No disponible'
    };

    if (location) {
      const { data: weatherData } = await axios.get(`${process.env.OPENMETEO_BASE_URL}`, {
        params: {
          latitude: location.lat,
          longitude: location.lon,
          current_weather: true
        }
      });

      weather = {
        temperature: `${weatherData.current_weather.temperature} °C`,
        windspeed: `${weatherData.current_weather.windspeed} km/h`,
        condition_code: weatherData.current_weather.weathercode
      };
    }

    const result = {
      character: peopleData.name,
      height: peopleData.height,
      mass: peopleData.mass,
      homeworld: planetName,
      climate: planetData.climate,
      terrain: planetData.terrain,
      weather
    };

    await memcachedClient.set(cacheKey, JSON.stringify(result), { expires: 1800 });

    await guardarFusionado({
      characterName: peopleData.name,
      height: peopleData.height,
      mass: peopleData.mass,
      homeworld: planetName,
      climate: planetData.climate,
      terrain: planetData.terrain,
      temperature: weather.temperature,
      windspeed: weather.windspeed,
      conditionCode: weather.condition_code
    });

    logger.info('Resultado guardado en base de datos');
    return res.status(200).json(result);

  } catch (error: any) {
    logger.error({ err: error }, 'Error en fusionadosController');
    return res.status(500).json({ error: 'Ocurrió un error al obtener datos.' });
  }
};
