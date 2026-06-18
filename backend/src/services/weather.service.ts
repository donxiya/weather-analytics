import { CITY_COORDS } from "../utils/cityMap";
import { fetchWeather } from "../clients/openmeteo.client";
import type { WeatherReading } from "../types/weather";
import { insertWeather } from "../repo/weatherRepo";


export async function getWeatherByCity(city: string) {
  const key = city.toLowerCase().replace(/\s/g, "");
  const coords = CITY_COORDS[key];

  if (!coords) {
    throw new Error("City not supported");
  }

  const data = await fetchWeather(coords.lat, coords.lon);

  return {
    city: key,
    temperature: data.current.temperature_2m,
    windSpeed: data.current.wind_speed_10m,
    time: data.current.time,
  };
}

export async function saveWeather(reading: WeatherReading): Promise<void> {

  if (!reading.city.trim()) {
    throw new Error("City is required");
  }

  await insertWeather(reading);
}