import { saveWeather } from "../services/weather.service";
import { pool } from "../db/pool";

async function main() {
  await saveWeather({
    city: "Boulder",
    temperature: 27.4,
    windSpeed: 42,
    time: new Date(),
  });

  console.log("Inserted!");
  await pool.end();
}

main().catch(console.error);