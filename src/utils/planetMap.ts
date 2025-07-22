/**
 * Mapa de coordenadas de planetas ficticios.
 * Cada entrada contiene el nombre del planeta, la ciudad representativa,
 */
export const planetCoordinateMap: Record<string, { city: string, lat: number, lon: number }> = {
  'Tatooine': { city: 'Cairo, Egypt', lat: 30.0444, lon: 31.2357 },
  'Hoth': { city: 'Reykjavik, Iceland', lat: 64.1466, lon: -21.9426 },
  'Endor': { city: 'Vancouver, Canada', lat: 49.2827, lon: -123.1207 },
  'Naboo': { city: 'Bali, Indonesia', lat: -8.3405, lon: 115.0920 },
  'Kamino': { city: 'Quibdó, Colombia', lat: 5.6947, lon: -76.6611 },
  'Mustafar': { city: 'Hilo, Hawaii', lat: 19.7297, lon: -155.0904 }
};
