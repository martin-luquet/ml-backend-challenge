import { Request, Response } from 'express';
import axios from 'axios';

//import memcachedClient from '../config/memcached';
import { guardarFusionado } from '../services/fusionadosService';
import { planetCoordinateMap } from '../utils/planetMap';

/**
 * Controlador para manejar la ruta /fusionados/:id
 * Permite obtener información de un personaje fusionado por su ID
 */
export const fusionadosController = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id, 10);

    if (isNaN(id) || id < 1) {
      return res.status(400).json({ error: 'ID inválido. Debe ser un número mayor que 0.' });
    }

    /*
    const cacheKey = `merged:${id}`;

    const { value: cached } = await memcachedClient.get(cacheKey);
    if (cached) {
      const parsed = JSON.parse(cached.toString());
      console.log('Resultado obtenido desde cache');
      return res.status(200).json(parsed);
    }
    */

    // 2. Llamadas a APIs externas
    const { data: peopleData } = await axios.get(`https://swapi.info/api/people/${id}/`);
    const { data: planetData } = await axios.get(peopleData.homeworld);

    const planetName = planetData.name;
    const location = planetCoordinateMap[planetName];

    let weather = {
      temperature: 'No disponible',
      windspeed: 'No disponible',
      condition_code: 'No disponible'
    };

    // 3. Si el planeta tiene coordenadas, consultar clima
    if (location) {
      const { data: weatherData } = await axios.get('https://api.open-meteo.com/v1/forecast', {
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

    // 4. Preparar resultado
    const result = {
      character: peopleData.name,
      height: peopleData.height,
      mass: peopleData.mass,
      homeworld: planetName,
      climate: planetData.climate,
      terrain: planetData.terrain,
      weather
    };

    //await memcachedClient.set(cacheKey, JSON.stringify(result), { expires: 1800 });

    // 6. Guardar en base de datos
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

    console.log('Resultado guardado en base de datos');
    return res.status(200).json(result);

  } catch (error: any) {
    console.error('Error en fusionadosController:', error);
    return res.status(500).json({ error: 'Ocurrió un error al obtener datos.' });
  }
};

