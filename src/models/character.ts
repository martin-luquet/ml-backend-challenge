import { BaseModel }  from "./base";
import { WeatherModel } from "./weather";

export interface Fusionado extends BaseModel {
    characterName: string;
    height: string;
    mass: string;
    homeworld: string;
    climate: string;
    terrain: string;
    weather: WeatherModel;
}

