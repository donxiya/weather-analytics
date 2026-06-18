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
  console.log("🔥 [SERVICE] saveWeather called with:", reading);

  if (!reading) {
    console.log(" [SERVICE] reading is undefined");
    throw new Error("reading is undefined");
  }

  console.log("[SERVICE] city:", reading.city);

  const city = reading?.city;

  if (typeof city !== "string") {
    console.log("[SERVICE] invalid city type:", typeof city);
    throw new Error("City must be a string");
  }

  const trimmed = city.trim();

  if (!trimmed) {
    console.log("[SERVICE] empty city after trim");
    throw new Error("City is required");
  }

  console.log("[SERVICE] inserting into DB...");

  await insertWeather({
    ...reading,
    city: trimmed,
  });

  console.log("[SERVICE] DB insert complete");
}