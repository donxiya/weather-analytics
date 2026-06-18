import { Pool } from "pg";

export const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "weather_db",
  password: "postgres",
  port: 5432,
});