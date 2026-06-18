import { describe, it, expect, vi, beforeEach } from "vitest";
import request from "supertest";

vi.mock("../../src/clients/openmeteo.client", () => ({
  fetchWeather: vi.fn(),
}));

import * as weatherClient from "../../src/clients/openmeteo.client";
import app from "../../src/app";

const fetchWeather = vi.mocked(weatherClient.fetchWeather);

describe("Weather Routes Integration Tests", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("GET /weather", () => {
    it("returns weather for a valid city", async () => {
      fetchWeather.mockResolvedValue({
        current: {
          temperature_2m: 20,
          wind_speed_10m: 5,
          time: "2026-06-18T10:00",
        },
      });

      const response = await request(app)
        .get("/weather")
        .query({ city: "London" });

      expect(response.status).toBe(200);

      expect(response.body).toEqual({
        city: "london",
        temperature: 20,
        windSpeed: 5,
        time: "2026-06-18T10:00",
      });

      expect(fetchWeather).toHaveBeenCalledOnce();
      expect(fetchWeather).toHaveBeenCalledWith(51.5072, -0.1276);
    });

    it("returns 400 when city is unsupported", async () => {
      const response = await request(app)
        .get("/weather")
        .query({ city: "Atlantis" });

      expect(response.status).toBe(400);

      expect(response.body).toEqual({
        error: "City not supported",
      });

      expect(fetchWeather).not.toHaveBeenCalled();
    });
  });
});