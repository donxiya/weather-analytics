import { CITY_COORDS } from "../utils/cityMap";
import { fetchWeather } from "../clients/openmeteo.client";
import type { WeatherReading } from "../types/weather";
import { insertWeather } from "../repo/weatherRepo";
import { getAllWeather } from "../repo/weatherRepo";

export async function getWeatherByCity(city: string) {
  if (typeof city !== "string") {
    throw new Error("City must be a string");
  }
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
  log("[SERVICE] saveWeather called with:", reading);

  if (!reading) {
    log(" [SERVICE] reading is undefined");
    throw new Error("reading is undefined");
  }

  log("[SERVICE] city:", reading.city);

  const city = reading?.city;


  const trimmed = city.trim();

  log("[SERVICE] inserting into DB...");

  await insertWeather({
    ...reading,
    city: trimmed,
  });

  log("[SERVICE] DB insert complete");
}

export async function getSavedWeather(): Promise<any[]> {
  log("[SERVICE] getSavedWeather called");

  const data = await getAllWeather();

  log("[SERVICE] returning:", data.length, "records");

  return data;
}

export async function getWeatherAnalytics() {
  const data = await getAllWeather();

  log("RAW DATA:", data);

  if (!data || data.length === 0) {
    log("RAW ROWS:", data);
    return {
      avgTemp: 0,
      avgWind: 0,
      count: 0,
    };
  }

  let tempSum = 0;
  let windSum = 0;

  for (const d of data) {
    tempSum += Number(d.temperature);
    windSum += Number(d.windSpeed);
  }

  const count = data.length;

  const avgTemp = tempSum / count;
  const avgWind = windSum / count;

  log("CALCULATED:", { avgTemp, avgWind, count });

  return {
    avgTemp,
    avgWind,
    count,
  };
}