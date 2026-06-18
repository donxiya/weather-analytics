import type { WeatherResponse } from "../types/weather";
import type { WeatherAnalytics } from "../types/weather";

const API_URL = "https://weather-analytics-tls1.onrender.com";

export async function getWeather(city: string): Promise<WeatherResponse> {
  const res = await fetch(`${API_URL}/weather?city=${city}`)

  if (!res.ok) {
    throw new Error("Failed to fetch weather");
  }

  return res.json();
}

export async function saveWeather(data: WeatherResponse): Promise<void> {
  const res = await fetch(`${API_URL}/weather/save`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.error || "Failed to save weather");
  }
}

export async function getSavedWeather(): Promise<WeatherResponse[]> {
  const res = await fetch(`${API_URL}/weather/saved`);

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.error || "Failed to fetch weather");
  }

  return res.json();
}


export async function getWeatherAnalytics(): Promise<WeatherAnalytics> {
  const res = await fetch(`${API_URL}/weather/analytics`);

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.error || "Failed to fetch analytics");
  }

  return res.json();
}