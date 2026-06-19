import { pool } from "../db/pool";
import { WeatherReading } from "../types/weather";
import { log } from "../utils/logger";

export async function insertWeather(reading: WeatherReading) {
  log("[REPO] DB INSERT INPUT:", reading);

  const query = `
    INSERT INTO weather_readings (city, temperature, wind_speed, recorded_at)
    VALUES ($1, $2, $3, NOW())
  `;

  const values = [
    reading.city,
    reading.temperature,
    reading.windSpeed,
  ];

  try {
    const result = await pool.query(query, values);
    console.log("INSERT SUCCESS:", result.rowCount);
  } catch (err) {
    console.error("DB INSERT ERROR:", err);
    throw err;
  }
}   

export async function getAllWeather() {
  log("[REPO] DB READ SAVED DATA");
  const query = `
    SELECT city, temperature, wind_speed, recorded_at
    FROM weather_readings
    ORDER BY recorded_at DESC
  `;

  const result = await pool.query(query);

  return result.rows.map((row) => ({
    city: row.city,
    temperature: row.temperature,
    windSpeed: row.wind_speed,
    time: row.recorded_at,
  }));
}