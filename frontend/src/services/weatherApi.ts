import type { WeatherResponse } from "../types/weather";

export async function getWeather(city: string): Promise<WeatherResponse> {
  const res = await fetch(
    `http://localhost:3001/weather?city=${city}`
  );

  if (!res.ok) {
    throw new Error("Failed to fetch weather");
  }

  return res.json();
}