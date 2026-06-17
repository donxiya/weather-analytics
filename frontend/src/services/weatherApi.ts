import type { WeatherResponse } from "../types/weather";

const API_URL = "https://weather-analytics-tls1.onrender.com";

export async function getWeather(city: string): Promise<WeatherResponse> {
  const res = await fetch(`${API_URL}/weather?city=${city}`)

  if (!res.ok) {
    throw new Error("Failed to fetch weather");
  }

  return res.json();
}