import { WeatherModel } from "./weather";

/**
 * Interfaz que representa un personaje fusionado con información de su planeta de origen y el clima actual.
 */
export interface Fusionado {
    characterName: string;
    height: string;
    mass: string;
    homeworld: string;
    climate: string;
    terrain: string;
    weather: WeatherModel;
}

