import { pool } from "../db/pool";
import { WeatherReading } from "../types/weather";

export async function insertWeather(reading: WeatherReading) {
  const query = `
    INSERT INTO weather_readings (city, temperature, windSpeed, recorded_at)
    VALUES ($1, $2, $3, $4)
  `;

  const values = [
    reading.city,
    reading.temperature,
    reading.windSpeed,
    reading.time,
  ];

  await pool.query(query, values);
}