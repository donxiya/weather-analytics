import { beforeEach, afterAll, describe, expect, it } from "vitest";
import { pool } from "../../src/db/pool";
import { insertWeather } from "../../src/repo/weatherRepo";

describe("weatherRepo Integration Tests", () => {
  beforeEach(async () => {
    await pool.query("DELETE FROM weather_readings");
  });

  afterAll(async () => {
    await pool.end();
  });

  it("inserts a weather reading into the database", async () => {
    await insertWeather({
      city: "London",
      temperature: 20,
      windSpeed: 5,
      time: new Date("2026-06-18T10:00:00"),
    });

    const result = await pool.query(
      `SELECT city, temperature, wind_speed
       FROM weather_readings`
    );

    expect(result.rowCount).toBe(1);

    expect(result.rows[0]).toMatchObject({
      city: "London",
      temperature: 20,
      wind_speed: 5,
    });
  });
});