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
    
    /**
     * recibe el ID del personaje fusionado desde los parámetros de la solicitud.
     */
    const id = parseInt(req.params.id, 10);

    if (isNaN(id) || id < 1) {
      return res.status(400).json({ error: 'ID inválido. Debe ser un número mayor que 0.' });
    }

    /**
     * Verifica si el resultado ya está en caché.
     */
    const cacheKey = `merged:${id}`;

    /**
     * * Intenta obtener el resultado desde la caché.
     */
    const { value: cached } = await memcachedClient.get(cacheKey);
    
    /**
     * * Si el resultado está en caché, lo devuelve directamente sin hacer más consultas.
     */
    if (cached) {
      /**
       * Parsea el resultado de la caché y lo devuelve como respuesta.
       */
      const parsed = JSON.parse(cached.toString());
      logger.info({parsed},'Resultado obtenido desde cache');
      return res.status(200).json(parsed);
    }

    const { data: peopleData } = await axios.get(`${process.env.SWAPI_BASE_URL}/people/${id}/`);
    const { data: planetData } = await axios.get(peopleData.homeworld);

    const planetName = planetData.name;
    const location = planetCoordinateMap[planetName];

    /**
     * * Si no tenemos las coordenadas del planeta, devolvemos un objeto con valores por defecto
     */
    let weather = {
      temperature: 'No disponible',
      windspeed: 'No disponible',
      condition_code: 'No disponible'
    };


    /**
     * * Si tenemos las coordenadas del planeta, hacemos una consulta a la API de Open Meteo
     */
    if (location) {
      /**
       * * Realizamos la consulta a la API de Open Meteo para obtener el clima actual del planeta.
       */
      const { data: weatherData } = await axios.get(`${process.env.OPENMETEO_BASE_URL}`, {
        params: {
          latitude: location.lat,
          longitude: location.lon,
          current_weather: true
        }
      });

      /**
       * * Si la API de Open Meteo devuelve datos, los formateamos
       */
      weather = {
        temperature: `${weatherData.current_weather.temperature} °C`,
        windspeed: `${weatherData.current_weather.windspeed} km/h`,
        condition_code: weatherData.current_weather.weathercode
      };
    }

    /**
     * Construir el objeto de resultado con los datos obtenidos.
     */
    const result = {
      character: peopleData.name,
      height: peopleData.height,
      mass: peopleData.mass,
      homeworld: planetName,
      climate: planetData.climate,
      terrain: planetData.terrain,
      weather
    };

    logger.info({result}, 'Datos obtenidos de la API');
    

    /**
     * Guardar el resultado en caché y en la base de datos
     */
    logger.info('Guardando resultado en cache y base de datos');
    await memcachedClient.set(cacheKey, JSON.stringify(result), { expires: 1800 });

    /**
     * Guardar el resultado en la base de datos.
     */
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

    /**
     * Responder con el resultado obtenido.
     */
    return res.status(200).json(result);

  } catch (error: any) {
    logger.error({ err: error }, 'Error en fusionadosController');
    return res.status(500).json({ error: 'Ocurrió un error al obtener datos.' });
  }
};
