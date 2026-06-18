import { saveWeather } from "../services/weather.service";
import { pool } from "../db/pool";

async function main() {
  await saveWeather({
    city: "Boulder",
    temperature: 27.4,
    humidity: 42,
    recordedAt: new Date(),
  });

  console.log("Inserted!");
  await pool.end();
}

main().catch(console.error);