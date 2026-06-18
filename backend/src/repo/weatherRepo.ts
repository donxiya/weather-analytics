import { pool } from "../db/pool";
import { WeatherReading } from "../types/weather";

export async function insertWeather(reading: WeatherReading) {
  console.log("🔥 DB INSERT INPUT:", reading);

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
    console.log("✅ INSERT SUCCESS:", result.rowCount);
  } catch (err) {
    console.error("❌ DB INSERT ERROR:", err);
    throw err;
  }
}